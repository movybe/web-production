<?php

abstract class WebsiteConfigurationSettings {

    
	public  $SiteName = "Movybe";
	public  $Https = "https://";
	public  $Www = "www.";
	public  $SiteNameWithoutHttps = "www.movybe.com";
	public  $SiteNameWithHttps = "";
    public  $FacebookUrl = "";
    public  $TwitterUrl  = "";
    public  $InstagramUrl = "";
    public  $SiteAuthor = "Kosi Eric";
    public  $WebsiteCategory = "Search Engine";
    public  $TwitterHandle = "";
    public  $FacebookHandle = "";
    public  $InstagramHandle = "";
    public  $MaximumUserProfileImageSize = 50000000;
    public  $MaximumUserProfileImageSizeInWords = "";
    public  $WebsiteCoverage = "Worldwide";
    public  $WebsiteSubject = "Search Engine";
    public  $WebsiteClassification = "Search";
    public  $DOCUMENT_ROOT;
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
    public  $ErrorPage = "/404.php";
    public  $PageDescription = "Find the price of anything.anywhere";
    public  $ParentCompanyName = "Movybe Inc.";
    public  $ParentCompanyAddress = "/";

    abstract function setPageTitleDescriptionKeywords(string  $title, string $description , string $keywords);

    public function __construct() {
        $this->DOCUMENT_ROOT = $_SERVER['DOCUMENT_ROOT'];
        $this->STATIC_FOLDER = "/assets/";
        $this->JS_FOLDER = $this->STATIC_FOLDER."js/";
        $this->CSS_FOLDER = $this->STATIC_FOLDER."css/";
        $this->INCS_FOLDER = $_SERVER['DOCUMENT_ROOT'].$this->STATIC_FOLDER."incs/";
        $this->IMG_FOLDER = $this->STATIC_FOLDER."img/";
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
        $this->DefaultAdminUserID = "Jvli";
        $this->defaultBotProfilePicture = $this->IMG_FOLDER.'spider.png';
        $this->AboutUs = <<<AboutUs
<p>
                                       Search the price of anything.  

                                    </p>
                                   
AboutUs;


}

}

class WebsiteDetails extends WebsiteConfigurationSettings {

    function setPageTitleDescriptionKeywords(string $title, string $description, string $keywords)
    {
        // TODO: Implement setPageTitleDescriptionKeywords() method.
    }


}

$website_details = new WebsiteDetails();



?>