<?php 
    if(!defined('PROJECT_NAME')){
        if(isset($_GET['projectName']) && $_GET['projectName'] != null){
            define('PROJECT_NAME', $_GET['projectName']);//$_SERVER['QUERY_STRING']);
        } else {
            define('PROJECT_NAME', 'fd');
        }
    }
    define('SPLINT_MAIN_DIR', dirname(__FILE__));
    define('SERVER_SSL', "http");
    define('SERVER_ROOT', $_SERVER["DOCUMENT_ROOT"]);
    define('SPLINT_CONFIG', getSplintConfig());
    define('DOMAIN', SPLINT_CONFIG -> SSL . '://' . SPLINT_CONFIG -> host);
    include 'autoloader.php';
    require_once 'INIT/init.php';
    require_once 'Tools/Math.php';
    require_once 'Debugger/Debugger.php';
    require_once 'Tools/Path.php';
    require_once 'Debugger/ErrorHandler.php';
    require_once 'DataBase/DataBase.php';
    require_once 'DataBase/DataBaseAccess.php';
    require_once 'DataManagement/sessions/sessions.php';
    require_once 'Tools/createDHLcsv.php';
    require_once 'JSBuilder/JSBuilder.php';
    Debugg::log(PROJECT_NAME);


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

