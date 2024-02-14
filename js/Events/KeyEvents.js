class S_KeyEvent {
    static KEY_DOWN   = 'keydown';
    static KEY_UP     = 'keyup';
    static KEY_PRESS  = 'keypress';
    static list = [];
  
    constructor(parent, type = S_KeyEvent.KEY_DOWN, func, sync = true){
      S_KeyEvent.list.push(this);
      this.parent = parent;
      this.type   = type;
      this.sync   = sync;
      this.key    = null;
      this.active = true;
      this.func   = function(f, e){
                      if(!this.active || (this.key != null && this.key != e.key)){
                        return;
                      }
                      func.call(this, e);
                    }.bind(this, func);
      this.#init();
      this.remove = function(){
        this.#remove();
      }.bind(this);
    }
    f1(){
      if(this.key != null){
      }
      console.log(this.key);
    }
    #remove(){
      this.parent.removeEventListener(this.type, this.func, !this.sync);
      S_KeyEvent.list.splice(S_KeyEvent.list.indexOf(this.constructor), 1);
    }
    #init(){
      this.parent.addEventListener(this.type, this.func, !this.sync);
    }
    get activeEvents(){
      return S_KeyEvent.list;
    }
    pause(){
      this.active = false;
    }
    wakeUp(){
      this.active = true;
    }
    static new(parent, type = S_KeyEvent.KEY_DOWN, func){
      let event = new S_KeyEvent(parent, type, func);
      return event;
    }
  }