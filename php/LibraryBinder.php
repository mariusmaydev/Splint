<?php

    class LibraryBinder {

        public static function loadThreeJS(){
            $obj = new stdClass();
            $obj -> imports = new stdClass();
            $obj -> imports -> SPLINT = SPLINT_ROOT . "/js/modules/ThreeJS/CORE.js";
            $obj -> imports -> splint = SPLINT_ROOT . "/js/modules/ThreeJS/CORE.js";
            $obj -> imports -> three = SPLINT_ROOT . "/lib/threeJS/build/three.module.js";
            $obj -> imports -> threeJS = SPLINT_ROOT . "/lib/threeJS/build/three.module.js";
            $obj -> imports -> {'@THREE_ROOT_DIR/'} = SPLINT_ROOT . "/lib/threeJS/";
            $obj -> imports -> {'@THREE_MODULES_DIR/'} = SPLINT_ROOT . "/lib/threeJS/examples/jsm/";
            $obj -> imports -> {'@SPLINT_MODULES_DIR/'} = SPLINT_ROOT . "/js/modules/";
            $obj -> imports -> {'@SPLINT_THREE_DIR/'} = SPLINT_ROOT . "/js/modules/ThreeJS/";
            echo HTML::getScript(false, false, "importmap", json_encode($obj, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES ));
        }

    }
