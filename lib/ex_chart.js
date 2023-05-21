



// class S_Chart extends S_DOMElement {
//     static { 
//         this.TAG_NAME = "s-chart";
//     }
//     static get observedAttributes() { return ['name']; }
//     constructor(parent, name, config = null){
//         super();
//         this.parent     = parent;
//         this.name       = name;
//         this.id         = "S_Chart__" + name + "__";
//             this.canvas = new SPLINT.DOMElement(this.id + "canvas", "canvas", this);
//             this.ctx = this.canvas.getContext("2d");
//             // this.canvas.Class("canv");     
//         this.config     = config;  
//         this.initEvents();
//         console.dir(window);
//     }
//     #config = null;
//     set name(v){ this.setAttribute("name", v) }
//     get name(){ return this.getAttribute("name") }
//     set config(v){  this.#config = v; this.#drawChart(); }
//     get config(){ return this.#config }

//     #drawChart(){                 
//         if(this.#config != null){ 
//             if(typeof this.chart == 'object'){
//                 this.chart.destroy();
//             }
//             this.chart = new Chart(this.ctx, this.#config);
//         }
//     }
//     async initEvents(){
//     }
//     attributeChangedCallback(name, oldValue, newValue) {
//         this.onAttributeChanged(name, oldValue, newValue);
//         if(name == "name"){

//         } else if(name == "config"){
//             this.config = newValue;
//         }
//     }
// }
