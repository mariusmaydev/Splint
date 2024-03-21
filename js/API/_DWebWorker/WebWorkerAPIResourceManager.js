
class S_WebWorkerAPIResourceManager {
    
    static Resources = new Object();

    static addResource(resourceObj){
        this.Resources[resourceObj.name] = resourceObj;
    }
    static checkResources(name){
        if(this.Resources[name] instanceof this.ResourceObject){
            return this.Resources[name];
        }
        return false;
    }
    static loadURL(data){
        let key = this.#fileName(data);
        let res = this.checkResources(key);
        if(res != false){
            return res;
        }
        let uri = data;
            if(uri.substring(0, 1) == "."){
                uri = self.SPLINT.projectRootPath + uri;
            } else if(uri.substring(0, 1) == "@"){
                uri = uri.replace("@SPLINT_ROOT", self.origin + "/Splint/js");
                uri = uri.replace("@PROJECT_ROOT", self.origin + "/fd/resources/js");
            }

            let load = async function(){
                return new Promise(async function(resolve){
                    let contentString = "";
                    await fetch(uri).then(async function(res){
                        let text        = await res.text();
                        contentString   = [this.#bindBase(text)];
                        return contentString;
                    }.bind(this))
                    let res = URL.createObjectURL(new Blob(contentString, {type: "application/javascript"}));
                    resolve(res);
                }.bind(this));
            }.bind(this);

        let resourceObj = new this.ResourceObject(key, load);
        this.addResource(resourceObj)
        return resourceObj;

    }
    static loadClass(data){
        console.trace()
        key = data.name;
        // funcArray = ['(', this.#bindBase(data.toString()), ')' ];
    }
    static loadFunction(data){

    }
    static loadBlob(data){

    }
    static #fileName(url){
        return url.split("/").at(-1);
    }
    static #bindBase(text){
        let ob = Object.assign({}, window.SPLINT);
        delete ob.threeJS;
        delete ob.isWorker;
            ob.referrer = document.URL;
        let ob1 = JSON.stringify(ob);
        
        let loadFunc = function(){
            // console.log(data1)
            for(const e of Object.entries(arguments[0])){
                SPLINT[e[0]] = e[1];
            }
        };
        let funcArray1 = '(' + loadFunc.toString() + ".bind(null, " + ob1 + ")" + ')()';
        // new Blob(["(", SPLINT_loaderHelper.toString(), ")"]
        return self.SPLINT.toString() + 
        // SPLINT_loaderHelper.toString() +
        // SPLINT_Loader.toString()+ "\n" + 
        self.SPLINT.Worker.WorkerHelper.toString() + "\n" + funcArray1 + "\n" + text;
    }

    static ResourceObject = class {
        constructor(name, load = function(){}){
            this.name = name;
            this.promise;
            this.isLoaded = false;
            this.load = load;
            this.startLoading();
        }
        startLoading(){
            this.promise = new Promise(async function(resolve){
                this.load().then(function(response){
                    this.src = response;
                    this.isLoaded = true;
                    console.dir(this)
                    resolve(this);
                }.bind(this));
            }.bind(this));
        }
    }
}