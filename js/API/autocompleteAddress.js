
class S_API_autoCompleteAddress {
    static API_KEY = "ee95182579204ad1b8e453e19dbb5092";
    constructor(){
        this.API_KEY = S_API_autoCompleteAddress.API_KEY;
        this._postcode = "";
        this._city = "";
    }
    set postcode(v){
        this._postcode = v;
    }
    set city(v){
        this._city = v;
    }
    async suggestPostCode(postCode){
        let str = "text=" + postCode + "&type=postcode&limit=10&format=json&filter=countrycode:de";
        return this.call(str);
    }
    suggestCity(city){
        let str = "text=" + city + "&type=city&format=json&filter=countrycode:de";
        return this.call(str);

    }
    suggestAddress(address){
        let str = "text=" + address + "&format=json";
        return this.call(str);
    }
    async call(str){
        var requestOptions = {
        method: 'GET',
      };
      
      //fetch("https://api.geoapify.com/v1/geocode/autocomplete?text=123&type=postcode&limit=10&format=json&filter=countrycode:de&apiKey=" + this.API_KEY, requestOptions)
      return fetch("https://api.geoapify.com/v1/geocode/autocomplete?" + str + "&apiKey=" + this.API_KEY, requestOptions)
      .then(response => response.json())
        .catch(error => console.log('error', error));
    }
}