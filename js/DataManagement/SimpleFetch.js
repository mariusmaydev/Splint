// let g = new S_SimpleFetch();
//     g.Storage.headers.
class S_SimpleFetch {
    Storage = {
        headers: {
            "X-SPLINT_ACCESS_KEY" : null,
        },
        body: { },
        method: "POST"
    }
    constructor(url){
        this.url = url;
    }
    set SPLINT_accessKey(v){
        this.Storage.headers["X-SPLINT_ACCESS_KEY"] = v;
    }
    get SPLINT_accessKey(){
        return this.Storage.headers["X-SPLINT_ACCESS_KEY"] = v;
    }
    set body(v){
        this.Storage.body = v;
    }
    get body(){
        return this.Storage.body;
    }
    get headers(){
        return this.Storage.headers;
    }
    set headers(v){
        this.Storage.headers = v;
    }
    set method(v){
        this.Storage.method = v;
    }
    get method(){
        return this.Storage.method;
    }
    get(){
        return S_SimpleFetch.send(this.url, {});
    }
    send(){
        return S_SimpleFetch.send(this.url, this.Storage);
    }

    static async sendFetch(url, options){
        return await fetch(url, options);
    }
    static BinaryImage = class {
        constructor(SPLINT_accessKey, BinImg_Blob, url) {
            let binI = BinImg_Blob;
            if(BinImg_Blob instanceof S_BinaryImage) {
                binI = BinImg_Blob.getAs_Blob();
            } else if(!(BinImg_Blob instanceof Blob)) {
                return false;
            }
            let inst = new S_SimpleFetch(url);
                inst.SPLINT_accessKey = SPLINT_accessKey;
                inst.headers["Content-Type"] = "application/octet-stream";
                inst.data = binI;
            return inst.send();
        }
    }
    async saveToURL(url){
        let bd = this.getAs_Blob();

        let headers = new Object();
            headers["X-SPLINT-ACCESS_KEY"] =  "THUMBNAIL";
            headers["Content-Type"] =  "application/octet-stream";
        return fetch(PATH.php.upload, {
            method: "POST",
            headers: headers,
            body:  bd
        });
    }
}