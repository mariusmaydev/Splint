<?php

    trait tDBFunctions {
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
        protected static function generateSQL(DataSet $dataset, $type = null){
            $sql = "";
            if($type == "NEW"){
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
    }