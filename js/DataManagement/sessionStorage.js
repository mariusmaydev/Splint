
class S_sessionStorage {
    static edit(key, value){
        if(typeof value == 'object' || value instanceof Object){
            window.sessionStorage.setItem(key, JSON.stringify(value));
        } else {
            window.sessionStorage.setItem(key, value)
        }
    }
    static get(key, expanded = false){
        if(expanded){
            let obj = new Object();
            obj.key = key;
            obj.data = SPLINT.Tools.parse.toJSON(window.sessionStorage.getItem(key));
            return obj;
        }
        return SPLINT.Tools.parse.toJSON(window.sessionStorage.getItem(key));
    }
    static getByIndex(index, expanded = false){
        if(expanded){
            let obj = new Object();
            obj.key = window.sessionStorage.key(index);
            obj.data = this.get(obj.key);
            obj.index = index;
            return obj;
        }
        return this.get(window.sessionStorage.key(index));
    }
    static remove(key){
        window.sessionStorage.removeItem(key)
    }
    static clear(){
        window.sessionStorage.clear();
    }
    static get length(){
        return window.sessionStorage.length;
    }
    static showAll(){
        for(let i = 0; i < this.length; i++){
            let element = this.getByIndex(i, true);
            console.dir(element)
        }
    }
}
SPLINT.Events.onInitComplete = function(){

S_sessionStorage.showAll();
}