class old_Location {
    constructor(location){
      this.hashes     = "";
      this.location   = location;
    }
    static get Location(){
      return window.location.origin + window.location.pathname;
    }
    static back(steps = -1){
      window.history.go(steps);
    }
    static setHash(...hashes){
      let output = "";
      hashes.forEach(function (hash){
        output += "#" + hash;
      });
      window.location.hash = output;

    }
    setHash(...hashes){
      let output = "";
      hashes.forEach(function (hash){
        output += "#" + hash;
      });
      this.hashes = output;
      return this;
    }
    static getParams(){
      let string = window.location.search;
          string = string.replace("?", "").split('&');
      let response = new Object();
          for(const param of string){
            let array = param.split('=');
                response[array[0]] = array[1];
          }
      return response;
    }
    static getHashes(){
      let string = window.location.hash;
      let array = string.split("#");
          array.splice(0, 1);
          if(array.length == 1){
            return array[0];
          } else {
            return array;
          }
    }
    static goto(location = old_Location.Location){
      return new old_Location(location);
    }
    setLocation(location){
      this.location = location;
    }
    getURL(){
      if(this.hashes != ""){
        return this.location + "?" + this.hashes;
      } else {
        return this.location;
      }
    }
    call(){
      window.location.href = this.getURL();
    }
  }