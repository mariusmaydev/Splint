

class AddressHelper {
    static GET = "GET";
    static ADD = "ADD";
    static REMOVE = "REMOVE";
    static EDIT = "EDIT";
  
    static PATH = "http//localhost/fd/resources/php/userdata/adress/addressAccess.php";
    static get(){
      let data = CallPHP_S.getCallObject(AddressHelper.GET);
      return CallPHP_S.call(AddressHelper.PATH, data);
    }
    static add(address){
      let data = CallPHP_S.getCallObject(AddressHelper.ADD);
          data.address = address;
      return CallPHP_S.call(AddressHelper.PATH, data);
    }
    static edit(){
      let data = CallPHP_S.getCallObject(AddressHelper.EDIT);
          data.address = address;
      return CallPHP_S.call(AddressHelper.PATH, data);
    }
    static remove(addressID){
      let data = CallPHP_S.getCallObject(AddressHelper.REMOVE);
          data.AddressID = addressID;
      return CallPHP_S.call(AddressHelper.PATH, data);
    }
    static getCountryForCode(code){
      switch(code){
        case 'AU' : return "Österreich"; break;
        case 'DE' : return "Deutschland"; break;
      }
    }
    
    static getSalutationForCode(code){
      switch(code){
        case 'Mr' : return "Herr"; break;
        case 'Mx' : return ""; break;
        case 'Mrs' : return "Frau"; break;
      }
    }
  }
  
  class AddressObject {
    constructor(){
      this.AddressID    = "a";
      this.AddressName  = "a";
      this.Country      = "DE";
      this.City         = "a";
      this.Postcode     = "a";
      this.Street       = "a";
      this.HouseNumber  = "a";
      this.FirstName    = "a";
      this.LastName     = "a";
      this.Title        = "a";
      this.Email        = "Marius006@gmx.de";
      this.Phone        = "a";
      this.Salutation   = "";
      return this;
    }
    static getTemplate(){
      let inst = new AddressObject();
      return inst.get();
    }
    get(){
      let Storage = new Object();
          Storage.AddressID   = this.AddressID;
          Storage.AddressName = this.AddressName;
          Storage.Country     = this.Country;
          Storage.City        = this.City;
          Storage.Postcode    = this.Postcode;
          Storage.Street      = this.Street;
          Storage.HouseNumber = this.HouseNumber;
          Storage.FirstName   = this.FirstName;
          Storage.LastName    = this.LastName;
          Storage.Title       = this.Title;
          Storage.Phone       = this.Phone;
          Storage.Email       = this.Email;
          Storage.Salutation  = this.Salutation;
      return Storage;
    }
  }
  
  function addressInput(parent, name, data = null){
    let main = getElement("DrawNewAddressMenu_" + name, "div", parent.id);
        main.Class("AddressInput");
    this.div = main;
  
    this.ELE_AddressName  = document.getElementById("AddressName_" + name);
    this.ELE_Title        = document.getElementById("Title_" + name);
    this.ELE_Email        = document.getElementById("Email_" + name);
    this.ButtonsDivID     = main.id + "_buttonsDiv_" + name;
    let submit_func = function(){};
    let return_func = function(){};
    this.draw = function(extend = false){
      let AddressName_inputDiv  = new SPLINT.DOMElement.InputDiv(main, "AddressName_" + name, "Name der Adresse");
          AddressName_inputDiv.div.setAttribute("name", "name");
  
      let Salutation_dropDownInput = new dropdownInput(main, "Salutation_" + name, "Anrede");
          Salutation_dropDownInput.addOption("Mr", "Herr");
          Salutation_dropDownInput.addOption("Mrs", "Frau");
          Salutation_dropDownInput.addOption("Mx", "Divers");
  
      let Title_inputDiv        = new SPLINT.DOMElement.InputDiv(main, "Title_" + name, "Titel");
          Title_inputDiv.div.setAttribute("name", "title");
  
      let FirstName_inputDiv    = new SPLINT.DOMElement.InputDiv(main, "FirstName_" + name, "Vorname");
          FirstName_inputDiv.div.setAttribute("name", "firstName");
  
      let LastName_inputDiv     = new SPLINT.DOMElement.InputDiv(main, "LastName_" + name, "Nachname");
          LastName_inputDiv.div.setAttribute("name", "lastName");
  
      let Postcode_inputDiv     = new SPLINT.DOMElement.InputDiv(main, "Postcode_" + name, "Postleizahl");
          Postcode_inputDiv.div.setAttribute("name", "postcode");
  
      let City_inputDiv         = new SPLINT.DOMElement.InputDiv(main, "City_" + name, "Stadt");
          City_inputDiv.div.setAttribute("name", "city");
  
      let Country_dropDownInput = new dropdownInput(main, "Country_" + name, "Land");
          Country_dropDownInput.div.setAttribute("name", "country");
          Country_dropDownInput.addOption("DE", "Deutschland");
          Country_dropDownInput.addOption("AU", "Öserreich");
          Country_dropDownInput.setValue("DE");
  
      let Street_inputDiv       = new SPLINT.DOMElement.InputDiv(main, "Street_" + name, "Straße");
          Street_inputDiv.div.setAttribute("name", "street");
  
      let Housenumber_inputDiv  = new SPLINT.DOMElement.InputDiv(main, "Housenumber_" + name, "Hausnummer");
          Housenumber_inputDiv.div.setAttribute("name", "housenumber");
  
      let Email_inputDiv;
      let Phone_inputDiv;
      if(extend){
        Email_inputDiv = new SPLINT.DOMElement.InputDiv(main, "Email_" + name, "Emailadresse");
        Email_inputDiv.div.setAttribute("name", "email");
        
        Phone_inputDiv = new SPLINT.DOMElement.InputDiv(main, "Phone_" + name, "Telefonnummer");
        Phone_inputDiv.div.setAttribute("name", "phone");
      }
      
      if(data != null){
        AddressName_inputDiv.value = data.AddressName;
        Title_inputDiv.value = data.Title;
        FirstName_inputDiv.value = data.FirstName;
        LastName_inputDiv.value = data.LastName;
        Postcode_inputDiv.value = data.Postcode;
        City_inputDiv.value = data.City;
        Country_dropDownInput.value = data.Country;
        Street_inputDiv.value = data.Street;
        Housenumber_inputDiv.value = data.HouseNumber;
        if(extend){
          Email_inputDiv.value = data.Email;
          Phone_inputDiv.value = data.Phone;
        }
      }
      setData();
      let buttonsDiv = getElement(main.id + "_buttonsDiv_" + name, "div", parent.id);
          let button_submit = getButton(buttonsDiv, "NewAddressButtonSubmit_" + name, "bestätigen");
          button_submit.setAttribute("name", "submit");
          button_submit.onclick = function(){
            let flag = true;
            if(Salutation_dropDownInput.getValue() == ""){
              Salutation_dropDownInput.invalid();
              flag = false;
            }
            if(FirstName_inputDiv.input.value == ""){
              FirstName_inputDiv.invalid();
              flag = false;
            }
            if(LastName_inputDiv.input.value == ""){
              LastName_inputDiv.invalid();
              flag = false;
            }
            if(Country_dropDownInput.getValue() == ""){
              Country_dropDownInput.invalid();
              flag = false;
            }
            if(City_inputDiv.input.value == ""){
              City_inputDiv.invalid();
              flag = false;
            }
            if(Postcode_inputDiv.input.value == ""){
              Postcode_inputDiv.invalid();
              flag = false;
            }
            if(Street_inputDiv.input.value == ""){
              Street_inputDiv.invalid();
              flag = false;
            }
            if(Housenumber_inputDiv.input.value == ""){
              Housenumber_inputDiv.invalid();
              flag = false;
            } 
            if(extend){
              if(Email_inputDiv.input.value == ""){
                Email_inputDiv.invalid();
                flag = false;
              } else if(!EMail.isReal(Email_inputDiv.input.value)){
                Email_inputDiv.invalid("Bitte gib eine gültige Emailadresse ein");
                flag = false;
              }
            }
            if(flag){
              let obj = new Object();
                  obj.AddressName = AddressName_inputDiv.getValue();
                  obj.Title       = Title_inputDiv.getValue();
                  obj.FirstName   = FirstName_inputDiv.getValue();
                  obj.LastName    = LastName_inputDiv.getValue();
                  obj.Street      = Street_inputDiv.getValue();
                  obj.City        = City_inputDiv.getValue();
                  obj.Country     = Country_dropDownInput.getValue();
                  obj.HouseNumber = Housenumber_inputDiv.getValue();
                  obj.Postcode    = Postcode_inputDiv.getValue();
                  obj.Salutation  = Salutation_dropDownInput.getValue();
                  if(extend){
                    obj.Email     = Email_inputDiv.getValue();
                    obj.Phone     = Phone_inputDiv.getValue(); 
                  }
              submit_func(obj);
            }
          }
  
          let buttonReturn = getButton(buttonsDiv, "NewAddressButtonReturn_" + name, "abbrechen");
              buttonReturn.onclick = function(){
                return_func();
              }
    }
    this.setData = function(obj){
      data = obj;
    }
    function setData(){
    }
    this.onreturn = function(func){
      return_func = func;
    }
    this.onsubmit = function(func){
      submit_func = func;
    }
    this.removeInput = function(name){
      document.getElementsByName(name)[0].remove();
    }
  }
  
  
  
  function addAddress(AddressObject){
    let data = CallPHPObject(AddressHelper.ADD);
        data.Storage = AddressObject;
    CallPHP(AddressHelper.PATH, data);
  }
  
  function getAddress(AddressID){
    let data = CallPHPObject(AddressHelper.GET);
        data.AddressID = AddressID;
    return CallPHP(AddressHelper.PATH, data).toObject();
  }
  
  function removeAddress(AddressID){
    let data = CallPHPObject(AddressHelper.REMOVE);
        data.AddressID = AddressID;
    CallPHP(AddressHelper.PATH, data);
  }
  
  function editAddress(AddressObject){
    let data = CallPHPObject(AddressHelper.EDIT);
        data.Storage = AddressObject;
    CallPHP(AddressHelper.PATH, data);
  }
  
  