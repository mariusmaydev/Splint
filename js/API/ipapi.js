// SPLINT.require('@SPLINT_ROOT/DataManagement/callPHP/');

class S_API_ipapi {
    static PATH = SPLINT.PATHS.Access;
    static async get(){
        return fetch('https://ipapi.co/json/')
        .then(async function(response) {
          return await response.json();
        })
        .catch(async function(error) {
          return error;
        });
    }
    static async evaluate(IP){
        let call = new SPLINT.Data.CallPHP(this.PATH, "API.IPAPI.EVAL");
            call.data.IP    = IP;
            call.method = "GET";
            call.headers["Content-Type"] = 'json';
        return call.send();
    }
}
