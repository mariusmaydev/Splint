
function login_Google_callback(response){
    let loginData = (LoginGoogle_S.parseCredentials(response));
        console.log(loginData);
  }

class LoginGoogle_S {
    static loadConfig(){
        SPLINT.config.google =  JSON.parse($.ajax({
          url: '../' + SPLINT.PROJECT_NAME + '/splint.config/config.loginGoogle.json',
            async: false
        }).responseText);
        return SPLINT.config.google;
    }
    static init(){
        this.loadConfig();

        console.log(Cookie.get("g_state"));
        if(document.getElementById("g_id_onload") != null){
          document.getElementById("g_id_onload").remove();
        }
        let div = new SPLINT.DOMElement("g_id_onload", "div", document.body);
            div.setAttribute("data-auto_prompt", "true");
            div.setAttribute("data-client_id", SPLINT.config.google.clientID);
            // div.style = "z-index: 1000; position: absolute; left: 0; top: 0;";
        //if(!login.isLoggedIn()){
          LoginGoogle_S.drawPopUp(div);
        //}
    }
    static drawPopUp(div){
          div.setAttribute("data-auto_select" ,"true");
          div.setAttribute("data-auto_prompt", "true");
          div.setAttribute("data-client_id", SPLINT.config.google.clientID);
          div.setAttribute("data-context", "signin");
          div.setAttribute("data-ux_mode", "popup");
          div.setAttribute("data-callback", "login_Google_callback");
    }
    static parseCredentials(data){
      return JSON.parse(ASCII_2_base64(data.credential.split(".")[1]));
    }
    static drawLoginButton(parent){
      let div = new SPLINT.DOMElement("g_id_signin", "div", parent);
          div.Class("g_id_signin");
          div.setAttribute("data-type", "standard");
          div.setAttribute("data-shape", "rectangular");
          div.setAttribute("data-theme", "outline");
          div.setAttribute("data-text", "signin_with");
          div.setAttribute("data-size", "medium");
          div.setAttribute("data-logo_alignment", "left");
          div.setAttribute("data-callback", "login_Google_callback");
          // this.drawLogoutButton();
    }
}