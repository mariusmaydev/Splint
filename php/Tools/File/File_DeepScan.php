<?php namespace Splint\File;

use Splint;

    include_once realpath($_SERVER["DOCUMENT_ROOT"]) . '/Splint/php/Tools/File/PathObject.php';

    class File_DeepScan {
        public static $allFiles = [];
        public static function test(){
            $file = '/fd/data\\3Dmodels\\Lighter' ;
            $file1 = realpath($_SERVER["DOCUMENT_ROOT"] . $file);
            // error_log()
            $k = self::scanDir($file1);
            $g = File_DeepScan::searchFilesWithExtensions($k, "png", "glb");
            // \Debugger::log($g -> get(PathObjectTypes::FILE_NAME_TO_PATH));
            // Debugger::log(pathinfo($k));
            // $file = str_replace('\\', DIRECTORY_SEPARATOR, $file);
            // data\3Dmodels\Lighter
            return $g;
        }
        public static function scanDir(string $dir = __DIR__) : string|array {
            self::$allFiles = [];
            return self::p_scanDir($dir);
        }
        /**
         * Undocumented function
         *
         * @param  string $dir path to dir
         * @return array of paths
         */
        private static function p_scanDir(string $dir = __DIR__) : string|array {
            self::$allFiles[$dir] = [];
          
            $directories = array_values(array_diff(scandir($dir), ['.', '..']));
            foreach($directories as $directory){
                if(is_dir("$dir\\$directory")){
                    foreach(self::p_scanDir("$dir\\$directory") as $key => $value) self::$allFiles[$key] = $value;
                } else{
                    self::$allFiles[$dir][] = "$directory";
                }
            }
            return self::$allFiles;
        }
        public static function searchFilesWithExtensions(array $fileMap, string ...$ext) : Splint\File\PathObject {
            $t = new PathObject();
            foreach($fileMap as $key => $value){
                foreach ($value as $name) {
                    if(in_array(pathinfo($name)["extension"], $ext)){
                        $path = $key . '\\'. $name;
                        $t -> push($path);
                        // $res = pathinfo(str_replace('\\\\', '\\', $path));
                        // $res["path"] = $path;

                        // array_push($t, $res);
                    }
                }
            }
            return $t;
        }
        public static function searchFile(array $fileMap, string $fileName){
            foreach($fileMap as $key => $value){
                foreach ($value as $name) {
                    if($name == $fileName){
                        $path = $key . '\\'. $name;
                        // include_once str_replace('\\\\', '\\', $path);
                        return str_replace('\\\\', '\\', $path);
                    }
                }
            }
            return false;
        }
        public static function search(array $fileMap, string $className){
            foreach($fileMap as $key => $value){
                foreach ($value as $fileName) {
                    if($fileName == $className . '.php'){
                        $path = $key . '\\'. $fileName;
                        include_once str_replace('\\\\', '\\', $path);
                        return true;
                    }
                }
            }
            return false;
        }

    }