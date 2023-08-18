// function require(anyPath, name){
//     return window.Chart;
// // }
// const { Chart } = require("chart.js");

class S_ChartContainer {
    /**
     * 
     * @param {string} name 
     * @param {HTMLElement} parent 
     * @param {object | SPLINT.API.ChartJS.Object} config 
     */
    constructor(name, parent, config){
        this.id = "S-ChartContainer__" + name + "__";
        this.parent = parent;
        this.#mainElement = new SPLINT.DOMElement(this.id + "_Body", "div", this.parent);
        this.#mainElement.Class("S-chartContainer");
        this.#labelContainer = new SPLINT.DOMElement(this.id + "_labelContainer", "div", this.#mainElement);
        this.#labelContainer.Class("labelContainer");
        this.#canvas = new SPLINT.DOMElement(this.id + "_Canvas", "canvas", this.#mainElement);
        this.#context = this.#canvas.getContext("2d");
        this._config = config;
        if(this._config instanceof SPLINT.API.ChartJS.Object){
            this.#Chart = new Chart(this.#context, this._config);
        } else {
            this.#Chart = new Chart(this.#context, this._config);
        }
        this.name = name;
        this.#initEvents();
    }
    #initEvents(){
        this.#mainElement.onresize = function(){
            this.resize();
        }.bind(this);
    }
    resize(){
        this.#Chart.resize()
    }
    update(){
        for(const e of this.#Chart.data.datasets){
            e.update();
        }
       this.#Chart.update();
    }
    #mainElement
    #canvas
    #context
    #Chart
    #name;
    #label;
    #labelContainer;
    #labelElement;
    set label(v){
        this.#label = v;
        if(v != null){
            this.#labelElement = new SPLINT.DOMElement.SpanDiv(this.#labelContainer, "label", v);
        } else {
            this.#labelContainer.clear();
        }
    }
    get name(){
        return this.#name;
    }
    set name(v){
        this.#name = v;
        this.#mainElement.setAttribute("name", v);
        this.#canvas.setAttribute("name", v);
    }
    get Chart(){
        return this.#Chart;
    }
    get container(){
        return this.#mainElement;
    }
    get canvas(){
        return this.#canvas;
    }
    get context(){
        return this.#context;
    }
    get ctx(){
        return this.#context;
    }
    get config(){
        return this._config;
    }
    set config(v){
        this._config = v;
        if(v.options != undefined){
            this.#Chart.options = v.options;
        }
        if(v.type != undefined){
            this.#Chart.type = v.type;
        }
        if(v.data != undefined){
            this.#Chart.data = v.data;
        }
        this.update();
    }
}