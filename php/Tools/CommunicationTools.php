<?php

    class Communication {
        public static function sendBack(mixed $value, bool $encode = true, bool $isActive = true) : void {
            if(!$isActive){
                return;
            }
            if($encode){
                if(!FileTools::isJSON($value)){
                    $value = json_encode($value);
                }
            }
            print_r($value);
        }
    }
    