<?php
require_once 'config/functions.php';

/*
if($functions->data_saving_mode_is_enabled())
{
    header('location: /browser');
}
*/
//$try_insert_or_update_ip_address_in_database = $functions->is_production_mode() ?$functions->try_insert_or_update_ip_address_in_database() : null;
?>
<!DOCTYPE html>
<html lang="en-us" dir="ltr">
<head>
    <meta content="<?php echo $website_details->WebsiteSubject;?>" property="og:title">
    <meta content="<?php echo $website_details->PageDescription; ?>" property="og:description">
    <meta name="description" content="<?php echo $website_details->PageDescription; ?>" />
    <link rel="manifest" href="/manifest.json?last_modified=October 05 2019 01:00:00 AM" />
    <link rel="manifest" href="/manifest.webmanifest?last_modified=October 05 2019 01:00:00 AM" />
    <meta name="theme-color" content="#2299dd">
    <meta name="msapplication-TileColor" content="#2299dd">
    <meta name="msapplication-navbutton-color" content="#2299dd">
    <meta name="apple-mobile-web-app-status-bar-style" content="#2299dd">
    <title><?php echo $website_details->SiteName; ?> • <?php echo $website_details->WebsiteSubject; ?></title>
    <?php require_once $website_details->INCS_FOLDER.'head-files.php'; ?>
    <?php
    $includes = array('polyfill.js', 'cookie.min.js', 'bgset.min.js', 'timeago.min.js', 'lazy-bg.min.js',  'notify.min.js', 'jquery.lightbox.min.js', 'numeral.min.js', 'jquery.history.min.js');
    $defaults_js = array('defaults.min.js');
    echo $functions->printAssets($includes ,'javascript' , true , null).$functions->printAssets($defaults_js , 'babel' , true , $functions->is_production_mode() ? $website_details->COMPONENTS_FOLDER : $website_details->SRC_FOLDER);
    ?>
    <?php
    $scripts = array('syllables.min.js', 'gallery.min.js', 'search-tabs.min.js',  'application.min.js', 'config.min.js');
    echo  $functions->printAssets($scripts , 'babel' , true , $functions->is_production_mode() ? $website_details->COMPONENTS_FOLDER  : $website_details->SRC_FOLDER);
    ?>
</head>
<body>
<div id="fb-root"></div>
<script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v5.0&appId=596431570766760&autoLogAppEvents=1"></script>
<div class="progress progress-bar">
    <div class="determinate" style="width: 70%"></div>
</div>
<main class ="container <?php //invisible-class ?> main-container">

    <span className ='stored-timestamp' style="display: none;"></span>
    <div class ="section no-pad-bot" id="index-banner">

        <div class="container">
            <br><br>
            <h6 class="header center pink-text text-lighten-3">
                <img data-src="<?php echo $website_details->IMG_FOLDER.strtolower($website_details->SiteName);?>-png.png?last_modified=October 05 2019 01:00:00 AM" class="responsive-img brand-logo logo-image lazyload" width="220" height="81" alt = "<?php echo $website_details->SiteName." logo"?>" />
            </h6>
            <div class="row center hide">
                <h5 class="header col s12 light grey-text text-lighten-1"><?php echo $website_details->PageDescription; ?></h5>
            </div>
        </div>
    </div>
    <div id="form-container"></div>
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
<p id = "error-message"></p>
<?php // require_once $website_details->INCS_FOLDER.'footer.php'; ?>
</body>
<script>
    if ('serviceWorker' in navigator) {
       // console.log("Will the service worker register?");
        navigator.serviceWorker.register('service-worker.js')
            .then(function(reg){
                //console.log("Yes, it did.");
            }).catch(function(err) {
            //console.log("No it didn't. This happened:", err)
        });
    }
</script>
</html>

