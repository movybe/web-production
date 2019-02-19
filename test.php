<?php

$now = date('Y-m-d H:i:s');
$then = "2019-02-14 13:44:29.000000";
$login_date = strtotime($then); // change x with your login date var
$current_date = strtotime($now); // change y with your current date var
$datediff = $current_date - $login_date;
$days = floor($datediff/(60*60*24));

echo $days;
?>