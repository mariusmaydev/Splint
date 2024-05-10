<?php namespace paypal;
    use Communication;
    use Exception;
    use Debugger;

    require_once 'Paypal.php';

    $access = Communication::getAccess();
    if($access != null){
        switch($access){
            case "PAYMENT.STATUS"       : Paypal::transactionStatus(); exit;
            case "GEN.USER_ID_TOKEN"    : Paypal::generateUserIDToken(true); exit;
            default: Communication::sendBack("METHOD ERROR"); exit;
        }
    }
    $response = array('status' => 0, 'msg' => 'Request Failed!');
    $api_error = '';
    if(!empty($_POST['request_type']) && $_POST['request_type'] == 'create_order'){
        $payment_source = $_POST['payment_source'];

        try {
            $order = Paypal::createOrder($_POST["obj"], $payment_source);
        } catch(Exception $e) {
            $api_error = $e -> getMessage();
        }

        if(!empty($order)){
            $response = array(
                'status' => 1,
                'data' => $order
            );
        } else {
            $response['msg'] = $api_error;
        }
    } else if(!empty($_POST['request_type']) && $_POST['request_type'] == 'capture_order'){
        $order_id = $_POST['order_id'];

        try {
            $order = Paypal::captureOrder($order_id);
        } catch(Exception $e){
            $api_error = $e -> getMessage();
        }

        if(!empty($order)){
            $order_id = $order['id'];
            $order_status = $order['status'];

            $payment_source = $payment_source_card_name = $payment_source_card_last_digits = 
            $payment_source_card_expiry = $payment_source_card_brand = $payment_source_card_type = '';
            if(!empty($order['payment_source'])){
                foreach($order['payment_source'] as $key => $value){
                    $payment_source = $key;
                    if($payment_source == 'card'){
                        $payment_source_card_name           = $value['name'];
                        $payment_source_card_last_digits    = $value['last_digits'];
                        $payment_source_card_expiry         = $value['expiry'];
                        $payment_source_card_brand          = $value['brand'];
                        $payment_source_card_type           = $value['type'];
                    }
                }
            }

            if(!empty($order['purchase_units'][0])){
                $purchase_units =$order['purchase_units'][0];
                if(!empty($purchase_units['payments'])){
                    $payments = $purchase_units['payments'];
                    if(!empty($payments['captures'])){
                        $captures = $payments['captures'];
                        if(!empty($captures[0])){
                            $cn = $captures[0];
                            $transaction_id = $cn['id'];
                            $payment_status = $cn['status'];
                            // $custom_id = $cn['custom_id'];
                            $amount_value = $cn['amount']['value'];
                            $currency_code = $cn['amount']['currency_code'];
                            $create_time = date("Y-m-d H:i:s", strtotime($cn['create_time']));
                        }
                    }
                }
            }

            if(!empty($order_id) && $order_status == 'COMPLETED'){
                // DataBase::acc
                $db = Paypal::connectDB();
                Debugger::log($db);
                $sqlQ = "SELECT id FROM transactions WHERE transaction_id = ?";
                Debugger::log($sqlQ);
                $stmt = $db -> prepare($sqlQ);
                Debugger::log($stmt);
                $stmt -> bind_param("s", $transaction_id);
                $stmt -> execute();
                $stmt -> bind_result($row_id);
                $stmt -> fetch();

                $payment_id = 0;
                if(!empty($row_id)){
                    $payment_id = $row_id;
                } else { 
                    // Insert transaction data into the database 
                    $sqlQ = "INSERT INTO transactions (item_number,item_name,item_price,item_price_currency,order_id,transaction_id,paid_amount,paid_amount_currency,payment_source,payment_source_card_name,payment_source_card_last_digits,payment_source_card_expiry,payment_source_card_brand,payment_source_card_type,payment_status,created,modified) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,NOW())"; 
                    $stmt = $db->prepare($sqlQ); 
                    $stmt->bind_param("ssdsssdsssssssss", $custom_id, $itemName, $itemPrice, $currency, $order_id, $transaction_id, $amount_value, $currency_code, $payment_source, $payment_source_card_name, $payment_source_card_last_digits, $payment_source_card_expiry, $payment_source_card_brand, $payment_source_card_type, $payment_status, $create_time); 
                    $insert = $stmt->execute(); 
                     
                    if($insert){ 
                        $payment_id = $stmt->insert_id; 
                    } 
                } 

                if(!empty($payment_id)){
                    $ref_id_enc = base64_encode($transaction_id);
                    $response = array(
                        'status' => 1, 
                        'msg' => 'Transaction completed!', 
                        'ref_id' => $ref_id_enc,
                        'data' => $order
                    );
                }
            }

        } else {
            $response['msg'] = $api_error;
        }
    }
    Communication::sendBack($response);