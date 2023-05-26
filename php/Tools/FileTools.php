<?php

    class FileTools {
        public static function deepScan(string $dir = __DIR__){
            // return;
            static $results = [];
            static $allFiles = [];
            $allFiles[$dir] = [];
            
            if(substr_count($dir, '\\') > 6){
                return;
            }
             $directories = array_values(array_diff(scandir($dir), ['.', '..']));
             foreach($directories as $directory){
               if(is_dir("$dir\\$directory")){
                if($directory == "splint.config"){
                    array_push($results, "$dir\\$directory");
                    return $results;
                }
                $fe = FileTools::deepScan("$dir\\$directory");
                if($fe == null){
                    continue;
                }
                 foreach($fe as $key => $value) {
                    $allFiles[$key] = $value;
                }
               }
               else{
                
                $allFiles[$dir][] = "$directory";
               }
             }
             return $results;
          }
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
        public static function copyDirectory(string $srcPath, string $dstPath) {
            if(is_dir($srcPath)) {
                if(!file_exists($dstPath)){
                    @mkdir($dstPath, 0777, true);
                }
                $directory = dir($srcPath);
                while(FALSE !== ($readdirectory = $directory -> read())) {
                    if($readdirectory == '.' || $readdirectory == '..') {
                        continue;
                    }
                    $PathDir = $srcPath . '/' . $readdirectory; 
                    if(is_dir($PathDir)) {
                        self::copyDirectory($PathDir, $dstPath . '/' . $readdirectory );
                        continue;
                    }
                    copy( $PathDir, $dstPath . '/' . $readdirectory );
                }
                $directory -> close();
            } else {
                copy($srcPath, $dstPath);
            }
        }
    }