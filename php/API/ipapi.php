<?php namespace API;

use Communication;

    // require_once dirname(__FILE__) . "/../CORE.php";

    class ipapi {
        public static function eval($IP, $print = false){
            if($IP == null){
                Communication::sendBack("requested IP is null", true, $print);
            }
            $loc = file_get_contents('https://ipapi.co/' . $IP . '/json/');
            Communication::sendBack($loc, true, $print);
            // $obj = json_decode($loc);
        }
    }