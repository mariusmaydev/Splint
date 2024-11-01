<?php
    // header('Access-Control-Allow-Origin: *');
    require_once dirname(__FILE__) . "/../../CORE.php";
    ini_set('display_errors','On');

    class Sessions {
        const LOGGEDIN      = "LOGGEDIN";
        const USER_ID       = "USER_ID";
        const USER_NAME     = "USER_NAME";
        const ACCOUNT_TYPE  = "ACCOUNT_TYPE";
        const PROJECT_ID    = "PROJECT_ID";
        const PROJECT_NAME  = "PROJECT_NAME";
        const GUEST         = "GUEST";
        const DATA          = "DATA";
        const ADMIN         = "ADMIN";
        const TIME          = "TIME";
        
        const ADMIN_USER_ID      = "ADMIN_USER_ID";
        const ADMIN_USER_NAME    = "ADMIN_USER_NAME";
        var $session = null;

        static function start(){
            if (session_status() === PHP_SESSION_NONE) {
                // session_save_path("/tmp");
                // ini_set('session.save_path',getcwd(). '/');
                session_start();
                self::checkTime();
            }
        }
        public static function getSessionID(bool $print = true){
            self::start();
            Communication::sendBack(session_id(), false, $print);
            return session_id();
        }
        static function getAllJS(){
            $sessions = self::getAll();
            $response = new stdClass();
            foreach($sessions as $k => $session){
                if(str_contains($k, 'jsGen_')){
                    $response -> $k = $session;
                }
            }
            return $response;
        }
        static function getAll(){
            self::start();
            return $_SESSION;
        }
        static function get($sessionName = null){
            self::start();
            if($sessionName != null){
                if(isset($_SESSION[$sessionName])){
                    return $_SESSION[$sessionName];
                }
                return false;
            } else {
                return $_SESSION;
            }
        }
        static function set($sessionName, $value){
            self::start();
            $_SESSION[$sessionName] = $value;
        }
        static function unset($sessionName){
            self::start();
            unset($_SESSION[$sessionName]);
        }
        public function save(){
            self::start();
            $this -> session = $_SESSION;
            session_write_close();
            return $this -> session;
        }
        public function unsave(){
            self::start();
            $_SESSION = $this -> session;
        }
        public static function updateTime(){
            Sessions::set(Sessions::TIME, time());
        }
        public static function checkTime(){
            if(Sessions::get(Sessions::TIME) != false){
                if(time() - Sessions::get(Sessions::TIME) > 86400){
                    session_unset();
                    session_destroy();
                }
            } else {
                self::updateTime();
            }
        }
    }