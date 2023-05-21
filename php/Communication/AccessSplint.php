<?php

use API\ipapi;

    require_once dirname(__FILE__) . "/../CORE.php";

    switch(Communication::getAccess()){
        case "EDIT"                 : DataStorage::edit($_POST["path"], $_POST["content"]); break;
        case "GET"                  : DataStorage::get($_POST["path"]); break;
        case "SPLINT.GET_CONFIG"    : Communication::sendBack(SPLINT_CONFIG); break;
        case "API.IPAPI.EVAL"       : ipapi::eval($_POST["IP"]); break;
        case "FILES.STRUCT.GET"     : {
            
            $dir = str_replace(DOMAIN, SERVER_ROOT, $_POST["URI"]);
            $dir = str_replace('/', DIRECTORY_SEPARATOR, $dir);
            $res = FileTools::deepScan($dir);
            Communication::sendBack($res); 
        } break;
        // case "API.IPINFO.EVAL"      : ipinfo::eval($_POST["IP"]); break;
        // case "SPLINT.BUILD_DOC"     : 
        default: Communication::sendBack("METHOD_ERROR"); exit;
    }
    ?>