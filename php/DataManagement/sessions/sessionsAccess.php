<?php
    require_once 'sessions.php';

    switch($_POST["METHOD"]){
        case "GET_DATA"             : print_r(json_encode(Sessions::get($_POST["name"]))); break;
        case "SET_DATA"             : Sessions::set($_POST["name"], $_POST["value"]); break;
        case "GET_ALL_JS"           : print_r(json_encode(Sessions::getAllJS())); break;
        case "GET_ALL"              : print_r(json_encode(Sessions::getAll())); break;
        case "REMOVE_DATA"          : Sessions::unset($_POST["name"]); break;
        default: print_r("METHOD_ERROR"); exit;
    }
?>