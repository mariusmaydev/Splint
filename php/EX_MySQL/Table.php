<?php namespace SPLINT\MySQL;

    class Table {
        public static function select($TableName){
            $sql = "SELECT * FROM $TableName";
            $res = MySQL::connect() -> query($sql);
            return $res;

        }
        public static function remove($TableName){
            $command = CONN -> prepare("DROP TABLE IF EXISTS $TableName");
        }
    }