<?php

    class JSBuilderHelper {
        public static function test(){
            return $_SERVER;
        }
        public static function loadConfig(){
            // return json_decode(file_get_contents($_SERVER["DOCUMENT_ROOT"] ."/" . PROJECT_NAME. "/splint.config/config.dataStorage.json"));

            //return json_decode(file_get_contents(__DIR__ . "/../../config/splint.dataStorage.config.json"));
        }
    }