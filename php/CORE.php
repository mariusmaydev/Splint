<?php 
    require_once 'DataManagement/shmop/S_shmop.php';
    require_once 'Tools/FileTools.php';
    define('PROJECT_NAME', searchConfig());
    define('SPLINT_MAIN_DIR', dirname(__FILE__));
    define('SERVER_SSL', "http");
    define('SERVER_ROOT', $_SERVER["DOCUMENT_ROOT"]);
    define('SPLINT_CONFIG', getSplintConfig());
    define('DOMAIN', SPLINT_CONFIG -> SSL . '://' . SPLINT_CONFIG -> host);
    include 'autoloader.php';
    require_once 'INIT/init.php';
    require_once 'Tools/Math.php';
    require_once 'Debugger/Debugg2.php';
    require_once 'Tools/Path.php';
    require_once 'Debugger/ErrorHandler.php';
    require_once 'DataBase/DataBase.php';
    require_once 'DataBase/DataBaseAccess.php';
    require_once 'DataManagement/sessions/sessions.php';
    require_once 'Tools/createDHLcsv.php';
    require_once 'JSBuilder/JSBuilder.php';
    
    function searchConfig(){
        $path = $_SERVER["DOCUMENT_ROOT"] . "/Splint/SplintManager/cache/projects.map";
        $r = S_shmop::read("SM_projects");
        if($r == null || true){
            if(file_exists($path)){
                $r = unserialize(file_get_contents($path));
                S_shmop::write("SM_projects", $r);
            } else {
                $dir = str_replace("//", "/", $_SERVER["DOCUMENT_ROOT"] );
                $dir = str_replace('/', DIRECTORY_SEPARATOR, $dir);
                $r = FileTools::deepScan($dir);
                file_put_contents($path, serialize($r));
                
                S_shmop::write("SM_projects", $r);
            }
        }
        $lowest = [];
        $lowest[0] = 100;
        foreach($r as $key => $value){
            $i = explode("\\", $value);
            $i = array_splice($i, 3);
            $f = explode("/", $_SERVER["HTTP_REFERER"]);
            $f = array_splice($f, 3);
            $a = array_diff($i, $f);
            if(count($a) < $lowest[0]){
                $lowest = [count($a), array_splice($i, 0, -2)];
            }
        }
        return implode("/", $lowest[1]);
    }

    mysqli_report(MYSQLI_REPORT_ALL ^ MYSQLI_REPORT_STRICT ^ MYSQLI_REPORT_INDEX);

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
    define('SPLINT_ROOT_ABS', SplintInformation::SplintROOT());
    define('SPLINT_ROOT', DOMAIN . SplintInformation::SplintROOT());

    function getSplintConfig() : stdClass {
        return json_decode(file_get_contents($_SERVER["DOCUMENT_ROOT"] ."/" . PROJECT_NAME. "/Splint/splint.config/config.main.json"));
    }

