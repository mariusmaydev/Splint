<?php 
    require_once dirname(__FILE__) . "/../Tools/Path.php";
    
    class Debugg {
        public static function warn($arg = ""){
            trigger_error(print_r($arg, true), E_USER_WARNING);
        }
        public static function error($arg = ""){
            trigger_error(print_r($arg, true), E_USER_ERROR);
        }
        public static function log($arg = ""){
            trigger_error(print_r($arg, true), E_USER_NOTICE);
        }
        public static function time(string $arg = ""){
            self::log($arg . "   TIME: " . date('h:i:s'));
        }
        public static function trace(bool $return = false){
            if(!$return){
                self::log(debug_backtrace());
            } else {
                return debug_backtrace();
            }
        }
    }

    define('TIMER', new DebugTimer());
    class DebugTimer {
        public $timeStart   = 0;
        public $timeLast    = 0;
        public $active      = false;
        public $endOnDestruct = true;
        public function __construct(){
        }
        public function __destruct(){
            if($this -> endOnDestruct && $this -> active){
                self::end();
            }
        }
        public function end(){
            $this -> active = false;
            $time = microtime(true) - $this -> timeLast;
            $timeFull = microtime(true) - $this -> timeStart;
            Debugg::log("END   TIMER " . round($time, 3) . "   FullTime: " . round($timeFull, 3));
        }
        public function start(bool $endOnDestruct = true){
            $this -> active = true;
            $this -> endOnDestruct = $endOnDestruct;
            $this -> timeStart = microtime(true);
            $this -> timeLast = microtime(true);
            $backtrace = debug_backtrace()[0];
            $file = Path::cut($backtrace['file'], 6);
            Debugg::log("START TIMER          -> " . $file . ": " . $backtrace['line']);
        }
        public function print(string $value = ""){
            $time = microtime(true) - $this -> timeLast;
            $backtrace = debug_backtrace()[0];
            $file = Path::cut($backtrace['file'], 6);
            Debugg::log($value . " ˅    TIME: " . str_pad(round($time, 3), 8, " ", STR_PAD_RIGHT) . " -> " . $file . ": " . $backtrace['line']);
            $this -> timeLast = microtime(true);
        }
    }