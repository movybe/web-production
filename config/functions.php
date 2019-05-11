<?php

$dir = dirname(__FILE__);

require_once $dir.'/DatabaseConnection.php';
require_once $dir.'/config.php';
require_once $dir.'/detect.php';
//echo $ip_address = Detect::ip();
//$cwd = getcwd();
class Functions extends  DatabaseConnection {



    public $website_details;
    public $git_repo = null;

    public final function escape_string (string $string){

        $database = $this->is_production_mode() ? $this->production_database_name : $this->database;
        $username = $this->is_production_mode() ? $this->production_database_username : $this->database_username;
        $password = $this->is_production_mode() ?$this->production_database_password : $this->database_password;
        $database_host = $this->database_host;


        $conn=mysqli_connect("{$database_host}","{$username}","{$password}","{$database}");

        return  mysqli_real_escape_string($conn , $string);

    }


    function __construct()
    {
        //   This iniatializes connection with the database i.e DatabaseConnection::_construct();

        parent::__construct();
        $this->website_details = new WebsiteDetails();


    }

    function get_client_ip() : string {
        $ipaddress = '';
        if (isset($_SERVER['HTTP_CLIENT_IP']))
            $ipaddress = $_SERVER['HTTP_CLIENT_IP'];
        else if(isset($_SERVER['HTTP_X_FORWARDED_FOR']))
            $ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
        else if(isset($_SERVER['HTTP_X_FORWARDED']))
            $ipaddress = $_SERVER['HTTP_X_FORWARDED'];
        else if(isset($_SERVER['HTTP_FORWARDED_FOR']))
            $ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
        else if(isset($_SERVER['HTTP_FORWARDED']))
            $ipaddress = $_SERVER['HTTP_FORWARDED'];
        else if(isset($_SERVER['REMOTE_ADDR']))
            $ipaddress = $_SERVER['REMOTE_ADDR'];
        else
            $ipaddress = 'UNKNOWN';
        return $ipaddress;
    }



    public final function getFileLocation(string $filename) : string
{
    return $this->website_details->getFileLocation($filename);


}







    public final function generateID (int  $length , string $table_name = null , string $field_name = null) : string {

        $letters = Array("A" , "B" , "C" , "D" , "E" , "F" , "G" , "H" ,  "I" , "J" , "K" ,"L" ,"M" ,"N" ,"O" ,"P" ,"Q" ,"R" ,"S" , "T" ,
            "U" ,"V" ,"W" ,"X" ,"Y" ,"Z" ,"a" ,"b" ,"c" ,"d" ,"e" ,"f" ,"g" ,"h" ,"i" ,"j" ,"k" ,"l" ,"m" ,"n" ,"o" ,
            "p" ,"q" ,"r" ,"s" ,"t" ,"u" ,"v" ,"w" ,"x" ,"y" ,"z" ,"0" ,"1" ,"2" ,"3" ,"4" ,"5" ,"6" ,"7" ,"8"
        , "9"  , "_");

        $random_string = "";
        $string_length = count($letters);
        for($i = 0; $i < $length; $i++) {
            $random_string.= $letters[rand(0 , $string_length-1)];

        }

        if($table_name && $field_name && $this->record_exists_in_table($table_name , $field_name , $random_string))
        {
            $this->generateID($length , $table_name , $field_name);
        }

        return $random_string;
    }


    public  function  getNumberOfLinesOfFile(string  $filename) : int {

        $file= $filename;
        $linecount = 0;
        $handle = fopen($file, "r");
        while(!feof($handle)){
            $line = fgets($handle);
            $linecount++;
        }

        fclose($handle);

        return $linecount;


    }

    public final function data_saving_mode_is_enabled () : bool {

        $headers =  getallheaders();
        $data_saving_mode_enabled  = false;
        foreach($headers as $header => $value){
            if(strtolower($header) == 'save-data' && $value == 'on'){
                $data_saving_mode_enabled = true;

                break;
            }

        }

        return $data_saving_mode_enabled;

    }


