<?php
/*
* This is PHP Code
* will not work on clicking "Run Code Snippet"
* Host this code on php server as .php file
*/

header('Content-Type: application/json');
$headers =  getallheaders();
$datasaver = false;
foreach($headers as $key=>$val){
    if(strtolower($key) == 'save-data' && $val == 'on'){
        $datasaver = true;

        break;
    }
}

$status = array('data_saver'=>$datasaver);

echo json_encode($status);

?>