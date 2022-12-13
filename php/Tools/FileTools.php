<?php

    class FileTools {
        public static function getExtension(string $file_or_path) : string {
            return substr($file_or_path, -3);
        }
    }