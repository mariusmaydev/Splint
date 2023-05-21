
class Table_Masonry {
    constructor(parent, name = "", objectArray) {
        this.objectArray = objectArray;
        this.name   = name;
        this.parent = parent;
        this.id = "AdaptiveTable_" + name + "_";
        this.mainElement = new SPLINT.DOMElement(this.id + "main", "div", this.parent);
        this.mainElement.Class("AdaptiveTableMain");
        this.listMain = new SPLINT.DOMElement(this.id + "listMain", "div", this.mainElement);
        this.listMain.Class("ListMain");
        this.#initEvents();
        this.onDrawListElement = function(listElement, index, resolve){};
    }
    #initEvents(){
        window.addEventListener("resize", function(){
            this.update();
        }.bind(this));
    }
    update(){
        this.listMain.innerHTML = "";
        this.ColumnCount = 0;
        this.innerWidth = 0;
        this.index = 0;
        this.draw();
    }
    async expand(objectArray, offset){
          this.offset       = offset;
          this.objectArray  = objectArray;
          this.index++;
          await this.#fillColumns();
    }
    draw(){
        this.innerWidth     = 0;
        this.ColumnCount    = 0;
        this.offset         = 0;
        this.index          = 0;
        this.#generateColumns();
        this.#fillColumns();
    }
    #generateColumns(){
        this.mainWidth    = this.listMain.getBoundingClientRect().width;
        this.mainLeft     = this.listMain.getBoundingClientRect().left;
        while(this.mainWidth > this.innerWidth){
            let Column = new SPLINT.DOMElement(this.id + "Column_" + this.ColumnCount, "div", this.listMain);
                Column.Class("column");
                Column.setAttribute("index", this.ColumnCount);

            this.innerWidth = Column.getBoundingClientRect().right - this.mainLeft;
            this.ColumnCount++;
        }
    }    
    async #fillColumns(){
        if(this.objectArray.length <= 0){
          return false;
        }
        while(await this.#drawListElement(this.index) == 'loaded'){
          if(this.index < this.objectArray.length - 1 + this.offset){
            this.index++;
          } else {
            break;
          }
        }
        return true;
    }
    #drawListElement(index){
        return new Promise(resolve => {
            let value = f1(this.ColumnCount);
            
            let columnElement = document.querySelector(`div[index="${CSS.escape(value)}"]`);
    
            let resolve_func = function(){
                resolve('loaded');
            };
            let listElement = new SPLINT.DOMElement(this.id + "ListElement_" + index, "div", columnElement);
                listElement.Class("ListElement");
            this.onDrawListElement(listElement, index, resolve_func);
        });
        function f1(ColumnCount){
          let value = 100000;
          let index = 0;
          for(let i = 0; i < ColumnCount; i++){
            let height = document.querySelector(`div[index="${CSS.escape(i)}"]`).getBoundingClientRect().height;
            if(height < value){
              value = height;
              index = i;
            }
          }
          return index;
        }
    }
}