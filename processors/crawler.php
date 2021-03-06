<?PHP

// Script: Simple PHP Proxy: Get external HTML, JSON and more!
//
// *Version: 1.6, Last updated: 1/24/2009*
//
// Project Home - http://benalman.com/projects/php-simple-proxy/
// GitHub       - http://github.com/cowboy/php-simple-proxy/
// Source       - http://github.com/cowboy/php-simple-proxy/raw/master/ba-simple-proxy.php
//
// About: License
//
// Copyright (c) 2010 "Cowboy" Ben Alman,
// Dual licensed under the MIT and GPL licenses.
// http://benalman.com/about/license/
//
// About: Examples
//
// This working example, complete with fully commented code, illustrates one way
// in which this PHP script can be used.
//
// Simple - http://benalman.com/code/projects/php-simple-proxy/examples/simple/
//
// About: Release History
//
// 1.6 - (1/24/2009) Now defaults to JSON mode, which can now be changed to
//       native mode by specifying ?mode=native. Native and JSONP modes are
//       disabled by default because of possible XSS vulnerability issues, but
//       are configurable in the PHP script along with a url validation regex.
// 1.5 - (12/27/2009) Initial release
//
// Topic: GET Parameters
//
// Certain GET (query string) parameters may be passed into ba-simple-proxy.php
// to control its behavior, this is a list of these parameters.
//
//   url - The remote URL resource to fetch. Any GET parameters to be passed
//     through to the remote URL resource must be urlencoded in this parameter.
//   mode - If mode=native, the response will be sent using the same content
//     type and headers that the remote URL resource returned. If omitted, the
//     response will be JSON (or JSONP). <Native requests> and <JSONP requests>
//     are disabled by default, see <Configuration Options> for more information.
//   callback - If specified, the response JSON will be wrapped in this named
//     function call. This parameter and <JSONP requests> are disabled by
//     default, see <Configuration Options> for more information.
//   user_agent - This value will be sent to the remote URL request as the
//     `User-Agent:` HTTP request header. If omitted, the browser user agent
//     will be passed through.
//   send_cookies - If send_cookies=1, all cookies will be forwarded through to
//     the remote URL request.
//   send_session - If send_session=1 and send_cookies=1, the SID cookie will be
//     forwarded through to the remote URL request.
//   full_headers - If a JSON request and full_headers=1, the JSON response will
//     contain detailed header information.
//   full_status - If a JSON request and full_status=1, the JSON response will
//     contain detailed cURL status information, otherwise it will just contain
//     the `http_code` property.
//
// Topic: POST Parameters
//
// All POST parameters are automatically passed through to the remote URL
// request.
//
// Topic: JSON requests
//
// This request will return the contents of the specified url in JSON format.
//
// Request:
//
// > ba-simple-proxy.php?url=http://example.com/
//
// Response:
//
// > { "contents": "<html>...</html>", "headers": {...}, "status": {...} }
//
// JSON object properties:
//
//   contents - (String) The contents of the remote URL resource.
//   headers - (Object) A hash of HTTP headers returned by the remote URL
//     resource.
//   status - (Object) A hash of status codes returned by cURL.
//
// Topic: JSONP requests
//
// This request will return the contents of the specified url in JSONP format
// (but only if $enable_jsonp is enabled in the PHP script).
//
// Request:
//
// > ba-simple-proxy.php?url=http://example.com/&callback=foo
//
// Response:
//
// > foo({ "contents": "<html>...</html>", "headers": {...}, "status": {...} })
//
// JSON object properties:
//
//   contents - (String) The contents of the remote URL resource.
//   headers - (Object) A hash of HTTP headers returned by the remote URL
//     resource.
//   status - (Object) A hash of status codes returned by cURL.
//
// Topic: Native requests
//
// This request will return the contents of the specified url in the format it
// was received in, including the same content-type and other headers (but only
// if $enable_native is enabled in the PHP script).
//
// Request:
//
// > ba-simple-proxy.php?url=http://example.com/&mode=native
//
// Response:
//
// > <html>...</html>
//
// Topic: Notes
//
// * Assumes magic_quotes_gpc = Off in php.ini
//
// Topic: Configuration Options
//
// These variables can be manually edited in the PHP file if necessary.
//
//   $enable_jsonp - Only enable <JSONP requests> if you really need to. If you
//     install this script on the same server as the page you're calling it
//     from, plain JSON will work. Defaults to false.
//   $enable_native - You can enable <Native requests>, but you should only do
//     this if you also whitelist specific URLs using $valid_url_regex, to avoid
//     possible XSS vulnerabilities. Defaults to false.
//   $valid_url_regex - This regex is matched against the url parameter to
//     ensure that it is valid. This setting only needs to be used if either
//     $enable_jsonp or $enable_native are enabled. Defaults to '/.*/' which
//     validates all URLs.
//
// ############################################################################


