<?php

$cdn_required = <<<CDN_INCLUDES
     <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
<script crossorigin src='https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.26.0/babel.js'></script>
<script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
<script crossorigin src = 'https://cdnjs.cloudflare.com/ajax/libs/redux/4.0.1/redux.min.js'></script>
<script crossorigin src='https://cdnjs.cloudflare.com/ajax/libs/react-redux/6.0.1/react-redux.min.js'></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" />

CDN_INCLUDES;
$materialize_css = array("materialize.min.css");
$stylesheets = array("main.css"  , "footer.css");
$babel = array("babel.min.js");
echo $functions->printAssets($babel , 'babel' , true);
$required = array("jquery.min.js" ,  "materialize.min.js" ,  "react.development.js" , "react-dom.development.js" , "redux.min.js" , "react-redux.min.js");
echo $functions->is_production_mode() ? $cdn_required : $functions->printAssets($materialize_css , "css" , false).$functions->printAssets($required);
echo $functions->printAssets($stylesheets , "css" , false)."\n";

?>