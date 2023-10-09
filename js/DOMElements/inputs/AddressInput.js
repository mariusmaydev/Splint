
class S_AddressInput extends S_DOMElement_TEMPLATE {
    constructor(parent, name, expanded = true){
        super("AddressInput", parent, name);
        this.mainElement.Class("S-AddressInput");
        this.expanded = expanded;
        this.onsubmit = function(){};
        this.draw();
    }
    submit(){
        return this.onsubmit();
    }
    draw(){
        this.mainElement.clear();
  
      this.dropdown_salutation = new SPLINT.DOMElement.InputSelect(this.mainElement, "salutation", "Anrede");
      this.dropdown_salutation.Class("dropdown_salutation");
      this.dropdown_salutation.addEntry("Mr", "Herr");
      this.dropdown_salutation.addEntry("Mrs", "Frau");
      this.dropdown_salutation.addEntry("Mx", "Divers");
  
      this.title_input = new SPLINT.EX.DOMElement.Input(this.mainElement, "Titel");
      this.title_input.identifier = "title";
      this.title_input.Class("title_input");
  
      this.firstName_input = new SPLINT.EX.DOMElement.Input(this.mainElement, "Vorname", "Vorname");
      this.firstName_input.identifier = "firstName";
      this.firstName_input.Class("firstName_input");
  
      this.lastName_input = new SPLINT.EX.DOMElement.Input(this.mainElement, "Nachname");
      this.lastName_input.identifier = "lastName";
      this.lastName_input.Class("lastName_input");
      
      this.postcode_input = new SPLINT.EX.DOMElement.Input(this.mainElement, "Postleitzahl");
      this.postcode_input.identifier = "postcode";
      this.postcode_input.Class("postcode_input");
      
      this.city_input = new SPLINT.EX.DOMElement.Input(this.mainElement, "Stadt");
      this.city_input.identifier = "city";
      this.city_input.Class("city_input");
  
      this.dropdown_country = new SPLINT.DOMElement.InputSelect(this.mainElement, "country", "Land");
      this.dropdown_country.Class("dropdown_country");
      this.dropdown_country.addEntry("DE", "Deutschland");
      this.dropdown_country.addEntry("AU", "Österreich");
  
      this.street_input = new SPLINT.EX.DOMElement.Input(this.mainElement, "Straße");
      this.street_input.identifier = "street";
      this.street_input.Class("street_input");
  
      this.housenumber_input = new SPLINT.EX.DOMElement.Input(this.mainElement, "Hausnummer");
      this.housenumber_input.identifier = "housenumber";
      this.housenumber_input.Class("housenumber_input");
  
      if(this.expanded){
        this.email_input = new SPLINT.EX.DOMElement.Input(this.mainElement, "Emailadresse");
        this.email_input.identifier = "email";
    
        this.phone_input = new SPLINT.EX.DOMElement.Input(this.mainElement, "Telefonnummer");
        this.phone_input.identifier = "phone";
      }
    }
    drawSumbit(){
        if(this.buttonsDiv != undefined){
            this.buttonsDiv.remove();
        }
        this.buttonsDiv = new SPLINT.DOMElement(this.id + "buttons", "div", this.mainElement);
            let button_save = new SPLINT.DOMElement.Button(this.buttonsDiv, "save", "speichern");
                button_save.onclick = function(){
                    this.onsubmit();
                }.bind(this);

    }
    set value(data){
      if(data != null){
        this.title_input.value = data.Title;
        this.dropdown_salutation.value = data.Salutation;
        this.firstName_input.value = data.FirstName;
        this.lastName_input.value = data.LastName;
        this.postcode_input.value = data.Postcode;
        this.city_input.value = data.City;
        this.dropdown_country.value = data.Country;
        this.street_input.value = data.Street;
        this.housenumber_input.value = data.HouseNumber;
        if(this.expanded){
          this.email_input.value = data.Email;
          this.phone_input.value = data.Phone;
        }
      }
    }
    get value(){
        let obj = new Object();
            obj.Title       = this.title_input.value;
            obj.FirstName   = this.firstName_input.value;
            obj.LastName    = this.lastName_input.value;
            obj.Street      = this.street_input.value;
            obj.Country     = this.dropdown_country.value;
            obj.City        = this.city_input.value;
            obj.Postcode    = this.postcode_input.value;
            obj.HouseNumber = this.housenumber_input.value;
            obj.Salutation  = this.dropdown_salutation.value;
            if(this.expanded){
              obj.Email       = this.email_input.value;
              obj.Phone       = this.phone_input.value;
            } else {
              obj.Email = "";
              obj.Phone = "";
            }
        return obj;
    }
}

class S_AddressObject {
    constructor(debuggMode = false){
        if(debuggMode){
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
        } else {
            this.AddressID    = "";
            this.AddressName  = "";
            this.Country      = "DE";
            this.City         = "";
            this.Postcode     = "";
            this.Street       = "";
            this.HouseNumber  = "";
            this.FirstName    = "";
            this.LastName     = "";
            this.Title        = "";
            this.Email        = "";
            this.Phone        = "";
            this.Salutation   = "";
        }
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