function is_production_mode () : bool
{
    $server_name = $_SERVER['SERVER_NAME'];
    return $is_production_mode = $server_name !== 'localhost';
}
function get_client_ip() : string {
    $ipaddress = '';
    if (isset($_SERVER['HTTP_CLIENT_IP']))
        $ipaddress = $_SERVER['HTTP_CLIENT_IP'];
    else if(isset($_SERVER['HTTP_X_FORWARDED_FOR']))
        $ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
    else if(isset($_SERVER['HTTP_X_FORWARDED']))
        $ipaddress = $_SERVER['HTTP_X_FORWARDED'];
    else if(isset($_SERVER['HTTP_FORWARDED_FOR']))
        $ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
    else if(isset($_SERVER['HTTP_FORWARDED']))
        $ipaddress = $_SERVER['HTTP_FORWARDED'];
    else if(isset($_SERVER['REMOTE_ADDR']))
        $ipaddress = $_SERVER['REMOTE_ADDR'];
    else
        $ipaddress = 'UNKNOWN';
    return $ipaddress;
}

$ip = get_client_ip();
$url = isset($_GET['url']) ? $_GET['url'] : $_POST['url'];
$proxy = /*'http://'.*/ get_client_ip().':22222';
$url = strtolower($url);

$user_agent_strings =
    [
        "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36" ,
        "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:70.0) Gecko/20100101 Firefox/70.0",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3763.0 Safari/537.36 Edg/75.0.131.0",
        "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 UBrowser/7.0.185.1002 Safari/537.36",
        //"Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Googlebot/2.1; +http://www.google.com/bot.html) Safari/537.36"
    ];

$default_user_agent = null;
$user_agent_string_key = 'user_agent_string';
if(isset($_GET[$user_agent_string_key])) $default_user_agent = $_GET[$user_agent_string_key];
else if(isset($_POST[$user_agent_string_key]))$default_user_agent = $_POST[$user_agent_string_key];
else $default_user_agent = $user_agent_strings[rand(0, count($user_agent_strings) - 1)];

ini_set('user_agent', $default_user_agent);


// Change these configuration options if needed, see above descriptions for info.
$enable_jsonp    = false;
$enable_native   = true;
$valid_url_regex = '/.*/';

// ############################################################################




