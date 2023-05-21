<?php namespace SPLINT\MySQL; 
use Debugg as DB;

    class Debugg extends DB {
        public static function warn($arg = ""){
            trigger_error("__MYSQL__" . print_r($arg, true), E_USER_WARNING);
        }
        public static function error($arg = ""){
            trigger_error("__MYSQL__" . print_r($arg, true), E_USER_ERROR);
        }
        public static function log($arg = ""){
            trigger_error("__MYSQL__" . print_r($arg, true), E_USER_NOTICE);
        }
        public static function time(string $arg = ""){
            self::log($arg . "   TIME: " . date('h:i:s'));
        }
        public static function trace(bool $return = false){
            if(!$return){
                self::log(debug_backtrace());
            } else {
                return debug_backtrace();
            }
        }
    }