

class S_Utils {
    /**
     * desc
     * @date 2023-06-12
     */
    static get Colors(){
        SPLINT.getClass("S_Colors", "color");
        return S_Colors;
    }
    /**
     * desc
     * @date 2023-06-12
     */
    static get ANSI(){
        SPLINT.getClass("S_ANSI", "ANSI");
        return S_ANSI;
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