<?php 

    $rootpath = realpath($_SERVER["DOCUMENT_ROOT"]);
    require_once $rootpath . '/Splint/php/Tools/StringTools.php';
    ini_set( 'log_errors', 1 );
    ini_set( 'error_log', SERVER_ROOT . SPLINT_CONFIG -> paths -> error_log . "/PHP_error_log.log"  );
    define( 'PATH_error_log_mySQL', SERVER_ROOT . SPLINT_CONFIG -> paths -> error_log . "/PHP_error_log_MySQL.log"  );
    define( 'PATH_error_log_debugg', SERVER_ROOT . SPLINT_CONFIG -> paths -> error_log . "/PHP_debugg_log.log"  );

    class ErrorHandler {
        public $arg = "";
        private function __construct(public int $errorType, public string $errorMessage, string $errorFile, int $errorLine){
            $this -> parseArg();
            $this -> throw();
        }
        private function parseArg(){
            $start = strpos($this -> errorMessage, '<arg value="') + 12;
            $length = strpos($this -> errorMessage, '">') - $start;
            $this -> arg = substr($this -> errorMessage, $start, $length);
            $this -> errorMessage = substr($this -> errorMessage, 0, $start + $length) . "\r\n" . substr($this -> errorMessage, $start + $length);
        }
        private function throw(){
            $message = StringTools::indent("\n" . $this -> errorMessage) . "\n";
            $message = "\r\n<S-msg>" . $message . "</S-msg>\r\n";
            $message .= $this -> getBase();
            $message = "<S-error>" . $message . "\r\n";
            $message .= "<S-time>" . date("Y-m-d H:i:s") . "</S-time></S-error>";
            $type = $this -> errorType;
            if( str_contains($this -> errorMessage, "SQL syntax") || str_contains($this -> errorMessage, "mysqli")){
                file_put_contents(PATH_error_log_mySQL, $message.PHP_EOL, FILE_APPEND );
            } else if($type == E_USER_ERROR || $type == E_USER_NOTICE || $type == E_USER_WARNING){
                file_put_contents(PATH_error_log_debugg, $message.PHP_EOL, FILE_APPEND );
            } else {
                file_put_contents(ini_get('error_log'), $message.PHP_EOL, FILE_APPEND );
            }
        }
        private function getBase() : string {
            $type = "";
            switch($this -> errorType){
                case E_USER_ERROR   : $type = "ERROR"; break;
                case E_USER_WARNING : $type = "WARN"; break;
                case E_USER_NOTICE  : $type = "NOTICE"; break;
                default : $type = "ERROR";break;
            }
            $res = "<S-type>" . $type . "</S-type>\r\n";
        $res .= "<S-trace>\r\n";
        $bt = debug_backtrace();
        foreach($bt as $key => $trace){
            if(!isset($trace['file']) || str_contains($trace['file'], 'Debugger')){
                continue;
            }
            $res .= sprintf( '> %s:%s', $trace['file'], $trace['line']) . "\n";
        }
        $res .= "</S-trace>";
        return $res;
        }
        public static function call(int $errorType, string $errorMessage, string $errorFile, int $errorLine){
            new self($errorType, $errorMessage, $errorFile, $errorLine);
        }
    }
    set_error_handler( 'ErrorHandler::call', E_ALL );