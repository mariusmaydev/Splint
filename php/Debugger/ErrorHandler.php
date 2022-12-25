<?php 

    // function ErrorHandler( $errType, $errStr, $errFile, $errLine ){
    //     $displayErrors = ini_get( 'display_errors' );
    //     $logErrors     = ini_get( 'log_errors' );
    //     $errorLog      = ini_get( 'error_log' );

    //     if($errType !=  E_DEPRECATED && $errType != E_NOTICE){
    //         switch($errType){
    //             case E_USER_ERROR   :
    //             case E_USER_WARNING :
    //             case E_USER_NOTICE  :
    //             default : 
    //         }
    //         // if($errType == E_USER_ERROR){
    //         //     $message = sprintf( '[%s] %s', date('d-m H:i'), $errStr);
    //         //     file_put_contents( $errorLog, $message.PHP_EOL, FILE_APPEND );
    //         // } else {
    //             $backtrace = ErrorHandlerFunctions::getBacktrace();
    //             $file = Path::cut($backtrace['file'], 4);
    //             $message = sprintf( '[%s] (%s %s), %s', date('d-m H:i'), $file, $backtrace['line'], $errStr);
    //             file_put_contents( $errorLog, $message.PHP_EOL, FILE_APPEND );
    //         // }
    //     }
    // }

    ini_set( 'log_errors', 1 );
    ini_set( 'error_log', SERVER_ROOT . SPLINT_CONFIG -> paths -> error_log . "/PHP_error_log.log"  );


    class ErrorHandler {
        private $backtrace;
        private $path;

        private function __construct(public int $errorType, public string $errorMessage, string $errorFile, int $errorLine){
            $this -> getBacktrace();
            $this -> getPath();
            $this -> throw();
        }
        private function throw(){
            $message = StringTools::indent($this -> getBase() . $this -> errorMessage) . "\n";
            file_put_contents(ini_get('error_log'), $message.PHP_EOL, FILE_APPEND );
        }
        private function getBase() : string {
            $type = "";
            switch($this -> errorType){
                case E_USER_ERROR   : $type = "[DEBUG][ERROR]"; break;
                case E_USER_WARNING : $type = "[DEBUG][WARN]"; break;
                case E_USER_NOTICE  : $type = "[DEBUG][NOTICE]"; break;
                default : $type = "[ERROR]"; break;
            }
            return sprintf( '[%s]%s at %s %s', date('d-m H:i'), $type, $this -> path, $this -> backtrace['line']) . "\n";
        }
        private function getBacktrace() : void {
            if($this -> errorType == E_USER_ERROR || $this -> errorType == E_USER_WARNING || $this -> errorType == E_USER_NOTICE){
                if(isset(debug_backtrace()[4])){
                    $this -> backtrace = debug_backtrace()[4];
                } else {
                    $this -> backtrace = debug_backtrace()[0];
                }
            } else if(isset(debug_backtrace()[2])){
                $this -> backtrace = debug_backtrace()[2];
            } else {
                $this -> backtrace = debug_backtrace()[0];
            }
        }
        private function getPath(){
            if(isset($this -> backtrace) && isset($this -> backtrace['file']) && $this -> backtrace['file'] != null){
                $this -> path = Path::cut($this -> backtrace['file'], 4);
            } else {
                // Debugg::error("ERRORHANDLER_PATH_ERROR");
                $this -> path = "";
            }
        }
        public static function call(int $errorType, string $errorMessage, string $errorFile, int $errorLine){
            new self($errorType, $errorMessage, $errorFile, $errorLine);
        }
    }
    set_error_handler( 'ErrorHandler::call' );