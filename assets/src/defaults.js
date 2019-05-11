const isHomePage = window.location.pathname === '/';
const isCampaignPage = window.location.pathname === '/campaign';
const browserName = function () {
    let userAgent = navigator.userAgent, tem, M = userAgent.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(userAgent) || [];
        //return 'IE ' + (tem[1] || '');
        return { name: 'IE ', version: (tem[1] || '') };
    }

    if (M[1] === 'Chrome') {
        tem = userAgent.match(/\bOPR\/(\d+)/);
        //if (tem != null) return 'Opera ' + tem[1];
        if (tem != null) { return { name: 'Opera', version: tem[1] }; }
    }

    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];

    if ((tem = userAgent.match(/version\/(\d+)/i)) != null) {
        M.splice(1, 1, tem[1]);
    }
    return M[0]; //M.join(' ');
};

//Handle errors

let errorMessage = "";
/*
window.onerror= function(msg, url, linenumber) {
    errorMessage =  `Error message: ${msg} <br />URL: ${url}<br />Line Number: ${linenumber}`;
    document.getElementById('error-message').innerHTML += errorMessage;
    return true;
};
*/

//Check for mobile devices
const isMobile = function() {
    return /Mobi/i.test(navigator.userAgent) || /Android/i.test(navigator.userAgent);
};
const notifyPosition = isCampaignPage || isHomePage ? $.notify.defaults({position:'left top' , autoHideDelay: 10000}) : undefined;

//Check for old browsers
window.onload = function () {
    if (!(window.localStorage && window.Blob && window.FileReader) && (isHomePage || isCampaignPage)) {

        $.notify("Try disable data-saving mode or upgrade your ".concat(browserName(), " browser").concat(browserName(), "."), 'info');
    }
    //Operamini browsers fail to render the components, there prompting opera mini users to consider using another browser
    /*
    else if (isMobile() && window.operamini) {
        $.notify('Try upgrade Your Opera browser might not be compatible with this website', 'info');
    }
    */
};

//Add truncate() method to strings
String.prototype.truncate = String.prototype.trunc ||
    function(n){
        return this.length>n ? this.substr(0,n-1)+'...' : this.toString();
    };


if (typeof Array.isArray === 'undefined') {
    Array.isArray = function(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    }
}
let searchResults = '-search-results';


//Introduce strict-typing to the application

/*
(function useStrict() {
    'use strict';
})();

The function below i.e String.format works like this:
var sentence = String.format('My name is {0} i am a {1} from {2} and i am {} years old' , 'Kosi Eric' , 'Programmer' , 'Nigeria' , 19);
//console.log(sentence)


//prints
My name is Kosi Eric i am a programmer from Nigeria and i am 20 years old;

*/

//Add format() method to strings
String.prototype.format = String.format ||
    function(format) {
        let args = Array.prototype.slice.call(arguments, 1);
        return format.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] !== 'undefined'
                ? args[number]
                : match
                ;
        });
    };

//Add capitalize() method to strings
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

$(document).ready (function () {

    let dataSavingsInfo = $('#data-savings-info');

    $('.tap-target').tapTarget();

    dataSavingsInfo.on('click' , function () {


        $('.tap-target').tapTarget('open');

    });
});


