
SPLINT.require_now("@SPLINT_ROOT/Utils/color/AcolorConverter.js");
/**
 * @class Color API
 */
 class S_Colors extends S_ColorsConverter {
    static get colorHSVa(){
        return S_colorHSVa;
    }
    static get colorHSLa(){
        return S_colorHSLa;
    }
    static get colorRGBa(){ 
        return S_colorRGBa;
    }
    static get Gradient(){ 
        return Gradient;
    }
    
    static parse(colorIn, type){
        if(colorIn.type == type){
            return colorIn;
        }
        let colorOut;
        //Out
        switch(type){
            case 'rgba' : colorOut = new S_Colors.colorRGBa(); break;
            case 'hsva' : colorOut = new S_Colors.colorHSVa(); break;
            // case 'hsla' : colorOut = new S_TColors.colorHSLa(); break;
            default: SPLINT.debugger.error("S_Color", "parsing exception"); break;
        }
        //In
        switch(colorIn.type){
            case 'rgba' : return (colorOut.fromRGB(colorIn)); break;
            case 'hsva' : return (colorOut.fromHSV(colorIn)); break;
            // case 'hsla' : return colorOut.fromHSL(colorIn); break;
            default: SPLINT.debugger.error("S_Color", "parsing exception"); break;
        }
    }
    
    constructor(){
        super();
    }
    
}