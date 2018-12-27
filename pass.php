<?php
$request = curl_init('http://localhost:2021/bypass.php');

curl_setopt($request, CURLOPT_HTTPHEADER, array(
'Proxy-Auth: Bj5pnZEX6DkcG6Nz6AjDUT1bvcGRVhRaXDuKDX9CjsEs2',
'Proxy-Target-URL: https://www.amazon.com',
'Proxy-Debug: 1'
));

$response = curl_exec($request);
?>