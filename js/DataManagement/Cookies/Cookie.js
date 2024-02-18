
class S_Cookie {
    static cookiesEnabled   = navigator.cookieEnabled;
    static cookiesAccepted  = null;
    static get(name = null){
        let cookies = document.cookie.split("; ");
        let response = new Object();
            for(const cookie of cookies){
              let array = cookie.split('=');
                  response[array[0]] = S_JSON.parseIf(array[1]);
            }
            if(name != null){
              return response[name];
            }
        return response;
    }
    static set(name, value, exdays = 1){
        if(!this.CookiesAllowed){
            this.#sendError();
            return false;
        }
        let date = new Date();
            date.setTime(date.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires="+ date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";" + "path=/;";
    }
    static remove(name){
        this.set(name, "-", -1);
    }
    static requestUserPermision(){
        if(SPLINT.Data.Cookies.cookiesEnabled){
            let res = SPLINT.Data.Cookies.get("COOKIE_ACCEPTED");
            if(res == undefined){
                SPLINT.getClass("S_CookieBanner", "CookieBanner");
                S_CookieBanner.open();
            } else {
                SPLINT.Data.Cookies.cookiesAccepted = res;
            }
        }

    }
    static get CookiesAllowed(){
        if(S_Cookie.cookiesEnabled == true && S_Cookie.cookiesAccepted == true){
            return true;
        } else {
            return false;
        }
    }
    static #sendError(){
        SPLINT.debugger.warn("Cookies", "Cookies sind nicht aktiviert");
    }
}


