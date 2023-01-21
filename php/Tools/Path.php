<?php 

trait PathHelper_T {
    protected static function buildPath(string ...$files) : string {
        $output = '';
        foreach($files as $key => $piece){
            $output .= $piece;
            if($key < count($files) -1){
                $output .= "/";
            }
        }
        return self::fixDoubleSlash($output);
    }
    protected static function fixDoubleSlash(string $path){
        return preg_replace('/([^:])(\/{2,})/', '$1/', $path);
    }
}

class PATH_1 {
    use PathHelper_T;
    
    public function __construct(){
        
    }
    public static function getURL(string ...$files) : string {
        return self::buildPath(...$files);
    }
    public static function fromRoot(string ...$files) : string{
        return self::buildPath(...$files);
    }
    public static function cut(string $path, int $amount = 6, bool $invert = false) : string {
        $path = explode('\\', $path);
        $max = count($path) -1;
        if($invert){
            for($i = 0; $i < $amount; $i++) {
                unset($path[$max - $i]);
            }
        } else {
            for($i = 0; $i < $amount; $i++) {
                unset($path[$i]);
            }
        }
        return implode('\\', $path);
    }
    public static function getFolderPaths(string $path) : array {
        $rii = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($path));
        $files = array(); 
        foreach($rii as $file) {
            if($file -> isDir()){ 
                continue;
            }
            $files[] = $file -> getPathname(); 
        }
        return $files;
    }
}

class Data {
    public static function edit($path, $file, $content = null){
        if (!file_exists($path)) {
            mkdir($path, 0777, true);
        }
        if ($content != null) {
            $fp = fopen($path . "/" . $file, "w");
            fwrite($fp, $content);
            fclose($fp);
        }
    }
}

function DataGetFolder($path, $flag = false){
    $array = scandir($path);
    array_splice($array, 0, 2);
    if($flag){
        foreach($array as $key => $element){
            if(substr($element, strlen($element)-2, 2) != "js"){
                $array = array_splice($array, $key);
            }
        }
    }
    return $array;
}


class Path {
    public const USERS          = "users";
    public const PROJECTS       = "projects";
    public const IMAGES         = "images";
    public const SHOPPING_CART  = "shoppingCart";

    public $pathElements = [];
    public $pathBase = "/fd/data";
    public $SSL = "http";
    public $domain = "localhost";
    function __construct(...$pathElements) {
        $this -> pathElements = $pathElements;
        array_unshift($this -> pathElements, $this -> pathBase);
        $this -> createPath();
    }
    public function getPathAsString($excludeFile = false) {
        $path = "";
        $flag = false;
        $offset = 0;
        if($excludeFile){
            $offset = -1;
        }
        for($i = 0; $i < count($this -> pathElements) + $offset; $i++){
            if($flag){
                $path.= "/";
            }
            $flag = true;
            $path.= $this -> pathElements[$i];
        }
        return $_SERVER["DOCUMENT_ROOT"] . $path;
    }
    public function getPathAndFile_relative(){
        $output = new stdClass();
        $output -> path = $this -> getPathAsString(true) . "/";
        $output -> file = $this -> pathElements[count($this -> pathElements)-1];
        return $output;
    }
    public function getPathAndFile_absolute(){
        $output = new stdClass();
        $output -> path = $this -> getPathAsString(true) . "/";
        $output -> file = $this -> pathElements[count($this -> pathElements)-1];
        return $output;
    }
    public function getURL(){
        $path = $this -> getPathAsString();
        return $this -> SSL . "://" . $this -> domain . $path;
    }
    private function createPath(){
        $path = $this -> getPathAsString(true);
        if (!file_exists($path)) {
            mkdir($path, 0777, true);
        }
    } 
    public function editData($data){
        $pathAndFile = $this -> getPathAsString();
        file_put_contents($pathAndFile, $data);
    }
    public function getData(){
        $pathAndFile = $this -> getPathAsString();
        return file_get_contents($pathAndFile);
    }
    private function deleteDirectory() {
        $dir = $this -> getPathAsString();
        if (!file_exists($dir)) {
            return true;
        }
        if (!is_dir($dir)) {
            return unlink($dir);
        }
        foreach (scandir($dir) as $item) {
            if ($item == '.' || $item == '..') {
                continue;
            }
            if (!deleteDirectory($dir . DIRECTORY_SEPARATOR . $item)) {
                return false;
            }
        }
        return rmdir($dir);
    }
    public function removeFile(){
        $path = $this -> getPathAsString();
        if (file_exists($path)) {
            unlink($path);
        }
    }
    public static function copyFile(string $from, string $to) : bool {
        if (!file_exists(self::cut($to, 1, false, '/'))) {
            mkdir(self::cut($to, 1, false, '/'), 0777, true);
        }
        return copy($from, $to);
    }
    public static function cut(string $path, int $amount = 6, bool $left = true, string $separator = '\\') : string {
        $path = explode($separator, $path);
        //Debugg::log($path);
        if($left){
            for($i = 0; $i < $amount; $i++) {
                unset($path[$i]);
            }
        } else {
            for($i = 0; $i < $amount; $i++) {
                unset($path[count($path) -1]);
            }
        }
        return implode($separator, $path);
    }
}