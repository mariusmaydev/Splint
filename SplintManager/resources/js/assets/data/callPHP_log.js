
class CallPHP_log {
    static async read_error_log(){
        let uri = location.origin + "/" + SPLINT.config.main.paths.error_log + "PHP_error_log.log";
        return SPLINT.Utils.Files.read(uri, false);
    }
    static async read_debugg_log(){
        let uri = location.origin + "/" + SPLINT.config.main.paths.error_log + "PHP_debugg_log.log";
        return SPLINT.Utils.Files.read(uri, false);
    }
    static async read_MySQL_log(){
        let uri = location.origin  + SPLINT.config.main.paths.error_log + "PHP_error_log_MySQL.log";
        return SPLINT.Utils.Files.read(uri, false);
    }
}