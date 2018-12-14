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
};

/*
$.ajaxSetup({
    cache: false
});

*/



let searchResults = "-search-results";


useStrict();

/*The function below i.e String.format works like this:
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



let imageDirectory = '/assets/img/';
let processorsFolder = '/processors/';
let queryProcessor = processorsFolder + 'query.php';
let crawler = processorsFolder + 'crawler.php';
let suggestions = processorsFolder + 'suggestions.php';
let commonWords = ['what','is','the','price','of','how','much','does','cost','costs','what','why','when','who','it','buy','sell','sells'];
let maxTitleLength = 60;
let maxDescriptionLength = 160;
let maxLinkLength = 45;


$(document).ready (function () {

        let dataSavingsInfo = $('#data-savings-info');

            $('.tap-target').tapTarget();

            dataSavingsInfo.on('click' , function () {


                $('.tap-target').tapTarget('open');

            });

        $('.sidenav').sidenav();

    $('.tooltipped').tooltip();
});