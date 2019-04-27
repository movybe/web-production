<?php

class WebsiteConfigurationSettings {
    public $cdn , $cdn_assets , $cdn_css , $cdn_img , $cdn_js , $cdn_components;
    public  $SiteName;
	public  $Https = "https://";
	public  $Www = "www.";
	public  $SiteNameWithoutHttps = "www.movybe.com";
	public  $SiteNameWithHttps = "";
	public $siteNameLowercase;
    public  $FacebookUrl = "";
    public  $TwitterUrl  = "";
    public  $InstagramUrl = "";
    public  $SiteAuthor = "Kosi Eric";
    public  $WebsiteCategory = "Price Search Engine";
    public  $TwitterHandle = "";
    public  $FacebookHandle = "";
    public  $InstagramHandle = "";
    public  $MaximumUserProfileImageSize = 50000000;
    public  $MaximumUserProfileImageSizeInWords = "";
    public  $WebsiteCoverage = "Nigeria";
    public  $WebsiteSubject = "Search the Price of Products in Nigeria";
    public  $WebsiteClassification = "Search";
    public  $DOCUMENT_ROOT;
    public  $LinkShortUrlLength = 5;
    public  $NumberOfSponsoredAdsToShow = 1;
    public  $STATIC_FOLDER;
    public  $JS_FOLDER;
    public  $CSS_FOLDER;
    public  $INCS_FOLDER;
    public  $IMG_FOLDER;
    public  $AboutUs;
    public  $PrimaryEmailServer = "smtp.gmail.com";
    public  $PrimaryEmail = "mytwisttr@gmail.com";
    public  $MessageEmail = "mytwisttr@gmail.com";
    public  $MessageEmailPassword = '4mdcfohb';
    public  $PrimaryEmailPassword = '4mdcfohb';
    public  $ContactEmail;
    public  $BANNER_IMAGES_FOLDER;
    public  $ErrorPage = "/404.php";
    public  $PageDescription = "Search the Price of Products in Nigeria";
    public  $ParentCompanyName;
    public  $ParentCompanyAddress = "/";
    public $maxNumberOfSuggestion = 5;
    public $COMPONENTS_FOLDER , $SRC_FOLDER = null;
    public  $MerchantAccountType = "merchant";
    public $UserIdLength = 6;
    public $subscriptionDurationInDays = 30;
    public $minimumEarningExpected = 6500;
    public $affiliateSignupFee = 2100;

    public $siteAffiliateSignupFee = 700;
    public $amountPaidToAffiliateForReferer = 1400;
    public $withdrawalReferenceCodeLength = 8;
    public $affiliateWithdrawalProfit = 45;
    public $maximumNumberOfInvitesForADay = 500;
    public $amountPaidForInvite = 30;
    public $maximumNumberOfAffiliateInvitationsForADay = 5;

    function setPageTitleDescriptionKeywords(string  $title, string $description , string $keywords){}

    final public function is_production_mode () : bool
    {
        $server_name = $_SERVER['SERVER_NAME'];
        return $is_production_mode = $server_name !== 'localhost';
    }

    public final function getFileLocation(string $filename) : string
    {
        return $this->is_production_mode() ? "/{$this->siteNameLowercase}{$filename}" :  $filename;
    }



    public function __construct($latest_commit) {


        //movybe
        $this->SiteName = 'Movybe';
        $this->cdn = "https://rawcdn.githack.com/movybe/web-production/{$latest_commit}/";
        $this->cdn_assets = $this->cdn."assets/";
        $this->cdn_img = $this->cdn_assets."img/";
        $this->cdn_js = $this->cdn_assets."js/";
        $this->cdn_css = $this->cdn_assets."css/";
        $this->cdn_components = $this->cdn_assets."components/";
        $this->siteNameLowercase = strtolower($this->SiteName);
        $this->ParentCompanyName = $this->SiteName.' Studios';
        $this->DOCUMENT_ROOT = $_SERVER['DOCUMENT_ROOT'];
        $this->STATIC_FOLDER = $this->getFileLocation("/assets/");
        $this->JS_FOLDER = $this->STATIC_FOLDER."js/";
        $this->CSS_FOLDER = $this->STATIC_FOLDER."css/";
        $this->INCS_FOLDER = $this->is_production_mode() ? $this->DOCUMENT_ROOT."/".$this->siteNameLowercase."/assets/incs/" : $this->DOCUMENT_ROOT."/assets/incs/";
        $this->BANNER_IMAGES_FOLDER = $this->is_production_mode() ? "{$this->cdn}banner/" :$this->DOCUMENT_ROOT.$this->getFileLocation("/banner/");
        $this->IMG_FOLDER = $this->is_production_mode() ? $this->cdn_img  :$this->STATIC_FOLDER."img/";
        $this->SiteNameWithHttps = "https://{$this->SiteNameWithoutHttps}";
        $this->FacebookUrl = "{$this->Https}{$this->Www}facebook.com";
        $this->TwitterUrl = "{$this->Https}{$this->Www}twitter.com";
        $this->InstagramUrl = "{$this->Https}{$this->Www}instagram.com";
        $this->FacebookHandle = "{$this->FacebookUrl}/{$this->SiteName}";
        $this->TwitterHandle = "{$this->TwitterUrl}/{$this->SiteName}";
        $this->InstagramHandle = "{$this->InstagramUrl}/{$this->SiteName}";
        $this->HeadOffice = "Block 2A , Quarters 3 PH Int'l Airport Omagwa.";
        $this->MaximumUserProfileImageSizeInWords = strval($this->MaximumUserProfileImageSize / 10). "mb";
        $this->ContactEmail  = 'contact@'.$this->SiteName;
        $this->COMPONENTS_FOLDER = $this->STATIC_FOLDER."components/";
        $this->SRC_FOLDER = $this->STATIC_FOLDER."src/";
        $this->AD_ID_LENGTH = 7;

        $this->AboutUs = <<<AboutUs
<p>
                                       Search the Price of Products in Nigeria.  
                                    </p>
                                   
AboutUs;


}

}

class WebsiteDetails extends WebsiteConfigurationSettings {

    function setPageTitleDescriptionKeywords(string $title, string $description, string $keywords)
    {
        // TODO: Implement setPageTitleDescriptionKeywords() method.
    }

    public function __construct($latest_commit)
    {

        parent::__construct($latest_commit);
    }

}


$website_details = new WebsiteDetails("450d2fa385e6b18cbfd4cb65a89c0b5b8e2a3309");



?>