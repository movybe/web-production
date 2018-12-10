String.prototype.truncate = String.prototype.trunc ||
    function(n){
        return this.length>n ? this.substr(0,n-1)+'&hellip;' : this.toString();
    };

let imageDirectory = "/assets/img/";
let processorsFolder = "/processors/";
let queryProcessor = processorsFolder + "query.php";


for(var i =0; i < 10; ++i)
    console.log(i);
    console.log(i + 10);