$_SERVER['HTTP_USER_AGENT'] = $default_user_agent;
if ( !$url ) {

    // Passed url not specified.
    $contents = 'ERROR: url not specified';
    $status = array( 'http_code' => 'ERROR' );

} else if ( !preg_match( $valid_url_regex, $url ) ) {

    // Passed url doesn't match $valid_url_regex.
    $contents = 'ERROR: invalid url';
    $status = array( 'http_code' => 'ERROR' );

} else {
    $ch = curl_init( $url );
    curl_setopt($ch, CURLOPT_URL, $url);

    if(!is_production_mode())
    {
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    }


    //curl_setopt ($ch, CURLOPT_PORT , 2022);
    if ( strtolower($_SERVER['REQUEST_METHOD']) == 'post' ) {
        //curl_setopt( $ch, CURLOPT_POST, true );
        //curl_setopt( $ch, CURLOPT_POSTFIELDS, $_POST );
    }

    if (isset($_GET['send_cookies']) or isset($_POST['send_cookies'])) {
        $cookie = array();
        foreach ( $_COOKIE as $key => $value ) {
            $cookie[] = $key . '=' . $value;
        }
        /*
         if ( $_GET['send_session'] ) {
             $cookie[] = SID;
         }
        */
        $cookie = implode( '; ', $cookie );

        curl_setopt( $ch, CURLOPT_COOKIE, $cookie );
    }



    curl_setopt($ch, CURLOPT_HTTP_VERSION,'CURL_HTTP_VERSION_1_1' );
    curl_setopt( $ch, CURLOPT_FOLLOWLOCATION, true );
    curl_setopt($ch, CURLOPT_ENCODING,  '');
    curl_setopt( $ch, CURLOPT_HEADER, false);
    curl_setopt( $ch, CURLOPT_HTTPHEADER, array("REMOTE_ADDR: $ip", "HTTP_X_FORWARDED_FOR: $ip"));
    curl_setopt($ch, CURLOPT_PROXYTYPE, CURLPROXY_SOCKS5); // If expected to call with specific PROXY type
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array("X-Forwarded-For: $ip"));

    //if(is_production_mode())curl_setopt($ch, CURLOPT_PROXY, $proxy);
    if (defined('CURLOPT_IPRESOLVE') && defined('CURL_IPRESOLVE_V4')){
        curl_setopt($ch, CURLOPT_IPRESOLVE, CURL_IPRESOLVE_V4);
    }

    curl_setopt( $ch, CURLOPT_USERAGENT, $default_user_agent);
    curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );

    $contents  =  curl_exec( $ch );

    $status = curl_getinfo( $ch );

    curl_close( $ch );
}

// Split header text into an array.
//$header_text = preg_split( '/[\r\n]+/', $header );

if ( (isset($_GET['mode']) && $_GET['mode'] == 'native') or (isset($_POST['mode']) && $_POST['mode'] == 'native') ) {
    if ( !$enable_native ) {
        $contents = 'ERROR: invalid mode';
        $status = array( 'http_code' => 'ERROR' );
    }

    // Propagate headers to response.

    /*
    foreach ( $header_text as $header ) {
        if ( preg_match( '/^(?:Content-Type|Content-Language|Set-Cookie):/i', $header ) ) {
            header( $header );
        }
    }
    */


    print $contents;

} else {

    // $data will be serialized into JSON data.
    $data = array();

    // Propagate all HTTP headers into the JSON data object.
    if ( isset($_GET['full_headers']) ) {
        $data['headers'] = array();


        /*
        foreach ( $header_text as $header ) {
            preg_match( '/^(.+?):\s+(.*)$/', $header, $matches );
            if ( $matches ) {
                $data['headers'][ $matches[1] ] = $matches[2];
            }
        }
        */
    }

    // Propagate all cURL request / response info to the JSON data object.
    if ( isset($_GET['full_status']) ) {
        $data['status'] = $status;
    } else {
        $data['status'] = array();
        $data['status']['http_code'] = $status['http_code'];
    }

    // Set the JSON data object contents, decoding it from JSON if possible.
    $decoded_json = json_decode( $contents );
    $data['contents'] = $decoded_json ? $decoded_json : $contents;

    // Generate appropriate content-type header.
    $is_xhr = isset($_SERVER['HTTP_X_REQUESTED_WITH']) and (strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest');
    header( 'Content-type: application/' . ( $is_xhr ? 'json' : 'x-javascript' ) );

    // Get JSONP callback.
    $jsonp_callback = $enable_jsonp && isset($_GET['callback']) ? $_GET['callback'] : null;

    // Generate JSON/JSONP string
    $json = json_encode( $data );

    print $jsonp_callback ? "$jsonp_callback($json)" : $json;

}

?>