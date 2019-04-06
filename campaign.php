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
        $stylesheets = array('admin.css' , 'campaign.css'  ,  'main.css'  , 'merchant.css'  , 'footer.css');
        echo $functions->printAssets($stylesheets , 'css' , false);
        echo $paystack = $website_details->is_production_mode() ? "<script crossorigin = 'https://js.paystack.co/v1/inline.js'></script>" : $functions->printAssets(['paystack.js']);

        ?>
</head>
<body id = 'particles-js' class='lazyloads'  data-bgset="<?php echo $website_details->IMG_FOLDER.'campaign-background.jpg'; ?>">
<div>

<main id='app' data-referer = '<?php echo isset($_GET['r']) ?  $_GET['r'] : null; ?>'>

            </main>
       </div>


 <?php
 $scripts = array('cookie.min.js'   , 'timeago.min.js' , 'bgset.min.js' ,'lazy-bg.min.js' , "notify.min.js" ,  'defaults.js' , 'particles.js' , 'app.js');
 $components = array('footer.js' , 'campaign.js' ,'merchant-header.js' ,  'merchant-ads.js' , 'merchant.js' ,'affiliate-header.js', 'affiliate.js' , 'admin.js' , 'campaign-settings.js');
 $jquery_validate = array('jquery.validate.js');
 echo $functions->printAssets($scripts  , null , true).$functions->printAssets($components , 'babel' , true , $website_details->COMPONENTS_FOLDER).$functions->printAssets($jquery_validate , 'javascript' , true);

?>

</body>
</html>