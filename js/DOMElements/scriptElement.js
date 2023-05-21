
class scriptElement_S {
    constructor(src){
        this.element = new SPLINT.DOMElement(null, "script", document.body);
        this.element.src = src
    }
    static loadFromSplint(src){
        src = location.protocol + "//" + location.host + "/Splint/js/" + src;
        new scriptElement_S(src);   
    }
}