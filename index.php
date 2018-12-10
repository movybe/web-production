<?php
require_once $_SERVER['DOCUMENT_ROOT'].'/config/functions.php';
?>
<!DOCTYPE html>
<html lang="en-us" dir="ltr">
<head>
    <meta charset="utf-8" />
    <meta name="auto" content="<?php echo $website_details->SiteAuthor; ?>" />
    <meta name="description" content="<?php echo $website_details->PageDescription; ?>" />
    <title><?php echo $website_details->SiteName; ?> • Free price search engine</title>
    <link rel="canonical" href="<?php echo $website_details->SiteNameWithHttps; ?>" />
    <meta name="robot" content="index, follow" />

    <link rel="stylesheet" href="<?php echo $website_details->CSS_FOLDER;?>materialize.min.css" type="text/css" />
    <link rel="stylesheet" href="<?php echo $website_details->CSS_FOLDER;?>material-icons.css" type="text/css" />
    <link rel="stylesheet" href="<?php echo $website_details->CSS_FOLDER;?>main.css" type="text/css" />
    <link rel="stylesheet" href="<?php echo $website_details->CSS_FOLDER;?>footer.css" type="text/css" />
    <link rel="icon" type="image/png" href="<?php echo $website_details->IMG_FOLDER;?>m.png" />
    <script type="text/javascript" language="JavaScript" src="<?php echo $website_details->JS_FOLDER;?>babel.min.js"></script>
    <script type="text/javascript" language="JavaScript" src="<?php echo $website_details->JS_FOLDER;?>react.development.js"></script>
    <script type="text/javascript" language="JavaScript" src="<?php echo $website_details->JS_FOLDER;?>react-dom.development.js"></script>

</head>
<body>
<main class ="container">
    <div class ="section no-pad-bot" id="index-banner">
        <div class="container">
            <br><br>
            <h1 class="header center pink-text text-lighten-3"><img src="<?php echo $website_details->IMG_FOLDER;?>movybe.png" class="responsive-img brand-logo logo-image" /></h1>
            <div class="row center">
                <h5 class="header col s12 light grey-text text-lighten-1"><?php echo $website_details->PageDescription; ?></h5>
            </div>
        </div>
    </div>
    <div id="form-container">

    </div>

<!--



<div id = {local.shortName + "-search-result"} className = "search-results">


    <h5 className="green-text search-result-price">N1000</h5>

    <h3 className="search-result-title-header"><a className="search-result-title-link"
                                                  href="https://divisoup.com/f13-archive-search-results-page-styling/">
        Archive & Search Results Page Styling | Divi Soup
    </a></h3>
    <a className="search-result-link-address"
       href="https://divisoup.com/f13-archive-search-results-page-styling/">
        https://divisoup.com/f13-archive-search-results-page-styling/
    </a>
    <span className="search-result-link-description">
     I have created a page template with a nice layout using the lovely .... In order to have a custom layout for my search results I changed the ...
</span>
    <span className="search-result-images blue-text"><i className="tiny material-icons search-image-icons">image</i> View Image</span>

    <span className="search-result-locations blue-grey-text"><i className="tiny material-icons search-location-icons">location_on</i> Port Harcourt, Nigeria</span>


    <h5 className="green-text search-result-price">N1000</h5>
    <h3 className="search-result-title-header"><a className="search-result-title-link" href="https://divisoup.com/f13-archive-search-results-page-styling/">
        Archive & Search Results Page Styling | Divi Soup
    </a></h3>
    <a className="search-result-link-address"
       href="https://divisoup.com/f13-archive-search-results-page-styling/">
        https://divisoup.com/f13-archive-search-results-page-styling/
    </a>
    <span className="search-result-link-description">
     I have created a page template with a nice layout using the lovely .... In order to have a custom layout for my search results I changed the ...
</span>
    <span className="search-result-images blue-text"><i className="tiny material-icons search-image-icons">image</i> View Image</span>
    <span className="search-result-locations blue-grey-text"><i className="tiny material-icons search-location-icons">location_on</i> Port Harcourt, Nigeria</span>
</div>
    -->




</main>


<?php require_once $website_details->INCS_FOLDER.'footer.php'; ?>

</body>
</html>


