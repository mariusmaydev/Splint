class Header {
    constructor(){
        this.parent = document.body;
        this.name = "HEADER";
        this._logoSRC = splint_PATHS.images.error;
        this.logoHref = false
        this._logoText = "";

        this.buttons = [];

        this.id = "splint_header_";
        this.mainElement = new SPLINT.DOMElement(this.id + "main", "div", this.parent)
        this.mainElement.Class("header");
        this.draw();
    }
    draw(){
        this.logoLinkBox = new SPLINT.DOMElement(this.id + "logoLinkBox", "a", this.mainElement);
        this.logoLinkBox.Class("logoLinkBox");
        this.logoLinkBox.onclick = function(){
            if(this.logoHref != false){
                SPLINT.Tools.Location_old.goto(this.logoHref).call();
            }
        }.bind(this);

            this.logoImg = new SPLINT.DOMElement(this.id + "logoImg", "img", this.logoLinkBox);
            this.logoImg.Class("logoIcon");
            this.logoImg.src = this._logoSRC;

            this.logoTextEle = new SPLINT.DOMElement(this.id + "logoText", "span", this.logoLinkBox);
            this.logoTextEle.Class("logoText");
            this.logoTextEle.innerHTML = this._logoText;

        this.headerNavigation = new SPLINT.DOMElement(this.id + "Navigation", "nav", this.mainElement);
        this.headerNavigation.Class("headerNavigation");
    }
    /**
     * add Button to NavBar
     *
     * @param   {string}  value     text
     * @param   {function|string}  onclick   function or href
     *
     * @return  {S_Button}           return button element
     */
    addButton(value, onclick = function(){}){
        let button = new S_Button(this.headerNavigation, this.buttons.length, value);
        if(typeof onclick !== 'function'){
            button.onclick = function(){
                SPLINT.Tools.Location_old.goto(onclick).call();
            }
        } else {
            button.onclick = onclick;
        }
        this.buttons.push(button);
        return button;
    }
    setAttribute(name, value){
        this.mainElement.setAttribute(name, value);
    }
    getAttribute(name){
        return this.mainElement.getAttribute(name);
    }
    set logoText(v){
        this._logoText = v;
        this.draw();
    }
    set logoSRC(v){
        this._logoSRC = v;
        this.draw();
    }
}