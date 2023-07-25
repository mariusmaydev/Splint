<?php

    require_once dirname(__FILE__) . "/../CORE.php";
    require_once dirname(__FILE__) . "/../JSBuilder/JSBuilderHelper.php";
    include_once dirname(__FILE__) .'/../autoloader.php';

    class JSBuilder {
        public static $config = null;
        public static function test(){
            $paths = $_POST["paths"];
            $path_c = $_SERVER["DOCUMENT_ROOT"] . "/Splint/SplintManager/cache/projects_test.map";
            $str = "";
            foreach($paths as $path){
                $path_r = str_replace("http://localhost", $_SERVER["DOCUMENT_ROOT"], $path);
                $k = file_get_contents($path_r);
                // $k1 = file_get_contents($path_c);
                $str .= "\r\n" . $k;
            }
            $t = file_put_contents($path_c, $str);
            Communication::sendBack($k);
        }
        public static function test1(){
            $m = $_POST["paths"];
            // $b = $_POST["config"];
            self::$config = json_decode(json_encode($_POST["config"]));
            // $a = JSBuilderHelper::test();
            
            $path_cache = $_SERVER["DOCUMENT_ROOT"] . "/Splint/SplintManager/cache/projects_abs.map";
            $paths = json_decode(self::init());
            $k = file_get_contents($paths[0]);
            // foreach ($paths as $path){
            // }
            // file_put_contents($path, $h);
            // Debugger::log($);
            // $b = $a['HTTP_REFERER'];
            // $c = str_replace(".php", "_includes.json", $b);
            // $f = file_get_contents($b);
            // $d = substr($f, strpos($f, "module"), 20);
            // $strs = [];
            // $n = 0;
            // $g = 0;
            // // do {
            // //     $e = getStringBetween($f, "part", "part", $n);
            // //     if($e -> str == ""){
            // //         break;
            // //     }
            // //     $n = $e -> index;
            // //     array_push($strs, $e);
            // // } while ($n < strlen($f));
            // $m = StringTools::getAllMatchesBetween($f, '/<part src="', '"><\/part>');
            // $h = preg_match_all('/<part src="(.*?)"><\/part>/s', $f, $m, PREG_PATTERN_ORDER);
            // Communication::sendBack($m);
            Communication::sendBack($k);
        }
        
        private static function init(){
            $subPath = SERVER_ROOT . "/" . self::$config -> paths -> project_root . "js/";
            $cachePath = SERVER_ROOT . self::$config -> loader -> cachePath . "ProjectFilePathCache.json";
            
            $paths = PATH_1::getFolderPaths(Path_1::fromRoot($subPath), $subPath);
            $paths_out = array();
            foreach ($paths as $path){
                array_push($paths_out, preg_replace('/([^:])(\/{2,})/', '$1/', $path));
                // $paths_out = preg_replace('/([^:])(\/{2,})/', '$1/', $path);
            }
            // if($f == null || $this -> forceReload){
            //     if(file_exists($cachePath) && !$this -> forceReload){
                    $f = file_get_contents($cachePath);
                    $f = json_decode($f);
                    $j= str_replace("\\\\",'/', json_encode($paths_out));
                    return $j;
            //         echo $f;
            //         S_shmop::write("ProjectMap", $f);
            //         die();
            //     } else {
            //         $this -> bindSubFolder( $this-> subPath);
            //         $f = $this -> get();
            //         echo $f;
            //         file_put_contents($cachePath, $f);
            //         S_shmop::write("ProjectMap", $f);
            //         die();
            //     }
            // }
            // echo $f;
            die();
        }
    }