<footer class="blue-grey darken-2 " id="site-footer">
    <div class="container">
        <div class="row">
        </div>    </div>
    <div class="footer-copyright">
        <div class="container">
            <span class="white-text">A property of </span> <a class="orange-text text-lighten-3" href="/"><?php echo $website_details->ParentCompanyName; ?></a><span class="white-text"></span>
        </div>
    </div>
</footer>
<!--  Scripts-->
<?php

$includes = array("polyfill.js" , "cookie.min.js" , "bgset.min.js" , "lazy-bg.min.js" ,  "notify.min.js" , "jquery.lightbox.min.js"  ,"numeral.min.js");
$defaults_js = array("defaults.js");
echo $functions->printAssets($includes).$functions->printAssets($defaults_js , 'babel' , true , $functions->is_production_mode() ? $website_details->COMPONENTS_FOLDER : $website_details->SRC_FOLDER , $website_details->cdn_components);
?>
<script async>
    $(function()
    {
        $('.gallery span.modal-link').lightbox();
        $('.gallery-2 span.gallery-images-link').lightbox();
        // If you want seperate galleries on the same page
        // just specify different class names.
        //$('.gallery-2 a').lightbox();

    });

</script>
<?php

$scripts = array("gallery.js" , "search-tabs.js" ,  "application.js" , "config.js");
echo  $functions->printAssets($scripts , 'babel' , true , $functions->is_production_mode() ? $website_details->COMPONENTS_FOLDER  : $website_details->SRC_FOLDER , null , $website_details->cdn_components);
?>