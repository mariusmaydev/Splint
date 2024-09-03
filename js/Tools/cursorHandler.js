
class CursorHandler_S {
    static listeners = null;
    static {
        this.cursor = null;
        this.X = 0;
        this.Y = 0;
        if(SPLINT.Events.onInitComplete.dispatched == false) {
            SPLINT.Events.onInitComplete = function(){
                this.#initCursor();
            }.bind(this);
        } else {
            this.#initCursor();
        }
    }
    static #initCursor(){
        if(this.listener != null){
            return;
        }
        CursorHandler_S.cursor = new SPLINT.DOMElement("customCursor", "span", document.body);
        CursorHandler_S.cursor.Class("customCursor");
        let l = function(event){
            CursorHandler_S.X = event.pageX;
            CursorHandler_S.Y = event.pageY;
            CursorHandler_S.updateCursor();
        }
        this.listener = document.body.SEvent.addListener("mousemove", l, false)
    }
    static remove(){
        if(this.listener != null) {
            this.listener.remove();
            this.listener = null;
            this.unsetCursor();
        }
    }
    static setCursor(type, rotation){
        if(type != this.type){
            this.type = type;
            this.#getCursor(type);
        }
        this.rotation = rotation;
        this.updateCursor();
        document.documentElement.style.cursor = "none";
        this.cursor.style.visibility = "visible";

    }
    static unsetCursor(){
        document.documentElement.style.cursor = "auto";
        this.cursor.style.visibility = "hidden";

    }
    static updateCursor(){
        this.#initCursor();
        this.width = this.cursor.clientWidth / 2;
        this.height = this.cursor.clientHeight / 2;
        this.cursor.style.transform = "translate3d(" + (this.X - this.width) + "px, " + (this.Y - this.height) + "px, 0) rotate(" + this.rotation + "deg)";
    }
    static #getCursor(type){
      switch(type){
        case "crossArrow"   : this.cursor.bindIcon("open_with"); break;
        case "doubleArrow"  : this.cursor.bindIcon("open_in_full"); break;
        case "rotate"       : this.cursor.bindIcon("refresh"); break;
      }
    }
}

