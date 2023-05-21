<?php

    require_once dirname(__FILE__) . "/../email/emailObject.php";
    require_once dirname(__FILE__) . "/../email/imap/imap.php";
    require_once dirname(__FILE__) . "/../DataStorage/DataStorage.php";
    require_once dirname(__FILE__) . "/../CORE.php";

    class email {
        public static function get_Header_by_index(array $index, bool $print = true){
            $con = imap::connect($_POST["login"]);
            $MC = imap_check($con);
            $start = $MC -> Nmsgs - $index["start"];
            $end = $MC -> Nmsgs - $index["start"] - $index["amount"] + 1;
            $res = imap_fetch_overview($con, "{$start}:{$end}");
            imap_close($con);
            Communication::sendBack($res, true, $print);
            return $res;
        }     
        public static function get_Header_by_UID(int $UID, bool $print = true){
            $con = imap::connect($_POST["login"]);
            $MC = imap_check($con);
            $start = imap_msgno($con, $UID);
            $end = $start;
            $res = imap_fetch_overview($con, "{$start}:{$end}");
            imap_close($con);
            Communication::sendBack($res[0], true, $print);
            return $res;
        }     
        public static function get_by_index(array $index, bool $print = true){
            $res = [];
            $con = imap::connect($_POST["login"]);
            $MC = imap_check($con);
            for($i = 0; $i < $index["amount"]; $i++){
                array_push($res, imap::getEmailObject($con, $MC -> Nmsgs - $index["start"] - $i));
            }
            Communication::sendBack($res, true, $print);
            return $res;
        }      
        public static function save_by_index(array $index, bool $print = true){
            $res = [];
            $con = imap::connect($_POST["login"]);
            $MC = imap_check($con);
            for($i = 0; $i < $index["amount"]; $i++){
                $m = imap::getEmailObject($con, $MC -> Nmsgs - $index["start"] - $i);
                DataStorage::edit("/files/" . $m -> header -> Msgno . ".txt", json_encode($m));
                //imap_uid($con, $m -> header -> Msgno)
            }
            Communication::sendBack($res, true, $print);
            return $res;
        } 
        public static function get_saved_by_index(array $index, bool $print = true){
            // for()
            $res = [];
            $con = imap::connect($_POST["login"]);
            $MC = imap_check($con);
            for($i = 0; $i < $index["amount"]; $i++){
                $m = json_encode(imap::getEmailObject($con, $MC -> Nmsgs - $index["start"] - $i));
                Debugg::log($m);
                DataStorage::edit("/files/mail_" . $i . ".txt", $m);
                // array_push($res, imap::getEmailObject($con, $MC -> Nmsgs - $index["start"] - $i));
            }
            Communication::sendBack($res, true, $print);
            return $res;
        } 
        public static function get_by_UID(int $UID, bool $print = true){
            Debugg::log($UID);
            $con = imap::connect($_POST["login"]);
            $emailObj = imap::getEmailObject($con, imap_msgno($con, $UID));
            Communication::sendBack($emailObj, true, $print);
            return $UID;
        }
        public static function filter(string $query){
            $con = imap::connect($_POST["login"]);

            $t = imap_search($con, $query, SE_UID);
            Communication::sendBack($t);
        }
        public static function removeMail(array $messageNums, bool $print = true){
            $con = imap::connect($_POST["login"]);
            $MC = imap_check($con);

            foreach ($messageNums as $message){
                imap_delete($con, $MC -> Nmsgs - $message);
            }
            imap_expunge($con);
            Communication::sendBack(true, false, $print);
        }
        public static function removeMail_UID(int $UID, bool $print = true){
            $con = imap::connect($_POST["login"]);
            imap_delete($con, imap_msgno($con, $UID));
            imap_expunge($con);
            Communication::sendBack(true, false, $print);
        }

    }