
class S_Tparser {
    static stringToBool(str){
        if(str == true || str == "true"){
            return true;
        } 
        return false;
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