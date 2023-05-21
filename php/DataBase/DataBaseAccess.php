<?php

    require_once "DataBase.php";

    class aDB extends DataBase {
        public $structure;
        public $TBName = "";
        public $DBName = "";

        public function __construct(DataSet $struct){
            $this -> structure = $struct;
            $this -> TBName = $struct -> TBName();
            $this -> DBName = $struct -> DBName();
        }
        private function getTBName(DataSet &$DataSet) : void {
            $DataSet -> TBName($this -> TBName . $DataSet -> TBName());
        }
        private function getAccessSQL(DataSet &$DataSet) : string {
            $this -> structure -> TBName($DataSet -> TBName());
            return self::generateSQL($this -> structure);
        }
        private function connectDB(DataSet &$DataSet){
            $this -> getTBName($DataSet);
            return self::accessDB($this -> DBName, $this -> getAccessSQL($DataSet));
        }
        protected function _get(DataSet $DataSet, $param = null){
            return self::getData($DataSet, $this -> connectDB($DataSet), $param);
        }
        protected function _edit(DataSet $DataSet){
            return self::editData($this -> connectDB($DataSet), $DataSet);
        }
        protected function _add(DataSet $DataSet){
            return self::AddData($DataSet, $this -> connectDB($DataSet));
        }
        protected function _remove(DataSet $DataSet){
            return self::removeData($DataSet, $this -> connectDB($DataSet));
        }
        protected function _removeTable(DataSet $DataSet){
            return self::dropTable($DataSet, $this -> connectDB($DataSet));
        }
        protected function _query(DataSet $DataSet, $command, $param = null){
            return self::execute($this -> connectDB($DataSet), $command, $param);
        }
    }   

    class accessDB extends aDB {
        public static function get(DataSet $Struct, DataSet $DataSet, $param = null){
            $d = new aDB($Struct);
            return $d -> _get($DataSet, $param);
        }
        public static function add(DataSet $Struct, DataSet $DataSet, $param = null){
            $d = new aDB($Struct);
            return $d -> _add($DataSet, $param);
        }
        public static function edit(DataSet $Struct, DataSet $DataSet, $param = null){
            $d = new aDB($Struct);
            return $d -> _edit($DataSet, $param);
        }
        public static function remove(DataSet $Struct, DataSet $DataSet, $param = null){
            $d = new aDB($Struct);
            return $d -> _remove($DataSet, $param);
        }
        public static function removeTable(DataSet $Struct, DataSet $DataSet, $param = null){
            $d = new aDB($Struct);
            return $d -> _removeTable($DataSet, $param);
        }
        public static function query(DataSet $Struct, $command, $param = null){
            $d = new aDB($Struct);
            return $d -> _query($Struct, $command, $param);
        }

    }