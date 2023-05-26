<?php 
    $rootpath = realpath($_SERVER["DOCUMENT_ROOT"]);
    // require_once dirname(__FILE__) . "/../Tools/Path.php";
    require_once $rootpath . "/Splint/php/Tools/Path.php";
    
    
    class Debugger {
        private static function parse($msg = "", string $arg = "") : string {
            if($arg != ""){
                $arg = '<arg value="' . $arg . '">';
            }
            return $arg . print_r($msg, true);
        }
        public static function warn(mixed $msg, string $arg = "") : void {
            trigger_error(self::parse($msg, $arg), E_USER_WARNING);
        }
        public static function error(mixed $msg, string $arg = "") : void {
            trigger_error(self::parse($msg, $arg), E_USER_ERROR);
        }
        public static function log(mixed $msg, string $arg = "") : void {
            trigger_error(self::parse($msg, $arg), E_USER_NOTICE);
        }
        // public static function trace(bool $return = false){
        //     if(!$return){
        //         self::log(debug_backtrace());
        //     } else {
        //         return debug_backtrace();
        //     }
        // }
    }

    // define('TIMER', new DebugTimer());
    // class DebugTimer {
    //     public $timeStart   = 0;
    //     public $timeLast    = 0;
    //     public $active      = false;
    //     public $endOnDestruct = true;
    //     public function __construct(){
    //     }
    //     public function __destruct(){
    //         if($this -> endOnDestruct && $this -> active){
    //             self::end();
    //         }
    //     }
    //     public function end(){
    //         $this -> active = false;
    //         $time = microtime(true) - $this -> timeLast;
    //         $timeFull = microtime(true) - $this -> timeStart;
    //         Debugg::log("END   TIMER " . round($time, 3) . "   FullTime: " . round($timeFull, 3));
    //     }
    //     public function start(bool $endOnDestruct = true){
    //         $this -> active = true;
    //         $this -> endOnDestruct = $endOnDestruct;
    //         $this -> timeStart = microtime(true);
    //         $this -> timeLast = microtime(true);
    //         $backtrace = debug_backtrace()[0];
    //         $file = Path::cut($backtrace['file'], 6);
    //         Debugg::log("START TIMER          -> " . $file . ": " . $backtrace['line']);
    //     }
    //     public function print(string $value = ""){
    //         $time = microtime(true) - $this -> timeLast;
    //         $backtrace = debug_backtrace()[0];
    //         $file = Path::cut($backtrace['file'], 6);
    //         Debugg::log($value . " ˅    TIME: " . str_pad(round($time, 3), 8, " ", STR_PAD_RIGHT) . " -> " . $file . ": " . $backtrace['line']);
    //         $this -> timeLast = microtime(true);
    //     }
    // }