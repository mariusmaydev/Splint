
class S_CacheStorage {
    static {
        this.STORAGE = new Object();
    }
    static has(key){
        if(this.STORAGE[key] != undefined){
            return true;//this.STORAGE[key];
        }
        return false;
    }
    static add(key, value){
        this.STORAGE[key] = value;
    }
    static remove(key){
        delete this.STORAGE[key];
    }
    static get(key){
        return this.STORAGE[key];
    }
}