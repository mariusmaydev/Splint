
class SM_PHP_debuggLog {
    constructor(parent, data, fileName){
        this.parent = parent;
        this.dataIn = data;
        this.uri = location.origin + this.dataIn.config.paths.error_log + fileName;
        this.id = "PHPdebuggLog_";
        this.mainElement = new SPLINT.DOMElement(this.id + "main", "div", parent);
        this.mainElement.Class("PHP_debuggLog");
        this.contentElement = new SPLINT.DOMElement(this.id + "content", "div", this.mainElement);
        this.contentElement.Class("content");
        this.drawHead();
        this.draw();
    }
    async getData(){
        this.data = await  SPLINT.Utils.Files.read(this.uri);
        this.data = this.data.replaceAll("C:\\xampp\\htdocs\\", "");
        this.data = this.data.replaceAll(" at ", "");
        this.data = this.data.replaceAll("\r\n", "<br>");
        this.data = this.data.replaceAll("\r", "<br>");
        this.data = this.data.replaceAll("\n", "<br>");
        // this.data = this.data.replaceAll("DEBUG", '<span style="color: orange;">DEBUG</span>')
        // this.data = this.data.replaceAll("WARN", '<span style="color: darkorange;">WARN</span>')
        // this.data = this.data.replaceAll("ERROR", '<span style="color: red;">ERROR</span>')
        // this.data = this.data.replaceAll("NOTICE", '<span style="color: blue;">NOTICE</span>')
        this.data = SM_parseLog.parse(this.data);
    }
    drawHead(){
        this.head = new SPLINT.DOMElement(this.id + "head", "div", this.contentElement);
        this.head.Class("head");
            let bt_clear = new SPLINT.DOMElement.Button(this.head, "clear", "clear");
                bt_clear.basicStyling = S_constants.BUTTON_STYLES.BASIC;
                bt_clear.onclick = async function(){
                    this.list.mainElement.remove();
                    let uri = this.uri.replace(location.origin, "");
                    await S_DataStorage.editAny(uri, "\t");
                    await this.draw();
                }.bind(this);
            let bt_refresh = new SPLINT.DOMElement.Button(this.head, "refresh", "refresh");
                bt_refresh.basicStyling = S_constants.BUTTON_STYLES.BASIC;
                bt_refresh.onclick = async function(){
                    this.list.mainElement.remove();
                    await this.draw();
                }.bind(this);
    }
    async draw(){
        await this.getData();
        console.dir(this.data)
        this.list = new SPLINT.DOMElement.Table.List(this.contentElement, "debuggLogPHP", this.data);
        this.list.func_drawListElement = function(data, index, listElement){
            listElement.setAttribute("type", data.type);
            let msgEle = new SPLINT.DOMElement.TextView(listElement, "msg" + index);
                msgEle.value = data.msg;
            let traceDiv = new SPLINT.DOMElement(listElement.id + "taceContainer", "div", listElement);
                traceDiv.Class("traceDiv");
                let head = new SPLINT.DOMElement(listElement.id + "traceHead", "div", traceDiv);
                    head.Class("traceHead");
                    head.onclick = function(){
                        traceDiv.SPLINT.state.toggle();
                    }
                    let bt_trace = new SPLINT.DOMElement.Button(head, listElement.id + "trace_head_button_toggle");
                        bt_trace.Class("switchTrace");
                        bt_trace.bindIcon("chevron_right");
                        bt_trace.button.SPLINT.state.onActive = function(){
                            bt_trace.bindIcon("expand_more");
                        }
                        bt_trace.button.SPLINT.state.onPassive = function(){
                            bt_trace.bindIcon("chevron_right");
                        }

                    
                        traceDiv.SPLINT.state.onToggle = function(e, state){
                            if(state == "active"){
                                bt_trace.button.SPLINT.state.setActive();
                            } else {
                                bt_trace.button.SPLINT.state.setPassive();
                            }
                        }

                    let head_text = new SPLINT.DOMElement.SpanDiv(head, "trace_head_text", "Stacktrace");
                        head_text.Class("text");
                    let traceTimeContainer = new SPLINT.DOMElement(listElement.id + "trace_time", "div", head);
                        traceTimeContainer.Class("timeContainer");
                        let traceTimeHead = new SPLINT.DOMElement.SpanDiv(traceTimeContainer, "trace_time_head", "");
                            traceTimeHead.Class("head");
                        if(data.time.length > 1){
                            traceTimeHead.value = "last:" + data.time[data.time.length - 1].toLocaleTimeString() + " - " + data.time[data.time.length - 1].toLocaleDateString()
                            traceTimeHead.value += "<br> + " + (data.time.length - 1);
                            let traceTimeContent = new SPLINT.DOMElement.Table.List(traceTimeHead.div, "traceTimeTable_" + listElement.id, data.time);
                                traceTimeContent.func_drawListElement = function(data, index, listElement){
                                    let traceTime = new SPLINT.DOMElement.SpanDiv(listElement, "time_" + index, "");
                                        traceTime.value = data.toLocaleTimeString() + " - " + data.toLocaleDateString()
                                }
                                traceTimeContent.draw();
                            traceTimeContainer.onclick = function(e){
                                e.stopPropagation();
                                traceTimeContent.mainElement.SPLINT.state.toggle();
                            }
                        } else {
                            traceTimeHead.value = data.time[data.time.length - 1].toLocaleTimeString() + " - " + data.time[data.time.length - 1].toLocaleDateString()
                        }
                let traceText = new SPLINT.DOMElement.TextView(traceDiv, "traceText");
                    traceText.value = data.trace;
        }
        this.list.draw();
        // this.textView = new SPLINT.DOMElement.TextView(this.mainElement);
        // this.textView.value = this.data;
        
    }
}