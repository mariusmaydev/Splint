<?php

    require_once 'DataStorage.php';

    switch($_POST["METHOD"]){
        case "EDIT"             : DataStorage::edit($_POST["path"], $_POST["content"]); break;
        case "GET"              : DataStorage::get($_POST["path"]); break;
        default: print_r("METHOD_ERROR"); exit;
    }
    ?>