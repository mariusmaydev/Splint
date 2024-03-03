<?php

use API\ipapi;

    require_once dirname(__FILE__) . "/../CORE.php";

    switch(Communication::getAccess()){
        case "EDIT"                 : DataStorage::edit($_POST["path"], $_POST["content"]); break;
        case "GET"                  : DataStorage::get($_POST["path"]); break;
        case "REMOVE"               : DataStorage::remove($_POST["path"]); break;
        case "GET.PATHS"            : DataStorage::getPaths($_POST["path"]); break;
        case "SPLINT.GET_CONFIG"    : Communication::sendBack(SPLINT_CONFIG); break;
        case "SPLINT.GET_VAR"       : Communication::sendBack($GLOBALS); break;
        case "API.IPAPI.EVAL"       : ipapi::eval($_POST["IP"]); break;
        case "EDIT.ANY"             : DataStorage::editAny($_POST["path"], $_POST["content"]); break;
        case "FILES.STRUCT.GET"     : {
            $res;
            $cachePath = SERVER_ROOT . SPLINT_ROOT_ABS . "/SplintManager/cache/projects.map";
            // Debugg::log();
            $forceReload = false;
            if(isset($_POST["forceReload"])){
                $forceReload = StringTools::getBool($_POST["forceReload"]);
            }
            $f = S_shmop::read("SM_projects");
            if($f == null || $forceReload){
                if(file_exists($cachePath) && !$forceReload){
                    $f = unserialize(file_get_contents($cachePath));
                    Communication::sendBack($f); 
                    S_shmop::write("SM_projects", $f);
                    die();
                } else {
                    $dir = str_replace(DOMAIN, SERVER_ROOT, $_POST["URI"]);
                    $dir = str_replace('/', DIRECTORY_SEPARATOR, $dir);
                    $f = FileTools::deepScan($dir);
                    file_put_contents($cachePath, serialize($f));
                    
                    S_shmop::write("SM_projects", $f);
                    Communication::sendBack($f); 
                    die();
                }
            }
            Communication::sendBack($f); 
            die();





            // $f = S_shmop::read("ProjectMap");
            // if($f == null || $this -> forceReload){

            // }
            // if(!isset($_POST["forceReload"]) || (isset($_POST["forceReload"]) && StringTools::getBool($_POST["forceReload"]))){
            //     $dir = str_replace(DOMAIN, SERVER_ROOT, $_POST["URI"]);
            //     $dir = str_replace('/', DIRECTORY_SEPARATOR, $dir);
            //     $res = FileTools::deepScan($dir);
            //     S_shmop::write("SM_projects", $res);
            // } else {
            //     $res = S_shmop::read("SM_projects");
            // }

            // Communication::sendBack($res); 
        } break;
        // case "API.IPINFO.EVAL"      : ipinfo::eval($_POST["IP"]); break;
        // case "SPLINT.BUILD_DOC"     : 
        default: Communication::sendBack("METHOD_ERROR"); exit;
    }
    ?>