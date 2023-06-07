<?php namespace moonraker;
    use Communication;
use stdClass;

    // $rootpath = realpath($_SERVER["DOCUMENT_ROOT"]);
    // require_once $rootpath.'/fd/resources/php/CORE.php';
    require_once dirname(__FILE__) . "/../../CORE.php";

    class moonraker {
        static $APIkey = "be2f4bf2cc1f441db393a892e9bf7a48";
        public static function printStart(){
            // Communication::sendBack($_POST["name"]);
            $post = new stdClass();
            $post -> method = "printer.print.start";
            $post -> id = 4654;
            $post -> params = new stdClass();
            $post -> params -> filename = "test.gcode";
            self::post('/printer/print/start?filename=' . "test.gcode" . '', $post);

        }
        public static function getServerInfo(){
            $post = new stdClass();
            $post -> method = "server.info";
            $post -> id = 9546;
            self::get("/server/info", $post);
        }
        public static function post(string $path, stdClass $post){
            self::call("POST", $path, $post);
        }
        public static function get(string $path, stdClass $post){
            self::call("GET", $path, $post);
        }
        public static function call(string $request, string $path, stdClass $post){
            $post -> jsonrpc = "2.0";
            $post = \json_encode($post);
            $curl = curl_init();
            $options = [
                CURLOPT_RETURNTRANSFER  => true,
                CURLOPT_URL             => 'http://192.168.178.82' . $path,//?finalize=true
                CURLOPT_CUSTOMREQUEST => $request,
                CURLOPT_HTTPHEADER      => [
                    // 'Authorization: Bearer ' . self::$APIkey,
                    'Content-Type: application/json',
                    // 'Accept: application/json'
                ],
                CURLOPT_POST            => $post
            ];
            
            curl_setopt_array($curl, $options);
            // if($data != null){
            //     $data = json_encode($data);
            //     curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
            // }
            $result = curl_exec($curl);
            
            if(curl_errno($curl)){
                error_log($curl);
            }
            curl_close($curl);
            Communication::sendBack($result);
        }
    }