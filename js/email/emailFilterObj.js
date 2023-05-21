
class emailFilterObj_S {
    constructor() {
        this.ALL        = false;
        this.ANSWERED   = false;
        this.BCC        = null;
        this.BEFORE     = null;
        this.BODY       = null;
        this.CC         = null;
        this.DELETED    = false;
        this.FLAGGED    = false;
        this.FROM       = null;
        this.KEYWORD    = null;
        this.NEW        = false;
        this.OLD        = false;
        this.ON         = null;
        this.RECENT     = false;
        this.SEEN       = false;
        this.SINCE      = null;
        this.SUBJECT    = null;
        this.TEXT       = null;
        this.TO         = null;
        this.UNANSWERED = false;
        this.UNDELETED  = false;
        this.UNFLAGGED  = false;
        this.UNKEYWORD  = null;
        this.UNSEEN     = false;
    }
    parse(){
        let res = "";
        for(const key in this){
            if(this[key] != null && this[key] != false){
                if(this[key] === true){
                    res += key + " ";
                } else {
                    res += key + " \"" + this[key] + "\" ";
                }
            }
        }
        console.log(res);
        return res;
    }
}