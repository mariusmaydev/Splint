
class AdaptiveTable {
    constructor(parent, name = "", objectArray) {
        this.objectArray = objectArray;
        this.name   = name;
        this.parent = parent;
        this.id = "AdaptiveTable_" + name + "_";
        this.mainElement = new DOMElement(this.id + "main", "div", this.parent);
        this.mainElement.Class("AdaptiveTableMain");
        this.listMain = new DOMElement(this.id + "listMain", "div", this.mainElement);
        this.listMain.Class("ListMain");
        this.initEvents();
        this.func_drawListElement = function(){};
    }
    initEvents(){
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
          await this.fillColumns();
    }
    draw(){
        this.innerWidth     = 0;
        this.ColumnCount    = 0;
        this.offset         = 0;
        this.index          = 0;
        this.generateColumns();
        this.fillColumns();
    }
    generateColumns(){
        this.mainWidth    = this.listMain.getBoundingClientRect().width;
        this.mainLeft     = this.listMain.getBoundingClientRect().left;
        while(this.mainWidth > this.innerWidth){
            let Column = new DOMElement(this.id + "Column_" + this.ColumnCount, "div", this.listMain);
                Column.Class("column");
                Column.setAttribute("index", this.ColumnCount);
    
            this.innerWidth = Column.getBoundingClientRect().right - this.mainLeft;
            this.ColumnCount++;
        }
    }    
    async fillColumns(){
        if(this.objectArray.length <= 0){
          return false;
        }
        while(await this.drawListElement(this.index) == 'loaded'){
          if(this.index < this.objectArray.length - 1 + this.offset){
            this.index++;
          } else {
            break;
          }
        }
        return true;
    }
    drawListElement(index){
        return new Promise(resolve => {
            let value = f1(this.ColumnCount);
            
            let columnElement = document.querySelector(`div[index="${CSS.escape(value)}"]`);
    
            let resolve_func = function(){
                resolve('loaded');
            };
            let listElement = new DOMElement(this.id + "ListElement_" + index, "div", columnElement);
                listElement.Class("ListElement");
            this.func_drawListElement(listElement, index, resolve_func);
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

class d_AdaptiveTable {
    constructor(parent, name = "") {
        this.name = name;
        this.parent = parent;
        this.innerWidth   = 0;
        this.ColumnCount  = 0;
        this.index = 0;
        this.offset = 0;
        this.id = "AdaptiveTable_" + name + "_";
        this.mainElement = new DOMElement(this.id + "main", "div", this.parent);
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
  
      this.main = new DOMElement(this.parent.id + "_List_" + name + "_Main", "div", this.mainElement, function(){console.log("c")});
      this.mainWidth    = this.main.getBoundingClientRect().width;
      this.mainLeft     = this.main.getBoundingClientRect().left;
      this.objectArray  = objectArray;
      this.calculateColumns();
      this.drawListElements();
    }
    calculateColumns(){
      while(this.mainWidth > this.innerWidth){
        let Column = new DOMElement(this.id + "Column_" + this.ColumnCount, "div", this.main);
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
            let listElement = new DOMElement(this.id + "ListElement", "div", columnElement);
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

//   class AdaptiveTable {
//     constructor(parent) {
//       this.parent = parent;
//       this.innerWidth   = 0;
//       this.ColumnCount  = 0;
//       this.index = 0;
//       this.offset = 0;
//       this.initEvents();
//     }
//     reset(){
//       if(this.mainCover != undefined){
//         this.mainCover.innerHTML = "";
//         this.innerWidth   = 0;
//         this.ColumnCount  = 0;
//         this.index = 0;
//         this.offset = 0;
//       }
//     }
//     initEvents(){
//         window.addEventListener("resize", function(e){
//             console.log(e);
//             this.reset();
//             this.generate(this.name, this.objectArray, this.drawElement_func);
//         }.bind(this));
//     }
//     clear(){
//       this.mainCover.innerHTML = "";
//     }
//     async expand(objectArray, offset){
//       if(this.mainCover != undefined){
//         this.offset = offset;
//         this.objectArray  = objectArray;
//         this.index++;
//         await this.drawListElements();
//       }
//     }
//     generate(name, objectArray, drawElement_func){
//       this.drawElement_func = drawElement_func;
//       let mainCover = new DOMElement(this.parent.id + "_List_" + name + "_Main_Cover", "div", this.parent);
//           mainCover.Class("AdaptiveTableMain");
//           this.mainCover    = mainCover;
//           this.reset();
  
//       let main = new DOMElement(this.parent.id + "_List_" + name + "_Main", "div", mainCover, function(){console.log("c")});
//       this.main         = main;
//       this.name         = name;
//       this.mainWidth    = main.getBoundingClientRect().width;
//       this.mainLeft     = main.getBoundingClientRect().left;
//       this.objectArray  = objectArray;
//       this.calculateColumns();
//       this.drawListElements();
//     }
//     calculateColumns(){
//       while(this.mainWidth > this.innerWidth){
//         let Column = new DOMElement(this.parent.id + "_List_" + this.name + "_Column_" + this.ColumnCount, "div", this.main.id);
//             Column.Class("column");
//             Column.setAttribute("index", this.ColumnCount);
  
//         this.innerWidth = Column.getBoundingClientRect().right - this.mainLeft;
//         this.ColumnCount++;
//       }
//     }
//     async drawListElements(){
//       if(this.objectArray.length <= 0){
//         return false;
//       }
//       while(await this.draw(this.index) == 'loaded'){
//         if(this.index < this.objectArray.length - 1 + this.offset){
//           this.index++;
//         } else {
//           break;
//         }
//       }
//       return true;
//     }
//     draw(index){
//       return new Promise(resolve => {
//         let value = f1(this.ColumnCount);
        
//         let columnElement = document.querySelector(`div[index="${CSS.escape(value)}"]`);
  
//         let resolve_func = function(){
//           resolve('loaded');
//         }
//         this.drawElement_func(columnElement, index, resolve_func);
//         });
//         function f1(ColumnCount){
//           let value = 100000;
//           let index = 0;
//           for(let i = 0; i < ColumnCount; i++){
//             let height = document.querySelector(`div[index="${CSS.escape(i)}"]`).getBoundingClientRect().height;
//             if(height < value){
//               value = height;
//               index = i;
//             }
//           }
//           return index;
//         }
//     }
//   }