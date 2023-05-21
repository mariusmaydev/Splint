<?php

    require_once 'sessions.php';

    switch(Communication::getAccess()){
        case "GET_DATA"             : Session_funcs::get($_POST["name"]); break;
        case "SET_DATA"             : Session_funcs::set($_POST["name"], $_POST["value"]); break;
        case "GET_ALL_JS"           : Session_funcs::getAllJS(); break;
        case "GET_ALL"              : Session_funcs::getAll(); break;
        case "REMOVE_DATA"          : Session_funcs::remove($_POST["name"]); break;
        case "GET_SESSION_ID"       : Session_funcs::getSessionID(); break;
        default: print_r("METHOD_ERROR"); exit;
    }

    class Session_funcs {
        public static function remove(string $name){
            Sessions::unset($name);
            Communication::sendBack(true);
        }
        public static function set(string $name, $value){
            Sessions::set($name, $value);
            Communication::sendBack(true);
        }
        public static function getAllJS(){
            Communication::sendBack(Sessions::getAllJS());
        }
        public static function get(string $name){
            Communication::sendBack(Sessions::get($name));
        }
        public static function getAll(){
            Communication::sendBack(Sessions::getAll());
        }
        public static function getSessionID(){
            Communication::sendBack(Sessions::getSessionID(false));
        }
    }
?>