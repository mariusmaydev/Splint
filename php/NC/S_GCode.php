<?php

    class S_GCode {
        protected $pathObject   = null;
        protected $str_start    = "";
        protected $str_end      = "";

        public function __construct(PathObject $pathObject) {
            $this -> pathObject = $pathObject;
            Debugger::log($this -> pathObject);
        }
        public function gen(){
            $this -> genStart();
            $this -> genEnd();
            
        }
        private function genStart() : void {
            $str = "G28\r\n";
            $this -> str_start = $str;
        }
        private function genEnd(){
            $str = "G28\r\n";
            $this -> str_end = $str;

        }
    }