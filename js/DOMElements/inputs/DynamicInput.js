
class S_DynamicInput {
    #listElements = [];
    #headline = null;
    #HeadlineContainer = null;
    constructor(parent, name, headline = null){
        this.parent = parent;
        this.name = name;
        this.id = "s-DynamicInput__" + name + "__";
        this.mainElement = new SPLINT.DOMElement(this.id + "main", "div", this.parent);
        this.mainElement.Class("s-DynamicInput");
        this.contentElement = new SPLINT.DOMElement(this.id + "content", "div", this.mainElement);
        this.contentElement.Class("content");
        this.#headline = headline;
        this.template = function(contentElement, listElement, index, id){
            let input1 = new SPLINT.DOMElement.InputDiv(contentElement, "1", "input1");
            let input2 = new SPLINT.DOMElement.InputDiv(contentElement, "2", "input2");
        }
        this.onAdd = function(contentElement, listElement){

        }
        this.onSub = function(contentElement, listElement){

        }
    }
    set headline(v){
        this.#headline = v;
        this.#drawHeadline();
    }
    get headline(){
        return this.#headline;
    }
    get headlineContainer(){
        return this.#HeadlineContainer;
    }
    get list(){

        let res = [];
        for(const i in this.#listElements){
            let e = this.#listElements[i];
            if(e == null){
                continue;
            }
            let obj = new Object();
                obj.listElement = e;
                obj.contentElement = e.querySelector(".content");
            res.push(obj)
        }
        return res;
    }
    #drawHeadline(){
        if(this.#headline != null){
            this.#HeadlineContainer = new SPLINT.DOMElement(this.id + "headline_container", "div", this.mainElement);
            this.#HeadlineContainer.Class("headlineContainer");
                let headlineElement = new SPLINT.DOMElement.SpanDiv(this.#HeadlineContainer, "headline", this.#headline);
                    headlineElement.Class("headline");
                new SPLINT.DOMElement.HorizontalLine(this.#HeadlineContainer);

            this.mainElement.insertBefore(this.#HeadlineContainer, this.mainElement.firstChild);
        } else {
            this.#HeadlineContainer.remove();
        }
    }
    draw(){
        let index = this.#listElements.length;
        let lE_ID = this.id + "listElement_" + index + "_";
        let listElement = new SPLINT.DOMElement(lE_ID + "main", "div", this.contentElement);
            listElement.Class("listElement");
            listElement.setAttribute("index", index);
        this.#listElements.push(listElement);
            let listElementContent = new SPLINT.DOMElement(lE_ID + "content", "div", listElement);
                listElementContent.Class("content");
                this.template(listElementContent, listElement, index, lE_ID);
            let listElementButtons = new SPLINT.DOMElement(lE_ID + "buttons", "div", listElement);
                listElementButtons.Class("buttons");
                let buttonAdd = new SPLINT.DOMElement.Button(listElementButtons, "add");
                    buttonAdd.bindIcon("add")
                    buttonAdd.setStyleTemplate(SPLINT.DOMElement.Button.STYLE_DEFAULT)
                    buttonAdd.onclick = function(){
                        this.onAdd(listElementContent, listElement);
                        this.draw();
                    }.bind(this);
                let buttonSub = new SPLINT.DOMElement.Button(listElementButtons, "sub");
                    buttonSub.bindIcon("remove")
                    buttonSub.setStyleTemplate(SPLINT.DOMElement.Button.STYLE_DEFAULT)
                    buttonSub.onclick = function(){
                        this.onSub(listElementContent, listElement);
                        // for(const i in this.#listElements){
                        //     let e = this.#listElements[i];
                        //     if(e.index == index){
                                this.#listElements[index] = null;
                            // }
                        // }
                        listElement.remove();
                    }.bind(this);
    }
}