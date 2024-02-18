
class SlideShow_S {
    constructor(parent, name){
        this.parent = parent;
        this.name = name;
        this.id = "slideShow_" + name + "_";
        this.mainElement = new SPLINT.DOMElement(this.id + "main", "div", this.parent);
        this.mainElement.Class("SlideShow_S");
        this.list = [];
        this.onClickElement = function(){};
        this.draw();
    }
    Class(name){
        this.mainElement.Class(name);
    }
    draw(){
        this.mainElement.addEventListener("wheel", function(e){
            if (e.deltaY > 0) {
                this.mainElement.scrollLeft += 100;
                e.preventDefault();
            // prevenDefault() will help avoid worrisome 
            // inclusion of vertical scroll 
            } else {
                this.mainElement.scrollLeft -= 100;
                  e.preventDefault();
            }
        }.bind(this));
        this.innerElement = new SPLINT.DOMElement(this.id + "inner", "div", this.mainElement);
        this.innerElement.Class("inner");
    }
    appendElement(element){
        let listElement = new SPLINT.DOMElement(this.id + "listElement_" + this.list.length, "div", this.innerElement);
            listElement.Class("listElement");
            if(element.getAttribute("value") != null){
                listElement.setAttribute("value", element.getAttribute("value"));
            }
            listElement.onclick = function(){
                this.onClickElement(element, listElement);         
                for(let i = 0; i < this.innerElement.children.length; i++){
                    let ele = document.getElementById(this.innerElement.children[i].id);
                        ele.setAttribute("state", "passive");
                }
                listElement.setAttribute("state", "active");
            }.bind(this);
            listElement.appendChild(element);
            this.list.push(listElement);
    }
    set value(v){
        for(const ele of this.list){
            if(ele.getAttribute("value") == v){
                ele.click();
                return;
            }
        }
    }
    getElement(value = null){
        if(value != null){
            for(const ele of this.list){
                if(ele.getAttribute("value") == value){
                    return ele;
                }
            }
        }
        let ele = new SPLINT.DOMElement(this.id + "listElement_" + this.list.length, "div", this.innerElement);
            ele.setAttribute("value", value);
            ele.Class("listElement");
            this.list.push(ele);
        return ele;
    }
}