class Defaults {
    getFileLocation(filename)  {
        return this.isProductionMode ? '/' + this.siteNameLowercase  + filename : filename;
    //return this.isProductionMode ? "https://rawcdn.githack.com/movybe/web-production/212324f03701737a9a30b76c3c0754577b72a4dc\n/" : filename;
    };
    constructor () {
        //Show the contents of the page on page loading animation done

        this.inArray = function (value , arr) {
            return arr.indexOf(value) !== -1;
        };
        this.whatsappContact = '+234 905 897 7259';
        this.isProductionMode = window.location.hostname !== 'localhost';
        this.hostName = window.location.hostname;
        this.siteName = 'Movybe';
        this.parentCompany = this.siteName + ' Studio';
        this.siteNameLowercase = this.siteName.toLowerCase();
        this.whatsappContactLink = `https://wa.me/${this.whatsappContact.replace(/ /g,'')}?text=Hello%20${this.siteName}`;
        this.imageDirectory = this.getFileLocation('/assets/img/');
        this.processorsFolder = '/processors/';
        this.queryProcessor = this.processorsFolder + 'query.php';
        this.crawler = this.processorsFolder + 'crawler.php';
        this.suggestions = this.processorsFolder + 'suggestions.php';
        this.actions = this.processorsFolder + 'actions.php';
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
        this.noDataError = 'Failed to load data';
        this.networkError = 'No Results found for this query, check your connection';
        this.noMoreResultsFoundError = 'no more results found';
        this.savedState = 'savedState';
        this.checkNetworkConnectionError = 'check your network connection';
        this.savedCampaignState = 'savedCampaignState';
        this.noResultsFoundError = 'no results found';
        this.pleaseWaitText = 'Please wait...';
        this.searchSuggestionsLimit = 7;
        this.bannerImageLocation = '/banner/';
        this.siteAddress = this.siteName.toLowerCase() + '.com';
        this.siteAddressHttp = 'http://' + this.siteAddress;
        this.siteAddressHttps = 'https://' + this.siteAddress;
        this.merchantAccountType = 'merchant';
        this.withdrawalCharge = 100;
        this.enterNewRefererUsernameMessage = 'This user had previously referred you, enter a new username';
        this.disabledTrue = ['disabled' , true];
        this.disabledFalse = ['disabled' , false];
        this.numberOfAdSpaceForMerchant = [0 , 1];
        this.numberOfAdSpaceForOmoba = [0 , 1 , 2 , 3 , 5];
        this.minimumAffliateProfit = 6500;
        this.minimumAccountUsernameLength = 5;
        this.maximumAccountUsernameLength = 12;
        this.amountPaidForReferer = 1400;
        this.minimumWithdrawalAmount = 1000;
        this.numberOfAdsForAdminReview = 10;
        this.affiliateIntroductionVideo = this.isProductionMode ?'https://www.youtube.com/embed/gNU3jJ9ooYQ':'about:blank';
        this.merchantIntroductionVideo = this.isProductionMode ? 'https://www.youtube.com/embed/SIUNqj9XM2M':'about:blank';
        this.affiliateTourGuide = 'about:blank';
        this.merchantTourGuide = 'about:blank';
        this.amountPaidForUniqueVisitor = 0.5;
        this.dummyEmail = 'omobang@gmail.com';
        this.thresholdAmount = 6500;
        this.maximumAdminAdMessageLength = 120;
        this.priceNotSpecifiedText = 'price not specified';
        this.transactionNotSuccessfulMessage = 'Transaction not successful';
        this.ensureAllFieldsAreFieldError = 'fill all fields correctly';
        this.banks = ['Access Bank' , 'CitiBank' , 'Coronation Merchant Bank' , 'Diamond Bank' , 'Ecobank Nigeria' , 'Enterprise Bank Limited' , 'FBN Merchant Bank' ,'Fidelity Bank Nigeria',
            'First Bank of Nigeria' , 'First City Monument Bank' , 'FSDH Merchant Bank' , 'Guarantee Trust Bank' , 'Heritage Bank Plc' ,'Jaiz Bank Limited' ,
            'Keystone Bank Limited' , 'Polaris Bank' , 'Providus Bank Plc' ,  'Rand Merchant Bank' , 'Stanbic IBTC Bank Nigeria Limited' , 'Standard Chartered Bank' ,
            'Sterling Bank' , 'Suntrust Bank Nigeria Limited' ,  'Union Bank of Nigeria' , 'United Bank for Africa Plc' , 'Unity Bank Plc' , 'Wema Bank' , 'Zenith Bank'];
        this.paystackKey = this.isProductionMode ? 'pk_live_f85b50238627ade7b89e7d74b36bdc5433616810' : 'pk_test_671c2b9a8312b7c29aaed707662496895826855c';
        this.showToast = message => {
            M.toast({html: message});
        };
       this.emailTruncateSize = 15;

       this.accountActivationText = 'Account activation';
       this.merchantYoutubeVideo = 'about:blank';
       this.sponsoredAdText = 'SPONSORED';
       this.siteWebPackageName = "com.movybe";
       this.successText='success';
        this.payWithPaystack = (email , amount , name , call) =>
        {
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
                    //window.console.log('window closed');
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

Pace.on('done' , function (e) {
    $('main.main-container').removeClass('invisible-class');
        $('main.main-container').hide();
        $('main.main-container').fadeIn(3000);

        //Disable paceCSS since, it interferes with the materialize css
        $('link[title="pace-css"]').prop('disabled' ,  true);
        //Remove paceJS as well
        $('#pace-js').remove();
        $('link[title="pace-css"]').remove();
        try{document.getElementById('pace-css').disabled = true;}
        catch (e) {}
});

