<?php
    header('Content-Type: application/json');
    if(!defined('PROJECT_NAME')){
        define('PROJECT_NAME', $_GET['projectName']);
    }
    define('SERVER_ROOT', $_SERVER["DOCUMENT_ROOT"]);
    define('SPLINT_CONFIG', getSplintConfig());
    define('DOMAIN', SPLINT_CONFIG -> SSL . '://' . SPLINT_CONFIG -> host);
    define('SPLINT_MAIN_DIR', dirname(__FILE__));
    $rootpath = realpath($_SERVER["DOCUMENT_ROOT"]);
    include $rootpath.'/Splint/php/autoloader.php';
    require_once $rootpath . '/Splint/php/Tools/Path.php';

    class BindFolderByHTML {
        private $obj;
        private $subPath;
        private $forceReload = false;
        private function __construct($subPath = ""){
            $this -> subPath = SERVER_ROOT . "/" . SPLINT_CONFIG -> paths -> project_root . "js/";
            $this -> obj = new stdClass();
            $this -> obj -> CSS = [];
            $this -> obj -> JS = [];
            if(isset($_GET["forceReload"])){
                $this -> forceReload = StringTools::getBool($_GET["forceReload"]);
            }
            $this -> init();
        }
        public static function start(string $path) : void {
            new BindFolderByHTML($path);
        }
        private function init(){
            $cachePath = SERVER_ROOT . SPLINT_CONFIG -> loader -> cachePath . "ProjectFilePathCache.txt";
            $f = S_shmop::read("ProjectMap");
            if($f == null || $this -> forceReload){
                if(file_exists($cachePath) && !$this -> forceReload){
                    $f = file_get_contents($cachePath);
                    echo $f;
                    S_shmop::write("ProjectMap", $f);
                    die();
                } else {
                    $this -> bindSubFolder( $this-> subPath);
                    $f = $this -> get();
                    echo $f;
                    file_put_contents($cachePath, $f);
                    S_shmop::write("ProjectMap", $f);
                    die();
                }
            }
            echo $f;
            die();
        }
        private function get(){
            return str_replace("\\\\",'/', json_encode($this -> obj));
        }
        private function bindSubFolder(string ...$path) : void {
            $paths = PATH_1::getFolderPaths(Path_1::fromRoot(...$path), $path[0]);
            foreach($paths as $path){
                
                $ext = pathinfo($path, PATHINFO_EXTENSION);
                if($ext == "js"){
                    if(!str_contains($path, "\modules\\")){
                        array_push($this -> obj -> JS, Path_1::getURL(DOMAIN, str_replace(SERVER_ROOT, '', $path)));
                    }
                } else if($ext == "css"){
                    array_push($this -> obj -> CSS, Path_1::getURL(DOMAIN, str_replace(SERVER_ROOT, '', $path)));
                }
            }
        }

    }
    function getSplintConfig() : stdClass {
        return json_decode(file_get_contents($_SERVER["DOCUMENT_ROOT"] ."/" . PROJECT_NAME. "/Splint/splint.config/config.main.json"));
    }

    BindFolderByHTML::start($_SERVER["QUERY_STRING"]);
    ?>;