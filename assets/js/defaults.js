


//Check for old browsers
if(!(window.localStorage && window.Blob && window.FileReader))
{

    window.location.href = '/browser';

}

String.prototype.truncate = String.prototype.trunc ||
    function(n){
        return this.length>n ? this.substr(0,n-1)+'...' : this.toString();
    };
function useStrict() {
    'use strict';
}
if (typeof Array.isArray === 'undefined') {
    Array.isArray = function(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    }
}
let searchResults = '-search-results';
useStrict();

/*
The function below i.e String.format works like this:
var sentence = String.format('My name is {0} i am a {1} from {2} and i am {} years old' , 'Kosi Eric' , 'Programmer' , 'Nigeria' , 19);
console.log(sentence)


//prints
My name is Kosi Eric i am a programmer from Nigeria and i am 20 years old;

*/


String.format = String.format ||
    function(format) {
        var args = Array.prototype.slice.call(arguments, 1);
        return format.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match
                ;
        });
    };

$(document).ready (function () {

    let dataSavingsInfo = $('#data-savings-info');

    $('.tap-target').tapTarget();

    dataSavingsInfo.on('click' , function () {


        $('.tap-target').tapTarget('open');

    });
});



class Defaults {

    constructor () {

        this.whatsappContact = '+234 708 441 9530';
        this.siteName = 'Movybe';
        this.siteOwner = 'Movybe Inc.';
        this.whatsappContactLink = `https://wa.me/${this.whatsappContact.replace(/ /g,'')}?text=Hello%20${this.siteName}`;
        this.imageDirectory = '/assets/img/';
        this.processorsFolder = '/processors/';
        this.queryProcessor = this.processorsFolder + 'query.php';
        this.crawler = this.processorsFolder + 'crawler.php';
        this.suggestions = this.processorsFolder + 'suggestions.php';
        this.handleAdForm = this.processorsFolder + 'handle-ad-form.php';
        this.commonWords = ['what','is','the','price','of','how','much','does','cost','costs','what','why','when','who','it','buy','sell','sells'];
        this.maxTitleLength = 60;
        this.maxDescriptionLength = 160;
        this.maxLinkLength = 45;
        this.merchantActivationFee = 700;
        this.adListTitleLength = 20;
        this.accountNameLengthToShow = 10;
        this.searchResultPreloaders = 'search-result-preloaders';
        this.searchResultPreloader = 'search-result-preloader';
        this.websiteLiLinks = 'website-li-links';
        this.liLink = 'li-link';
        this.noDataError = 'Failed to load data';
        this.networkError = 'No Results found for this query, check your connection';
        this.noMoreResultsFoundError = 'no more results found';
        this.savedState = 'savedState';
        this.checkNetworkConnectionError = 'check your network connection';
        this.savedCampaignState = 'savedCampaignState';
        this.localSearchCookieKey = 'localSearch';
        this.showImagesCookieKey = 'showImages';
        this.lazyBG = '/assets/js/lazy-bg.js';
        this.noResultsFoundError = 'no results found';
        this.pleaseWaitText = 'Please wait...';
        this.searchSuggestionsLimit = 7;
        this.bannerImageLocation = '/banners/';
        this.siteAddress = this.siteName.toLowerCase() + '.com';
        this.siteAddressHttp = 'http://' + this.siteAddress;
        this.siteAddressHttps = 'https://' + this.siteAddress;
        this.merchantAccountType = 'merchant';
        this.withdrawalCharge = 100;
        this.enterNewRefererUsernameMessage = 'This user had previously referred you, enter a new username';
        this.memberAccountType = 'member';
        this.disabledTrue = ['disabled' , true];
        this.disabledFalse = ['disabled' , false];
        this.actions = this.processorsFolder + 'actions.php';
        this.numberOfAdSpaceForMerchant = [0 , 1];
        this.numberOfAdSpaceForOmoba = [0 , 1 , 2 , 3 , 5];
        this.minimumAffliateProfit = 5000;
        this.minimumAccountUsernameLength = 5;
        this.maximumAccountUsernameLength = 12;
        this.amountPaidForReferer = 1400;
        this.amountPaidForUserInteraction = 20;
        this.minimumWithdrawalAmount = 2500;
        this.affiliateIntroductionVideo = 'about:blank';
        this.merchantIntroductionVideo = 'about:blank';
        this.affiliateTourGuide = 'about:blank';
        this.merchantTourGuide = 'about:blank';
        this.amountPaidForUniqueVisitor = 30;
        this.dummyEmail = 'omobang@gmail.com';
        this.thresholdAmount = 5000;
        this.siteEmail = 'omobadotng@gmail.com';
        this.priceNotSpecifiedText = 'price not specified';
        this.transactionNotSuccessfulMessage = 'Transaction not successful';
        this.ensureAllFieldsAreFieldError = 'fill all fields correctly';
        this.banks = ['Access Bank' , 'CitiBank' , 'Coronation Merchant Bank' , 'Diamond Bank' , 'Ecobank Nigeria' , 'Enterprise Bank Limited' , 'FBN Merchant Bank' ,'Fidelity Bank Nigeria',
            'First Bank of Nigeria' , 'First City Monument Bank' , 'FSDH Merchant Bank' , 'Guarantee Trust Bank' , 'Heritage Bank Plc' ,'Jaiz Bank Limited' ,
            'Keystone Bank Limited' , 'Polaris Bank' , 'Providus Bank Plc' ,  'Rand Merchant Bank' , 'Stanbic IBTC Bank Nigeria Limited' , 'Standard Chartered Bank' ,
            'Sterling Bank' , 'Suntrust Bank Nigeria Limited' ,  'Union Bank of Nigeria' , 'United Bank for Africa Plc' , 'Unity Bank Plc' , 'Wema Bank' , 'Zenith Bank'];
        this.paystackKey = 'pk_test_671c2b9a8312b7c29aaed707662496895826855c';
        this.showToast = message => {
            M.toast({html: message});
        };
        this.waitForAdApprovalMessage = 'Your ad, will be approved within 5min.';
       this.emailTruncateSize = 15;

       this.accountActivationText = 'Account activation';
       this.merchantYoutubeVideo = this.demoVideo2;
       this.sponsoredAdText = 'AD';

       this.successText='success';
        this.payWithPaystack = (email , amount , name , call) =>
        {

           // const materializeCss = $('#materialize-css');
           // const bootstrapCss = $('#bootstrap-css');
           // const media = 'screen and (min-width:3000px)';
            //materializeCss.attr('media' , media);
           // bootstrapCss.removeAttr('media');


            const handler = PaystackPop.setup({
                key: this.paystackKey,
                email: email,
                amount,
                currency : 'NGN',
                ref: ''+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
                metadata: {
                    custom_fields: [
                        {
                            display_name: name,
                            variable_name: 'email_address',
                            value: email
                        }
                    ]
                },
                callback: function(response)
                {
                  call(response);
                },
                onClose: function(){
                    window.console.log('window closed');
                }
            });
            handler.openIframe();
        };

        this.convertToPaystack = (naira) =>
        {
            const nairaToKobo = naira * 100;
            const onePoint5Percent = (1.5 / 100) *  nairaToKobo;
            let amount = Number(onePoint5Percent + nairaToKobo);
            amount = Number(amount.toFixed(2));
            return amount;
        };



    }


}


const defaults = new Defaults();


