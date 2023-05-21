
            // SPLINT.API.Paypal.ScriptLoader.authorize();

class S_PaypalButtons {
        // constructor(parent) {
        //     this.parent = parent;
        //     this.drawButtons()
        // }
        static async draw(parent){
            let button = new SPLINT.DOMElement("paypal-button-container", "div", parent);
            let orderObject = await (S_API_Paypal.Object.preparePaypal());
        
            paypal.Buttons({
                style: {
                layout: 'horizontal',
                color: 'gold',
                shape: 'rect',
                label: 'paypal',
                tagline: 'false'
                },
                onClick: (data) => {
                    // fundingSource = "venmo"
                    fundingSource = data.fundingSource;
            
                    // Use this value to determine the funding source used to pay
                    // Update your confirmation pages and notifications from PayPal to Venmo
                },
                // createSubscription(data, actions) {
                //   return actions.subscription.create({
                //     'plan_id': 'P-2UF78835G6983425GLSM44MA'
                //   });
                // },
                createOrder: (data, actions) => {
                    return actions.order.create(orderObject);
                },
                onApprove: (data, actions) => {
                return actions.order.capture().then(function(orderData) {
                    console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
                    const transaction = orderData.purchase_units[0].payments.captures[0];
        
                    console.log(transaction);
                    // S_Location.goto(PATH.location.paymentComplete).call();
                    alert(`Transaction ${transaction.status}: ${transaction.id}\n\nSee console for all available details`);
                });
                },
                onCancel: function (data) {
                // Show a cancel page, or return to cart
                },
                onError: function (err) {
                // For example, redirect to a specific error page
                window.location.href = "/your-error-page-here";
                }
            }).render('#paypal-button-container');
        
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