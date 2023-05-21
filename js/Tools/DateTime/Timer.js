
class S_Timer {
    constructor(autoStart = true) {
        this.autoStart = autoStart;
        if(this.autoStart) {
            this.start();
        }
    }
    start(){
        this.TimeStart  = new Date();
    }
    end(){
        this.TimeEnd    = new Date();
        let res = this.#calc(this.TimeStart, this.TimeEnd);
        console.table(res);
    }
    take(){
        let t = new Date();
        let res = this.#calc(this.TimeStart, t);
        console.table(res);
    }
    #calc(timeFrom, timeTo){
        let date2 = new Date();
        console.log(timeFrom, date2)
        
        let obj = new Object();
        let diff = timeTo.getTime() - timeFrom.getTime();
        
        obj.days = Math.floor(diff / (1000 * 60 * 60 * 24));
        diff -=  obj.days * (1000 * 60 * 60 * 24);
        
        obj.hours = Math.floor(diff / (1000 * 60 * 60));
        diff -= obj.hours * (1000 * 60 * 60);
        
        obj.mins = Math.floor(diff / (1000 * 60));
        diff -= obj.mins * (1000 * 60);
        
        obj.seconds = Math.floor(diff / (1000));
        diff -= obj.seconds * (1000);
        // console.table(obj)
        return obj;
        // this.TimeLast   = date2;
    }
}