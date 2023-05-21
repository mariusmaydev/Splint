<?php

    require_once dirname(__FILE__) . "/../CORE.php";
    require_once dirname(__FILE__) . "/../JSBuilder/JSBuilderHelper.php";

    class JSBuilder {
        public static function test(){
            $a = JSBuilderHelper::test();
            $b = $a['HTTP_REFERER'];
            $c = str_replace(".php", "_includes.json", $b);
            $f = file_get_contents($b);
            $d = substr($f, strpos($f, "module"), 20);
            $strs = [];
            $n = 0;
            $g = 0;
            // do {
            //     $e = getStringBetween($f, "part", "part", $n);
            //     if($e -> str == ""){
            //         break;
            //     }
            //     $n = $e -> index;
            //     array_push($strs, $e);
            // } while ($n < strlen($f));
            $m = StringTools::getAllMatchesBetween($f, '/<part src="', '"><\/part>');
            // $h = preg_match_all('/<part src="(.*?)"><\/part>/s', $f, $m, PREG_PATTERN_ORDER);
            Communication::sendBack($m);
        }
    }