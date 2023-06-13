
class P_Header {
    constructor(parent = document.body){
        this.parent = parent;
        this.id = "SP_Header__";
        this.mainElement = new SPLINT.DOMElement(this.id + "main", "div", this.parent);
        this.mainElement.Class("P_HeaderContainer");
        this.contentElement = new SPLINT.DOMElement(this.id + "contentElement", "div", this.mainElement);
        this.contentElement.Class("content");
        this.draw();
    }
    draw(){
        this.logo = new SPLINT.DOMElement(this.id + "Logo_Container", "div", this.contentElement);
        this.logo.Class("logo");
        this.logo.onclick = function(){
            PageNavigation.src = "/index.html";
        }
            let logoImg = new SPLINT.DOMElement(this.id + "Logo_img", "img", this.logo);
                logoImg.alt = "LOGO";
            
        let buttons = new SPLINT.DOMElement(this.id + "buttons", "div", this.contentElement);
            buttons.Class("buttons");
            let bt_docs = new SPLINT.DOMElement.Button(buttons, "docs", "documentation");
                bt_docs.basicStyling = S.BUTTON_STYLES.GENERAL;
                bt_docs.onclick = function(){
                    PageNavigation.src = "/documentation/index.html";
                }

            let bt_projectManager = new SPLINT.DOMElement.Button(buttons, "projectManager", "project manager");
                bt_projectManager.basicStyling = S.BUTTON_STYLES.GENERAL;
                bt_projectManager.onclick = function(){
                PageNavigation.src = "/Projects/index.html";
                    
                }
            
        this.drawPath();
            // console.dir(a)
    }
    drawPath(){
        if(this.path != undefined){
            this.path.clear();
        }
        this.path = new SPLINT.DOMElement(this.id + "path", "div", this.mainElement);
        this.path.Class("path");
        this.navPath = PageNavigation.navPath;
        for(const i in this.navPath.path){
            let ele = this.navPath.path[i];
            if(i > 0){
                let divider = new SPLINT.DOMElement.SpanDiv(this.path, "path_divider_" + i, "chevron_right");
                    divider.span.Class("material-symbols-outlined");
            }
            let button = new SPLINT.DOMElement.Button(this.path, "path_bt_" + i, ele.pathElement);
            if(ele.pathElement === "HTML"){
                button.bindIcon("home")
            }
            button.onclick = function(){
                if(SPLINT.Utils.Files.doesExist(ele.fullPath, true)){
                    window.location.href = ele.fullPath;
                } else {
                    window.location.href = this.navPath.path[i-1].fullPath;
                }
            }.bind(this);
        }
        let last = this.navPath.path[this.navPath.path.length - 1];
        for(const i in last.params){
            let ele = last.params[i];
                let divider = new SPLINT.DOMElement.SpanDiv(this.path, "path_divider_p_" + i, "arrow_forward");
                    divider.span.Class("material-symbols-outlined");
            let button = new SPLINT.DOMElement.Button(this.path, "path_bt_p_" + i, Object.values(ele)[0]);
            button.onclick = function(){
                if(SPLINT.Utils.Files.doesExist(last.fullPath, true)){
                    SPLINT.Tools.Location.URL = last.fullPath;
                    SPLINT.Tools.Location.addParams(...last.params).call();
                } else {
                    // window.location.href = this.navPath.path[this.navPath.path.length - 2].fullPath;
                }
            }.bind(this);
        }
        for(const i in last.hashes){
            let ele = last.hashes[i];
                let divider = new SPLINT.DOMElement.SpanDiv(this.path, "path_divider_h_" + i, "double_arrow");
                    divider.span.Class("material-symbols-outlined");
            let button = new SPLINT.DOMElement.Button(this.path, "path_bt_h_" + i, ele);
            button.onclick = function(){
                if(SPLINT.Utils.Files.doesExist(last.fullPath, true)){
                    SPLINT.Tools.Location.URL = last.fullPath;
                    SPLINT.Tools.Location.addHash(ele).addParams(...last.params).call();
                    // PageNavigation.src
                    // window.location.href = last.fullPath;
                } else {
                    window.location.href = this.navPath.path[this.navPath.path.length - 2].fullPath;
                }
            }.bind(this);
        }
    }
}