String.prototype.truncate = String.prototype.trunc ||
    function(n){
        return this.length>n ? this.substr(0,n-1)+'&hellip;' : this.toString();
    };

function useStrict() {
    "use strict";
}

/*
$.ajaxSetup({
    cache: false
});

*/






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



let imageDirectory = "/assets/img/";
let processorsFolder = "/processors/";
let queryProcessor = processorsFolder + "query.php";
let crawler = processorsFolder + "crawler.php";

