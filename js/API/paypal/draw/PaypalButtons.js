

            //sb-bbtde25993789@personal.example.com
            //MzN90xI-

            
class S_PaypalButtons {
    static async drawCard(bt, f1, f2, f3, f4){
        await SPLINT.API.Paypal.load();
        this.obj = null;
        const cardStyle = {
            'body' : {
                'padding': '0',
                'outline': 'none'
            },
            'input': {
                'font-family': 'courier, monospace',
                'font-weight': 'lighter',
                'opacity': '1',
                'padding-top': '1rem',
                'padding-bottom': '1rem',
                'appearance': 'none',
                'line-height': '1rem',
                'outline': 'none'
            },
            ':focus': {
                'outline': 'none'
            },
            'input:focus': {
                'outline': 'none'
            }
        };
        const cardField = paypal.CardFields({
            style: cardStyle,
            // createVaultSetupToken: () => {
            //     // Call your server API to generate a vaultSetupToken and return it here as a string
            //   const result = await fetch("../../php/PaypalNew/create-setup-token.php")
            //   return result.token
            // },
            createOrder: function (data) {
                setProcessing(true);
                var postData = {request_type: 'create_order', payment_source: data.paymentSource, obj: JSON.stringify(cardField.obj)};
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
                    setProcessing(false);
                    if(result.status == 1){
                        return result.data.id;
                    }else{
                        resultMessage(result.msg);
                        return false;
                    }
                });
            }.bind(this),
            onApprove: function (data) {
                setProcessing(true);
        
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
                        cardField.onPaymentComplete(result, status);
                        // window.location.href = SPLINT.rootPath + "/php/API/paypal/payment-status.php?checkout_ref_id="+result.ref_id;
                    }else{
                        resultMessage(result.msg);
                    }
                    setProcessing(false);
                });
            },
            onError: function (error) {
                // Do something with the error from the SDK
            },
        });
        cardField.button = bt;
        cardField.obj = "";
        cardField.onPaymentComplete = function(){};
        // Render each field after checking for eligibility
        if (cardField.isEligible()) {
            const nameField = cardField.NameField();
            nameField.render(f1)

            const numberField = cardField.NumberField();
            numberField.render(f2);
        
            const cvvField = cardField.CVVField();
            cvvField.render(f3);
        
            const expiryField = cardField.ExpiryField();
            expiryField.render(f4);
        

            cardField.button.onclick = async function(){  
                let obj = await SPLINT.API.Paypal.Object.preparePaypal();
                    obj.applicationContext.shipping_preference = "GET_FROM_FILE";
                    console.log(obj);
                    cardField.obj = obj;
                cardField.submit().then(async () => {
                    // await cardField.afterSubmit();
                    // submit successful
                })
                .catch((error) => {
                    resultMessage(`Sorry, your transaction could not be processed... >>> ${error}`);
                });
            }.bind(this)
        }
        
        const encodeFormData = (data) => {
            var form_data = new FormData();
        
            for ( var key in data ) {
                form_data.append(key, data[key]);
            }
            return form_data;   
        }
        
        // Show a loader on payment form processing
        const setProcessing = (isProcessing) => {
            // if (isProcessing) {
            //     document.querySelector(".overlay").classList.remove("hidden");
            // } else {
            //     document.querySelector(".overlay").classList.add("hidden");
            // }
        }
        
        // Display status message
        const resultMessage = (msg_txt) => {
            // const messageContainer = document.querySelector("#paymentResponse");
        
            // messageContainer.classList.remove("hidden");
            // messageContainer.textContent = result.msg;
            
            // setTimeout(function () {
            //     messageContainer.classList.add("hidden");
            //     messageText.textContent = "";
            // }, 5000);
        }
        return cardField;
    }
    static async drawButtons(parent, paymentType){
        await SPLINT.API.Paypal.load();
        let button = new SPLINT.DOMElement("paypal-button-container", "div", parent);
            // let input = new SPLINT.DOMElement("paypal-button-container-input", "input", )
        // let orderObject = await (S_API_Paypal.Object.preparePaypal());
    
        let funding = null;
        if(paymentType == "PAYPAL"){
            funding = paypal.FUNDING.PAYPAL;
        } else if(paymentType == "SOFORT"){
            funding = paypal.FUNDING.SOFORT;
        }
        const payment = paypal.Buttons({
            style: {
                label: "pay"
            },
            fundingSource: funding,
            displayOnly: ['vaultable'],
            onClick: async (data) => {
                let orderObject = await SPLINT.API.Paypal.Object.preparePaypal();
                    orderObject.shippingAddress = await SPLINT.SessionsPHP.get(Checkout.sessions.addresses);
                console.dir(orderObject)
                payment.obj = orderObject;
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
    static async drawRadioButtons(parent, paymentType){
        await SPLINT.API.Paypal.load();
        let id = "paypal-RadioButtons_";
        let label1 = new SPLINT.DOMElement(id + "label1", "label", parent);
            let input1 = new SPLINT.DOMElement(id + "input1", "input", label1);
                input1.type = "radio";
                input1.name = "payment-option";
                input1.value = "paypal";
                input1.checked = true;
            let marksContainer = new SPLINT.DOMElement("paypal-marks-container", "div", label1);


        let label2 = new SPLINT.DOMElement(id + "label2", "label", parent);
            let input = new SPLINT.DOMElement(id + "input2", "input", label2);
                input.type = "radio";
                input.name = "payment-option";
                input.value = "alternate";

        let buttonsContainer = new SPLINT.DOMElement("paypal-buttons-container", "div", parent);
        let alternateButtonsContainer = new SPLINT.DOMElement("alternate-button-container", "div", parent);
            let button = new SPLINT.DOMElement(null, "button", alternateButtonsContainer);

            paypal.getFundingSources().forEach(function(fundingSource) {

                // Initialize the marks
                var mark = paypal.Marks({
                  fundingSource: fundingSource
                });
              
                // Check if the mark is eligible
                if (mark.isEligible()) {
              
                  // Render the standalone mark for that funding source
                  mark.render('#paypal-mark-container');
                }
              });

        paypal.Marks().render('#paypal-marks-container');
        paypal.Buttons().render('#paypal-buttons-container');

        // Listen for changes to the radio buttons
        document.querySelectorAll('input[name=payment-option]')
            .forEach(function (el) {
            el.addEventListener('change', function (event) {
                // If PayPal is selected, show the PayPal button
                if (event.target.value === 'paypal') {
                document.body.querySelector('#alternate-button-container')
                    .style.display = 'none';
                document.body.querySelector('#paypal-buttons-container')
                    .style.display = 'block';
                }

                // If alternate funding is selected, show a different button
                if (event.target.value === 'alternate') {
                document.body.querySelector('#alternate-button-container')
                    .style.display = 'block';
                document.body.querySelector('#paypal-buttons-container')
                    .style.display = 'none';
                }
            });
            });

        // Hide non-PayPal button by default
        document.body.querySelector('#alternate-button-container')
            .style.display = 'none';
        }
    }



























































/////////------   TESTX

// function fx(...args){
//     return Reflect.construct(class S_PaypalButtons {
//         static {
//             // this.s = new S_PaypalButtons();
//         } 
//         constructor(...args) {
//             if(!args.includes("init")){
//                 // return this;
//             console.log(arguments)
//             }
//             // return new.target;
//         // super('...args', 'return this._bound._call(...args)')
//         // Or without the spread/rest operator:
//         // super()
//         // this._bound = this.bind(this)
    
//         // return this
//         }
        
//         // _call(...args) {
//         // console.log(this, args)
//         // }
    
        
//         test(a){
//             return "ok53465463"
//         }
//         static async drawButtons(parent){
//             let button = new SPLINT.DOMElement("paypal-button-container", "div", parent);
//             let orderObject = await preparePaypal();
        
//             paypal.Buttons({
//                 style: {
//                 layout: 'horizontal',
//                 color: 'gold',
//                 shape: 'rect',
//                 label: 'paypal',
//                 tagline: 'false'
//                 },
//                 createOrder: (data, actions) => {
//                     return actions.order.create(orderObject);
//                 },
//                 onApprove: (data, actions) => {
//                 return actions.order.capture().then(function(orderData) {
//                     console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
//                     const transaction = orderData.purchase_units[0].payments.captures[0];
        
//                     console.log(transaction);
//                     // S_Location.goto(PATH.location.paymentComplete).call();
//                     alert(`Transaction ${transaction.status}: ${transaction.id}\n\nSee console for all available details`);
//                 });
//                 },
//                 onCancel: function (data) {
//                 // Show a cancel page, or return to cart
//                 },
//                 onError: function (err) {
//                 // For example, redirect to a specific error page
//                 window.location.href = "/your-error-page-here";
//                 }
//             }).render('#paypal-button-container');
        
//         }
//     }, args);
// }
// Object.setPrototypeOf(fx, fx("init"))
// fx.prototype.name = "fx";
// // fx.prototype.test = "ok";
// // Object.defineProperty(fx.pto, "test", {
//     // get(){
//         // return this;
//     // }
// // })
// console.dir(fx)