<?php 
    require_once dirname(__DIR__) . '/Splint.php';
?>

<!DOCTYPE html>
  <head>
    <title>SplintExample</title>
    <?php 
        Splint::bindCSS();
        FileBinder::bindFolder('css');
    ?>

  </head>
  <body id="BODY_index">

    <?php 
        Splint::bindJS();
        FileBinder::bindFolder('js');
    ?>
  </body>


</html>