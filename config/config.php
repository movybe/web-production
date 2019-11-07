<?php
class WebsiteConfigurationSettings {
    public
    $cdn_assets , $cdn_css , $cdn_img , $cdn_js , $cdn_components, $SiteName,
    $Https = "https://",$Www = "www.",$SiteNameWithoutHttps = "www.movybe.com", $SiteNameWithHttps = "", $siteNameLowercase, $FacebookUrl = "",
    $TwitterUrl  = "",$InstagramUrl = "", $YouTubeUrl = "" , $YouTubeHandle = "" , $campaignPage = "/campaign",  $SiteAuthor = "Kosi Eric", $WebsiteCategory = "Price Search Engine", $TwitterHandle = "", $FacebookHandle = "",
    $InstagramHandle = "",$MaximumUserProfileImageSize = 50000000, $MaximumUserProfileImageSizeInWords = "", $WebsiteCoverage = "Nigeria",
    $WebsiteSubject = "Search the Price of Products in Nigeria", $WebsiteClassification = "Search", $DOCUMENT_ROOT, $LinkShortUrlLength = 5,
    $NumberOfSponsoredAdsToShow = 1, $STATIC_FOLDER, $JS_FOLDER, $CSS_FOLDER, $INCS_FOLDER, $IMG_FOLDER, $AboutUs, 
    $PrimaryEmailServer = "smtp.gmail.com", $PrimaryEmail = "itskosieric@gmail.com", $MessageEmail = "movybedotcom@gmail.com",
    $MessageEmailPassword = '4mdcfohb', $PrimaryEmailPassword = 'Twisttr@p1', $ContactEmaiFl, $BANNER_IMAGES_FOLDER,
    $ErrorPage = "/404.php", $PageDescription = "Search the Price of Products in Nigeria", $ParentCompanyName,
    $ParentCompanyAddress = "/", $maxNumberOfSuggestion = 5, $COMPONENTS_FOLDER , $SRC_FOLDER = null,
    $MerchantAccountType = "merchant", $UserIdLength = 6, $ad_cache_days = 7, $subscriptionDurationInDays = 7, $minimumEarningExpected = 2500,
    $affiliateSignupFee = 500, $invitation_amount_to_pay_per_account_renewal = 300, /*Profit 0 Naira */ $siteAffiliateSignupFee = 0, $amountPaidToAffiliateForReferer = 500, $withdrawalReferenceCodeLength = 8,
    $maximumNumberOfInvitesForADay = 500, $amountPaidForInvite = 0.5, $maximumNumberOfAffiliateInvitationsForADay = 5 , $send_withdrawal_request_to = 'movybedotcom@gmail.com',
    $transactionTypes = [
        'payment' => ['type' => 'paid' , 'action' => 'paid'] ,
        'transfer' => ['type' => 'transfer' , 'action' => 'transferred'],
        'receive' => ['type' => 'receive' , 'action' => 'received']
    ], $ip_url = "http://ip-api.com/json/";
    
    function setPageTitleDescriptionKeywords(string  $title, string $description , string $keywords){}
    final public function is_production_mode () : bool
    {
        $server_name = $_SERVER['SERVER_NAME'];
        return $is_production_mode = $server_name !== 'localhost';
    }

    public final function getFileLocation(string $filename) : string
    {
        return $this->is_production_mode() ? "/{$this->siteNameLowercase}/{$filename}" : "/".$filename;
    }
    public function __construct() {
        //movybe
        $this->SiteName = 'Movybe';
        $this->siteNameLowercase = strtolower($this->SiteName);
        $this->ParentCompanyName = $this->SiteName.' Studios';
        $this->DOCUMENT_ROOT = $_SERVER['DOCUMENT_ROOT'];
        $this->STATIC_FOLDER = $this->getFileLocation("assets/");
        $this->JS_FOLDER = $this->STATIC_FOLDER."js/";
        $this->CSS_FOLDER = $this->is_production_mode() ? $this->STATIC_FOLDER."css-dist/" : $this->STATIC_FOLDER."css/";
        $this->INCS_FOLDER = $this->is_production_mode() ? $this->DOCUMENT_ROOT."/".$this->siteNameLowercase."/assets/incs/" : $this->DOCUMENT_ROOT."/assets/incs/";
        $this->BANNER_IMAGES_FOLDER = $this->DOCUMENT_ROOT."/banner/";
        $this->IMG_FOLDER =   $this->STATIC_FOLDER."img/";
        $this->SiteNameWithHttps = "https://{$this->SiteNameWithoutHttps}";
        $this->FacebookUrl = "{$this->Https}{$this->Www}facebook.com";
        $this->TwitterUrl = "{$this->Https}{$this->Www}twitter.com";
        $this->InstagramUrl = "{$this->Https}{$this->Www}instagram.com";
        $this->YouTubeUrl = "{$this->Https}{$this->Www}youtube.com/user";
        $this->FacebookHandle = "{$this->FacebookUrl}/{$this->siteNameLowercase}";
        $this->TwitterHandle = "{$this->TwitterUrl}/{$this->siteNameLowercase}";
        $this->InstagramHandle = "{$this->InstagramUrl}/{$this->siteNameLowercase}";
        $this->YouTubeHandle = "{$this->YouTubeUrl}/{$this->siteNameLowercase}";
        $this->HeadOffice = "SUITE 7, TOWER 5, BARBEACH TOWERS, VICTORIA ISLAND LAGOS.";
        $this->MaximumUserProfileImageSizeInWords = strval($this->MaximumUserProfileImageSize / 10). "mb";
        $this->ContactEmail  = 'contact@'.$this->SiteName;
        $this->COMPONENTS_FOLDER = $this->STATIC_FOLDER."components/";
        $this->SRC_FOLDER = $this->STATIC_FOLDER."src/";
        $this->AD_ID_LENGTH = 7;
        $this->AboutUs = <<<AboutUs
<p>Search the Price of Products in Nigeria.</p>
AboutUs;
    }
}
class WebsiteDetails extends WebsiteConfigurationSettings {
    function setPageTitleDescriptionKeywords(string $title, string $description, string $keywords)
    {
        // TODO: Implement setPageTitleDescriptionKeywords() method.
    }
    public function __construct()
    {
        parent::__construct();
    }
}

$website_details = new WebsiteDetails();
?>