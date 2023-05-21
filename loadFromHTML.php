<?php
    header('Content-Type: application/json');
    if(!defined('PROJECT_NAME')){
        define('PROJECT_NAME', "fd");
    }
    define('SERVER_ROOT', $_SERVER["DOCUMENT_ROOT"]);
    define('SPLINT_CONFIG', getSplintConfig());
    define('DOMAIN', SPLINT_CONFIG -> SSL . '://' . SPLINT_CONFIG -> host);
    define('SPLINT_MAIN_DIR', dirname(__FILE__));
    $rootpath = realpath($_SERVER["DOCUMENT_ROOT"]);
    include $rootpath . '/Splint/php/autoloader.php';
    require_once $rootpath . '/Splint/php/Tools/Path.php';

    trait SplintInformation_T {
        public static function SERVER() : array {
            return $_SERVER;
        }
        public static function SplintROOT(bool $slashLeft = false){
            $path = str_replace(self::SlashLeft($_SERVER["CONTEXT_DOCUMENT_ROOT"]), "", SPLINT_MAIN_DIR);
            if(!$slashLeft){
                return self::SlashRight(Path_1::cut($path, 1, true));
            }
            return self::SlashLeft(Path_1::cut($path, 1, true));
        }
        public static function SlashLeft(string $str) : string {
            return str_replace("/", "\\", $str);
        }
        public static function SlashRight(string $str) : string {
            return str_replace("\\", "/", $str);
        }
    }
    class SplintInformation {
        use SplintInformation_T;
    }
    define('SPLINT_ROOT_ABS', strval(SplintInformation::SplintROOT()));
    define('SPLINT_ROOT', DOMAIN . SPLINT_ROOT_ABS);

    class BindSplintByHTML {
        private $obj;
        private $forceReload = false;
        private function __construct(){
            $this -> obj = new stdClass();
            $this -> obj -> CSS = [];
            $this -> obj -> JS = [];
            if(isset($_GET["forceReload"])){
                $this -> forceReload = StringTools::getBool($_GET["forceReload"]);
            }
            $this -> init();
        }
        public static function start() : void {
            new BindSplintByHTML();
        }
        private function init(){
            $cachePath = SERVER_ROOT . SPLINT_CONFIG -> loader -> cachePath . "SplintFilePathCache.txt";
            $f = S_shmop::read("SplintMap");
            if($f == null || $this -> forceReload){
                if(file_exists($cachePath) && !$this -> forceReload){
                    $f = file_get_contents($cachePath);
                    echo $f;
                    S_shmop::write("SplintMap", $f);
                    die();
                } else {
                    $this -> bind('Splint', 'js', 'paths.js');
                    $this -> bindSubFolder('Splint', 'js');
                    $f = $this -> get();
                    echo $f;
                    file_put_contents($cachePath, $f);
                    S_shmop::write("SplintMap", $f);
                    die();
                }
            }
            echo $f;
            die();
        }
        private function get(){
            return str_replace("\\\\",'/', json_encode($this -> obj));
        }
        private function bind(string ...$files){
            $Path = PATH_1::getURL(Path_1::fromRoot(SERVER_ROOT , SPLINT_ROOT_ABS, ...$files));
            $ext = pathinfo($Path, PATHINFO_EXTENSION);
            if($ext == "js"){
                array_push($this -> obj -> JS, Path_1::getURL(SPLINT_ROOT, str_replace(SERVER_ROOT . SPLINT_ROOT_ABS, '', $Path)));
            } else if($ext == "css"){
                array_push($this -> obj -> CSS, Path_1::getURL(SPLINT_ROOT, str_replace(SERVER_ROOT . SPLINT_ROOT_ABS, '', $Path)));
            }
        }
        private function bindSubFolder(string ...$path) : void {
            $paths = PATH_1::getFolderPaths(Path_1::fromRoot(SERVER_ROOT , SPLINT_ROOT_ABS, ...$path), $path[1]);
            foreach($paths as $path){
                
                $ext = pathinfo($path, PATHINFO_EXTENSION);
                if($ext == "js"){
                    if(!str_contains($path, "\modules\\")){
                        array_push($this -> obj -> JS, Path_1::getURL(SPLINT_ROOT, str_replace(SERVER_ROOT . SPLINT_ROOT_ABS, '', $path)));
                    }
                } else if($ext == "css"){
                    array_push($this -> obj -> CSS, Path_1::getURL(SPLINT_ROOT, str_replace(SERVER_ROOT . SPLINT_ROOT_ABS, '', $path)));
                }
            }
        }
        private function bindFolder(string ...$path) : void {
            $paths = PATH_1::getFolderPaths(Path_1::fromRoot(SERVER_ROOT , SPLINT_ROOT_ABS, ...$path));
            foreach($paths as $path){
                $ext = pathinfo($path, PATHINFO_EXTENSION);
                if($ext == "js"){
                    array_push($this -> obj -> JS, Path_1::getURL(SPLINT_ROOT, str_replace(SERVER_ROOT . SPLINT_ROOT_ABS, '', $path)));
                } else if($ext == "css"){
                    array_push($this -> obj -> CSS, Path_1::getURL(SPLINT_ROOT, str_replace(SERVER_ROOT . SPLINT_ROOT_ABS, '', $path)));
                }
            }
        }

    }    
    function getSplintConfig() : stdClass {
        return json_decode(file_get_contents($_SERVER["DOCUMENT_ROOT"] ."/" . PROJECT_NAME. "/splint.config/config.main.json"));
    }
    BindSplintByHTML::start();
    
    ?>;