<?php 

    class emailObject {    
        public $charset     = "";
        public $htmlmsg     = "";
        public $plainmsg    = "";
        public $header      = "";
        public $attachments = [];

        public function __construct(){

        }
        public function addAttachment($attachment){
            array_push($this -> attachments, $attachment);
        }
    }