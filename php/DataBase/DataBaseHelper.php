<?php

    
    // $servername             = SPLINT_CONFIG -> dataBase -> hostname;
    // $user                   = SPLINT_CONFIG -> dataBase -> userName;
    // $pw                     = SPLINT_CONFIG -> dataBase -> password;

    class DataBaseHelper {
        public static function autoCreateDB(){
            return self::getConfig() -> autoCreateDataBase;
        }
        public static function getConfig($DBName = null) : stdClass{
            $config = null;
            if(!defined('SPLINT_DATABASE_CONFIG')){
                $config = json_decode(file_get_contents($_SERVER["DOCUMENT_ROOT"] ."/" . PROJECT_NAME. "/Splint/splint.config/config.dataBase.json"), true);
                define('SPLINT_DATABASE_CONFIG', $config);
            } else {
                $config = SPLINT_DATABASE_CONFIG;
            }
            $res = new stdClass();
            $res -> autoCreateDataBase  = $config["autoCreateDataBase"];
            $res -> server      = (object) $config["server"];
            if($DBName == null) {
                $res -> userName      = $res -> server -> userNameGeneral;
                $res -> tables        = [];
                $res -> dataBaseID    = $DBName;
            } else {
                $db = $config["dataBases"][$DBName];
                if($db["userName"] == null || $db["userName"] == ""){
                    $res -> userName      = $res -> server -> userNameGeneral;
                } else {
                    $res -> userName      = $db["userName"];
                }
                if($db["dbName"] == null || $db["dbName"] == ""){
                    $res -> dataBaseID      = $DBName;
                } else {
                    $res -> dataBaseID      = $db["dbName"];
                }
                $res -> tables        = $db["tables"];
            }      
            return $res;
        }
      public static function connectToServer($DBName = null){

        $cfg = self::getConfig($DBName);
        $user       = $cfg -> userName;
        $pw         = $cfg -> server -> password;
        $servername = $cfg -> server -> hostname;
        $dataBaseID = $cfg -> dataBaseID;

        if(self::autoCreateDB()){
            $con = new mysqli($servername, $user, $pw);
            if($con -> connect_error) {
                return false;
            } else {
                if($dataBaseID != null){
                    $sql = "CREATE DATABASE IF NOT EXISTS $dataBaseID";
                    if ($con -> query($sql)) {
                        $con -> select_db($dataBaseID); 
                        return $con;
                    } else {
                        return $con;
                    }
                } else {
                    return $con;
                }
            }
        } else {
            $con = new mysqli($servername, $user, $pw, $dataBaseID);
            if($con -> connect_error){
                return false;
            } else {
                return $con;
            }
        }
      }
      public static function createDBifNotExist($DBName, $con){
        if(!(DataBase::getConfig() -> autoCreateDataBase)){
            $res = $con -> select_db($DBName); 
            return $res; 
        }
          $sql = "CREATE DATABASE IF NOT EXISTS $DBName";
          if ($con -> query($sql)) {
              $con -> select_db($DBName); 
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


    function GenerateCompressedID($ProjectID, $UserID){
        $lengthUSER     = 10 - strlen($UserID);
        $lengthPROJECT  = 10 - strlen($ProjectID);
        for($i = 0; $i < $lengthPROJECT; $i++){
          $ProjectID = "0".strval($ProjectID);
        }
        for($i = 0; $i < $lengthUSER; $i++){
          $UserID = "0".strval($UserID);
        }
        return strval($ProjectID).strval($UserID);
      }
    
      function ExtractProjectID($CompressedID){
        return intval(substr($CompressedID, 0, 9));
      }
    
      function ExtractUserID($CompressedID){
        return intval(substr($CompressedID, 10, 19));
      }

      



 

?>