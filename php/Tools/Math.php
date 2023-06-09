<?php

    class Math {
        public static function Dez2Hex(int $dez) : string{
            $hex = dechex($dez);
            return "#" . str_pad($hex, 6, "0", STR_PAD_LEFT);
        }
        public static function Hex2Dez(string $hex) : int {
            $hex = str_replace("#", "", $hex);
            return hexdec($hex);
        }
    }
    function Dez2Hex(int $dez) : string{
        $hex = dechex($dez);
        return "#" . str_pad($hex, 6, "0", STR_PAD_LEFT);
    }
    function Hex2Dez(string $hex) : int {
        $hex = str_replace("#", "", $hex);
        return hexdec($hex);
    }