    public final function tryRedirectToHttps () {
        //Check if it's in production mode
        if(!$this->is_production_mode()) return ;

        //Remove www from the request url
        if($this->containsWord($_SERVER['HTTP_HOST'] , 'www.'))
        {


            $redirect = 'https://' . str_replace('www.' , '' , $_SERVER['HTTP_HOST']) . $_SERVER['REQUEST_URI'];
            //header('HTTP/1.1 301 Moved Permanently');
            header('Location: ' . $redirect);
            exit();

        }

        elseif (!(isset($_SERVER['HTTPS']) && ($_SERVER['HTTPS'] == 'on' ||
                $_SERVER['HTTPS'] == 1) ||
            isset($_SERVER['HTTP_X_FORWARDED_PROTO']) &&
            $_SERVER['HTTP_X_FORWARDED_PROTO'] == 'https'))
        {
            $redirect = 'https://' . str_replace('www.' , '' , $_SERVER['HTTP_HOST']) . $_SERVER['REQUEST_URI'];
            header('HTTP/1.1 301 Moved Permanently');
            header('Location: ' . $redirect);
            exit();
        }

    }

    public final function containsWord($str, $word)
{
    return !!preg_match('#\\b' . preg_quote($word, '#') . '\\b#i', $str);
}




public  function  readBetweenFileLines(string  $filename , int $start , int $end) : string  {

        $f = fopen($filename, 'r');
        $lineNo = 0;
        $startLine = $start;
        $endLine = $end;

        $content = "";
        while ($line = fgets($f)) {
            $lineNo++;
            if ($lineNo >= $startLine) {
                $content.= $line;
            }
            if ($lineNo == $endLine) {
                break;
            }
        }

        fclose($f);
        return $content;
    }


    public function __destruct()
    {
        parent::__destruct(); // TODO: Change the autogenerated stub
    }
    public final function printAssets(array  $statics ,  $type = "javascript" ,  $is_javascript_file = true ,  $folder = null , string $attr = null , bool $defer = true) : string
    {
        $type = $type?:"javascript";
        global $website_details;
        $files_resources = "";
        $defer_attribute = "";

        $document_root = $_SERVER['DOCUMENT_ROOT'];
        if($is_javascript_file){
            foreach($statics as $static)
            {




                $defer_attribute = $defer ? "defer" : "";
                $file = $folder ? $document_root.$folder.$static :  $document_root.$website_details->JS_FOLDER.$static;
                $last_modified = date("F d Y H:i:s A", filemtime($file));
                $src = $folder ? $folder.$static : $website_details->JS_FOLDER.$static;
                $files_resources.="<script $defer_attribute type='text/{$type}' src='{$src}?last_modified={$last_modified}' $attr></script>\n";
            }

        }
        else {

            foreach($statics as $static)
            {

                $file = $folder ? $document_root.$folder.$static :  $document_root.$website_details->CSS_FOLDER.$static;
                $last_modified = date("F d Y H:i:s A", filemtime($file));
                $src = $folder ? $folder.$static : $website_details->CSS_FOLDER.$static;
                $files_resources.= "<link rel = 'stylesheet' type='text/{$type}'  href='{$src}?last_modified={$last_modified}' $attr />\n";
            }


        }
        return $files_resources;
    }



    public final function  increment_value(string $table_name  , string $field_name , float $increment_by , string  $where_clause)
    {

        return $this->executeSQL("UPDATE {$table_name} SET {$field_name} = $field_name + {$increment_by} WHERE $where_clause");
    }

    public final function  decrement_value(string $table_name  , string $field_name , float $decrement_by , string  $where_clause)
    {

        return $this->executeSQL("UPDATE {$table_name} SET {$field_name} = $field_name - {$decrement_by} WHERE $where_clause");
    }

    public final  function try_insert_or_update_ip_address_in_database ()
    {


        $detect = new Detect();

        $ip_address= $this->get_client_ip();
        $country = Detect::ipCountry();
        if($this->record_exists_in_table($this->visitors_table_name , 'ip_address' , $ip_address))
        {
            $now = date('Y-m-d H:i:s');
            $this->update_record($this->visitors_table_name , 'last_visit' , $now , 'ip_address' , $ip_address);
            return $this->increment_value($this->visitors_table_name , 'visits' , 1 , "ip_address = '{$ip_address}'");
        }

           // $country = Detect::ipCountry();
        return $this->insert_into_table($this->visitors_table_name ,
                [
                    'ip_address' => $ip_address ,
                    'country' => $country]);
           }

           /*
    public final function get_current_git_commit( $branch='master' ) {
        //if(!is_null($this->git_repo))return $this->git_repo;
        global $cwd;
        if ( $hash = file_get_contents( sprintf( $cwd.'/.git/refs/heads/%s', $branch ) ) ) {
            return trim($hash);
        } else {
            return false;
        }
    }
           */
}

$functions = new Functions();

?>