
class SM_parseLog {
    static parse(logStr){
        let res = [];
        let str = logStr.replace("</S-error>", "").split("<S-error>");
        for(const e of str){
            let start = e.indexOf("<S-msg>") + 7;
            let end = e.indexOf("</S-msg>");
            let obj = new Object();
                obj.msg = e.substring(start, end);

            let Tstart = e.indexOf("<S-trace>") + 9;
            let Tend = e.indexOf("</S-trace>");
            obj.trace = e.substring(Tstart, Tend);
            res.push(obj);
        }
        return res;
    }
}