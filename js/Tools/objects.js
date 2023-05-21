
class S_ObjectTools {
    static toMap(obj){
        return SPLINT.Tools.parse.ObjectToMap(obj);
    }
    // static 
    // Object.defineProperty(this, 'color1', {
        // configurable : false,
        // enumerable: false,
    //   });
    /**
     * @description compares 2 objects
     * @param {object} obj1 
     * @param {object} obj2 
     * @returns true or false
     */
    static is_equal(obj1, obj2){
        return (JSON.stringify(obj1) == JSON.stringify(obj2));
    }
    static serialize(obj, prefix) {
        var str = [], p;
        for (p in obj) {
          if (obj.hasOwnProperty(p)) {
            var k = prefix ? prefix + "[" + p + "]" : p,
              v = obj[p];
              if(v == null || v == undefined){
                v = '';
              }
            str.push((v !== null && typeof v === "object") ?
                
                serialize(v, k) :
              encodeURIComponent(k) + "=" + encodeURIComponent(v));
          }
        }
        return str.join("&");
      }
}