

class S_BufferStorage {
    #KEY;
    #Buffer = [];
    constructor(name, encrypted = false, Key = null){
        this.name = name;
        this.encrypted = encrypted;
        this.KEY = Key;
    }
    set KEY(v){
        this.#KEY = v;
    }
    get KEY(){}
    setFromObject(arr){
        let value   = arr[0];
        let key     = this.name + "_" + arr[1];
        if(this.encrypted){
            value = S_encryption.simple.encrypt(this.#KEY, value)
        }
        let o = {key: key, value: value};
        this.#Buffer.push(o);
        return o;
    }
    set(key, value){
        if(this.encrypted){
            value = S_encryption.simple.encrypt(this.#KEY, value)
        }
        let o = {key: this.name + "_" + key, value: value};
        this.#Buffer.push(o);
        return o;
    }
    get(key, expanded = false){
        let e = this.#get(this.name + "_" + key);
        if(e == null){
            return null;
        }
        let value = e.value;
        if(this.encrypted){
            value =  S_encryption.simple.decrypt(this.#KEY, value);
        }
        if(expanded){
            return {value: value, key: key};
        }
        return value;
    }
    #get(key){
        for(const e of this.#Buffer){
            if(e.key == key){
                return e
            }
        }
        return null;
    }
    getAll(){
        return this.#Buffer;
    }
}