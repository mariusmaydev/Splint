<?php
    $servername             = "localhost";
    $user                   = "root";
    $pw                     = "";

    $TBName_collector           = "C_ALL";
    $TBName_collector_Location  = "C_locations";
    $TBName_collector_time      = "C_time";

    $TBName_collector                 = array(
                                          0 => "index",
                                          1 => "converterStart",
                                          2 => "converter",
                                          3 => "profile",
                                          4 => "cart",
                                          5 => "checkout",
                                          6 => "imprint",
                                          7 => "login"
                                        );

    function connectToServer(){
        global $servername;
        global $user;
        global $pw;

        $con = new mysqli($servername, $user, $pw);
        if($con -> connect_error){
            return false;
        } else {
            return $con;
        }
    }

    function createDBifNotExist($DBName, $con){
        $sql = "CREATE DATABASE IF NOT EXISTS $DBName";
        if ($con -> query($sql)) {
            $con -> select_db($DBName); 
            return true;
        } else {
            return false;
        }
    }

    function selectTB($con, $TBName){
        $sql = "SELECT * FROM $TBName";
        $res = $con -> query($sql);
        return $res;
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

      
    class DataBase {
      public static $TBName     = "n";
      public static $DBName     = "n";
      const SQL_NEW             = "NEW";
      const SQL_EDIT            = "EDIT";
      const FORCE_ORDERED       = "FORCE_ORDERED";
      const DENY_ORDERED        = "DENY_ORDERED";

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
      protected static function generateSQL(DataSet $dataset, $type = null){
        $sql = "";
        if($type == self::SQL_NEW){
          $TBName = $dataset -> TBName();
          $sql = "INSERT IGNORE INTO $TBName (";
          $flag = false;
          foreach ($dataset -> getEntrys_Names() as $data) {
            if($flag){
              $sql .= ", ";
            }
            $sql .= $data[0];
            $flag = true;
          }
          $sql .= ") VALUES (";
          $flag = false;
          foreach ($dataset -> getEntrys_Names() as $data) {
            if($flag){
              $sql .= ", ";
            }
            $sql .= "'" . $data[1] . "'";
            $flag = true;
          }
          $sql .= ")";
        } else {
          $sql = "CREATE TABLE IF NOT EXISTS " . $dataset -> TBName() . " (";
          foreach($dataset -> getEntrys_Names() as $data){
            $sql .= implode(' ', $data) . ", ";
          }
          $sql .= "PRIMARY KEY (" . $dataset -> primaryKey() . "))";
        }
        return $sql;
      }
      protected static function accessDB($DBName, $sql){
          $con = connectToServer();
          createDBifNotExist($DBName, $con);
          $con -> query($sql);
          return $con;
      }
      protected static function generateKeySQL(DataSet $DataSet){
        $KeyNames_Keys  = $DataSet -> getKeyNames_Keys(); 
        if(count($KeyNames_Keys) > 0){
          $sql = " WHERE";
          $flag = false;
          foreach($KeyNames_Keys as $data){
            $KeyName    = $data[0];
            $key        = $data[1];
            if($flag){
              $sql .= "AND ";
            }
            $flag = true;
            $sql .= " $KeyName = '$key' ";
          }
          return $sql;
        }
        return "";
      }
      protected static function generateEntrySQL(DataSet $DataSet){
        $DataSetArray = $DataSet -> getEntrys_Names();
        $Entry = "*";
        if(count($DataSetArray) != 0){
          if(gettype($DataSetArray) == 'array'){
            $Entry  = "";
            $flag   = false;
            foreach($DataSetArray as $DataSet){
              if($flag){
                $Entry .= ", ";
              }
              $flag = true;
              $Entry .= $DataSet[0];
            }
          } else {
            $Entry = implode(', ', $DataSetArray);
          }
        }
        return $Entry;
      }
      protected static function getData(DataSet $DataSet, $con, $param = null){
        $TBName = $DataSet -> TBName();
        $Keys   = self::generateKeySQL($DataSet);
        $Entry  = self::generateEntrySQL($DataSet);

        $sql = "SELECT $Entry FROM $TBName" . $Keys;
        $res = $con -> query($sql);
        $con -> close();
        if ($res) {
          $response = [];
          $EntryCount = 1;
          $flag = true;
          if($param == DataBase::FORCE_ORDERED){
            $EntryCount = 0;
          } else if($param == DataBase::DENY_ORDERED){
            $flag = false;
          }
          if($res -> num_rows > $EntryCount && $flag){
            $i = 0;
            while($row = $res -> fetch_assoc()){
              $response[$i] = $row;
              $i++;
            }
            return $response;
          } else {
            return $res -> fetch_assoc();
          }
        } else {
            return false;
        }
      }
      protected static function AddData(DataSet $dataset, $con){
        $sql = self::generateSQL($dataset, self::SQL_NEW);
        $con -> query($sql);
        $con -> close();
      }
      protected static function dropTable(DataSet $dataset, $con) : void {
        $TBName = $dataset -> TBName();
        $sql = "DROP TABLE IF EXISTS $TBName";
        $con -> query($sql);
        $con -> close();
      }
      protected static function removeData(DataSet $dataset, $con){
        $TBName     = $dataset -> TBName();
        $dataset    = $dataset -> getEntrys_Names();
        $EntryName  = $dataset[0][0];
        $Entry      = $dataset[0][1];
        $sql = "DELETE FROM $TBName WHERE $EntryName = '$Entry'";
        $con -> query($sql);
        $con -> close();
        return true;
      }
      protected static function editData($con, DataSet $DataSet){
        $TBName         = $DataSet -> TBName();
        $sql = "UPDATE $TBName SET ";

        $Entrys_Values  = $DataSet -> getEntrys_Names();
        $flag = false;
        foreach($Entrys_Values as $data){
          $EntryName  = $data[0];
          $value      = $data[1];
          if($flag){
            $sql .= ", ";
          }
          $flag = true;
          $sql .= "$EntryName = '$value'";
        }

        $sql .= " WHERE";
        $KeyNames_Keys  = $DataSet -> getKeyNames_Keys(); 
        $flag = false;
        foreach($KeyNames_Keys as $data){
          $KeyName    = $data[0];
          $key        = $data[1];
          if($flag){
            $sql .= "AND ";
          }
          $flag = true;
          $sql .= " $KeyName = '$key' ";
        }
        $con -> query($sql);
        $con -> close();
      }
  }

  class DataSet {
    public $dataSet     = [];
    public $keySet      = [];
    public $PrimaryKey  = "";
    public $TBName      = "";
    public function newEntry($EntryName, $value = null){
        $array = [$EntryName, $value];
        array_push($this -> dataSet, $array);
    }
    public function removeEntry($EntryName){
        $i = 0;
        foreach ($this -> dataSet as $data) {
            if($data[0] == $EntryName){
                array_splice($this -> dataSet, $i);
            }
            $i++;
        }
    }
    public function primaryKey($PrimaryKey = null){
        if ($PrimaryKey != null) {
            $this -> PrimaryKey = $PrimaryKey;
        }
        return $this -> PrimaryKey;
    }
    public function newKey($KeyName, $Key = null){
        if($Key == null){
            // $array = [$KeyName, $Key];
            array_push($this -> keySet, $KeyName);
        } else {
            $array = [$KeyName, $Key];
            array_push($this -> keySet, $array);
        }
    }
    public function getKeyNames_Keys(){
        return $this -> keySet;
    }
    public function TBName($TBName = null){
        if ($TBName != null) {
            $this -> TBName = $TBName;
        }
        return $this -> TBName;
    }
    public function getEntrys_Names(){
        return $this -> dataSet;
    }
}

?>