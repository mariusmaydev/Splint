
class S_DataList {
    options = [];
    constructor(name, parent = document.body){
        this._name  = name;
        this.parent = parent;
        this._id     = "s_dataList__";
        this.mainElement = new SPLINT.DOMElement(this._id + name, "datalist", parent);
    }
    get id(){
        return this._id + this._name;
    }
    remove(){
        this.mainElement.remove();
        this.options = [];
    }
    appendTo(element){
        element.setAttribute("list", this.id);
    }
    addOption(value, label = ""){
        let optionElement = this.#createOption(value, label);
        this.options.push(optionElement)
        return optionElement;
    }
    removeOption(value){
        return this.getOption(value).remove();
    }
    getOption(value){
        return this.mainElement.querySelectorAll('[value="' + value + '"]');
    }
    #createOption(value, label = ""){
        let ele =  new SPLINT.DOMElement(this.id + "_" + this.options.length, "option", this.mainElement);
            ele.value       = value;
            ele.label       = label;
        return ele;
    }
}