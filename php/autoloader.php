<?php
    include realpath($_SERVER["DOCUMENT_ROOT"]) . '/Splint/php/DataManagement/shmop/S_shmop.php';

spl_autoload_register(function($className) {
	$file = dirname(__DIR__) . '\\php\\' ;
	$file = str_replace('\\', DIRECTORY_SEPARATOR, $file);
    
    $f = S_shmop::read("SplintAutoloaderMap");
    if($f == null){
        $f = deepScan($file);
        S_shmop::write("SplintAutoloaderMap", $f);
    }
    if(!search($f, $className)){
        $f = deepScan($file);
        S_shmop::write("SplintAutoloaderMap", $f);
        search($f, $className);
    }
    return;
});
function search(array $fileMap, string $className){
    foreach($fileMap as $key => $value){
        foreach ($value as $fileName) {
            if($fileName == $className . '.php'){
                $path = $key . '\\'. $fileName;
                include str_replace('\\\\', '\\', $path);
                return true;
            }
        }
    }
    return false;
}

  function deepScan($dir = __DIR__){
    static $allFiles = [];
    $allFiles[$dir] = [];
  
     $directories = array_values(array_diff(scandir($dir), ['.', '..']));
     foreach($directories as $directory){
       if(is_dir("$dir\\$directory")){
         foreach(deepScan("$dir\\$directory") as $key => $value) $allFiles[$key] = $value;
       }
       else{
        $allFiles[$dir][] = "$directory";
       }
     }
     return $allFiles;
  }
