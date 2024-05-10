<?php

    require_once 'DataStorage.php';

    switch(Communication::getAccess()){
        case "EDIT"             : DataStorage::edit($_POST["path"], $_POST["content"]); break;
        case "GET"              : DataStorage::get($_POST["path"]); break;
        case "GET.PATHS"        : DataStorage::getPaths($_POST["path"]); break;
        default: Communication::sendBack("METHOD_ERROR"); exit;
    }
    ?>