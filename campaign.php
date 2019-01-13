<?php
require_once $_SERVER['DOCUMENT_ROOT'].'/config/functions.php';
?>
<!DOCTYPE html>
<html lang="en-us" dir="ltr">
<head>
    <meta charset="utf-8" />
    <meta name="author" content="<?php echo $website_details->SiteName; ?>" />
    <meta name="description" content="<?php echo $website_details->PageDescription; ?>" />
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
    <title><?php echo $website_details->SiteName; ?> • Join Our Campaign and Become a Merchant/Affiliate</title>
    <link rel="canonical" href="<?php echo $website_details->SiteNameWithHttps; ?>" />
    <meta name="robot" content="index, follow" />

    <?php

    $stylesheets = array("materialize.min.css" , "campaign-header.css" ,  "material-icons.css" , "main.css" , "merchant.css" , "jquery.lightbox.css" , "footer.css");
    $scripts = array("babel.min.js" , "react.development.js" , "react-dom.development.js" , "redux.min.js" , "react-redux.min.js");
    echo $functions->printAssets($stylesheets , "css" , false)."\n".$functions->printAssets($scripts);
    ?>

    <link rel="icon" type="image/png" href="<?php echo $website_details->IMG_FOLDER;?>m.png" />
</head>
<body id = "particles-js" class="lazyloads"  data-bgset="<?php echo $website_details->IMG_FOLDER.'campaign-background.jpg'?>">
<div>

<main id="app" data-referer = "<?php echo isset($_GET['referer']) ?  $_GET['referer'] : null; ?>">

            </main>
       </div>


 <?php
 $scripts = array("cookie.min.js" , "request.js" , "jquery.min.js" , "timeago.min.js" , "bgset.min.js" ,"lazy-bg.js" , "materialize.min.js" , "defaults.js" , "test.js" , "jquery.lightbox.js" , "particles.js" , "app.js");
 $components = array("campaign.js" ,"merchant-header.js" ,  "merchant.js" , "campaign-settings.js" , "jquery.validate.js");
 echo $functions->printAssets($scripts).$functions->printAssets($components , "babel");
 ?>

</body>
</html>