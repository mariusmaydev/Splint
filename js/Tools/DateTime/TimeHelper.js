class timeTools {
  static sleep (time) {
    return new Promise((resolve) => setTimeout(function(){resolve(null)}, time));
  }
  static sleep2 (time) {
    return new Promise(async function(resolve){
        setTimeout(function(){
            resolve(null);
        }, time)
    });
  }
}

class PromiseTimeout {
    static storage = [];
    constructor(name, delay, pushToStack = true, onresolve = function(){}){
        if(pushToStack){
            for(const ele of PromiseTimeout.storage){
                if(ele.name == name){
                    return ele;
                }
            }
        }
        this.name = name;
        this.delay = delay;
        this.resolved = false;
        this.value = undefined;
        this.onresolve = onresolve;
        PromiseTimeout.storage.push(this);
        this.start();
    }
    start(){
        setTimeout(function(){
            this.resolved = true;
            this.value = "test";
            this.onresolve(this.value);
        }.bind(this), this.delay);
    }
    remove(){
        for(const i in PromiseTimeout.storage){
            let ele = PromiseTimeout.storage[i];
            if(ele.name == this.name){
                PromiseTimeout.storage.splice(i, 1);
            }
        }
    }
    static get(name){
        for(const ele of PromiseTimeout.storage){
            if(ele.name == name){
                return ele;
            }
        }
    }
}

class formatUnix_S {
    constructor(UnixTime){
      this.UnixTime = UnixTime;
    }
    time(){
        let date    = new Date(parseInt(this.UnixTime));
        let hours   = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        if(hours <= 9){
            hours = "0" + hours;
        }
        if(minutes <= 9){
            minutes = "0" + minutes;
        }
        if(seconds <= 9){
            seconds = "0" + seconds;
        }
        return hours + ":" + minutes + ":" + seconds; 
    }
    date(){
        let date  = new Date(parseInt(this.UnixTime));
        let month = date.getMonth() + 1;
        let day   = date.getDate();
        if(month <= 9){
            month = "0" + month;
        }
        if(day <= 9){
            day = "0" + day;
        }
        return "" + day + "." + month + "." + date.getFullYear();
    }
  }

  class S_TimeHelper {
    static getTimeFromURL(URL){
      return URL.split("?v=")[1];
    }
    static convertDayTimeToFormattedUnix(timeIn){
      let today = new Date();
      let time = new Date(today.getFullYear() + "." + (parseInt(today.getMonth())+1) + "." + today.getDate() + " "+timeIn+ ":00");
      return time.getTime();
    }
    static convertDateToFormatedUnix(dateIn){        
      let today = new Date(dateIn);
      let date = new Date(today.getFullYear() + "." + (parseInt(today.getMonth())+1) + "." + today.getDate());
      return date.getTime();
    }
    static convertDateTimeToFormatedUnix(dateIn, short = true){        
    //   let today = new Date(dateIn);
      let date = new Date(dateIn);
      if(short){
        return date.getTime() / 1000;
      }
      return date.getTime();
    }
    static getTime(){
      let date = new Date();
      let unixtime = date.getTime();
      return unixtime;
    }
    static convertToGMT(unixTime){
      let date = new Date(unixTime);
      console.log(date);
      date.setTime(date.getTime() + date.getTimezoneOffset()*60*1000);
      date = new Date(date).getTime();
      return date;
    }
    static convertFromGMT(unixTime){
      let date = new Date(unixTime);
      console.log(date);
      date.setTime(date.getTime() - date.getTimezoneOffset()*60*1000);
      date = new Date(date).getTime();
      return date;
    }
    static formatSingleNumber(number, offset = 1){
      if(number < 10 * offset){
        number = "0" + number;
      }
      return number;
    }
  }




  

  



  

