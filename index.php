<?php
require_once $_SERVER['DOCUMENT_ROOT'].'/config/functions.php';
?>
<!DOCTYPE html>
<html lang="en-us" dir="ltr">
<head>
    <meta charset="utf-8" />
    <meta name="author" content="<?php echo $website_details->SiteName; ?>" />
    <meta name="description" content="<?php echo $website_details->PageDescription; ?>" />
    <title><?php echo $website_details->SiteName; ?> • Free price search engine</title>
    <link rel="canonical" href="<?php echo $website_details->SiteNameWithHttps; ?>" />
    <meta name="robot" content="index, follow" />
    <link rel="stylesheet" href="<?php echo $website_details->CSS_FOLDER;?>materialize.min.css" type="text/css" />
    <link rel="stylesheet" href="<?php echo $website_details->CSS_FOLDER;?>material-icons.css" type="text/css" />
    <link rel="stylesheet" href="<?php echo $website_details->CSS_FOLDER;?>main.css" type="text/css" />
    <link rel="stylesheet" href="<?php echo $website_details->CSS_FOLDER;?>jquery.lightbox.css" />
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
    <link rel="stylesheet" href="<?php echo $website_details->CSS_FOLDER;?>footer.css" type="text/css" />
    <link rel="icon" type="image/png" href="<?php echo $website_details->IMG_FOLDER;?>m.png" />
    <script type="text/javascript" language="JavaScript" src="<?php echo $website_details->JS_FOLDER;?>babel.min.js"></script>
    <script type="text/javascript" language="JavaScript" src="<?php echo $website_details->JS_FOLDER;?>react.development.js"></script>
    <script type="text/javascript" language="JavaScript" src="<?php echo $website_details->JS_FOLDER;?>react-dom.development.js"></script>
    <script type="text/javascript" language="JavaScript" src="<?php echo $website_details->JS_FOLDER;?>redux.min.js"></script>
    <script type="text/javascript" language="JavaScript" src="<?php echo $website_details->JS_FOLDER;?>react-redux.min.js"></script>
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
                <p>Using <?php echo $website_details->SiteName; ?> will save you up to 90% of your data.<br><br />No Ads, No unrelated product. <br />fast. easy. secure</p>
            </div>
        </div>
    </div>





</main>
<?php require_once $website_details->INCS_FOLDER.'footer.php'; ?>
</body>
</html>


