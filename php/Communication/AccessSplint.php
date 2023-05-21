<?php

use API\ipapi;

    require_once dirname(__FILE__) . "/../CORE.php";

    switch(Communication::getAccess()){
        case "EDIT"                 : DataStorage::edit($_POST["path"], $_POST["content"]); break;
        case "GET"                  : DataStorage::get($_POST["path"]); break;
        case "SPLINT.GET_CONFIG"    : Communication::sendBack(SPLINT_CONFIG); break;
        case "API.IPAPI.EVAL"       : ipapi::eval($_POST["IP"]); break;
        // case "API.IPINFO.EVAL"      : ipinfo::eval($_POST["IP"]); break;
        // case "SPLINT.BUILD_DOC"     : 
        default: Communication::sendBack("METHOD_ERROR"); exit;
    }
    ?>