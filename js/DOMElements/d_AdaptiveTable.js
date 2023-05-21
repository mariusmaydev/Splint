
class d_AdaptiveTable {
    constructor(parent, name = "") {
        this.name = name;
        this.parent = parent;
        this.innerWidth   = 0;
        this.ColumnCount  = 0;
        this.index = 0;
        this.offset = 0;
        this.id = "AdaptiveTable_" + name + "_";
        this.mainElement = new SPLINT.DOMElement(this.id + "main", "div", this.parent);
        this.mainElement.Class("AdaptiveTableMain");
        this.initEvents();
    }
    reset(){
      if(this.mainCover != undefined){
        // this.main.remove();
        this.mainElement.innerHTML = "";
        this.innerWidth   = 0;
        this.ColumnCount  = 0;
        this.index = 0;
        this.offset = 0;
      }
    }
    initEvents(){
        window.addEventListener("resize", function(e){
            this.generate(this.name, this.objectArray, this.drawElement_func);
        }.bind(this));
    }
    clear(){
      this.mainCover.innerHTML = "";
    }
    async expand(objectArray, offset){
      if(this.mainCover != undefined){
        this.offset = offset;
        this.objectArray  = objectArray;
        this.index++;
        await this.drawListElements();
      }
    }
    generate(name, objectArray, drawElement_func){
      this.drawElement_func = drawElement_func;
          this.reset();
  
      this.main = new SPLINT.DOMElement(this.parent.id + "_List_" + name + "_Main", "div", this.mainElement, function(){console.log("c")});
      this.mainWidth    = this.main.getBoundingClientRect().width;
      this.mainLeft     = this.main.getBoundingClientRect().left;
      this.objectArray  = objectArray;
      this.calculateColumns();
      this.drawListElements();
    }
    calculateColumns(){
      while(this.mainWidth > this.innerWidth){
        let Column = new SPLINT.DOMElement(this.id + "Column_" + this.ColumnCount, "div", this.main);
            Column.Class("column");
            Column.setAttribute("index", this.ColumnCount);
  
        this.innerWidth = Column.getBoundingClientRect().right - this.mainLeft;
        this.ColumnCount++;
      }
    }
    async drawListElements(){
      if(this.objectArray.length <= 0){
        return false;
      }
      while(await this.draw(this.index) == 'loaded'){
        if(this.index < this.objectArray.length - 1 + this.offset){
          this.index++;
        } else {
          break;
        }
      }
      return true;
    }
    draw(index){
        return new Promise(resolve => {
            let value = f1(this.ColumnCount);
            
            let columnElement = document.querySelector(`div[index="${CSS.escape(value)}"]`);
    
            console.log(this.ColumnCount);
            let resolve_func = function(){
                resolve('loaded');
            };
            let listElement = new SPLINT.DOMElement(this.id + "ListElement", "div", columnElement);
                listElement.Class("ListElement");
            this.drawElement_func(columnElement, index, resolve_func);
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
