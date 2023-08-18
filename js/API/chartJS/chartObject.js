
class S_chartObject {
    constructor(type = 'line', ...dataSets){
        this.type = type;
        this.data = new Object();
        this.data.datasets = [];
        if(dataSets.length > 0){
            for(const e of dataSets){
                e.update();
            }
            this.data.datasets.push(...dataSets);
        }
        this.plugins = [];
        this.options = new SPLINT.Types.autoObject();
        this.options.maintainAspectRatio = false;
        // this.options.scales.x.type = 'linear';
        this.options.layout.padding = 20;
        this.options.scales.x.grid.display = false;
        // this.options.scales.x.ticks = {};
        // this.options.scales.x.ticks.max = 300;
        this.options = this.options.parseToObject();
    }
    setXdata(...labels){
        this.data.labels = labels;
    }
    update(){
        for(const e of this.data.datasets){
            e.update();
        }
    }
    addDataSet(dataSet){
        this.data.datasets.push(dataSet);
    }
}

class S_chartDataSet {
    constructor(data = null, backgroundColor = null, label = []){
        if(data != null){
            this.addData(data);
        }
        if(backgroundColor != null){
            this.backgroundColor = backgroundColor;
        }
        this.options = new SPLINT.Types.autoObject();
        this.type = 'bar';
        this.label = label;
        this.base = 0;
        this.barThickness = 'flex';
        this.borderColor = 'black';
        this.borderWidth = 1;
    }
    #data = [];
    get data(){
        return this.#data;
    }
    update(){
        if(this.gradient instanceof SPLINT.Utils.Colors.Gradient){
            this.gradient.steps = this.#data.length;
            this.#backgroundColor = SPLINT.API.ChartJS.parseGradient(this.gradient);
        }
    }
    #backgroundColor;
    borderColor;
    color;
    set backgroundColor(color){
        if(color instanceof SPLINT.Utils.Colors.Gradient){
            this.gradient = color.clone();
            this.gradient.steps = this.#data.length;
            this.#backgroundColor = SPLINT.API.ChartJS.parseGradient(this.gradient);
        } else {
            this.gradient = null;
            this.#backgroundColor = color.clone();
        }
    }
    get backgroundColor(){
        return this.#backgroundColor;
    }
    /**
     * @example 
     * if(x2 != null){
     *      x1  stands for  X
     *      x2  stands for  Y
     * } else {
     *      x1  stands for  Y
     * }
     * 
     * @param {any} x1 
     * @param {string|number|null} x2  
     */
    #addDataPairs(x1, x2 = null){
        if(x2 != null){
            this.#data.push({x:x1.toString(), y:x2});
        } else {
            let x = this.#data.length + 1;
            this.#data.push({x:x.toString(), y:x1});
        }

    }
    /**
     * @example 
     * if(x2 != null){
     *      x1  stands for  X
     *      x2  stands for  Y
     * } else {
     *      x1  stands for  Y
     * }
     * 
     * @param {any} x1 
     * @param {any} x2  
     */
    addData(data, data2 = undefined){
        switch(typeof data){
            case 'string' : {
                this.#addDataPairs(data, data2); break;
            }
            case 'number' : {
                this.#addDataPairs(data, data2); break;
            }
            case 'BigInt' : {
                this.#addDataPairs(data, data2); break;
            }
            case 'object' : {
                if(data instanceof Map){
                    this.#addDataMap(data); break;
                }
                if(data instanceof Array){
                    this.#addDataArray(data); break;
                }
                if(data instanceof Object){
                    this.#addDataObject(data); break;
                }
                SPLINT.debugger.error("wrong input data", "data must be an instanceof 'Object', 'Array' or 'Map'"); break;
            }
            default : {
                console.group("Error - ChartDataSet");
                SPLINT.debugger.error("wrong input data", "data must be type of 'string', 'number', 'BigInt', 'Object', 'Array' or 'Map'"); 
                SPLINT.debugger.error("data1", typeof data); 
                SPLINT.debugger.error("data2", typeof data2); 
                console.groupEnd();
            } break;
        }
    }
    #addDataMap(mapIn){
        for(const [key, value] of mapIn){
            this.#addDataPairs(key, value);
        }
    }
    #addDataObject(obj){
        return this.#addDataMap(SPLINT.Tools.parse.ObjectToMap(obj));
    }
    #addDataArray(array){
        for(const e of array){
            if(e instanceof Object && (Object.entries(e).length > 0)){
                let f = Object.entries(e);
                this.#addDataPairs(f[0][0], f[0][1]);
            } else {
                this.#addDataPairs(e);
            }
        }
    }
    // parseObject(array){
    //     return Object.entries(object).map(([key, value]) => ({key,value}));
    // }
}