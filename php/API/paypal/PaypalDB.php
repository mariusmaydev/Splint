<?php namespace paypal;
use DataBase;
use DataSet;

class PaypalDB extends DataBase {
    public static $TBName     = "transactions";
    public static $DBName     = "transactions";
    public static $keyName;
    public static $key;
    
    const ID                            = "id";
    const PRICE                         = "price";
    const CURRENCY                      = "currency";
    const ORDER_ID                      = "order_id";
    const TRANSACTION_ID                = "transaction_id";
    const PAYMENT_SRC                   = "payment_src";
    const PAYMENT_SRC_CARD_NAME         = "payment_src_card_name";
    const PAYMENT_SRC_CARD_LAST_DIGITS  = "payment_src_card_last_digits";
    const PAYMENT_SRC_CARD_EXPIRY       = "payment_src_card_expiry";
    const PAYMENT_SRC_CARD_BRAND        = "payment_src_card_brand";
    const PAYMENT_SRC_CARD_TYPE         = "payment_src_card_type";
    const PAYMENT_STATUS                = "payment_status";
    const TIME_CREATED                  = "time_created";
    const TIME_MODIFIED                 = "time_modified";

    public static function getStruct(){
        $DS2 = new DataSet();
        $DS2 -> newEntry(PaypalDB::ID,                              "INT(11)");
        $DS2 -> newEntry(PaypalDB::PRICE,                           "FLOAT(10,2)");
        $DS2 -> newEntry(PaypalDB::CURRENCY,                        "VARCHAR(10)"); 
        $DS2 -> newEntry(PaypalDB::ORDER_ID,                        "VARCHAR(50)");
        $DS2 -> newEntry(PaypalDB::TRANSACTION_ID,                  "VARCHAR(50)");
        $DS2 -> newEntry(PaypalDB::PAYMENT_SRC,                     "VARCHAR(50)");
        $DS2 -> newEntry(PaypalDB::PAYMENT_SRC_CARD_NAME,           "VARCHAR(50)");
        $DS2 -> newEntry(PaypalDB::PAYMENT_SRC_CARD_LAST_DIGITS,    "VARCHAR(4)");
        $DS2 -> newEntry(PaypalDB::PAYMENT_SRC_CARD_EXPIRY,         "VARCHAR(10)");
        $DS2 -> newEntry(PaypalDB::PAYMENT_SRC_CARD_BRAND,          "VARCHAR(25)");
        $DS2 -> newEntry(PaypalDB::PAYMENT_SRC_CARD_TYPE,           "VARCHAR(25)");
        $DS2 -> newEntry(PaypalDB::PAYMENT_STATUS,                  "VARCHAR(25)");
        $DS2 -> newEntry(PaypalDB::TIME_CREATED,                    "DATETIME");
        $DS2 -> newEntry(PaypalDB::TIME_MODIFIED,                   "DATETIME");
        $DS2 -> primaryKey(PaypalDB::ID);
        $DS2 -> TBName("transactions");
        $DS2 -> DBName("transactions");
        return $DS2;
    }
  }