<?php 
    //----------------------------------------------------------------
    // performantes 2-Dimensionales Datenfeld  (array[x][y])
    //
    // - kann nur integer fassen
    //----------------------------------------------------------------
    class fixedArray {
        public $array;
        public $x;
        public $y;
        private $error = 0;
        private $fill = 0;
        function __construct(int $x, int $y){
            $this -> array = new SplFixedArray($x * $y);
            $this -> x = $x;
            $this -> y = $y;
        }
        public function getFill() : int {
            return $this -> fill;
        }
        public function returnOnError($value){
            $this -> error = $value;
        }
        public function set(int $x, int $y, $value) : void {
            $index = $y * $this -> x + $x;
            if($index < $this -> array -> getSize() && $index >= 0){
                $this -> array[$index] = $value;
                $this -> fill++;
            }
        }
        public function get(int $x, int $y){
            if(isset($this -> array[$y * $this -> x + $x])){
                return $this -> array[$y * $this -> x + $x];
            } else {
                return $this -> error;
            }
        }
        public function getIndexForCoords(int $x, int $y) : int {            
            $index = $y * $this -> x + $x;
            if($x < $this -> x && $y < $this -> y && $index >= 0 && $index < $this -> array -> getSize()){
                return $index;
            } else {
                return -1;
            }
        }
        public function getCoordsForIndex(int $index) : array {
            $mod = $index % $this -> x;
            $array = array();
            $array['x'] = $mod;
            $array['y'] = ($index - $mod) / $this -> x;
            return $array;
        }
        public function getArray() : array {
            $array = array();
            for($y = 0; $y < $this -> y; $y++){
                for($x = 0; $x < $this -> x; $x++){
                    $array[$x][$y] = $this -> get($x, $y);
                }
            }
            return $array;
        }
        public function fromArray(array $array, int $dimensions = 1, bool $binaryFlag = false) : void {
            if($dimensions == 1){
                if($binaryFlag){
                    for($i = 0; $i < count($array); $i++){
                        if($array[$i] == 0){
                            $this -> array[$i] = 1;
                        } else {
                            $this -> array[$i] = 0;
                        }
                    }
                } else {
                    for($i = 0; $i < count($array); $i++){
                        $this -> array[$i] = $array[$i];
                    }
                }
            } else {
                for($y = 0; $y < $this -> y; $y++){
                    for($x = 0; $x < $this -> x; $x++){
                        if($binaryFlag){
                            if($array[$x][$y] == 0){
                                $this -> set($x, $y, 0);
                            } else {
                                $this -> set($x, $y, 1);
                            }
                        } else {
                            $this -> set($x, $y, $array[$x][$y]);
                        }
                    }
                }
            }
        }
    }