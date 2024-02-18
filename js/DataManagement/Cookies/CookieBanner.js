
class S_CookieBanner {
    static async open(delayed = true){
        let popupWindow = new SPLINT.DOMElement.popupWindow("CookieBanner", false, false);
            popupWindow.Class("CookieBanner");
            let headContainer = new SPLINT.DOMElement("CookieBanner_headContainer", "div", popupWindow.content);
                headContainer.Class("headContainer");
                let headContent = new SPLINT.DOMElement.SpanDiv(headContainer, "headline", "Cookie- und Werbeeinstellungen");
                    headContent.Class("inner");

            let textContainer = new SPLINT.DOMElement("CookieBanner_textContainer", "div", popupWindow.content);
                textContainer.Class("textContainer");
                let textContent = new SPLINT.DOMElement.SpanDiv(textContainer, "headline", "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.");
                    textContent.Class("inner");
                    
            let buttonsContainer = new SPLINT.DOMElement("CookieBanner_buttonsContainer", "div", popupWindow.content);
                buttonsContainer.Class("buttonsContainer");
                let buttonAccept = new SPLINT.DOMElement.Button(buttonsContainer, "Accept", "Akzeptieren");
                    buttonAccept.Class("Accept");
                    buttonAccept.onclick = function(){
                        SPLINT.Data.Cookies.cookiesAccepted = true;
                        SPLINT.Data.Cookies.set("COOKIE_ACCEPTED", true, 14);
                        popupWindow.close();
                    }.bind(this);
                let buttonReject = new SPLINT.DOMElement.Button(buttonsContainer, "Reject", "Ablehnen");
                    buttonReject.Class("Reject");
                    buttonReject.onclick = function(){
                        SPLINT.Data.Cookies.cookiesAccepted = false;
                        SPLINT.Data.Cookies.set("COOKIE_ACCEPTED", false, 14);
                        popupWindow.close();
                    }.bind(this);

                    if(delayed){
                        setTimeout(function(){
                            popupWindow.element.state().setActive();
                        }, 2000);
                    }
    }
}