
class S_encryption {
    static simple = class {
        static encrypt(key, text){
            const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
            const byteHex = (n) => ("0" + Number(n).toString(16)).substr(-2);
            const applySaltToChar = (code) => textToChars(key).reduce((a, b) => a ^ b, code);
          
            return text
              .split("")
              .map(textToChars)
              .map(applySaltToChar)
              .map(byteHex)
              .join("");
          };
          static decrypt(key, encoded){
            const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
            const applySaltToChar = (code) => textToChars(key).reduce((a, b) => a ^ b, code);
            return encoded
              .match(/.{1,2}/g)
              .map((hex) => parseInt(hex, 16))
              .map(applySaltToChar)
              .map((charCode) => String.fromCharCode(charCode))
              .join("");
          };
          
    }
    static async  generateKey() {
        const key = await crypto.subtle.generateKey(
          { name: 'AES-GCM', length: 256 },
          true, ['encrypt', 'decrypt']
        );
        return key;
      }
      static async encryptData(key, data) {
        const encoder = new TextEncoder();
        const iv = crypto.getRandomValues(new Uint8Array(12));
        const encodedData = encoder.encode(data);
        const encryptedData = await crypto.subtle.encrypt(
          { name: 'AES-GCM', iv },
          key, encodedData
        );
      
        return { iv, encryptedData: new Uint8Array(encryptedData) };
      }
      
      static async decryptData(key, iv, encryptedData) {
        const decryptedData = await crypto.subtle.decrypt(
          { name: 'AES-GCM', iv },
          key, encryptedData
        );
      
        const decoder = new TextDecoder();
        return decoder.decode(decryptedData);
      }
      
}