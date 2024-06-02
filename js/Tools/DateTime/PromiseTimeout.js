class PromiseTimeout {
    static storage = [];
    constructor(name, delay, pushToStack = true, onresolve = function(){}){
        if(pushToStack){
            for(const ele of PromiseTimeout.storage){
                if(ele.name == name){
                    return ele;
                }
            }
        }
        this.name = name;
        this.delay = delay;
        this.resolved = false;
        this.value = undefined;
        this.onresolve = onresolve;
        PromiseTimeout.storage.push(this);
        this.start();
    }
    start(){
        setTimeout(function(){
            this.resolved = true;
            this.value = "test";
            this.onresolve(this.value);
        }.bind(this), this.delay);
    }
    remove(){
        for(const i in PromiseTimeout.storage){
            let ele = PromiseTimeout.storage[i];
            if(ele.name == this.name){
                PromiseTimeout.storage.splice(i, 1);
            }
        }
    }
    static get(name){
        for(const ele of PromiseTimeout.storage){
            if(ele.name == name){
                return ele;
            }
        }
    }
}
