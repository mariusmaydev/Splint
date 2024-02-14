// const { loadScript } = require("@paypal/paypal-js");

// const {loadScript} = require('@paypal/paypal-js');
// loadScript(options)
SPLINT.require('@SPLINT_ROOT/API/paypal/draw/PaypalButtons.js');
SPLINT.require('@SPLINT_ROOT/API/paypal/draw/PaypalFastCheckout.js');
SPLINT.require('@SPLINT_ROOT/API/paypal/draw/PaypalCheckout.js');
SPLINT.require('@SPLINT_ROOT/API/paypal/generateObject.js');

class S_API_Paypal {
    constructor(){
    }
    static draw = class {
        static get fastCheckout(){
            SPLINT.getClass("S_PaypalFastCheckout", "PaypalFastCheckout");
            return S_PaypalFastCheckout;
        }
        static get checkout(){
            SPLINT.getClass("S_PaypalCheckout", "PaypalCheckout");
            return S_PaypalCheckout;
        }
        static get Buttons(){
            SPLINT.getClass("S_PaypalButtons", "PaypalButtons");
            return S_PaypalButtons;
        }
        // Paypal
    }
    static get Object(){
        SPLINT.getClass("S_PaypalObject", "generateObject");
        return S_PaypalObject;
    }
    static ScriptLoader = class {
        static ClientID = "AcY69ITexNWNGhhjCZTpjHIyM-KiqjWbTaACjMNj5SLRvXd8fMKysveevIZ4fffuBXEevk5Jf_LDw0nw";
        static src;
        static {
            this.src = new Object();
            this.src.authorize = "https://www.paypal.com/sdk/js?client-id=CLIENT_ID&intent=authorize";
            this.src.init = "https://www.paypal.com/sdk/js?client-id=CLIENT_ID&components=buttons,payment-fields,marks,funding-eligibility&enable-funding=giropay,card,credit,bancontact&currency=EUR";
        }
        static async init(){
            return this.#load(this.src.init.replace('CLIENT_ID', this.ClientID));
        }
        static async authorize(){
            return this.#load(this.src.authorize.replace('CLIENT_ID', this.ClientID));
        }
        static async #load(uri){
            return SPLINT.require(uri);
        }
    }
}