<?php
require_once $_SERVER['DOCUMENT_ROOT'].'/config/functions.php';
if($functions->data_saving_mode_is_enabled())
{
    header('location: /browser');
}
//$functions->try_insert_or_update_ip_address_in_database();
?>
<!DOCTYPE html>
<html lang="en-us" dir="ltr">
<head>
    <meta charset="utf-8" />
    <meta name="author" content="<?php echo $website_details->SiteName; ?>" />
    <meta name="description" content="<?php echo $website_details->PageDescription; ?>" />
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
    <title><?php echo $website_details->SiteName; ?> • <?php echo $website_details->WebsiteSubject; ?></title>
    <link rel="canonical" href="<?php echo $website_details->SiteNameWithHttps; ?>" />
    <meta name="robot" content="index, follow" />

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
    $required = array("jquery.min.js" ,"materialize.min.js" , "babel.min.js"  , "react.development.js" , "react-dom.development.js" , "redux.min.js" , "react-redux.min.js");
    echo $functions->printAssets($stylesheets , "css" , false)."\n";
    echo $functions->is_production_mode() ? $cdn_required : $functions->printAssets($required).$functions->printAssets($materialize_css , "css" , false);
    ?>


    <link rel="icon" type="image/jpeg" href="<?php echo $website_details->IMG_FOLDER;?>favicon.png" />
</head>
<body>
<main class ="container">
    <div class ="section no-pad-bot" id="index-banner">
        <div class="container">
            <br><br>
            <h1 class="header center pink-text text-lighten-3"><img data-src="<?php echo $website_details->IMG_FOLDER.strtolower($website_details->SiteName);?>.png" class="responsive-img brand-logo logo-image lazyload" /></h1>
            <div class="row center">
                <h5 class="header col s12 light grey-text text-lighten-1"><?php echo $website_details->PageDescription; ?></h5>
            </div>
        </div>
    </div>
    <div id="form-container">

    </div>


    <!-- Element Shown -->
    <a id="data-savings-info" class="waves-effect waves-light btn btn-floating"><i class="material-icons">menu</i></a>

    <!-- Tap Target Structure -->
    <div class="tap-target-wrapper">

        <div class="tap-target" data-target="data-savings-info">
            <div class="tap-target-content">
                <h5 id="did-you-know">Did you know ?</h5>
                <p>Using <?php echo $website_details->SiteName; ?> will save you up to 90% of your data.<br />No annoying Ads/unrelated products
                    <br/>fast.easy.secure</p>
            </div>
        </div>
    </div>





</main>
<?php require_once $website_details->INCS_FOLDER.'footer.php'; ?>
</body>
</html>


