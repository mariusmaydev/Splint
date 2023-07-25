<?php

    require_once 'JSBuilder.php';

    switch(Communication::getAccess()){
        case "TEST"             : JSBuilder::test(); break;
        // case "EDIT"             : DataStorage::edit($_POST["path"], $_POST["content"]); break;
        // case "GET"              : DataStorage::get($_POST["path"]); break;
        default: print_r("METHOD_ERROR"); exit;
    }
    ?>