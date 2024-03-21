
class S_WorkerHelper {
    static {
        SPLINT.isWorker = S_WorkerHelper.isWorker;
    }
    static get isWorker(){
        if (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope) {
            return true;
        } else {
            return false;
        }
    }
    static updateSplint(webWorker){
        
        let ob = Object.assign({}, window.SPLINT);
        delete ob.threeJS;
        console.dir(ob)
        delete ob.isWorker;
        let ob1 = JSON.parse(JSON.stringify(ob));
        webWorker.send("SPLINT-update", ob1)
    }
    static get WebWorkerTemplate(){
        return class S_WebWorkerTemplate {
            constructor(){
                onmessage = async function(e){
                    let res = await this[e.data.method](e.data.data);
                    let message = new Object();
                        message.method  = e.data.method;
                        message.data = res;
                        self.postMessage(message);
                }.bind(this);
            }
        }
    }
}