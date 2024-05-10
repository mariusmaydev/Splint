<?php
    
    require_once dirname(__FILE__) . "/../DataBase/DataSet.php";
    require_once dirname(__FILE__) . "/../DataBase/DataBaseHelper.php";
    require_once dirname(__FILE__) . "/../DataBase/SQL.php";


    abstract class DataBase extends DataBaseHelper {
        use tDBFunctions;
        const SQL_NEW = "NEW";
        const SQL_EDIT = "EDIT";
        const FORCE_ORDERED       = "FORCE_ORDERED";
        const DENY_ORDERED        = "DENY_ORDERED";



      protected static function accessDB($DBName, $sql){
          $con = self::connectToServer($DBName);
          if(!$con){
            // Debugger::error(mysqli_connect_error());
            // Debugger::log($DBName);
            // Debugger::log($sql);
            // Debugger::log(SPLINT_DATABASE_CONFIG);  
            Communication::sendBack([$DBName, $sql, SPLINT_DATABASE_CONFIG]);
            die();
          }
        //   self::createDBifNotExist($DBName, $con);
          $con -> query($sql);
          return $con;
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
        public static function execute($con, string $command, $param = null) : mixed {
            if($con == false){
                return false;
            }
            $res = $con -> query($command);
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
            return $res;
        }
    }