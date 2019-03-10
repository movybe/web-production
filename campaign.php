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
    <title><?php echo $website_details->SiteName; ?> • Join Our Campaign and Become a Merchant/Affiliate</title>
    <link rel="canonical" href="<?php echo $website_details->SiteNameWithHttps; ?>" />
    <meta name="robot" content="index, follow" />
        <?php
        $materialize_css = array('materialize.min.css');
        $bootstrap_css = array('bootstrap.min.css');
        $stylesheets = array('admin.css' , 'campaign.css'  ,  'material-icons.css' , 'main.css'  , 'merchant.css'  , 'footer.css');
        $scripts = array('babel.min.js' , 'react.production.min.js' , 'react-dom.production.min.js' , 'redux.min.js' , 'react-redux.min.js');
        echo $functions->printAssets($stylesheets , 'css' , false).$functions->printAssets($scripts);
        echo $functions->printAssets($materialize_css , 'css' , false , null , "id='materialize-css'");

        ?>
    <link rel='icon' type='image/jpeg' href='<?php echo $website_details->IMG_FOLDER;?>favicon.png' />
</head>
<body id = 'particles-js' class='lazyloads'  data-bgset="<?php echo $website_details->IMG_FOLDER.'campaign-background.jpg'; ?>">
<div>

<main id='app' data-referer = '<?php echo isset($_GET['r']) ?  $_GET['r'] : null; ?>'>

            </main>
       </div>


 <?php
 $scripts = array('cookie.min.js' , 'request.js'  , 'paystack.js'   ,  'jquery.min.js' , 'timeago.min.js' , 'bgset.min.js' ,'lazy-bg.js' , 'materialize.min.js' ,  'defaults.js'  , 'jquery.lightbox.js' , 'particles.js' , 'app.js');
 $components = array('footer.js' , 'campaign.js' ,'merchant-header.js' ,  'merchant-ads.js' , 'merchant.js' ,'affiliate-header.js', 'affiliate.js' , 'admin.js' , 'campaign-settings.js' , 'jquery.validate.js');
 echo $functions->printAssets($scripts  , null , true , null ).$functions->printAssets($components , 'babel' , true , null);

?>

</body>
</html>