

export class utils {
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
            utils.recursiveSearchOBJ(obj[prop]);
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