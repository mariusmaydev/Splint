<?php

    require_once dirname(__FILE__) . "/../CORE.php";
    require_once dirname(__FILE__) . "/../DataStorage/DataStorageHelper.php";

    class DataStorage {
        public static function editAny(string $path, string $content){
            $ext = pathinfo($path, PATHINFO_EXTENSION);
            if($ext != ""){
                $ar = explode("/", $path);
                $file = $ar[count($ar) - 1];
                $path = Path::cut($path, 1, false, "/");
                Data::edit(SERVER_ROOT . $path, $file, $content);
            } else {
                mkdir(SERVER_ROOT . $path, 0777, true);
            }
            Communication::sendBack(true);
        }
        public static function edit(string $path, string $content){
            $res = DataStorageHelper::loadConfig();
            $ext = pathinfo($path, PATHINFO_EXTENSION);
            if($ext != ""){
                $ar = explode("/", $path);
                $file = $ar[count($ar) - 1];
                $path = Path::cut($path, 1, false, "/");
                Data::edit(SERVER_ROOT . $res -> rootPath . $path, $file, $content);
            } else {
                mkdir(SERVER_ROOT . $res -> rootPath . $path, 0777, true);
            }
            Communication::sendBack(true);
        }
        public static function get(string $path, bool $print = true){
            $res = DataStorageHelper::loadConfig();
            $content = file_get_contents(SERVER_ROOT . $res -> rootPath . $path);
            Communication::sendBack($content, true, $print);
            return $content;
        }
    }