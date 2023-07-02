<?php namespace Splint\File;

    enum PathObjectTypes {
        /**
         * @example array(
         *      [0] = "path\to\file1.ext",
         *      [1] = "path\to\file2.ext",
         *      ...
         * )
         */
        case PATH_LIST;

        /**
         * @example array(
         *      [0] = array(
         *              ["dirname"]     => "path\to",
         *              ["basename"]    => "file1.ext",
         *              ["extension"]   => "ext",
         *              ["filename"]    => "file1",
         *              ["path"]        => "path\to\file1.ext",
         *          ),
         *      [1] = array(
         *              ["dirname"]     => "path\to",
         *              ["basename"]    => "file2.ext",
         *              ["extension"]   => "ext",
         *              ["filename"]    => "file2",
         *              ["path"]        => "path\to\file2.ext",
         *          ),
         *      ...
         * )
         */
        case PATH_LIST_DETAILED;

        /**
         * @example array(
         *      ["file1"] = "path\to\file1.ext",
         *      ["file2"] = "path\to\file2.ext",
         *      ...
         * )
         */
        case FILE_NAME_TO_PATH;

        /**
         * @example array(
         *      ["file1"] = array(
         *              ["dirname"]     => "path\to",
         *              ["basename"]    => "file1.ext",
         *              ["extension"]   => "ext",
         *              ["path"]        => "path\to\file1.ext",
         *          ),
         *      ["file2"] = array(
         *              ["dirname"]     => "path\to",
         *              ["basename"]    => "file2.ext",
         *              ["extension"]   => "ext",
         *              ["path"]        => "path\to\file2.ext",
         *          ),
         *      ...
         * )
         */
        case FILE_NAME_TO_PATH_DETAILED;
    }
    class PathObject {
        protected $arr = [];
        protected $type = PathObjectTypes::PATH_LIST;
        public function __construct(){}
        public function removeByExtension(string ...$ext) : void {
            foreach($this -> arr as $key => $value){
                if(in_array($value["extension"], $ext)){
                    unset($this -> arr[$key]);
                }
            }
        }
        public function removeByName(string $fileName) : void {
            foreach($this -> arr as $key => $value){
                if($value["fileName"] == $fileName){
                    unset($this -> arr[$key]);
                }
            }
        }
        public function push(string $path) : void {
            $res = pathinfo(str_replace('\\\\', '\\', $path));
            $res["path"] = $path;
            array_push($this -> arr, $res); 
        }
        public function get(PathObjectTypes $type = PathObjectTypes::PATH_LIST) : array {
            switch($type){
                case PathObjectTypes::PATH_LIST : {
                    $res = [];
                    foreach($this -> arr as $key => $value){
                        \array_push($res, $value["path"]);
                    }
                    return $res;
                }; break;
                case PathObjectTypes::PATH_LIST_DETAILED : {
                    return $this -> arr;
                }; break;
                case PathObjectTypes::FILE_NAME_TO_PATH : {
                    $res = [];
                    foreach($this -> arr as $key => $value){
                        $res[$value["filename"]] = $value["path"];
                    }
                    return $res;
                }; break;
                case PathObjectTypes::FILE_NAME_TO_PATH_DETAILED : {
                    $res = [];
                    foreach($this -> arr as $key => $value){
                        $v = $value;
                        unset($v["filename"]);
                        $res[$value["filename"]] = $v;
                    }
                    return $res;
                }; break;

            }
        }
    }