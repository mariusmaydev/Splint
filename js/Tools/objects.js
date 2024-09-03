
class S_ObjectTools {
    static getObjByKey_Value(object, key, value){
        return object.filter(obj => {
            return obj[key] === value;
        })[0];
    }
    static sleep (time) {
        return new Promise((resolve) => setTimeout(resolve, time));
      }
    static getFileNameFromURI(uri){
        let nameExt = uri.split("/").at(-1);
        let index = nameExt.lastIndexOf(".");
        return nameExt.slice(0, index);
    }
    static recursiveSearchOBJ_entry(obj, name) {
        for(const prop in obj) {
           if(typeof(obj[prop]) == "object"){
            console.log(obj[prop]);
            S_ObjectTools.recursiveSearchOBJ(obj[prop]);
         } else {
             if(prop == name) {
                 // Do something with this data
                 return prop;
           }
         }
       }
    }
    static recursiveSearchOBJ_string(obj) {
        let obj_c = structuredClone(obj);
        console.log(Object.values(obj));
        for(const prop in obj) {
           if(typeof(obj[prop]) == "object"){
            console.log(obj[prop]);
            utils.recursiveSearchOBJ_string(obj[prop]);
         } else {
                 console.log(obj[prop])
           
         }
       }
    }


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
    static deepClone(obj) {
      if (obj === null || typeof obj !== "object")
        return obj
      var props = Object.getOwnPropertyDescriptors(obj)
      for (var prop in props) {
        props[prop].value = S_ObjectTools.deepClone(props[prop].value)
      }
      return Object.create(
        Object.getPrototypeOf(obj), 
        props
      )
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
                
                S_ObjectTools.serialize(v, k) :
              encodeURIComponent(k) + "=" + encodeURIComponent(v));
          }
        }
        return str.join("&");
      }
}


function findVal(object, key) {
    var value;
    Object.keys(object).some(function(k) {
        if (k === key) {
            value = object[k];
            return true;
        }
        if (object[k] && typeof object[k] === 'object') {
            value = findVal(object[k], key);
            return value !== undefined;
        }
    });
    return value;
}