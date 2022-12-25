<?php

    class FileTools {
        public static function getExtension(string $file_or_path) : string {
            return substr($file_or_path, -3);
        }
        public static function isJSON($data) {
            if (!empty($data)) {
                if(is_string($data) && is_array(json_decode($data, true))){
                    return true;
                }
            }
            return false;
        }
        public static function DataRemove($path, $file = null){
            if($file == null){
                self::deleteDirectory($path);
                return;
            }
            if(file_exists($path . $file)){
                unlink($path . $file);
            }
            if(is_dir_empty($path)){
                mkdir($path);
            }
        }
        private static function deleteDirectory($dir) {
            if (!file_exists($dir)) {
                return true;
            }
            if (!is_dir($dir)) {
                return unlink($dir);
            }
            foreach (scandir($dir) as $item) {
                if ($item == '.' || $item == '..') {
                    continue;
                }
                if (!self::deleteDirectory($dir . DIRECTORY_SEPARATOR . $item)) {
                    return false;
                }
            }
            return rmdir($dir);
        }
    }