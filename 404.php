<?php
require_once 'config/functions.php';
?>
<!DOCTYPE html>
<html>
<head>
     <?php
     $css = ['404.css'];
     echo $functions->printAssets($css , 'css' , false);
     ?>
    <title>Page Not Found</title>
</head>
<body>
<section id="not-found">
    <div id="title">Sorry , 404 Error Page</div>
    <div class="circles">
        <p>404<br>
            <small>PAGE NOT FOUND</small>
        </p>
        <span class="circle big"></span>
        <span class="circle med"></span>
        <span class="circle small"></span>
    </div>
</section>
</body>
</html>