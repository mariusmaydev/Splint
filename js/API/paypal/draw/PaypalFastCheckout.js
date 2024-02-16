
class S_PaypalFastCheckout {
    constructor(parent){
      this.id = "fastCheckout_";
      this.parent = parent;
      this.mainElement = new SPLINT.DOMElement(this.id + "main", "div", this.parent);
      this.mainElement.Class("fastCheckout");
    }
    async draw(){
        await SPLINT.API.Paypal.load();
        let button = new SPLINT.DOMElement("paypal-button-container", "div", this.mainElement);
            // let input = new SPLINT.DOMElement("paypal-button-container-input", "input", )
        let orderObject = await (S_API_Paypal.Object.preparePaypal());
    
        const payment = paypal.Buttons({
            displayOnly: ['vaultable'],
            onClick: async (data) => {
                let orderObject = await SPLINT.API.Paypal.Object.preparePaypal();
                    orderObject.applicationContext = new Object();
                    orderObject.applicationContext.shipping_preference = "GET_FROM_FILE";
                    orderObject.shippingAddress = await SPLINT.SessionsPHP.get(Checkout.sessions.addresses);
                console.dir(orderObject)
                payment.obj = orderObject;
            },
            //sb-bbtde25993789@personal.example.com
            //MzN90xI-
            onShippingAddressChange: async function(data, actions) {
                console.log(data, actions)
                if(data.shippingAddress.countryCode != "DE" && data.shippingAddress.countryCode != "AT"){
                    return actions.reject(data.errors.COUNTRY_ERROR);
                }
            },
            createOrder: (data, actions) => {
                var postData = {request_type: 'create_order', payment_source: data.paymentSource, obj: JSON.stringify(payment.obj)};
                return fetch(SPLINT.rootPath + "/php/API/paypal/paypalAccess.php", {
                    method: "POST",
                    headers: {'Accept': 'application/json'},
                    body: encodeFormData(postData)
                })
                .then((res) => {
                    return res.json();
                })
                .then((result) => {
                    console.dir(result)
                    // setProcessing(false);
                    if(result.status == 1){
                        return result.data.id;
                    }else{
                        // resultMessage(result.msg);
                        return false;
                    }
                });
            },
            onApprove: (data, actions) => {
                const { orderID } = data;
                var postData = {request_type: 'capture_order', order_id: orderID};
                return fetch(SPLINT.rootPath + "/php/API/paypal/paypalAccess.php", {
                    method: "POST",
                    headers: {'Accept': 'application/json'},
                    body: encodeFormData(postData)
                })
                .then((res) => {
                    return res.json();
                })
                .then(async (result) => {
                    console.dir(result)
                    // Redirect to success page
                    if(result.status == 1){
                        let call = new SPLINT.CallPHP(SPLINT.rootPath + "/php/API/paypal/paypalAccess.php", "PAYMENT.STATUS");
                            call.data = result;
                        let status = await call.send();
                        console.dir(status);
                        payment.onPaymentComplete(result, status);
                        // window.location.href = SPLINT.rootPath + "/php/API/paypal/payment-status.php?checkout_ref_id="+result.ref_id;
                    }else{
                        // resultMessage(result.msg);
                    }
                    // setProcessing(false);
                });
            // return actions.order.capture().then(async function(orderData) {
            //     console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
            //     const transaction = orderData.purchase_units[0].payments.captures[0];
            //     await payment.afterSubmit();
            //     console.log(transaction);
            //     // S_Location.goto(PATH.location.paymentComplete).call();
            //     alert(`Transaction ${transaction.status}: ${transaction.id}\n\nSee console for all available details`);
            // });
            },
            onCancel: function (data) {
            // Show a cancel page, or return to cart
            },
            onError: function (err) {
                console.log(err)
            }
        });
        // paypal.getFundingSources().forEach(function(fundingSource) {
        //     // Initialize the marks
        //     var mark = paypal.Marks({
        //       fundingSource: fundingSource
        //     });
          
        //     // Check if the mark is eligible
        //     if (mark.isEligible()) {
          
        //       // Render the standalone mark for that funding source
        //       mark.render('#paypal-button-container')
        //     }
        //   });
        //   paypal.Marks().render('#paypal-button-container');
        payment.onPaymentComplete = function(){};
        payment.render('#paypal-button-container')
        
        const encodeFormData = (data) => {
            var form_data = new FormData();
        
            for ( var key in data ) {
                form_data.append(key, data[key]);
            }
            return form_data;   
        }
            return payment;
        }

}