<?php

    trait HTMLElement {
        protected static function genElement(string $type, string $id = ""): string {
            if($id != ""){
                $id = "id='" . $id . "'";
            }
            return "<" . $type . " " . $id . "></" . $type . ">\n";
        }
    }

    class HTML {
        use HTMLElement;
        public static function getBody(string $id, bool $echo = true) : string {
            $str = self::genElement("body", "BODY_" . $id);
            if($echo){
                echo $str;
            }
            return $str;
        }
        public static function getScript(bool $defer = false, bool $sync = false, string|null $type = null, string $data = "", bool $echo = false) : string {
            if($type != null){
                $type = "type=\"" . $type . "\"";
            }
            if($defer){
                $defer = "defer ";
            }
            if($sync){
                $sync = "sync";
            }
            if($data != ""){
                $data = "\r\n" . $data . "\r\n";
            }
            $str = "<script " . $type . " " . $defer . $sync . ">" . $data . "</script>\n";
            if($echo){
                echo $str;
            }
            return $str;
        }
        public static function getElement(string $tagName, string $id = null, bool $echo = false) : string {
            $str = self::genElement($tagName, $id);
            if($echo){
                echo $str;
            }
            return $str;
        }
    }