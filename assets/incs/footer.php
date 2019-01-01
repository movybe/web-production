<footer class="blue-grey darken-2 " id="site-footer">
    <div class="container">
        <div class="row">
        </div>    </div>
    <div class="footer-copyright">
        <div class="container">
            <span class="white-text">A property of </span> <a class="orange-text text-lighten-3" href="/"><?php echo $website_details->ParentCompanyName; ?></a><span class="white-text"> [NG]</span>
        </div>
    </div>
</footer>
<!--  Scripts-->
<?php


$scripts = array("cookie.min.js" , "request.js" , "jquery.min.js" , "bgset.min.js" ,"lazy-bg.js" , "materialize.min.js" , "defaults.js" , "test.js" , "jquery.lightbox.js");


echo $functions->printAssets($scripts);

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

$scripts = array( "gallery.js" , "search-tabs.js" , "application.js" , "config.js");
echo $functions->printAssets($scripts , "babel");
?>