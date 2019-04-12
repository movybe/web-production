<?php
function containsWord($str, $word)
{
    return !!preg_match('#\\b' . preg_quote($word, '#') . '\\b#i', $str);
}

echo $_SERVER['HTTP_HOST'];

?>