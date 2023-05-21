
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
        return date.toISOString().slice(0, 19).replace('T', ' ');
    }
}