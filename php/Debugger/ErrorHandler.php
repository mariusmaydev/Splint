<?php 
    function ErrorHandler( $errType, $errStr, $errFile, $errLine ){
            $displayErrors = ini_get( 'display_errors' );
            $logErrors     = ini_get( 'log_errors' );
            $errorLog      = ini_get( 'error_log' );

            if($errType !=  E_DEPRECATED && $errType != E_NOTICE){
                // if($errType == E_USER_ERROR){
                //     $message = sprintf( '[%s] %s', date('d-m H:i'), $errStr);
                //     file_put_contents( $errorLog, $message.PHP_EOL, FILE_APPEND );
                // } else {
                    $backtrace = null;
                    if(isset(debug_backtrace()[2])){
                        $backtrace = debug_backtrace()[2];
                    } else {
                        $backtrace = debug_backtrace()[0];
                    }
                    $file = Path::cut($backtrace['file'], 4);
                    $message = sprintf( '[%s] (%s %s), %s', date('d-m H:i'), $file, $backtrace['line'], $errStr);
                    file_put_contents( $errorLog, $message.PHP_EOL, FILE_APPEND );
                // }
            }
        }

    ini_set( 'log_errors', 1 );
    ini_set( 'error_log', SERVER_ROOT . SPLINT_CONFIG -> paths -> error_log . "/PHP_error_log.log"  );

    set_error_handler( 'ErrorHandler' );