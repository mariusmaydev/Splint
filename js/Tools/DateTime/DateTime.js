
class S_DateTime {
    static get Timer(){
        return S_Timer;
    }
    /**
     * @description get real UNIX-time in seconds
     */
    static getUnixTime(){
        return Math.round(Date.now()/1000);
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
    static timeDiff( tstart, tend ) {
        var diff = Math.floor((tend - tstart) / 1000), units = [
          { d: 60, l: "seconds" },
          { d: 60, l: "minutes" },
          { d: 24, l: "hours" },
          { d: 7, l: "days" }
        ];
      
        var s = '';
        for (var i = 0; i < units.length; ++i) {
          s = (diff % units[i].d) + " " + units[i].l + " " + s;
          diff = Math.floor(diff / units[i].d);
        }
        return s;
      }
}