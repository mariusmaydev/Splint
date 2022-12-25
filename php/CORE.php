<?php 

    define('SPLINT_MAIN_DIR', dirname(__FILE__));
    define('SERVER_SSL', "http");
    define('SERVER_ROOT', $_SERVER["DOCUMENT_ROOT"]);
    define('SPLINT_CONFIG', json_decode(file_get_contents(__DIR__ . "/../config.json")));
    define('DOMAIN', $_SERVER["REQUEST_SCHEME"] . '://' . $_SERVER['HTTP_HOST']);

    require_once 'Tools/StringTools.php';
    require_once 'Debugger/Debugger.php';
    require_once 'Tools/Path.php';
    require_once 'Tools/FileTools.php';
    require_once 'Tools/CommunicationTools.php';
    require_once 'Debugger/ErrorHandler.php';
    require_once 'DataBase2/DataBaseCore.php';
    require_once 'Array/fixedArray.php';
    require_once 'HTML/HTML.php';

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

