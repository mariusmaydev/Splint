<?php 

    class APILinks {
        public static function bind_GoolgeIcons(){
            echo "<link rel='preload' href='" . APIList::googleIcons . "' as='style' crossorigin/>";
            echo "<link rel='stylesheet' href='" . APIList::googleIcons . "' crossorigin/>";
        }
        public static function bind_jQuery(){
            echo "<script src='" . APIList::jQuery . "'></script>";
        }
        public static function bind_bootstrapIcons(){
            echo "<script src='" . APIList::bootstrapIcons . "'></script>";
        }
    }

    class APIList {
        const jQuery            = "https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js";
        const googleIcons       = "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block";
        const bootstrapIcons    = "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css";
    }