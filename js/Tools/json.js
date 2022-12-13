
  class JSON_S {
    static parseIf(string){
      try {
        return JSON.parse(string);
      } catch(e){
        return string;
      }
    }
  }