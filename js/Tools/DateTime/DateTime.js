
class S_DateTime {
    static get Timer(){
        SPLINT.getClass("S_Timer", "Timer");
        return S_Timer;
    }
    /**
     * @description get real UNIX-time in seconds
     */
    static getUnixTime(short = true){
        if(short){
            return Math.round(Date.now()/1000);
        }
        return Math.round(Date.now());
    }
    /**
     * @param {DateTime} date  
     * @returns {string} dateTime string formatted for MySQL
     */
    static parseToMySqlDateTime(date){
        new Date();
        return date.toISOString().slice(0, 19).replace('T', ' ');
    }
    static timeDiffSec( tstart, tend ) {
        return Math.floor((tend - tstart) / 1000);
    }
    static timeDiff( tstart, tend, basic = false) {
        var diff = Math.floor((tend - tstart) / 1000);
        let units;
        if(!basic){
            units = [
            { d: 60, l: " seconds" },
            { d: 60, l: " minutes" },
            { d: 24, l: " hours" },
            { d: 7, l: " days" }
            ];
        } else {
            units = [
            { d: 60, l: "s" },
            { d: 60, l: "min" },
            { d: 24, l: "h" },
            { d: 7, l: "D" }
            ];
        }
      
        var s = '';
        for (var i = 0; i < units.length; ++i) {
            let d = (diff % units[i].d);
            if(d > 0){
                s = (diff % units[i].d) + "" + units[i].l + " " + s;
            }
          diff = Math.floor(diff / units[i].d);
        }
        return s;
      }
}