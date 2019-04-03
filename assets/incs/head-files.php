<?php

$cdn_required = <<<CDN_INCLUDES
     <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" />

CDN_INCLUDES;
$materialize_css = array("materialize.min.css");
$stylesheets = array("main.css"  , "footer.css");
$required =  array("jquery.min.js");
$required2 = array("babel.min.js"  ,  "materialize.min.js" , "react.development.js" , "react-dom.development.js" , "redux.min.js" , "react-redux.min.js");
echo $functions->is_production_mode() ? $cdn_required : $functions->printAssets($materialize_css , "css" , false).$functions->printAssets($required);
echo $functions->printAssets($stylesheets , "css" , false)."\n";
echo $functions->printAssets($required2 , "JavaScript");

?>