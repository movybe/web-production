<?php
echo $default_meta_tags = <<<DEFAULT_META_TAGS
    <meta charset="utf-8">
    <meta content="309972533028313" property="fb:profile_id">
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
    <meta name="robot" content="index, follow">
    <meta name="author" content="{$website_details->SiteName}">
    <meta name="referrer" content="no-referrer-when-downgrade">
    <meta content="en_US" property="og:locale">
    <meta content="website" property="og:type">
    <meta content="{$website_details->SiteNameWithHttps}" property="og:url">
    <meta content="{$website_details->IMG_FOLDER}{$website_details->siteNameLowercase}.png" property="og:image">
    <meta content="{$website_details->TwitterHandle}" property="og:see_also">
    <meta content="{$website_details->FacebookHandle}" property="og:see_also">
    <meta content="{$website_details->InstagramHandle}" property="og:see_also">
    <meta content="{$website_details->YouTubeHandle}" property="og:see_also">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@{$website_details->siteNameLowercase}">
    <meta name="twitter:creator" content="@{$website_details->siteNameLowercase}">
    <link rel="canonical" href="{$website_details->SiteNameWithHttps}">
    <link rel="icon" type="image/png" href="{$website_details->IMG_FOLDER}icon.png">
DEFAULT_META_TAGS;
$functions->tryRedirectToHttps();
$pace_js = array('pace.min.js');
$pace_css = array('pace.css');
echo $functions->printAssets($pace_js , 'javascript' , true , null , "id = 'pace-js'");
$cdn_required = <<<CDN_INCLUDES
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" />
<script defer src='https://cdnjs.cloudflare.com/ajax/libs/es5-shim/4.5.7/es5-shim.min.js'></script>
<script defer src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>	  
<script defer src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
<!--script crossorigin="anonymous" src="https://polyfill.io/v3/polyfill.js?features=blissfuljs%2Cdefault%2Ces2015%2Ces2016%2Ces2017%2Ces5%2Ces6%2Ces7%2CArray.from%2CArray.isArray%2CArray.of%2CArray.prototype.%40%40iterator%2CArray.prototype.copyWithin%2CArray.prototype.entries%2CArray.prototype.every%2CArray.prototype.fill%2CArray.prototype.filter%2CArray.prototype.find%2CArray.prototype.findIndex%2CArray.prototype.flat%2CArray.prototype.flatMap%2CArray.prototype.forEach%2CArray.prototype.includes%2CArray.prototype.indexOf%2CArray.prototype.keys%2CArray.prototype.lastIndexOf%2CArray.prototype.map%2CArray.prototype.reduce%2CArray.prototype.reduceRight%2CArray.prototype.some%2CArray.prototype.values%2CAudioContext%2CBlob%2CCustomEvent%2CDOMTokenList%2CDOMTokenList.prototype.%40%40iterator%2CDate.now%2CDate.prototype.toISOString%2CDocumentFragment%2CDocumentFragment.prototype.append%2CDocumentFragment.prototype.prepend%2CElement%2CElement.prototype.after%2CElement.prototype.append%2CElement.prototype.before%2CElement.prototype.classList%2CElement.prototype.cloneNode%2CElement.prototype.closest%2CElement.prototype.dataset%2CElement.prototype.matches%2CElement.prototype.placeholder%2CElement.prototype.prepend%2CElement.prototype.remove%2CElement.prototype.replaceWith%2CEvent%2CEvent.focusin%2CEvent.hashchange%2CEventSource%2CFunction.prototype.bind%2CFunction.prototype.name%2CHTMLCanvasElement.prototype.toBlob%2CHTMLDocument%2CHTMLPictureElement%2CIntersectionObserver%2CIntersectionObserverEntry%2CIntl%2C%7Eviewport%2C%7Ehtml5-elements%2CsetImmediate%2Cscreen.orientation%2CrequestAnimationFrame%2Cperformance.now%2Cnavigator.sendBeacon%2Cnavigator.geolocation%2CmatchMedia%2Clocation.origin%2ClocalStorage%2CgetComputedStyle%2Cfetch%2Cdocument.visibilityState%2Cdocument.querySelector%2Cdocument.head%2Cdocument.getElementsByClassName%2Cdocument.currentScript%2Cdocument%2CdevicePixelRatio%2Cconsole.warn%2Cconsole.timelineEnd%2Cconsole.trace%2Cconsole.timeline%2Cconsole.timeStamp%2Cconsole.timeEnd%2Cconsole.time%2Cconsole.table%2Cconsole.profiles%2Cconsole.profileEnd%2CJSON%2CMap%2CObject.create%2CObject.assign%2CNumber.parseInt%2CNumber.isNaN%2CNumber.isInteger%2CNumber.isFinite%2CMath.acosh%2CMath.asinh%2CMath.atanh%2CMath.cbrt%2CMath.clz32%2CMath.cosh%2CMath.expm1%2CMath.fround%2CMath.hypot%2CMath.imul%2CMath.log10%2CMath.log1p%2CMath.log2%2CMath.sign%2CMath.sinh%2CMath.tanh%2CMath.trunc%2CMutationObserver%2CNode.prototype.contains%2CNodeList.prototype.%40%40iterator%2CNodeList.prototype.forEach%2CNumber.Epsilon%2CNumber.MAX_SAFE_INTEGER%2CNumber.MIN_SAFE_INTEGER%2Cconsole.profile%2Cconsole.log%2Cconsole.markTimeline%2Cconsole.info%2Cconsole.groupEnd%2Cconsole.groupCollapsed%2Cconsole.group%2Cconsole.exception%2Cconsole.error%2Cconsole.dirxml%2Cconsole.dir%2Cconsole.debug%2Cconsole.count%2Cconsole.clear%2Cconsole.assert%2Cconsole%2Catob%2CXMLHttpRequest%2CNumber.isSafeInteger%2CNumber.parseFloat%2CObject.defineProperties%2CObject.defineProperty%2CObject.entries%2CObject.freeze%2CObject.getOwnPropertyDescriptor%2CObject.getOwnPropertyNames%2CObject.getPrototypeOf%2CObject.is%2CObject.isFrozen%2CObject.isExtensible%2CObject.isSealed%2CObject.keys%2CObject.preventExtensions%2CObject.seal%2CObject.setPrototypeOf%2CObject.values%2CPromise%2CPromise.prototype.finally%2CRegExp.prototype.flags%2CSet%2CString.fromCodePoint%2CString.prototype.%40%40iterator%2CString.prototype.codePointAt%2CString.prototype.endsWith%2CString.prototype.includes%2CString.prototype.padEnd%2CString.prototype.padStart%2CString.prototype.repeat%2CString.prototype.startsWith%2CString.prototype.trim%2CSymbol%2CSymbol.hasInstance%2CSymbol.isConcatSpreadable%2CSymbol.iterator%2CSymbol.match%2CSymbol.replace%2CSymbol.search%2CSymbol.species%2CSymbol.split%2CSymbol.toPrimitive%2CSymbol.toStringTag%2CSymbol.unscopables%2CURL%2CUserTiming%2CWeakMap%2CWeakSet%2CWebAnimations%2CWindow"></script-->
<script defer crossorigin src='https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.26.0/babel.js' type="text/javascript"></script>
<script defer crossorigin src="https://unpkg.com/react@16.8.6/umd/react.production.min.js"></script>
<script defer crossorigin src="https://unpkg.com/react-dom@16.8.6/umd/react-dom.production.min.js"></script>
<script defer crossorigin src = 'https://cdnjs.cloudflare.com/ajax/libs/redux/4.0.1/redux.min.js'></script>
<script defer crossorigin src='https://cdnjs.cloudflare.com/ajax/libs/react-redux/6.0.1/react-redux.min.js'></script>
CDN_INCLUDES;
$materialize_css = array("materialize.min.css");
$stylesheets = array("main.css"  , "footer.css");
$required = array("jquery.min.js" ,  "materialize.min.js" , "babel.min.js"  , "react.development.js" , "react-dom.development.js" , "redux.min.js" , "react-redux.min.js");
echo $functions->printAssets($pace_css , 'css' , false , null , "title = 'pace-css' id ='pace-css'");
echo $functions->printAssets($stylesheets , "css" , false)."\n";
echo $functions->is_production_mode() ? $cdn_required : $functions->printAssets($materialize_css , "css" , false , null).$functions->printAssets($required,'javascript')."\n";

?>