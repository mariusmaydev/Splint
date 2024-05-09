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
            if(isset($headers['Splint-Access-Key'])){
                return $headers['Splint-Access-Key'];

            } else if(isset($_POST['METHOD'])){
                return $_POST['METHOD'];

            } else {
                return null;
            }
        }
    }