
class S_moonrakerHelper {
    static {
        this.activeSocket   = null;
        this.websocketID    = null;
        this.printProgress  = 1;
        this.onReadyStack   = []; 
        this.createWebsocket();   
    }

    static set onReady(func){
        this.onReadyStack.push(func);
    }

    static createWebsocket(){
        try {
            if(this.activeSocket == null){
                let host = 'ws://192.168.178.82/websocket';
                let socket = new WebSocket(host);
                socket.onopen = function(){
                    socket.send(JSON.stringify({
                        "jsonrpc": "2.0",
                        "method": "server.websocket.id",
                        "id": 4656
                    }))
                    socket.send(JSON.stringify({
                        "jsonrpc": "2.0",
                        "method": "printer.objects.subscribe",
                        "params": {
                            "objects": {
                                "gcode_move": null,
                                "display_status" :["progress"]
                            }
                        },
                        "id": 5434
                    }))
                }
                socket.onmessage = function(e) {
                    e = JSON.parse(e.data);
                    if(e.id == 4656){
                        this.websocketID = e.result.websocket_id;
                        // console.log(e)
                    } else if(e.params instanceof Array && e.params[0] == "Done printing file"){
                        this.printProgress = 1;
                        for(const a of this.onReadyStack){
                            a();
                        }
                    } 
                    if(e.id == 5434){
                        console.log(e)
                        this.printProgress = e.result.status.display_status.progress;
                    }
                    // console.dir(S_JSON.parseIf(e.data));
                }.bind(this);
                this.activeSocket = socket;
                return socket;
            }
        } catch (e) {
            SPLINT.debugger.error("moonraker", "cannot connect to server");
        }
        return this.activeSocket;
    }
    static closeWebsocket(){
        if(this.activeSocket != null){
            this.activeSocket.close();
            this.activeSocket = null;
            this.websocketID  = null;
        }
    }
}