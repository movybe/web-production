<?php

require_once 'DatabaseConnection.php';
require_once 'config.php';


class Functions extends  DatabaseConnection {

    public final function escape_string (string $string){
        $conn=mysqli_connect("{$this->database_host}","{$this->database_username}","{$this->database_password}","{$this->database}");

        return  mysqli_real_escape_string($conn , $string);

    }


    function __construct()
    {
        //   This iniatializes connection with the database i.e DatabaseConnection::_construct();

        parent::__construct();


    }

    public final function generateID (int  $length) : string {

        $letters = Array("A" , "B" , "C" , "D" , "E" , "F" , "G" , "H" ,  "I" , "J" , "K" ,"L" ,"M" ,"N" ,"O" ,"P" ,"Q" ,"R" ,"S" , "T" ,
            "U" ,"V" ,"W" ,"X" ,"Y" ,"Z" ,"a" ,"b" ,"c" ,"d" ,"e" ,"f" ,"g" ,"h" ,"i" ,"j" ,"k" ,"l" ,"m" ,"n" ,"o" ,
            "p" ,"q" ,"r" ,"s" ,"t" ,"u" ,"v" ,"w" ,"x" ,"y" ,"z" ,"0" ,"1" ,"2" ,"3" ,"4" ,"5" ,"6" ,"7" ,"8"
        , "9"  , "_");

        $random_string = "";
        $string_length = count($letters);
        for($i = 0; $i < $length; $i++) {
            $random_string.= $letters[rand(0 , $string_length-1)];

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
    public final function printAssets(array  $statics , string $type = "JavaScript" , bool  $is_javascript_file = true , string $folder = null , string $attr = null) : string
    {

        global $website_details;
        $files_resources = "";
        $document_root = $_SERVER['DOCUMENT_ROOT'];
        if($is_javascript_file){
            foreach($statics as $static)
            {



                $file = $folder ? $document_root.$folder.$static :  $document_root.$website_details->JS_FOLDER.$static;
                $last_modified = date("F d Y H:i:s A", filemtime($file));
                $src = $folder ? $folder.$static : $website_details->JS_FOLDER.$static;
                $files_resources.="<script type='text/{$type}' language='JavaScript' src='{$src}?last_modified={$last_modified}' $attr></script>\n";

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
}

$functions = new Functions();
?>