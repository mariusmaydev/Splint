

class S_API_IPinfo {
    static async execute(){
        let res = (await this.get());
        // return this.evaluate(res);
    }
    static async get(){
        return new Promise(async function(resolve, reject){
            let response = await fetch("http://ipinfo.io?token=9d0ea8a90ffa46")
            let json = await response.json();
            resolve(json);
            // .then(async function(response){
            //     return await response.json()
            // })
            // .catch(async function(){
            //     return fetch("http://ipinfo.io/json")
            //     .then(async function(response){
            //         return await response.json()
            //     })
            //     .catch(function(){
            //         return false;
            //     })
            // });
        });
        
    }
    static async evaluate(data){
        let call = new SPLINT.Data.CallPHP(this.PATH, "API.IPINFO.EVAL");
            call.data.data    = data;
            call.method = "GET";
            call.headers["Content-Type"] = 'json';
        return call.send();
    }
}