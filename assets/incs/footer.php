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
<script type="text/javascript" language="JavaScript" src="<?php echo $website_details->JS_FOLDER;?>cookie.min.js"></script>
<script type="text/javascript" language="JavaScript" src="<?php echo $website_details->JS_FOLDER;?>request.js"></script>
<script type="text/javascript" language="JavaScript" src="<?php echo $website_details->JS_FOLDER;?>jquery.min.js"></script>
<script type="text/javascript" language="JavaScript" src="<?php echo $website_details->JS_FOLDER;?>bgset.min.js" async=""></script>
<script type="text/javascript" language="JavaScript" src="<?php echo $website_details->JS_FOLDER;?>lazy-bg.js" async=""></script>
<script type="text/javascript" language="JavaScript" src="<?php echo $website_details->JS_FOLDER;?>materialize.min.js"></script>
<script type="text/javascript" language="JavaScript" src="<?php echo $website_details->JS_FOLDER;?>settings.js"></script>
<script type="text/javascript" language="JavaScript" src="<?php echo $website_details->JS_FOLDER;?>test.js"></script>
<script type="text/javascript"  src="<?php echo $website_details->JS_FOLDER;?>jquery.lightbox.js"></script>
<script async>
    $(function()
    {
        $('.gallery span.modal-link').lightbox();

        // If you want seperate galleries on the same page
        // just specify different class names.
        //$('.gallery-2 a').lightbox();

    });
</script>
<script type="text/babel"  src="<?php echo $website_details->JS_FOLDER;?>gallery.js"></script>
<script type="text/babel" language="JavaScript" src="<?php echo $website_details->JS_FOLDER;?>search-tabs.js"></script>
<script type="text/babel" language="JavaScript" src="<?php echo $website_details->JS_FOLDER;?>application.js"></script>
<script type="text/babel" language="JavaScript" src="<?php echo $website_details->JS_FOLDER;?>config.js"></script>