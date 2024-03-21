<?php

    class BinaryImage {
        public $img;
        public $iterator;
        public $draw;
        function __construct($r){
            $buf = [];
            foreach(unpack("S*", $r) as $n){
                $buf[] = sprintf("%016b", $n);
            }
            
            $width      = bindec($buf[0]);
            $height     = bindec($buf[1]);
            $widthS     = $width / 16;
            $heightS    = $height / 16;
            $length     = count($buf) - 2;

            $mem1 = memory_get_usage();
            $this -> draw  = new ImagickDraw();
            $this -> draw -> setFillColor(new ImagickPixel('black'));
            $this -> img = new Imagick();
            $this -> img -> newImage($width, $height, new ImagickPixel('white'), 'png');
            $this -> img -> setImageFormat('png');
            $this -> iterator = $this -> img -> getPixelIterator();

            $data = array_slice($buf, 2);
            for($i = 0; $i < $length; $i += 17){
                $index = bindec($data[$i]);
                $mod = $index % $widthS;
                $x = $mod * 16;
                $y = ($index - $mod ) / $widthS * 16;
                for($iK = 0; $iK < 16; $iK++){
                    $this -> _16BitsToImg($data[$i + $iK + 1], $x, $y + $iK);
                }
            }
            $this -> img -> drawImage($this -> draw);
            file_put_contents ("test_1.png", $this -> img);
            $this -> img -> destroy();
        }
        public function _16BitsToImg($num, $x, $y){
            $r = array_reverse(str_split($num));
            foreach($r as $key => $val){
                if($val == 1){
                    $this -> draw -> point($x + $key, $y);
                }
            }
        }
    }