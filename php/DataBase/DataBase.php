<?php namespace DataBase;

    require_once 'DataBaseFunctions.php';

    define('SPLINT_DATABASE_CONFIG', (function(){
        $config = json_decode(file_get_contents(SERVER_ROOT . SPLINT_CONFIG -> paths -> DataBase -> config . "/DataBase.config.json"));
        if($config -> hostname == null){
            $config -> hostname = $_SERVER['HTTP_HOST'];
        }
        return $config;
    })());

    use DataBase\Functions\Tools as DBFunctions;
    use Debugg;
    use stdClass;
    
    final class DataBase extends DBFunctions {
        public static function executeDirect(string $command, string $DBName){
            $conn = self::getConnection(DBName: $DBName);
            $result = self::querySQL($conn, $command);
        }
        public static function get(Table $table, DataSet $dataSet, string $DBName){
            $conn = self::getConnection(DBName: $DBName);
            $set = implode(',', array_map(function($c){return $c -> name;}, $dataSet -> SET));
            $where = implode(', ', array_map(function($c){return $c -> name;}, $dataSet -> WHERE));	
            $sql = "SELECT $set FROM $table -> name WHERE" . $where;
            Debugg::log(self::querySQL($conn, $sql));
        }
        public static function insert(Table $table, DataSet $dataSet, string $DBName){
        }
        public static function createTable(Table $table, string $DBName){
            $sql = "CREATE TABLE IF NOT EXISTS " . $table -> name . " (";
            foreach($table -> columns as $column){
              $sql .= $column -> name . " " . $column -> params . ", ";
            }
            $sql .= "PRIMARY KEY (" . $table -> primaryKey -> name . "))";
            self::executeDirect($sql, DBName: $DBName);
        }
        public static function removeTable(Table $table, string $DBName) : void {
            $sql = "DROP TABLE IF EXISTS " . $table -> name;
            self::executeDirect($sql, DBName: $DBName);
        }

    }

    class Table {
        public $name;
        public $columns = [];
        public $primaryKey = null;

        public function __construct(string $Name){
            $this -> name = $Name;
        }
        public function addColumn(string $Name, string $params, bool $isPrimary = false){
            $column = new stdClass();
            $column -> name     = $Name;
            $column -> params   = $params;
            if($isPrimary){
                if($this -> primaryKey != null){
                    Debugg::warn("Primärschlüssel überschrieben. Alt: " . $this -> primaryKey -> name . "  Neu: " . $Name);
                }
                $this -> primaryKey = $column;
            }
            array_push($this -> columns, $column);
        }

        public function export(){
            $base = "INSERT IGNORE INTO " . $this -> name . " ";
            $names  = "";
            $params = "";
            foreach($this -> columns as $key => $column){
                $names .= $column -> name;
                $params .= $column -> params;
                if($key < count($this -> columns) -1){
                    $names  .= ",";
                    $params .= ",";
                }
            }
            return $base . "(" . $names . ") VALUES (" . $params . ")";
        }
    }

    // $a = new Table("test");
    // $a->addColumn("id", "int(11)", true);
    // $a->addColumn("name", "varchar(50)");
    // $a->addColumn("email", "varchar(50)");
    // DataBase::createTable($a, "test");

    // $dataSet = new DataSet();
    // $dataSet -> SET("name", "12");
    // $dataSet -> WHERE("id", "1");
    // DataBase::get($a, $dataset, "test");