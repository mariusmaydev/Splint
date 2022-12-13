<?php namespace DataBase;

    use stdClass;

    class DataSet {
        private $SET        = [];
        private $WHERE      = [];
        private $primaryKey = false;

        public function __construct(){}
        public function getPrimaryKey() : string|bool {
            return $this -> primaryKey;
        }
        public function SET(string $key, string $value) : void {
            array_push($this -> SET, $this -> Key_value($key, $value));
        }
        public function WHERE(string $key, string $value){
            array_push($this -> WHERE, $this -> Key_value($key, $value));
        }
        private function Key_value(string $key, string $value) : stdClass {
            $obj = new stdClass();
            $obj -> key = $key;
            $obj -> value = $value;
            return $obj;
        }
    }