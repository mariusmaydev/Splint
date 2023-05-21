<?php

    class StringTools {
        public static function indent(string $str, int $amount = 4) : string {
            $strOut = str_replace("\n", "\n " . str_repeat(" ", $amount), $str);
            return $strOut;
        }
        public static function getAllMatchesBetween(string $str, string $from, string $to) : array {
            preg_match_all($from . '(.*?)' . $to . '/s', $str, $matches, PREG_PATTERN_ORDER);
            return $matches[1];
        }
        public static function realUniqID($lenght = 10) {
            // uniqid gives 13 chars, but you could adjust it to your needs.
            if (function_exists("random_bytes")) {
                $bytes = random_bytes(ceil($lenght / 2));
            } elseif (function_exists("openssl_random_pseudo_bytes")) {
                $bytes = openssl_random_pseudo_bytes(ceil($lenght / 2));
            } else {
                throw new Exception("no cryptographically secure random function available");
            }
            return substr(bin2hex($bytes), 0, $lenght);
        }
        public static function getBool(string $str) : bool {
            return ($str == 'true');
        }
    }