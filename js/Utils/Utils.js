

class S_Utils {
    /**
     * desc
     * @date 2023-06-12
     */
    static get Colors(){
        SPLINT.getClass("S_Colors", "color");
        return S_Colors;
    }
    static get idleCallbackManager(){
        SPLINT.getClass("S_idleCallbackManager", "idleCallbackManager");
        return S_idleCallbackManager;
    }
    /**
     * desc
     * @date 2023-06-12
     */
    static get ANSI(){
        SPLINT.getClass("S_ANSI", "ANSI");
        return S_ANSI;
    }
    static get TouchEmulator(){
        SPLINT.require_now('@SPLINT_ROOT/Utils/TouchEmulator.js');
        return class {
            static start(){
                TouchEmulator();
            }
            static remove(){
                removeTouchEmulator();
            }
        }
    }
    /**
     * desc
     * @date 2023-06-12
     */
    static get Files(){
        SPLINT.getClass("S_FileUtils", "Files");
        return S_FileUtils;
    }
}