<?php namespace SPLINT\MySQL;
    use mysqli;

    require_once 'Debugg.php';

    define('CONN', MySQL::connect());

    class MySQL {
        public static $servername             = "127.0.0.1";
        public static $user                   = "root";
        public static $password               = "";
        public static $conn                   = null;

        public static function connect() : false|mysqli {
            if(self::$conn == null){
                self::$conn = new mysqli(self::$servername, self::$user, self::$password);
                if(self::$conn -> connect_error){
                    Debugg::log("err");
                    return false;
                } else {
                    return self::$conn;
                }
            } else {
                return self::$conn;
            }
        }
        public static function selectTB($TableName){
            $sql = "SELECT * FROM $TableName";
            $res = MySQL::connect() -> query($sql);
            return $res;
        }
        public static function selectDB($DBName){
            return mysqli_select_db(self::$conn, $DBName);
        }
    }
    MySQL::connect();

    class DataBaseHelper {
        public static function createDB($DBName, $conn){
            $sql = "CREATE DATABASE IF NOT EXISTS $DBName";
            if ($conn -> query($sql)) {
                $conn -> select_db($DBName); 
                return true;
            } else {
                return false;
            }
        }
        public static function selectTB($con, $TBName){
            $sql = "SELECT * FROM $TBName";
            $res = $con -> query($sql);
            return $res;
        }      
        protected static function checkNull(&$function_var, $construct_var){
          if($function_var == null){
              $function_var = $construct_var;
          }
          return $function_var;
        } 
        protected static function returnIf($value, $flag){
            if($flag == true){
                return $value;
            }
            return null;
        } 
        protected static function returnNotNull(...$values){
          foreach($values as $value){
              if($value != null){
                  return $value;
              }
          }
        }
  
      }


