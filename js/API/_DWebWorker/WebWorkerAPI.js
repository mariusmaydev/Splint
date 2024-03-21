
// class S_WebWorkerAPI {
//     static #INSTANCE;
//     static DefinedWorkers = [];
//     static WorkerSettingsBase = {
//         name : "name",
//         src : {
//             url : null,
//             class : null,
//             function : null,
//             blob : null,
//         },
//         maxInstances: 5
//     }
//     static {
//         if(this.#INSTANCE != undefined){
//             this.#INSTANCE = new S_WebWorkerAPI();
//         }
//     }
//     static defineWorker(settings = S_WebWorkerAPI.WorkerSettingsBase){
//         const worker = new this.Worker();
//               worker.name = settings.name;
//               worker.maxInstances = settings.maxInstances;

//         for(const [key, value] of Object.entries(settings.src)){
//             if(value != null){
//                 switch(key){
//                     case "url"      : { worker.src = this.ResourceManager.loadURL(settings.src.url) } break;
//                     case "class"    : { worker.src = this.ResourceManager.loadClass(settings.src.class) } break;
//                     case "function" : { worker.src = this.ResourceManager.loadFunction(settings.src.function) } break;
//                     case "blob"     : { worker.src = this.ResourceManager.loadBlob(settings.src.blob) } break;
//                 }
//             }
//         }
//         this.DefinedWorkers.push(worker);
//         return worker;
//     }
//     static Worker = class {
//         constructor(name = null){
//             this.name           = name;
//             this.maxActive      = 5;
//             this.maxInstances   = 10;
//             this.src            = null;
//             this.postRequests   = [];
//             this.Worker = new Worker(this.src);
//             this.Worker.onmessage = function(){

//             }
//         }
//         postOnly(command, msg, transfer){
//             this.postRequests.push(new Promise(async function(resolve){

//             }.bind(this)));
//         }
//         postAsync(msg, ){
//             this.postRequests.push(new Promise(async function(resolve){

//             }.bind(this)));
//         }
//         onReceiveMessage(){

//         }
//     }
//     static Worker1 = class {
//         constructor(name = null){
//             this.name           = name;
//             this.maxActive      = 5;
//             this.maxInstances   = 10;
//             this.src            = null;
//         }
//         #getActiveHandles(){
//             let v = 0;
//             for(let i = 0; i < this.HandleList.length; i++){
//                 if(this.HandleList[i].isActive){
//                     v++;
//                 }
//             }
//             return v;
//         }
//         #getPassiveHandles(){
//             let v = 0;
//             for(let i = 0; i < this.HandleList.length; i++){
//                 if(this.HandleList[i].isActive){
//                     v++;
//                 }
//             }
//             return v;
//         }
//         #getWorker(){
//             if(this.WorkerList.length <= this.maxInstances){
//                 let workerObj = new Object()
//                     workerObj.Worker = new Worker(this.src, { name : (this.name + "_" + this.WorkerList.length)});
//                     workerObj.active = true;
//                     this.WorkerList.push(worker);
//                     return workerObj;
//             } else {
//                 for(const e of this.WorkerList){
//                     if(e.Worker.active == false){
//                         e.Worker.active = true;
//                         return e.Worker;
//                     }
//                 }
//             }
//             return false;
//         }
//         #startNextHandle(){
//             let worker = this.#getWorker();
//             if(worker == false){
//                 return;
//             }
//             if(this.#getWorker())
//             for(const e of this.HandleList){
//                 if(e.isWaiting){
//                     e.Worker
//                 }
//             }
//         }
//         #onHandleClosed(handle){
//             for(const e of this.WorkerList){
//                 if(e.Worker.name == handle.Worker.name){
//                     e.Worker.active = false;
//                     break;
//                 }
//             }

//             if(this.handlesActive < this.maxActive){
//                 this.#startNextHandle();
//             }
//             for(let i = 0; i < this.HandleList.length; i++){
//                 // let 
//                 // delete this.HandleList[i];
//             }
//         }
//         getHandle(){
//             let handle = new this.WorkerHandle();
//                 handle.onClosed = function(handle){
//                     this.#onHandleClosed(handle);
//                 }.bind(this)
//                 handle.onPosted = function(){

//                 }
//                 handle.onReceived = function(){

//                 }
//                 handle.onFree = function(){

//                 }
//             this.HandleList.push(handle);
//             return new Promise(async function(resolve){
//                 await this.src.promise;

//             }.bind(this));
//         }
//         WorkerHandle = class WorkerHandle {
//             constructor(){
//                 this.onPosted = function(){}
//                 this.onReceived = function(){};
//             }
//             postInPromise(method, data, transferable = []){
//                 return new Promise(async function(resolve){

//                 }.bind(this));
//             }
//             postMessage(method, data, transferable = []){

//             }
//             onReceived(){

//             }

//         }
//     }
//     // static get ResourceManager(){
//     //     SPLINT.getClass("S_WebWorkerAPIResourceManager", "WebWorkerAPIResourceManager");
//     //     return S_WebWorkerAPIResourceManager;
//     // }
    
// }