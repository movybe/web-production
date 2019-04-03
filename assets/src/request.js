function request (url , data ,   callback  , method) {

    method = (!method)?"POST":method;
    var xhr = (typeof XMLHttpRequest !== 'undefined') ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");




    xhr.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            callback(this.responseText);
        }
    }


    if ("withCredentials" in xhr){
        // XHR has 'withCredentials' property only if it supports CORS
        xhr.open(method, url, true);
    }
    else if (typeof XDomainRequest != "undefined"){ // if IE use XDR
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        xhr = null;
    }

    if(method == "POST") {
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send("data=" + data);
    }
    else {
        xhr.send();
    }

}
