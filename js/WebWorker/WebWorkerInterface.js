
// class S_WebWorkerManager {
//     static #worker = null
//     static size = 0;
//     static ActiveWorkers = 0;
//     static {
//         if(this.#INSTANCE == null) {
//             this.#INSTANCE = new S_WebWorkerManager();
//         }
//     }
//     constructor(){
        
//     }
//     static init(){

//     }
//     static async sendMessage(){
//         let workerI = new workerInterface();

//         let msg = new Object();
//             msg.type = "createNormalMap";
//             msg.url = url;
//             workerI.compFunc = function(imgData){
//             let t = new Texture(imgData);
//                 t.needsUpdate = true;
//             return t;
//         }
//         return workerI.sendMessage(msg)
//     }
















//     static init(){
//     }
//     static get worker(){
//         if(this.#worker == null){
//             // this.#worker = new Worker(SPLINT.projectRootPath + "/js/_WebWorker/normalMapWorker.js", { type: "module"});
//             // this.receiveMessage();
//         }
//         return this.#worker;
//     }
//     static set worker(v){
//         this.#worker = v;
//     }
//     constructor(){
//         this.worker = new Worker(SPLINT.projectRootPath + "/js/_WebWorker/normalMapWorker.js", { type: "module"});
//         this.id = workerInterface.size
//         workerInterface.size += 1;

//         this.receiveMessage();
//     }
//     static async send(){

//     }
//     receiveMessage(){
//         this.worker.onerror = function(){
//             console.log(arguments)
//         }
//         this.worker.onmessage = async function(e) {
//             if(e.data.id == this.id){
//                 console.log("ok")
//             } else {
//                 console.log("nok")
//             }
//             workerInterface.size -= 1;
//             // console.log(e)
//             let type = e.data.type;
//             let content = e.data.content;
//             console.log(content, type);
//             this.resolveCall(this.compFunc(e.data.content));
//             this.worker.terminate();
//         }.bind(this);
//     }
//     static async createNormalMap(url){
//         let workerI = new workerInterface();

//         let msg = new Object();
//             msg.type = "createNormalMap";
//             msg.url = url;
//             workerI.compFunc = function(imgData){
//             let t = new Texture(imgData);
//                 t.needsUpdate = true;
//             return t;
//         }
//         return workerI.sendMessage(msg)
//     }
//     async sendMessage(msg){
//         msg.id = this.id;
//         // let ele = new Object();
//             // ele.msg = msg;
//             // ele.
//         return new Promise(async function(resolve){
//             this.resolveCall = resolve;
//             this.worker.postMessage(msg);
//         }.bind(this));
//         // this.stack.push(ele)
//     }
//     initWorker(){
//         // let g1 = SPLINT.file.loadFromProjectAsync();
//         // console.dir(SPLINT.config.URIs.project + "/" + SPLINT.ResourceManager.textures.lighter_engraving_thumbnail_1024_data)
//         let worker = new Worker(SPLINT.projectRootPath + "/js/_WebWorker/normalMapWorker.js", { type: "module"});
        
//     //     worker.onerror = function(e) {
//     //         console.log(e)
//     //     }.bind(this);
    
//         // SPLINT.ResourceManager.textures.lighter_engraving_thumbnail_1024_data.then(async function(texture){     
//             console.log("post")
//         // }.bind(this))  
//     }
// }