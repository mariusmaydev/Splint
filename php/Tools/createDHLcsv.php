<?php

    class DHLcsv_S {
        public $coupon = "";
        public $address;
        private $head = 'SEND_NAME1;SEND_NAME2;SEND_STREET;SEND_HOUSENUMBER;SEND_PLZ;SEND_CITY;SEND_COUNTRY;RECV_NAME1;RECV_NAME2;RECV_STREET;RECV_HOUSENUMBER;RECV_PLZ;RECV_CITY;RECV_COUNTRY;PRODUCT;COUPON;SEND_EMAIL' . "\r\n";

        public function __construct($address) {
            $this -> address = $address;
        }
        public function get() : string {
            $PacketType = 'err';
            if ($this -> address['Country'] == 'DE') {
                $this -> address['Country']         = "DEU";
                $PacketType         = "PAECKS.DEU";
            } elseif ($this -> address['Country'] == 'AU') {
                $this -> address['Country']         = "AUT";
                $PacketType         = "PAECK.EU";
            }
            $shipper = "Funkendesign" . ";" . "DHL Online Frankierung" . ";" . "Wernsdorfer Straße" . ";" . "27a" . ";" . "09322" . ";" . "Penig" . ";" . "DEU" . ";";
            $consignee = $this -> address['FirstName'] . " " . $this -> address['LastName'] .";". "-" .";". $this -> address['Street'] .";". $this -> address['HouseNumber'] .";". $this -> address['Postcode'] .";". $this -> address['City'] .";". $this -> address['Country'] .";". $PacketType .";". $this -> coupon .";". $this -> address['Email'];
            
            $res = $this->head . $shipper . $consignee;

            $csv = iconv(mb_detect_encoding($res), 'Windows-1252//TRANSLIT', $res);

            return $csv;
        }

    }