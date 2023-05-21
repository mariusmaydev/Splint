
class S_SVGHelper {
    static createElement(NS, tag, id){

        if(document.getElementById(id) != null){
            return document.getElementById(id);
        } else {
            let element = document.createElementNS(NS, tag);
            element.setAttribute("id", id);
            return element;
        }
    }
}