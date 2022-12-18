<?php

    trait HTMLElement {
        protected static function genElement(string $type, string $id = ""){
            if($id != ""){
                $id = "id='" . $id . "'";
            }
            echo "<" . $type . " " . $id . "></" . $type . ">\n";
        }
    }

    class HTML {
        use HTMLElement;
        public static function getBody(string $id) : void {
            self::genElement("body", "BODY_" . $id);
        }
    }