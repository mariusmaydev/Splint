<?php 

    trait T_imapHelper {
        public static function getHeader(IMAP\Connection $con, int $index) : string|false {
            return imap_fetchheader($con, $index);
        }
        public static function getStructure(IMAP\Connection $con, int $index) : stdClass|false {
            return imap_fetchstructure($con, $index);
        }
        private static function decodeBody(stdClass $partData, string &$data) {
            if($partData -> encoding == 4) {
                return quoted_printable_decode($data);
            } else if($partData -> encoding == 3){
                return base64_decode($data);
            }
            return false;
        }
        public static function getParams(stdClass $partData) : array {
            $params = [];
            if($partData -> parameters){
                foreach ($partData -> parameters as $param){
                    $params[strtolower($param -> attribute)] = $param -> value;
                }
            }            
            if($partData -> dparameters){
                foreach ($partData -> dparameters as $param){
                    $params[strtolower($param -> attribute)] = $param -> value;
                }
            }
            return $params;
        }
        public static function getAttachments(array $params, string $data, array &$attachments) : void {
            if(isset($params['filename']) || isset($params['name'])) {
                $obj = new stdClass();
                // filename may be given as 'Filename' or 'Name' or both
                if(isset($params['filename'])){
                    $obj -> filename = $params['filename'];
                } else if(isset($params['name'])){
                    $obj -> filename = $params['name'];
                }

                // filename may be encoded, so see imap_mime_header_decode()
                $obj -> data = $data;
                array_push($attachments, $obj);
            }
        }
    }

    class imap {
        use T_imapHelper;
        public static function connect(array $login) : IMAP\Connection|false {
            $mailbox = $login["server"] . ":" . $login["port"] . "/ssl/novalidate-cert";
            $userName = $login["email"];
            $password = $login["password"];
            return imap_open("{" . $mailbox . "}", $userName, $password);
        }
        public static function getEmailObject(IMAP\Connection $con, int $index) : emailObject {
            $emailObj = new emailObject();
            $emailObj -> header = imap_headerinfo($con, $index);

            $structure = imap_fetchstructure($con, $index);
            if(!isset($structure -> parts)){
                self::getPartFromIMAP($con, $index, $structure, 0, $emailObj);
            } else {
                foreach($structure -> parts as $partIndex => $part){
                    self::getPartFromIMAP($con, $index, $part, $partIndex + 1, $emailObj);
                }
            }
            return $emailObj;
        }
        private static function getPartFromIMAP($mbox,$mid,$p,$partno, &$emailObj) {
            // $partno = '1', '2', '2.1', '2.1.3', etc for multipart, 0 if simple
        
            // DECODE DATA
            $data = ($partno)?
                imap_fetchbody($mbox,$mid,$partno):  // multipart
                imap_body($mbox,$mid);  // simple
            // Any part may be encoded, even plain text messages, so check everything.
            if ($p->encoding==4)
                $data = quoted_printable_decode($data);
            elseif ($p->encoding==3)
                $data = base64_decode($data);
        
            // PARAMETERS
            // get all parameters, like charset, filenames of attachments, etc.
            $params = array();
            if (isset($p->parameters))
                foreach ($p->parameters as $x)
                    $params[strtolower($x->attribute)] = $x->value;
            if (isset($p->dparameters))
                foreach ($p->dparameters as $x)
                    $params[strtolower($x->attribute)] = $x->value;
        
            // ATTACHMENT
            // Any part with a filename is an attachment,
            // so an attached text file (type 0) is not mistaken as the message.
            if (isset($params['filename']) || isset($params['name'])) {
                // filename may be given as 'Filename' or 'Name' or both
                $filename = ($params['filename'])? $params['filename'] : $params['name'];
                // filename may be encoded, so see imap_mime_header_decode()
                $emailObj -> attachments[$filename] = base64_encode($data);  // this is a problem if two files have same name
            }
        
            // TEXT
            if ($p->type==0 && $data) {
                // Messages may be split in different parts because of inline attachments,
                // so append parts together with blank row.
                if (strtolower($p->subtype)=='plain')
                    $emailObj -> plainmsg.= trim($data) ."\n\n";
                else
                    $emailObj -> htmlmsg.= $data ."<br><br>";
                $emailObj -> charset = $params['charset'];  // assume all parts are same charset
            }
        
            // EMBEDDED MESSAGE
            // Many bounce notifications embed the original message as type 2,
            // but AOL uses type 1 (multipart), which is not handled here.
            // There are no PHP functions to parse embedded messages,
            // so this just appends the raw source to the main message.
            elseif ($p->type==2 && $data) {
                $emailObj -> plainmsg.= $data."\n\n";
            }
        
            // SUBPART RECURSION
            if (isset($p->parts)) {
                foreach ($p->parts as $partno0=>$p2)
                    self::getPartFromIMAP($mbox,$mid,$p2,$partno.'.'.($partno0+1), $emailObj);  // 1.2, 1.2.1, etc.
            }
        }
    }