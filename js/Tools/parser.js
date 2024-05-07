
class S_Tparser {
    static castTypesRecursive(obj){
        function cast(e){
            if(!(e instanceof Object)){
                return e;
            }
            for(const [key, val] of Object.entries(e)){
                if(isNaN(val)){
                    let a = SPLINT.Tools.parse.stringToBool(val, true);
                    if(a != null){
                        e[key] = a;
                    } else if(typeof val == 'object'){
                        e[key] = cast(val);
                    }
                } else {
                    if(val == null){
                        e[key] = val;
                    } else {
                        e[key] = Number(val);
                    }
                }
            }
            return  e;
        }
        return cast(obj);
    }
    static stringToBool(str, save = false){
        if(str == true || str == "true"){
            return true;
        } else if(str == false || str == "false"){
            return false;
        } else if(!save){
            return false;
        }
        return null;
    }
    static blobToBase64(blob) {
        return new Promise((resolve, _) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(blob);
        });
    }
    static getImageAsImageData(url, width, height) {
        return new Promise(async function(resolve){
            let canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
            let context = canvas.getContext('2d');
            
            let imageObj = new Image();
                imageObj.onload = function() {
                context.drawImage(imageObj, 0, 0, width, height);
                imgData = context.getImageData(0,0,width, height);
                canvas.width = 1;
                canvas.height = 1;
            
                resolve(imgData);
            };
            imageObj.src = url;
        });
    }
    /**
     * @description converts JSON safely
     * @param {string} string 
     * @returns Object or input
     */
    static toJSON(string){
        try {
            return JSON.parse(string);
        } catch(e){
            return string;
        }
      }
    static ObjectToMap(object){
        return new Map(Object.entries(object))
    };

    /**
     * @param {string} base64 Base64 formatted string
     * @returns {string} ASCII formatted string
     */
    static base64_to_ASCII(base64) {
      let c, d, e, f, g, h, i, j, o, b = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", k = 0, l = 0, m = "", n = [];
      if (!base64) return a;
      do c = base64.charCodeAt(k++), d = base64.charCodeAt(k++), e = base64.charCodeAt(k++), j = c << 16 | d << 8 | e, 
      f = 63 & j >> 18, g = 63 & j >> 12, h = 63 & j >> 6, i = 63 & j, n[l++] = b.charAt(f) + b.charAt(g) + b.charAt(h) + b.charAt(i); while (k < base64.length);
      return m = n.join(""), o = base64.length % 3, (o ? m.slice(0, o - 3) :m) + "===".slice(o || 3);
    }

    /**
     * @param {string} ascii ASCII formatted string
     * @returns {string} base64 formatted string
     */
    static ASCII_to_base64(ascii) {
      let b, c, d, e = {}, f = 0, g = 0, h = "", i = String.fromCharCode, j = ascii.length;
      for (b = 0; 64 > b; b++) e["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(b)] = b;
      for (c = 0; j > c; c++) for (b = e[ascii.charAt(c)], f = (f << 6) + b, g += 6; g >= 8; ) ((d = 255 & f >>> (g -= 8)) || j - 2 > c) && (h += i(d));
      return h;
    }
}