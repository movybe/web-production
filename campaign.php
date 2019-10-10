<?php
require_once 'config/functions.php';
/*if($functions->data_saving_mode_is_enabled())
 {
     header('location: /browser');
 }
*/
 //$functions->try_insert_or_update_ip_address_in_database();
//echo $functions->send_payment_email(20000 , "Kosi Eric");
$page_description = "{$website_details->SiteName} Campaign is the easiest way to advertise your products/Services in Nigeria, with our affiliate, you also can make money in Nigeria, from the comfort of your home.";
$page_title = "{$website_details->SiteName} Ads • Get More Customers With Easy Online Advertising";
$try_insert_or_update_ip_address_in_database = $functions->is_production_mode() ?$functions->try_insert_or_update_ip_address_in_database() : null;
$random_referrers  = ["amily" , "hilltop"];
$current_referrer = $functions->fetch_data_from_table($functions->site_statistics_table_name , 'id' , 1)[0]['last_admin_referrer'];
$next_referrer = $random_referrers[$current_referrer === $random_referrers[0] ? 1 : 0];
//echo $functions->fetch_data_from_table($functions->users_table_name , 'username' , 'yvngkvng')[0]['trial'];
?>
<!DOCTYPE html>
<html lang="en-us" dir="ltr">
<head>
    <meta content="<?php echo $page_title; ?>" property="og:title" />
    <meta content="<?php echo $page_description; ?>" property="og:description" />
    <meta name="description" content="<?php echo $page_description;?>" />
    <title><?php echo $page_title;?></title>
        <?php
        require_once $website_details->INCS_FOLDER.'head-files.php';
        $stylesheets = array('admin.css' , 'campaign.css'  ,  'main.css'  , 'merchant.css'  , 'footer.css' , 'tour.css','jquery.progressbar.css');
        echo $functions->printAssets($stylesheets , 'css' , false);
        $scripts = array('cookie.min.js'   , 'timeago.min.js' , 'bgset.min.js' ,'lazy-bg.min.js' , 'tour.js' , 'notify.min.js' , 'jquery.progressbar.js', 'jquery.form.js');
        $components = array('defaults.min.js'  , 'footer.min.js' , 'campaign.min.js' ,'merchant-header.min.js' ,  'merchant-plugs.min.js' , 'merchant.min.js' ,'affiliate-header.min.js', 'affiliate.min.js' , 'admin.min.js' , 'campaign-settings.min.js');
        $jquery_validate = array('jquery.validate.js');
        echo $functions->printAssets($scripts  , null , true).$functions->printAssets($components , 'babel' , true , $functions->is_production_mode() ? $website_details->COMPONENTS_FOLDER : $website_details->SRC_FOLDER).$functions->printAssets($jquery_validate , 'javascript' , true);
        ?>
</head>
<body   data-bgset="<?php echo $website_details->IMG_FOLDER.'campaign-background.jpg'; ?>">

<div>
    <main  data-is-referral-link = "<?php echo (isset($_GET['r']) && !empty($_GET['r']))?  '1' :  '0';?>" data-next-referrer = "<?php echo $next_referrer; ?>"  id='app' class = 'main-container <?php //invisible-class ?>' data-referrer = '<?php echo isset($_GET['r']) ?  $_GET['r'] : $next_referrer; ?>'>

    </main>
    <!--div class='form-progress' id="ad-form-progress">
        <span class='form-progress' id="ad-form-percent">30%</span>
        <div class='form-progress' id="ad-form-bar"></div>
    </div -->
    <div class="progress-bar" data-percent="100" data-duration="1000" data-color="#ccc,yellow"></div>
</div>
<div class="tourJS">
<div class="overlay-effect"></div>
<div class="tourJS-tooltip">
    <span class="tourJS-caption-text"></span>
    <a class="tourJS-next-tooltip">Next</a>
    <a class="tourJS-progress"><span class="tourJS-current-progress">1</span>&nbsp;/&nbsp;<span class="tourJS-total-progress">4</span></a>
    <a class="tourJS-close" href = "#">Close</a>
</div>
</div>
<button onclick="topFunction()" id="top-btn" title="Go to top"><i class="material-icons">arrow_upward</i></button>

<script>
    mybutton = document.getElementById("top-btn");

    // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = function() {scrollFunction()};

    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            mybutton.style.display = "block";
        } else {
            mybutton.style.display = "none";
        }
    }

    // When the user clicks on the button, scroll to the top of the document
    function topFunction() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }
</script>

</body>
</html>