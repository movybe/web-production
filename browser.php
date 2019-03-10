<?php
require_once 'config/functions.php';
?>
<!DOCTYPE html>
<html lang="en-us" dir="ltr">
<head>
    <meta charset="utf-8" />
    <meta name="author" content="<?php echo $website_details->SiteName; ?>" />
    <meta name="description" content="<?php echo $website_details->PageDescription; ?>" />
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
    <title><?php $title = $website_details->SiteName." • ";
        $title.= $functions->data_saving_mode_is_enabled() ? "disable data-saving mode" : "old browser Detected";
        echo $title;?></title>
    <link rel="canonical" href="<?php echo $website_details->SiteNameWithHttps; ?>" />
    <meta name="robot" content="index, follow" />
    <?php

    $css = array('browser.css' , 'cairo.css');
    echo $bootsrap = !$functions->is_production_mode() ? "<link rel='stylesheet' href= 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css' />" : $functions->printAssets(['bootstrap.min.css'] , 'css'  , false);
    echo $functions->printAssets($css , 'css' , false);
    ?>
    <link rel="icon" type="image/jpeg" href="<?php echo $website_details->IMG_FOLDER;?>favicon.jpg" />
</head>
<body id = "particles-js" class="lazyloads"  data-bgset="<?php echo $website_details->IMG_FOLDER.'campaign-background.jpg'?>">
<?php

$browser_warning = <<<BROWSER_WARNING
<div class="grid-tools FullSite">
    <div class="container">
        <div class="container-wrapper">
            <div class="container-full-column">
                <div class="unsupported-browser">

                    <h1>Please upgrade your browser in order to use {$website_details->SiteName}</h1>
                    <p>We built {$website_details->SiteName} using the latest technology which improves the look of the site, increases the speed of the site, and gives you a better experience with new features and functions. Unfortunately, your browser does not support these technologies.</p>
                    <h2>Please download one of these free and up-to-date browsers:</h2>

                    <span class="browser-links"><img  src="{$website_details->IMG_FOLDER}firefox.png" class="img-responsive browsers" /><span class="browser-names">Firefox</span></span>
                    <span class="browser-links" ><img src="{$website_details->IMG_FOLDER}google-chrome.png" class="img-responsive browsers" /><span class="browser-names">Google Chrome</span></span>
                    <span class="browser-links" ><img src="{$website_details->IMG_FOLDER}edge.png" class="img-responsive browsers " /><span class="browser-names" id="edge-browser-name">Microsoft Edge</span></span>
                    <span class="browser-links" ><img src="{$website_details->IMG_FOLDER}brave.png" class="img-responsive browsers" /><span class="browser-names">Brave Browser</span></span>
                    <hr>
                    <div class="unsupported-message">
                        <h3>I can't update my browser</h3>
                        <ul>
                            <li>Ask your system administrator to update your browser if you cannot install updates yourself.</li>
                            <li>If you can't change your browser because of compatibility issues, think about installing a second browser for utilization of this site and keep the old one for compatibility.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
BROWSER_WARNING;

$data_saving_warning = <<<DATA_SAVING_WARNING
<div class="grid-tools FullSite">
    <div class="container">
        <div class="container-wrapper">
            <div class="container-full-column">
                <div class="unsupported-browser">

                    <h1>Please disable data-saving mode in order to use {$website_details->SiteName}</h1>
                    <p>We built {$website_details->SiteName} using the latest technology which improves the look of the site, increases the speed of the site, and gives you a better experience with new features and functions. Unfortunately, your browser is currently set to data-saving mode which does not support these technologies.</p>
                    <h2>If you're still been redirected to this page, try to download one of these free and up-to-date browsers:</h2>

                    <span class="browser-links"><img  src="{$website_details->IMG_FOLDER}firefox.png" class="img-responsive browsers" /><span class="browser-names">Firefox</span></span>
                    <span class="browser-links" ><img src="{$website_details->IMG_FOLDER}google-chrome.png" class="img-responsive browsers" /><span class="browser-names">Google Chrome</span></span>
                    <span class="browser-links" ><img src="{$website_details->IMG_FOLDER}edge.png" class="img-responsive browsers " /><span class="browser-names" id="edge-browser-name">Microsoft Edge</span></span>
                    <span class="browser-links" ><img src="{$website_details->IMG_FOLDER}explorer.png" class="img-responsive browsers" /><span class="browser-names">Internet Explorer</span></span>
                    <hr>
                    <div class="unsupported-message">
                        <h3>I can't disable data-saving mode on my browser</h3>
                        <ul>
                            <li>Ask your system administrator to update your browser if you cannot disable it yourself.</li>
                            <li>If you can't change your browser because of compatibility issues, think about installing a second browser for utilization of this site and keep the old one for compatibility.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
DATA_SAVING_WARNING;


/*
* This is PHP Code
* will not work on clicking "Run Code Snippet"
* Host this code on php server as .php file
*/

echo $functions->data_saving_mode_is_enabled() ? $data_saving_warning : $browser_warning;
?>

</body>
</html>