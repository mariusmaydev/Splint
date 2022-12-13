<?php

    class StringTools {
        public static function indent(string $str, int $amount = 4) : string {
            $strOut = str_replace("\n", "\n " . str_repeat(" ", $amount), $str);
            return $strOut;
        }
    }