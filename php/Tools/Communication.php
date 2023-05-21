<?php

    class Communication {
        public static function sendBack(mixed $value, bool $encode = true, bool $isActive = true) : void {
            if(!$isActive){
                return;
            }
            if($encode){
                if(!FileTools::isJSON($value)){
                    $value = json_encode(($value));
                    // Debugg::log(json_last_error_msg());
                }
            }
            print_r($value);
        }
        /**
         * returns the CallPHP access key
         *
         * @return null|string
         */
        public static function getAccess() : null|string {
            $headers = getallheaders();
            if(isset($headers['X-SPLINT-ACCESS_KEY'])){
                return $headers['X-SPLINT-ACCESS_KEY'];
            } else if(isset($_POST['METHOD'])){
                return $_POST['METHOD'];
            } else {
                return null;
            }
        }
    }
    function utf8ize($d) {
        if (is_array($d)) {
            foreach ($d as $k => $v) {
                $d[$k] = utf8ize($v);
            }
        } else if (is_string ($d)) {
            return mb_convert_encoding($d, 'UTF-8', 'UTF-8');
        }
        return $d;
    }