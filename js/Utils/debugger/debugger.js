// import * as util from 'util';
class SPLINT_debugger {
    static #base = "%cSPLINT ";
    /**
     * @param {string} name name or identifier
     * @param {string} msg message 
     * @param {Array.<[Array<string>, <string> format]>} [formatting] formatting
     */
    static warn(name, msg, ...formatting){
        if(!SPLINT.CONFIG.settings.debugging.warn){
            return;
        }
        let obj = this.#format(msg ,formatting);
        let styles = obj.styles;
        msg = obj.msg;
        let log = SPLINT_debugger.#base + "%c[%c" + name + "%c] %c" + msg;
        console.warn(log, "color: green; font-weight: bold", "color: gray; font-weight: bold;", "color: red", "color: gray; font-weight: bold;", "color: black", ...styles)
    }
    /**
     * @param {string} name name or identifier
     * @param {string} msg message 
     * @param {Array.<[Array<string>, <string> format]>} [formatting] formatting
     */
    static log(name, msg, ...formatting){
        if(!SPLINT.CONFIG.settings.debugging.log){
            return;
        }
        let obj = this.#format(msg ,formatting);
        let styles = obj.styles;
        msg = obj.msg;
        let log = SPLINT_debugger.#base + "%c[%c" + name + "%c] %c" + msg;
        console.log(log, "color: green; font-weight: bold", "color: gray; font-weight: bold;", "color: red", "color: gray; font-weight: bold;", "color: black", ...styles)
    }
    /**
     * @param {string} name name or identifier
     * @param {string} msg message 
     * @param {Array.<[Array<string>, <string> format]>} [formatting] formatting
     */
    static error(name, msg, ...formatting){
        if(!SPLINT.CONFIG.settings.debugging.error){
            return;
        }
        let obj = this.#format(msg ,formatting);
        let styles = obj.styles;
        msg = obj.msg;
        let log = SPLINT_debugger.#base + "%c[%c" + name + "%c] %c" + msg;
        console.error(log, "color: green; font-weight: bold", "color: gray; font-weight: bold;", "color: red", "color: gray; font-weight: bold;", "color: black", ...styles)
    }
    /**
     * @param {string} name name or identifier
     * @param {string} msg message 
     * @param {Array.<[Array<string>, <string> format]>} [formatting] formatting
     */
    static logUser(name, msg = "", ...formatting){
        let styles = "";
        if(msg instanceof String){
            let obj = this.#format(msg ,formatting);
            styles = obj.styles;
            msg = "\n" + obj.msg;
            let log = SPLINT_debugger.#base + "%c[%c" + name + "%c] %c" + msg;
            console.log(log, "color: green; font-weight: bold", "color: gray; font-weight: bold;", "color: red", "color: gray; font-weight: bold;", "color: black", ...styles)
        } else {
            let log = SPLINT_debugger.#base + "%c[%c" + name + "%c] %c";
            console.group(log, "color: green; font-weight: bold", "color: gray; font-weight: bold;", "color: red", "color: gray; font-weight: bold;", "color: black");
            console.log(log, "color: green; font-weight: bold", "color: gray; font-weight: bold;", "color: red", "color: gray; font-weight: bold;", "color: black", ...styles)

            console.dir(msg);
            console.groupEnd();
        }
        
    }
    static #format(msg, formatting){
        let styles = [];
        for(const val of msg){
            for(const entry of formatting){
                if(typeof entry[0] == 'object'){
                    for(const str of entry[0]){
                        if(val == str){
                            styles.push(entry[1]);
                            styles.push("color: black;");
                            break;
                        }
                    }
                } else {
                    if(val == entry[0]){
                        styles.push(entry[1]);
                        styles.push("color: black;");
                        break;
                    }
                }
            }
        }
        for(const entry of formatting){
            if(typeof entry[0] == 'object'){
                for(const str of entry[0]){
                    msg = msg.replaceAll(str, "%c" + str + "%c");
                }
            } else {
                msg = msg.replaceAll(entry[0], "%c" + entry[0] + "%c");
            }
        }
        let obj = new Object();
            obj.styles = styles;
            obj.msg = msg;
        return obj;
    }
}

function labeledConsoleDirGroup(wrappedVar, obj) {
    const varName = Object.keys({obj})[0];
    console.group(varName);
    console.dir(wrappedVar[varName]);
    console.groupEnd(varName);
  }