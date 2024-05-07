
class S_QRCode {
    constructor(text){
        this.text = text;
        this.width = 128;
        this.height = 128;
        this.colorDark = "#000000";
        this.colorLight = "#ffffff";
        this.correctLevel = 2;
        this.ele = document.createElement("div");
        this.#load();
    }
    #load(){
        return new Promise(async function (resolve) {
            if(window["QRCode"] != undefined){
                resolve(true);
            } else {
                await SPLINT.require(SPLINT.rootPath + "/lib/dependencies/qrcodejs/qrcode.min.js");
                resolve(true);
            }
        }.bind(this));
    }
    async getBase64(text = this.text){
        await this.#load();
        let code = new QRCode(this.ele, {
            text: text,
            width: this.width,
            height: this.height,
            colorDark : this.colorDark,
            colorLight : this.colorLight,
            correctLevel : this.correctLevel
        });
        code.makeCode(text);
        return new Promise(function(resolve){
            this.ele.children[1].onload = function () {
                resolve(this.src);
            };
        }.bind(this));
    }
    static async getBase64(text, level = 0){
        let c = new SPLINT.API.QRCode(text);
            c.correctLevel = level;
        return c.getBase64();
        
    }
}