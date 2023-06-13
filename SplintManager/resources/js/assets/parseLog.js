
class SM_parseLog {
    static parse(logStr){
        let res = [];
        if(logStr == "" || logStr == null){
            Object.defineProperty(res, "len", {
                value: 0,
                enumerable: false,
                configurable: false
            })
            Object.defineProperty(res, "last", {
                value: null,
                enumerable: false,
                configurable: false
            })
            return res;
        }
        let str = logStr.replace("</S-error>", "").split("<S-error>");
        for(const e of str){
            let obj = new Object();
            let Dstart = e.indexOf("<S-time>") + 8;
            let Dend = e.indexOf("</S-time>");
            obj.time = (new Date(Date.parse(e.substring(Dstart, Dend))));
            if(obj.time == 'Invalid Date'){
                continue;
            }
            let start = e.indexOf("<S-msg>") + 7;
            let end = e.indexOf("</S-msg>");
                obj.msg = e.substring(start, end);
                if(obj.msg.startsWith("<br>")){
                    obj.msg = obj.msg.substring(4);
                }

            let Ystart = e.indexOf("<S-type>") + 8;
            let Yend = e.indexOf("</S-type>");
            obj.type = e.substring(Ystart, Yend);
            if(obj.type.startsWith("<br>")){
                obj.type = obj.type.substring(4);
            }

            let Tstart = e.indexOf("<S-trace>") + 9;
            let Tend = e.indexOf("</S-trace>");
            obj.trace = e.substring(Tstart, Tend);
            if(obj.trace.startsWith("<br>")){
                obj.trace = obj.trace.substring(4);
            }
            res.push(obj);
        }
        let f = function(ele, resO){
            for(const i1 in resO){
                let ele1 = resO[i1];
                if(ele.msg == ele1.msg && ele.type == ele1.type){
                    return i1
                }
            }
            return false;
        }
        if(res.length == 0){
            let resO = [];
                Object.defineProperty(resO, "len", {
                    value: 0,
                    enumerable: false,
                    configurable: false
                })
                Object.defineProperty(resO, "last", {
                    value: null,
                    enumerable: false,
                    configurable: false
                })
                return resO;
        }
        let resO = [];
            Object.defineProperty(resO, "len", {
                value: res.length,
                enumerable: false,
                configurable: false
            })
            Object.defineProperty(resO, "last", {
                value: res[res.length-1].time,
                enumerable: false,
                configurable: false
            })
        for(const i in res){
            let ele = res[i];
            let k = f(ele, resO);
            if(k === false){

                resO.push(ele);
                resO[resO.length - 1].time = new Array(resO[resO.length - 1].time);
            } else {
                    resO[k].time.push(ele.time);
            }
        } 
        return resO;
    }
}