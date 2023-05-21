<?php

    
    $servername             = "127.0.0.1";
    $user                   = "root";
    $pw                     = "";

    class DataBaseHelper {
      public static function connectToServer(){
          global $servername;
          global $user;
          global $pw;
          $con = new mysqli($servername, $user, $pw);
          if($con -> connect_error){
            Debugg::log("err");
              return false;
          } else {
              return $con;
          }
      }
      public static function createDBifNotExist($DBName, $con){
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