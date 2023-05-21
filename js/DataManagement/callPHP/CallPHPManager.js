
class S_CallPHPManager {
    static bind2class(path, instance){
        instance.S_CallPHPManager = new S_CallPHPManager(path, instance);
    }
    static callPHP(key){
        if(this.prototype instanceof S_CallPHPManager){
            return new SPLINT.CallPHP(this.PATH, key);
        }
    }
    constructor(path, instance = null){
        this.path = path;
        this.instance = instance;
        if(this.instance != null){
            this.instance.callPHP = function(key){
                return this.call(key);
            }.bind(this);
        }
    }
    call(key){
        return new SPLINT.CallPHP(this.path, key);
    }
}

