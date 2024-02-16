<?php namespace paypal;


    require_once dirname(__FILE__) . "/../../CORE.php";
    use Communication;
    use DataBaseHelper;
use Debugger;
use Exception;
use stdClass;

    class Paypal {
        public static function getPaypaylAuthAPI(){
            return PAYPAL -> SANDBOX?'https://api-m.sandbox.paypal.com/v1/oauth2/token':'https://api-m.paypal.com/v1/oauth2/token';;
        }
        public static function getPaypalAPI(){
            return PAYPAL -> SANDBOX?'https://api-m.sandbox.paypal.com/v2/checkout':'https://api-m.paypal.com/v2/checkout';
        }
        public static function getPaypalClientID(){
            return PAYPAL -> SANDBOX?PAYPAL -> SANDBOX_CLIENT_ID:PAYPAL -> PROD_CLIENT_ID;
        }
        public static function getPaypalSecret(){
            return PAYPAL -> SANDBOX?PAYPAL -> SANDBOX_CLIENT_SECRET:PAYPAL -> PROD_CLIENT_SECRET;
        }        

        public static function connectDB(){
            $db = DataBaseHelper::connectToServer("transactions");
            if($db -> connect_errno) {
                printf("Connect failed: %s\n", $db -> connect_error);
                exit();
            }
            return $db;
        }
        public static function generateUserIDToken($sendBack = false){
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, self::getPaypaylAuthAPI());
            curl_setopt($ch, CURLOPT_HEADER, false);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_USERPWD, self::getPaypalClientID().":".self::getPaypalSecret());
            curl_setopt($ch, CURLOPT_POSTFIELDS, 
                "response_type=id_token&grant_type=client_credentials"
            );
            $auth_response = json_decode(curl_exec($ch));
            $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            curl_close($ch);

            if($http_code != 200 && !empty($auth_response -> error)){
                throw new Exception('Failed to gen Access Token: '.$auth_response -> error." >>> ". $auth_response -> error_description);
            }

            if(!empty($auth_response)){
                Communication::sendBack($auth_response -> id_token, true, $sendBack);
                return $auth_response -> access_token;
            } else {
                Communication::sendBack(false, true, $sendBack);
                return false;
            }

        }
        public static function transactionStatus(){ 
            $payment_ref_id = $statusMsg = '';
            $status = 'error';

            if(!empty($_POST['ref_id'])){
                $payment_txn_id = base64_decode($_POST['ref_id']);
                
                $sqlQ = "SELECT id,order_id,transaction_id,paid_amount,paid_amount_currency,payment_source,payment_source_card_name,payment_source_card_last_digits,payment_source_card_expiry,payment_source_card_brand,payment_source_card_type,payment_status,created FROM transactions WHERE transaction_id = ?"; 
                $db = self::connectDB();
                $stmt = $db->prepare($sqlQ);  
                $stmt->bind_param("s", $payment_txn_id); 
                $stmt->execute(); 
                $stmt->store_result(); 
            
                if($stmt->num_rows > 0){ 
                    // Get transaction details 
                    $stmt->bind_result($payment_ref_id, $order_id, $transaction_id, $paid_amount, $paid_amount_currency, $payment_source, $payment_source_card_name, $payment_source_card_last_digits, $payment_source_card_expiry, $payment_source_card_brand, $payment_source_card_type, $payment_status, $created); 
                    $stmt->fetch(); 
                    
                    Communication::sendBack(true);  
                } else { 
                    Communication::sendBack(false);  
                } 
            } else { 
                Communication::sendBack(false);  
                exit; 
            } 
        }
        public static function generateAccessToken() {
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, self::getPaypaylAuthAPI());
            curl_setopt($ch, CURLOPT_HEADER, false);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_USERPWD, self::getPaypalClientID().":".self::getPaypalSecret());
            curl_setopt($ch, CURLOPT_POSTFIELDS, "grant_type=client_credentials");
            $auth_response = json_decode(curl_exec($ch));
            $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            curl_close($ch);

            if($http_code != 200 && !empty($auth_response -> error)){
                throw new Exception('Failed to gen Access Token: '.$auth_response -> error." >>> ". $auth_response -> error_description);
            }

            if(!empty($auth_response)){
                return $auth_response -> access_token;
            } else {
                return false;
            }
        }
        public static function createOrder($productInfo, $payment_source){
            $accessToken = self::generateAccessToken();

            if(empty($accessToken)){
                return false;
            } else {
                $obj = json_decode($productInfo);
                $purchaseUnits = $obj -> purchase_units;
                if(isset($obj -> shippingAddress)){
                    $shippingAddress = json_decode(json_encode($obj -> shippingAddress));
                    $FirstName      = $shippingAddress -> FirstName;
                    $LastName       = $shippingAddress -> LastName;
                    $Title          = $shippingAddress -> Title;
                    $Street         = $shippingAddress -> Street;
                    $Country        = $shippingAddress -> Country;
                    $PLZ            = $shippingAddress -> Postcode;
                    $HouseNumber    = $shippingAddress -> HouseNumber;
                    $City           = $shippingAddress -> City;

                    $payer = new stdClass();
                    $payer -> address = new stdClass();
                    $payer -> address -> address_line_1  = $Street . " " . $HouseNumber;
                    $payer -> address -> admin_area_2    = $City;
                    $payer -> address -> postal_code     = $PLZ; 
                    $payer -> address -> admin_area_1    = $Country; 
                    $payer -> address -> country_code    = "DE";
                    $payer -> name = new stdClass();
                    // $payer -> name -> prefix        = $Title;
                    $payer -> name -> given_name    = $Title ." " . $FirstName;
                    $payer -> name -> last_name     = $LastName;
                    $purchaseUnits[0] -> shipping = new stdClass();
                    $purchaseUnits[0] -> shipping -> address = $payer -> address;
                    $purchaseUnits[0] -> shipping -> name = new stdClass();
                    $purchaseUnits[0] -> shipping -> name -> full_name = $Title . " " . $FirstName . " " . $LastName;
                }

                
                $postParams = array(
                    "intent" => "CAPTURE",
                    "purchase_units" => $purchaseUnits,
                    "application_context" => $obj -> applicationContext
                    
                );
                $ch = curl_init();
                curl_setopt($ch, CURLOPT_URL, self::getPaypalAPI().'/orders/');
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
                curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
                curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json', 'Authorization:Bearer '.$accessToken));
                curl_setopt($ch, CURLOPT_POST, true);
                curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($postParams));
                $api_resp = curl_exec($ch);
                $api_data = json_decode($api_resp, true);
                $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
                curl_close($ch);
                if($http_code != 200 && $http_code != 201){
                    throw new Exception('Failed to create Order ('.$http_code.'): '.$api_resp);
                }

                return !empty($api_data) && ($http_code == 200 || $http_code == 201)?$api_data:false; 
            }
        }
        public static function captureOrder($orderID){
            $accessToken = self::generateAccessToken();
            
            if(empty($accessToken)){
                return false;
            } else {
                $ch = curl_init();
                curl_setopt($ch, CURLOPT_URL, self::getPaypalAPI().'/orders/'.$orderID.'/capture');
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
                curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
                curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json', 'Authorization:Bearer '.$accessToken));
                curl_setopt($ch, CURLOPT_POST, true);
                $api_resp = curl_exec($ch);
                $api_data = json_decode($api_resp, true);
                $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
                curl_close($ch);
                
                if($http_code != 200 && $http_code != 201){
                    throw new Exception('Failed to create Order ('.$http_code.'): '.$api_resp);
                }

                return !empty($api_data) && ($http_code == 200 || $http_code == 201)?$api_data:false; 
            }
        }
    }
