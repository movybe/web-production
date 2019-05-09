"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var browserName = function browserName() {
  var userAgent = navigator.userAgent,
      tem,
      M = userAgent.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];

  if (/trident/i.test(M[1])) {
    tem = /\brv[ :]+(\d+)/g.exec(userAgent) || []; //return 'IE ' + (tem[1] || '');

    return {
      name: 'IE ',
      version: tem[1] || ''
    };
  }

  if (M[1] === 'Chrome') {
    tem = userAgent.match(/\bOPR\/(\d+)/); //if (tem != null) return 'Opera ' + tem[1];

    if (tem != null) {
      return {
        name: 'Opera',
        version: tem[1]
      };
    }
  }

  M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];

  if ((tem = userAgent.match(/version\/(\d+)/i)) != null) {
    M.splice(1, 1, tem[1]);
  }

  return M[0]; //M.join(' ');
}; //Handle errors


var errorMessage = "";
/*
window.onerror= function(msg, url, linenumber) {
    errorMessage =  `Error message: ${msg} <br />URL: ${url}<br />Line Number: ${linenumber}`;
    document.getElementById('error-message').innerHTML += errorMessage;
    return true;
};
*/
//Check for mobile devices

var isMobile = function isMobile() {
  return /Mobi/i.test(navigator.userAgent) || /Android/i.test(navigator.userAgent);
};

$.notify.defaults({
  position: 'left top',
  autoHideDelay: 10000
}); //Check for old browsers

window.onload = function () {
  if (!(window.localStorage && window.Blob && window.FileReader)) {
    $.notify("Try disable data-saving mode or upgrade your ".concat(browserName(), " browser").concat(browserName(), "."), 'info');
  } //Operamini browsers fail to render the components, there prompting opera mini users to consider using another browser

  /*
  else if (isMobile() && window.operamini) {
      $.notify('Try upgrade Your Opera browser might not be compatible with this website', 'info');
  }
  */

}; //Add truncate() method to strings


String.prototype.truncate = String.prototype.trunc || function (n) {
  return this.length > n ? this.substr(0, n - 1) + '...' : this.toString();
};

if (typeof Array.isArray === 'undefined') {
  Array.isArray = function (obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  };
}

var searchResults = '-search-results'; //Introduce strict-typing to the application

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

String.prototype.format = String.format || function (format) {
  var args = Array.prototype.slice.call(arguments, 1);
  return format.replace(/{(\d+)}/g, function (match, number) {
    return typeof args[number] !== 'undefined' ? args[number] : match;
  });
}; //Add capitalize() method to strings


String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

$(document).ready(function () {
  var dataSavingsInfo = $('#data-savings-info');
  $('.tap-target').tapTarget();
  dataSavingsInfo.on('click', function () {
    $('.tap-target').tapTarget('open');
  });
});
Pace.on('done', function (e) {
  $('main.main-container').removeClass('invisible-class'); //Disable paceCSS since, it interferes with the materialize css

  $('link[title="pace-css"]').prop('disabled', true); //Remove paceJS as well

  $('#pace-js').remove();
  $('link[title="pace-css"]').remove();

  try {
    document.getElementById('pace-css').disabled = true;
  } catch (e) {}
});

