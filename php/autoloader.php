<?php
use Splint\File\File_DeepScan;
    include_once realpath($_SERVER["DOCUMENT_ROOT"]) . '/Splint/php/DataManagement/shmop/S_shmop.php';
    include_once realpath($_SERVER["DOCUMENT_ROOT"]) . '/Splint/php/Tools/File/File_DeepScan.php';
    include_once realpath($_SERVER["DOCUMENT_ROOT"]) . '/Splint/php/Debugger/Debugger.php';
    include_once realpath($_SERVER["DOCUMENT_ROOT"]) . '/Splint/php/Debugger/ErrorHandler.php';

spl_autoload_register(function($className) {
	$file = dirname(__DIR__) . '\\php' ;
	$file = str_replace('\\', DIRECTORY_SEPARATOR, $file);
    // Debugger::log($file);
    $f = S_shmop::read("SplintAutoloaderMap");
    if($f == null || true){
        $f = File_DeepScan::scanDir($file);
        S_shmop::write("SplintAutoloaderMap", $f);
    }
    if(!File_DeepScan::search($f, $className)){
        $f = File_DeepScan::scanDir($file);
        S_shmop::write("SplintAutoloaderMap", $f);
        File_DeepScan::search($f, $className);
    }
    return;
});

// function search(array $fileMap, string $className){
//     foreach($fileMap as $key => $value){
//         foreach ($value as $fileName) {
//             if($fileName == $className . '.php'){
//                 $path = $key . '\\'. $fileName;
//                 include_once str_replace('\\\\', '\\', $path);
//                 return true;
//             }
//         }
//     }
//     return false;
// }

//   function deepScan($dir = __DIR__){
//     static $allFiles = [];
//     $allFiles[$dir] = [];
  
//      $directories = array_values(array_diff(scandir($dir), ['.', '..']));
//      foreach($directories as $directory){
//        if(is_dir("$dir\\$directory")){
//          foreach(deepScan("$dir\\$directory") as $key => $value) $allFiles[$key] = $value;
//        }
//        else{
//         $allFiles[$dir][] = "$directory";
//        }
//      }
//      return $allFiles;
//   }
