String.prototype.truncate = String.prototype.trunc ||
    function(n){
        return this.length>n ? this.substr(0,n-1)+'...' : this.toString();
    };
function useStrict() {
    "use strict";
}
if (typeof Array.isArray === 'undefined') {
    Array.isArray = function(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    }
}
let searchResults = "-search-results";
useStrict();

/*
The function below i.e String.format works like this:
var sentence = String.format("My name is {0} i am a {1} from {2} and i am {} years old" , "Kosi Eric" , "Programmer" , "Nigeria" , 19);
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

        this.imageDirectory = '/assets/img/';
        this.processorsFolder = '/processors/';
        this.queryProcessor = this.processorsFolder + 'query.php';
        this.crawler = this.processorsFolder + 'crawler.php';
        this.suggestions = this.processorsFolder + 'suggestions.php';
        this.commonWords = ['what','is','the','price','of','how','much','does','cost','costs','what','why','when','who','it','buy','sell','sells'];
        this.maxTitleLength = 60;
        this.maxDescriptionLength = 160;
        this.maxLinkLength = 45;
        this.searchResultPreloaders = "search-result-preloaders";
        this.searchResultPreloader = "search-result-preloader";
        this.websiteLiLinks = "website-li-links";
        this.liLink = "li-link";
        this.noDataError = "Failed to load data";
        this.networkError = "No Results found for this query, check your connection";
        this.noMoreResultsFoundError = "no more results found";
        this.savedState = "savedState";
        this.localSearchCookieKey = "localSearch";
        this.showImagesCookieKey = "showImages";
        this.lazyBG = "/assets/js/lazy-bg.js";
        this.noResultsFoundError = "no results found";
        this.pleaseWaitText = "Please wait...";
        this.searchSuggestionsLimit = 7;
     }

}


const defaults = new Defaults();


