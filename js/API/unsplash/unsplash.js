
class S_API_unsplash {
    static {
        this.clientID = "mW5_smybRtwEzjFVNM2SegjYzoJ24Lj9vV_tw_scXtk";
    }
    constructor(){

    }
    static search(str){
        // this.value = value;
        // if(value == "" || value == undefined){
        //   this.getStartImages();
        //   return this;
        // }
        this.url = this.urlBaseSearch + 
        '?query=' + str + 
        '&per_page=' + this.count + 
        '&page=' + this.page + 
        '&orientation=' + "portrait" +
        '&client_id=' + this.client_id; 
        this.response = this.call();
        return this;
    }
    static call(url){
      return fetch(url)
      .then(response => {
        console.log(response)
        if (!response.ok) throw Error(response.statusText);
          return response.json();
       })
       .then(data => {
        if(data.total == 0){
          return data;
        }
        console.log(data)
        // this.response = data;
        // data = this.getImageData(flag);
        // this.callback(data, this);
        return data;
       })
       .catch(error => console.dir(error));
    }
    static test(){
        
        let url = "https://api.unsplash.com/photos" + 
        '?per_page=' + "30" + 
        '&page=' + "1" + 
        '&client_id=' + this.clientID;   
        let response = this.call(url);
        // console.dir(response);
        return response;
    }
}