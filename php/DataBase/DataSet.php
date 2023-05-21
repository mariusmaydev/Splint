<?php

class DataSet {
    public $dataSet     = [];
    public $keySet      = [];
    public $PrimaryKey  = "";
    public $TBName      = "";
    public $DBName      = "";
    
    const BETWEEN  = 0;
    
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
    public function newKey($KeyName, $Key = null, int $Flag = -1){
        if($Key == null){
            $array = [$KeyName, $Key, $Flag];
            array_push($this -> keySet, $array);
        } else {
            $array = [$KeyName, $Key, $Flag];
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
    public function DBName($DBName = null){
        if ($DBName != null) {
            $this -> DBName = $DBName;
        }
        return $this -> DBName;
    }
    public function getEntrys_Names(){
        return $this -> dataSet;
    }
}