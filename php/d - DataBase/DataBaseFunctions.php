<?php namespace DataBase\Functions;

    use DataSet;
    use DivisionByZeroError;
    use mysqli_result;
    use mysqli;
    use stdClass;
    use Debugg;

    enum ResultOrder {
        // Datensätze immer als Array ausgeben.
        case FORCE_ARRAY;
        // Datensätze als Array ausgeben wenn mehr als 1 Datensatz, sonst String.
        case NORMAL;
    }

    class Tools {
        protected static function fetchResult($result, ResultOrder $orderType = ResultOrder::NORMAL) : bool|array|string|null {
            if(gettype($result) == 'object') {
                switch($orderType) {
                    case ResultOrder::FORCE_ARRAY:
                        return mysqli_fetch_all($result);
                        break;
                    case ResultOrder::NORMAL:
                        return mysqli_fetch_assoc($result);
                        break;
                }
            } else {
                return false;
            }
        }
        protected static function querySQL(mysqli|bool $connection, string $command) : mysqli_result|bool {
            if(gettype($connection) == 'object'){
                return mysqli_query($connection, $command);
            }
            return false;
        }
        public static function getConnection(string $DBName, bool $createIfNotExist = true) : mysqli|bool {
            if($createIfNotExist){
                $sql = "CREATE DATABASE IF NOT EXISTS $DBName";
                $conn = mysqli_connect(SPLINT_DATABASE_CONFIG -> hostname, SPLINT_DATABASE_CONFIG -> userName, SPLINT_DATABASE_CONFIG -> password);
                $conn -> query($sql);
                $conn -> select_db($DBName); 
                return $conn;
            } else {
                return mysqli_connect(SPLINT_DATABASE_CONFIG -> hostname, SPLINT_DATABASE_CONFIG -> userName, SPLINT_DATABASE_CONFIG -> password, $DBName);
            }
        }
    }

    class Functions {
        public static function get(DataSet $dataSet){

        }
        public static function insert(DataSet $dataSet){

        }
        public static function removeTable(string $TBName){
            
        }
        public static function removeDB(string $DBName) {

        }
    }



    // class Table {
    //     public $TBName;
    //     public function __construct(string $TBName){
    //         $this -> TBName = $TBName;
    //     }
    //     public function addColumn(string $Name, string $properies) : void {
    //         array_push($this -> columns, [$Name, $properies]);
    //     }
    //     public function generate(){
    //         $sql = "CREATE DATABASE IF NOT EXISTS " . $this -> DBName;
    //         if ($con -> query($sql)) {
    //             $con -> select_db($DBName); 
    //             return true;
    //         } else {
    //             return false;
    //         }
    //     }
    //     public static function new(){

    //     }
    // }

    // protected static function generateSQL(DataSet $dataset, $type = null){
    //     $sql = "";
    //     if($type == self::SQL_NEW){
    //       $TBName = $dataset -> TBName();
    //       $sql = "INSERT IGNORE INTO $TBName (";
    //       $flag = false;
    //       foreach ($dataset -> getEntrys_Names() as $data) {
    //         if($flag){
    //           $sql .= ", ";
    //         }
    //         $sql .= $data[0];
    //         $flag = true;
    //       }
    //       $sql .= ") VALUES (";
    //       $flag = false;
    //       foreach ($dataset -> getEntrys_Names() as $data) {
    //         if($flag){
    //           $sql .= ", ";
    //         }
    //         $sql .= "'" . $data[1] . "'";
    //         $flag = true;
    //       }
    //       $sql .= ")";
    //     } else {
    //       $sql = "CREATE TABLE IF NOT EXISTS " . $dataset -> TBName() . " (";
    //       foreach($dataset -> getEntrys_Names() as $data){
    //         $sql .= implode(' ', $data) . ", ";
    //       }
    //       $sql .= "PRIMARY KEY (" . $dataset -> primaryKey() . "))";
    //     }
    //     return $sql;
    //   }

    // class DataBase {
    //     public $DBName;
    //     public function __construct(string $DBName){
    //         $this -> DBName = $DBName;
    //     }
    //     public function addColumn(string $Name, string $properies) : void {
    //         array_push($this -> columns, [$Name, $properies]);
    //     }
    //     public function generate(){
    //         $sql = "CREATE DATABASE IF NOT EXISTS " . $this -> DBName;
    //         if ($con -> query($sql)) {
    //             $con -> select_db($DBName); 
    //             return true;
    //         } else {
    //             return false;
    //         }
    //     }
    //     public static function new(){

    //     }
    // }