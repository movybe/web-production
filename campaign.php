<?php
require_once 'config/functions.php';
/*if($functions->data_saving_mode_is_enabled())
 {
     header('location: /browser');
 }
*/
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
    <link rel="icon" type="image/jpeg" href="<?php echo $website_details->IMG_FOLDER;?>favicon.png" />
    <meta name="robot" content="index, follow" />

        <?php
        require_once $website_details->INCS_FOLDER.'head-files.php';
        $stylesheets = array('admin.css' , 'campaign.css'  ,  'main.css'  , 'merchant.css'  , 'footer.css' , 'tour.css');
        echo $functions->printAssets($stylesheets , 'css' , false);
        echo $paystack = $website_details->is_production_mode() ? "<script crossorigin = 'https://js.paystack.co/v1/inline.js'></script>" : $functions->printAssets(['paystack.js']);

        ?>
</head>
<body id = 'particles-js' class='lazyloads'  data-bgset="<?php echo $website_details->IMG_FOLDER.'campaign-background.jpg'; ?>">
<div>

<main id='app' class = 'main-container invisible-class' data-referer = '<?php echo isset($_GET['r']) ?  $_GET['r'] : null; ?>'>

            </main>
       </div>

<div class="tourJS">
<div class="overlay-effect"></div>
<div class="tourJS-tooltip">
    <span class="tourJS-caption-text"></span>
    <a class="tourJS-next-tooltip">Next</a>
    <a class="tourJS-progress"><span class="tourJS-current-progress">1</span>&nbsp;/&nbsp;<span class="tourJS-total-progress">4</span></a>
</div>
</div>

 <?php
 $scripts = array('cookie.min.js'   , 'timeago.min.js' , 'bgset.min.js' ,'lazy-bg.min.js' , 'tour.js' , 'notify.min.js' , 'particles.js' , 'app.js');
 $components = array('defaults.js'  , 'footer.js' , 'campaign.js' ,'merchant-header.js' ,  'merchant-plugs.js' , 'merchant.js' ,'affiliate-header.js', 'affiliate.js' , 'admin.js' , 'campaign-settings.js');
 $jquery_validate = array('jquery.validate.js');
 echo $functions->printAssets($scripts  , null , true).$functions->printAssets($components , 'babel' , true , $functions->is_production_mode() ? $website_details->COMPONENTS_FOLDER : $website_details->SRC_FOLDER).$functions->printAssets($jquery_validate , 'javascript' , true);

?>

</body>
</html>