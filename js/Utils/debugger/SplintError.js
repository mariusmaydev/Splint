
class SplintError {
    static #base = "%cSPLINT ";
    /**
     * @param {string} name name or identifier
     * @param {string} msg message 
     * @param {Array.<[Array<string>, <string> format]>} [formatting] formatting
     */
    static throw(error){
        if(typeof error != 'object'){
            error = this.getErrorByID(error);
        }
        let name = error.name;
        let solve = error.solve;
        let description = error.desc;
        let log = this.#base + "%c[%cError%c] %c" + name + " %c" + error.code + " %c" + error.args;
        console.groupCollapsed(log, "color: green; font-weight: bold;", "color: gray; font-weight: bold;", "color: red", "color: gray; font-weight: bold;", "color: black", "font-weight: normal; font-style: italic;", "font-style: normal;font-weight: normal");
            console.groupCollapsed("%c❔ %cDescription", "font-size: 1em;", "font-weight: bold;font-size: 1.1em;")
                console.log("%c" + description, "");
            console.groupEnd();
            console.groupCollapsed("%c💡 %cSolution", "font-size: 1em;", "font-weight: bold;font-size: 1.1em;")
                for(const e of solve){
                    console.log("%c" + e, "font-size: 1em;");
                }
            console.groupEnd();
        console.groupEnd();
    }
    static FileNotFound(src = null){
        let s = SPLINT.Utils.ANSI.use;
        let obj = new Object();
            obj.ID = 1;
            obj.name = "FileNotFound";
            obj.code = 404;
            if(src != null){
                obj.args = "  tried to load " + src;
            } else {
                obj.args = "";
            }
            obj.desc = "Splint cant find the File";
            obj.solve = [];
            obj.solve.push("🔄 reload if you have changed anything in your file tree");
            let str = "📝 set \\i\>cacheResources\\r\> in \\cFG^lightBlue\>splint.config.main\\r\> to \\b\>\\cFG^lightRed\>false";
            obj.solve.push(str.parseANSI(['.', 'b']));
            this.throw(obj)
    }
    static get ErrorUndefined(){
        let obj = new Object();
            obj.ID = -1;
            obj.name = "ErrorUndefined";
            obj.desc = "the given error code is undefined";
            obj.solve = "please contact the author.";
        return obj;
    }
}