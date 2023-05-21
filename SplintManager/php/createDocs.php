<?php

    $rootpath = realpath($_SERVER["DOCUMENT_ROOT"]);
    require_once $rootpath.'/Splint/php/CORE.php';

    class createDocs {
        public static function start(){
            $path = ['js'];
            $a = PATH_1::getFolderPaths(Path_1::fromRoot(SERVER_ROOT , SPLINT_ROOT_ABS, ...$path));
            $b = file_get_contents($a[0]);
            Communication::sendBack($b);
        }
    }
