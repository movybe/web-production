<?php

require_once '../config/functions.php';
class Suggestions extends  Functions{
    private $query , $data ,$success = "success" , $suggestions , $error_occured = "error occured" , $error = "error";
    public function __construct()
    {
        //Get the $website_details variable
        global $website_details;

        $this->website_details = $website_details;
    }

    private function isReady () : bool {

        return isset($_POST['data']) && !empty($this->data = json_decode($_POST['data'] , true));
    }

    private  function setDetails () : bool {
        $this->query = $this->escape_string($this->data['query']);
        return true;
    }

    public final function process () : bool {
        //Split the words of the array
        $this->suggestions = $this->fetch_data_from_table_with_conditions($this->queries_table_name , "query LIKE '%{$this->query}%' ORDER  BY occurrence DESC LIMIT {$this->website_details->maxNumberOfSuggestion}");
        return true;
        }

    public function Processor() : string  {
        $default_error = json_encode([$this->error => $this->error_occured , $this->success => 0]);
        if(!($this->isReady() and $this->setDetails()))return $default_error;
        if(!$this->process()) return $default_error;
        return json_encode([$this->error => "success" , $this->success => 1 , "suggestions" => $this->suggestions]);
    }
}

$suggestions = new Suggestions();
echo $suggestions->Processor();


?>