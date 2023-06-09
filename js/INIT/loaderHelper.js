
class SPLINT_LOADER_helper {
    static {
        this.ELEMENTS = this.#queryElements();
    }
    static #queryElements(){
        function parse(element){
            let obj = new Object();
                obj.name    = element.tagName.toLowerCase();
                obj.src     = element.getAttribute("src");
                obj.element = element;

                return obj;
        }
        let res = new Object();
            res.scripts_pre     = [];
            res.scripts_first   = [];
            res.scripts         = [];
            res.stylesheets     = [];
            res.modules         = [];
            res.loader          = [];

        let elements = document.querySelectorAll("s-part, s-loader, s-style, s-module")
        for(const element of elements){
            let tagName = element.tagName.toLowerCase();
            switch(tagName){
                case 's-style'  : res.stylesheets.push(parse(element)); break;
                case 's-module'   : res.modules.push(parse(element)); break;
                case 's-part'     : {
                    if(element.hasAttribute("pre")){
                        res.scripts_pre.push(parse(element));
                        break;
                    } else if(element.hasAttribute("first")){
                        res.scripts_first.push(parse(element));
                        break;
                    }
                    res.scripts.push(parse(element)); 
                } break;  
                case 's-loader'   : res.loader.push(parse(element)); break;
                default : console.error("SPLINT - load Elements"); continue;
            }
        }
        return res;
    }
}