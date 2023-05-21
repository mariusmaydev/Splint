<?php
    include 'php/autoloader.php';
    
    trait FileBinder_T {
        protected static function genCSS(string ...$files) : void {
            echo "<link rel='stylesheet' href='" . Path_1::getURL(...$files) . "'>\r\n";
        }
        protected static function genJS(string ...$files) : void {
            echo "<script src='" . Path_1::getURL(...$files) . "?v=" . rand() . "' defer></script>\r\n";
        }
        protected static function genModuleJS(string ...$files) : void {
            echo "<script type='module' src='" . Path_1::getURL(...$files) . "?v=" . rand() . "' defer sync></script>\r\n";
        }
    }

    class Splint {
        use FileBinder_T;
        public static function bindCSS() : void {
            self::bindFolder('scss');
        }
        public static function bindJS() : void {
            // self::bind('js', 'Splint_loaderHelper.js');
            self::bind('js', 'Splint.js');
            self::bind('js', 'paths.js');
            self::bindSubFolder('js');
        }
        public static function bind(string ...$path) : void {
            $Path = PATH_1::getURL(Path_1::fromRoot(SERVER_ROOT , SPLINT_ROOT_ABS, ...$path));
            $ext = pathinfo($Path, PATHINFO_EXTENSION);
            if($ext == "js"){
                self::genJS(SPLINT_ROOT, str_replace(SERVER_ROOT . SPLINT_ROOT_ABS, '', $Path));
            } else if($ext == "css"){
                self::genCSS(SPLINT_ROOT, str_replace(SERVER_ROOT . SPLINT_ROOT_ABS, '', $Path));
            }
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
        protected static function bindSubFolder(string ...$path) : void {
            $paths = PATH_1::getFolderPaths(Path_1::fromRoot(SERVER_ROOT , SPLINT_ROOT_ABS, ...$path), $path[0]);
            foreach($paths as $path){
                
                $ext = pathinfo($path, PATHINFO_EXTENSION);
                if($ext == "js"){
                    if(str_contains($path, "\modules\\")){
                        // self::genModuleJS(SPLINT_ROOT, str_replace(SERVER_ROOT . SPLINT_ROOT_ABS, '', $path));
                        // echo "<script type='module' src='http://localhost/Splint/js/modules/ThreeJS_loader.js?v=1855837305' defer sync></script>";
                    } else {
                        self::genJS(SPLINT_ROOT, str_replace(SERVER_ROOT . SPLINT_ROOT_ABS, '', $path));
                    }
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
        public static function bindModule(string ...$path) : void {
            $Path = PATH_1::getURL(DOMAIN . SPLINT_CONFIG -> paths -> project_root, ...$path);
            echo "<script type='module' src='" . Path_1::getURL($Path) . "?v=" . rand() . "' defer sync></script>";
        }
        public static function bindLink(string $link, string $args = "") : void {
            echo "<script src='" . $link. "?v=" . rand() . "' " . $args. "></script>";
        }
    }


   


    