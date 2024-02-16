class S_API_Paypal {
    static promiseLoad = null;
    static {
        this.PAY_METHOD = new SPLINT.autoObject();
        this.PAY_METHOD.PAYPAL.name         = "Paypal";
        this.PAY_METHOD.PAYPAL.ID           = "PAYPAL";

        this.PAY_METHOD.CREDITCARD.name     = "Kreditkarte";
        this.PAY_METHOD.CREDITCARD.ID       = "CREDITCARD";
        this.PAY_METHOD.SPLINT.secureValues()
    }
    constructor(){
    }
    static get clientID(){
        if(SPLINT.config.paypal.SANDBOX == true){
            return SPLINT.config.paypal.SANDBOX_CLIENT_ID;
        } else {
            return SPLINT.config.paypal.PROD_CLIENT_ID;
        }
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
    }
    static get Object(){
        SPLINT.getClass("S_PaypalObject", "generateObject");
        return S_PaypalObject;
    }
    static async checkConfig(){
        if(SPLINT.config.paypal == undefined){
            return S_API_Paypal.loadConfig();
        } else {
            return Promise.resolve(SPLINT.config.paypal);
        }
    }
    static async load(){
        if(S_API_Paypal.promiseLoad == null){
            S_API_Paypal.promiseLoad = new Promise(async function(resolve){
                await S_API_Paypal.checkConfig();
                if(document.getElementById("paypal-script") == null){
                        // let call = new SPLINT.CallPHP(SPLINT.rootPath + "/php/API/paypal/paypalAccess.php", "GEN.USER_ID_TOKEN");
                        // let r = await call.send();
                    let tag = document.createElement("script");
                        tag.onload = resolve;
                        // tag.src = "https://www.paypal.com/sdk/js?components=buttons,funding-eligibility,marks&client-id=" + S_API_Paypal.clientID;
                        tag.src = "https://www.paypal.com/sdk/js?components=card-fields,marks,funding-eligibility,payment-fields,buttons&disable-funding=paylater,blik,sepa,giropay&enable-funding=sofort&currency=EUR&client-id=" + S_API_Paypal.clientID;
                        // tag.setAttribute("data-user-id-token", r);
                        tag.async = false;
                        tag.id = "paypal-script";
                        document.head.appendChild(tag);

                } else {
                    resolve(true);
                };
            });
        }
        return S_API_Paypal.promiseLoad;
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
    static async loadConfig(){
        return new Promise(async function(resolve){
            try {
                let projectName = location.pathname.split('/')[1];
                SPLINT.config.paypal = (await S_API_Paypal.getConfigPaypal(projectName))
            } catch {
                let projectName = location.pathname.split('/')[1] + "/" + location.pathname.split('/')[2];
                SPLINT.config.paypal = (await S_API_Paypal.getConfigPaypal(projectName))
            }
            resolve(SPLINT.config.paypal);
            return SPLINT.config.paypal;
        });
    }
    static async getConfigPaypal(projectPath){
        let uri = location.origin + "/" + projectPath + "/Splint/" + "splint.config/config.paypal.json";
        let promise = new Promise(async function(resolve){
            let rawFile = new XMLHttpRequest();
            rawFile.open("GET", uri, true);
            rawFile.onreadystatechange = function() {
                if(rawFile.readyState === 4) {
                    if(rawFile.status === 200 || rawFile.status == 0){
                        resolve(rawFile.responseText);
                        return rawFile.responseText;
                    } else {
                        return false;
                    }
                }
            }
            rawFile.send(null);
        });
        let r = await promise;
        return JSON.parse(r);
    }
}