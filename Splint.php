<?php
    require_once dirname(__FILE__) . '/php/Tools/Path.php';
    require_once 'php/CORE.php';

    trait FileBinder_T {
        protected static function genCSS(string ...$files) : void {
            echo "<link rel='stylesheet' href='" . Path_1::getURL(...$files) . "?v=" . rand() . "'>\r\n";
        }
        protected static function genJS(string ...$files) : void {
            echo "<script src='" . Path_1::getURL(...$files) . "?v=" . rand() . "' defer></script>\r\n";
        }
    }

    class Splint {
        use FileBinder_T;
        public static function bindCSS() : void {
            self::bindFolder('scss');
        }
        public static function bindJS() : void {
            self::bindFolder('js');
        }
        protected static function bindFolder(string ...$path) : void {
            $paths = PATH_1::getFolderPaths(Path_1::fromRoot(SERVER_ROOT , SPLINT_ROOT_ABS, ...$path));
            foreach($paths as $path){
                $ext = pathinfo($path, PATHINFO_EXTENSION);
                if($ext == "js"){
                    self::genJS(SPLINT_ROOT, str_replace(SERVER_ROOT . SPLINT_ROOT_ABS, '', $path));
                } else if($ext == "css"){
                    self::genCSS(SPLINT_ROOT, str_replace(SERVER_ROOT . SPLINT_ROOT_ABS, '', $path));
                }
            }
        }
    }

    class FileBinder {
        use FileBinder_T;        
        public static function bindFolder(string ...$path) : void {
            $paths = PATH_1::getFolderPaths(PATH_1::fromRoot(SERVER_ROOT . SPLINT_CONFIG -> paths -> project_root, ...$path));
            foreach($paths as $path){
                $ext = pathinfo($path, PATHINFO_EXTENSION);
                if($ext == "js"){
                    self::genJS(DOMAIN, str_replace(SERVER_ROOT , '', $path));
                } else if($ext == "css"){
                    self::genCSS(DOMAIN, str_replace(SERVER_ROOT, '', $path));
                }
            }
        }
        public static function bind(string ...$path) : void {
            $Path = PATH_1::getURL(DOMAIN . SPLINT_CONFIG -> paths -> project_root, ...$path);
            $ext = pathinfo($Path, PATHINFO_EXTENSION);
            if($ext == "js"){
                self::genJS($Path);
            } else if($ext == "css"){
                self::genCSS($Path);
            }
        }
    }


   


    