var Defaults =
/*#__PURE__*/
function () {
  _createClass(Defaults, [{
    key: "getFileLocation",
    value: function getFileLocation(filename) {
      return this.isProductionMode ? '/' + this.siteNameLowercase + filename : filename; //return this.isProductionMode ? "https://rawcdn.githack.com/movybe/web-production/212324f03701737a9a30b76c3c0754577b72a4dc\n/" : filename;
    }
  }]);

  function Defaults() {
    var _this = this;

    _classCallCheck(this, Defaults);

    //Show the contents of the page on page loading animation done
    this.inArray = function (value, arr) {
      return arr.indexOf(value) !== -1;
    };

    this.whatsappContact = '+234 905 897 7259';
    this.isProductionMode = window.location.hostname !== 'localhost';
    this.hostName = window.location.hostname;
    this.siteName = 'Movybe';
    this.parentCompany = this.siteName + ' Studio';
    this.siteNameLowercase = this.siteName.toLowerCase();
    this.whatsappContactLink = "https://wa.me/".concat(this.whatsappContact.replace(/ /g, ''), "?text=Hello%20").concat(this.siteName);
    this.imageDirectory = this.getFileLocation('/assets/img/');
    this.processorsFolder = '/processors/';
    this.queryProcessor = this.processorsFolder + 'query.php';
    this.crawler = this.processorsFolder + 'crawler.php';
    this.suggestions = this.processorsFolder + 'suggestions.php';
    this.actions = this.processorsFolder + 'actions.php';
    this.handleAdForm = this.processorsFolder + 'handle-ad-form.php';
    this.commonWords = ['what', 'is', 'the', 'price', 'of', 'how', 'much', 'does', 'cost', 'costs', 'what', 'why', 'when', 'who', 'it', 'buy', 'sell', 'sells'];
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
    this.disabledTrue = ['disabled', true];
    this.disabledFalse = ['disabled', false];
    this.numberOfAdSpaceForMerchant = [0, 1];
    this.numberOfAdSpaceForOmoba = [0, 1, 2, 3, 5];
    this.minimumAffliateProfit = 6500;
    this.minimumAccountUsernameLength = 5;
    this.maximumAccountUsernameLength = 12;
    this.amountPaidForReferer = 1400;
    this.minimumWithdrawalAmount = 1000;
    this.numberOfAdsForAdminReview = 10;
    this.affiliateIntroductionVideo = 'about:blank';
    this.merchantIntroductionVideo = 'about:blank';
    this.affiliateTourGuide = 'about:blank';
    this.merchantTourGuide = 'about:blank';
    this.amountPaidForUniqueVisitor = 0.5;
    this.dummyEmail = 'omobang@gmail.com';
    this.thresholdAmount = 6500;
    this.maximumAdminAdMessageLength = 120;
    this.priceNotSpecifiedText = 'price not specified';
    this.transactionNotSuccessfulMessage = 'Transaction not successful';
    this.ensureAllFieldsAreFieldError = 'fill all fields correctly';
    this.banks = ['Access Bank', 'CitiBank', 'Coronation Merchant Bank', 'Diamond Bank', 'Ecobank Nigeria', 'Enterprise Bank Limited', 'FBN Merchant Bank', 'Fidelity Bank Nigeria', 'First Bank of Nigeria', 'First City Monument Bank', 'FSDH Merchant Bank', 'Guarantee Trust Bank', 'Heritage Bank Plc', 'Jaiz Bank Limited', 'Keystone Bank Limited', 'Polaris Bank', 'Providus Bank Plc', 'Rand Merchant Bank', 'Stanbic IBTC Bank Nigeria Limited', 'Standard Chartered Bank', 'Sterling Bank', 'Suntrust Bank Nigeria Limited', 'Union Bank of Nigeria', 'United Bank for Africa Plc', 'Unity Bank Plc', 'Wema Bank', 'Zenith Bank'];
    this.paystackKey = this.isProductionMode ? 'pk_live_f85b50238627ade7b89e7d74b36bdc5433616810' : 'pk_test_671c2b9a8312b7c29aaed707662496895826855c';

    this.showToast = function (message) {
      M.toast({
        html: message
      });
    };

    this.emailTruncateSize = 15;
    this.accountActivationText = 'Account activation';
    this.merchantYoutubeVideo = 'about:blank';
    this.sponsoredAdText = 'SPONSORED';
    this.siteWebPackageName = "com.movybe";
    this.successText = 'success';

    this.payWithPaystack = function (email, amount, name, call) {
      var handler = PaystackPop.setup({
        key: _this.paystackKey,
        email: email,
        amount: amount,
        currency: 'NGN',
        ref: '' + Math.floor(Math.random() * 1000000000 + 1),
        // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
        metadata: {
          custom_fields: [{
            display_name: name,
            variable_name: 'email_address',
            value: email
          }]
        },
        callback: function callback(response) {
          call(response);
        },
        onClose: function onClose() {//window.console.log('window closed');
        }
      });
      handler.openIframe();
    };

    this.convertToPaystack = function (naira) {
      var nairaToKobo = naira * 100;
      var onePoint5Percent = 1.5 / 100 * nairaToKobo;
      var amount = Number(onePoint5Percent + nairaToKobo);
      amount = Number(amount.toFixed(2));
      return amount;
    };
  }

  return Defaults;
}();

var defaults = new Defaults();