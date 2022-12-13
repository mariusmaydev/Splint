class Cookie {
    constructor(){

    }
    static isEnabled(){
      let cookieEnabled = navigator.cookieEnabled;
  
      if (typeof navigator.cookieEnabled == "undefined" && !cookieEnabled) { 
          document.cookie = "testcookie";
          if(document.cookie.indexOf("testcookie") != -1) {
            cookieEnabled = true;
          } else {
            cookieEnabled = false;
          }
      }
      return cookieEnabled;
    }
    static set(name, value, exdays = 1){
      let date = new Date();
          date.setTime(date.getTime() + (exdays * 24 * 60 * 60 * 1000));
      let expires = "expires="+ date.toUTCString();
      document.cookie = name + "=" + value + ";" + expires + ";" + "path=/;";
    }
    static get(name = null){
      let cookies = document.cookie.split("; ");
      let response = new Object();
          for(const cookie of cookies){
            let array = cookie.split('=');
                response[array[0]] = JSON_S.parseIf(array[1]);
          }
          if(name != null){
            return response[name];
          }
      return response;
    }
    static showAll(){
      Cookie.set("test2", "123456789");
      console.log(Cookie.get());
    }
  }
