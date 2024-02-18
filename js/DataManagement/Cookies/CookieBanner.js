
class S_CookieBanner {

    static #getCookieText(MainContentContainer){
        let textContainer = new SPLINT.DOMElement("CookieBanner_textContainer", "div", MainContentContainer);
            textContainer.Class("textContainer");
            let id = textContainer.id + "_Content_";
            let p1 = new SPLINT.DOMElement.TextView(textContainer, "a");
                p1.Class("p1");
                p1.value = "Wir nutzen Cookies auf unserer Website. Einige von ihnen sind essenziell, während andere uns helfen, diese Website und Ihre Erfahrung zu verbessern.";
            
            let p2 = new SPLINT.DOMElement.TextView(textContainer, "b");
                p2.Class("p2");
                p2.value = "Wenn Sie unter 16 Jahre alt sind und Ihre Zustimmung zu freiwilligen Diensten geben möchten, müssen Sie Ihre Erziehungsberechtigten um Erlaubnis bitten.";

            let p3 = new SPLINT.DOMElement.TextView(textContainer, "c");
                p3.Class("p3");
                p3.value = "Wir verwenden Cookies und andere Technologien auf unserer Website. Einige von ihnen sind essenziell, während andere uns helfen, diese Website und Ihre Erfahrung zu verbessern. Personenbezogene Daten können verarbeitet werden (z. B. IP-Adressen), z. B. für personalisierte Anzeigen und Inhalte oder Anzeigen- und Inhaltsmessung. Weitere Informationen über die Verwendung Ihrer Daten finden Sie in unserer Datenschutzerklärung. Sie können Ihre Auswahl jederzeit unter Einstellungen widerrufen oder anpassen.";
        
    }
    static #getCookieSettings(MainContentContainer){
        let settingsContainer = new SPLINT.DOMElement("CookieBanner_settingsContainer", "div", MainContentContainer);
            settingsContainer.Class("settingsContainer");
            let id = settingsContainer.id + "_Content_";
            let b1 = new SPLINT.DOMElement(id + "b1", "div", settingsContainer);
                b1.Class("Essential");
                let b1_checkbox = new SPLINT.DOMElement.Checkbox(b1, "Essential", true);
                    b1_checkbox.labelAfter = "Essenziell";
                    b1_checkbox.disabled = true;

                let b1_text = new SPLINT.DOMElement.TextView(b1);
                    b1_text.value = "Essenzielle Cookies ermöglichen grundlegende Funktionen und sind für die einwandfreie Funktion der Website erforderlich.";
    
            let b2 = new SPLINT.DOMElement(id + "b2", "div", settingsContainer);
                b2.Class("Statistics");
                let b2_checkbox = new SPLINT.DOMElement.Checkbox(b2, "Statistic", false);
                    b2_checkbox.labelAfter = "Statistiken";

                let b2_text = new SPLINT.DOMElement.TextView(b2);
                    b2_text.value = "Statistik Cookies erfassen Informationen anonym. Diese Informationen helfen uns zu verstehen, wie unsere Besucher unsere Website nutzen.";
        
        return [b1_checkbox, b2_checkbox];
            // let b3 = new SPLINT.DOMElement(id + "b3", "div", settingsContainer);
            //     b3.Class("Externe Medien");
            //     let b3_checkbox = new SPLINT.DOMElement.Checkbox(b3, "Essential", true);
            //         b3_checkbox.labelAfter = "Externe Median";

            //     let b3_text = new SPLINT.DOMElement.TextView(b3);
            //         b3_text.value = "Inhalte von Videoplattformen und Social-Media-Plattformen werden standardmäßig blockiert. Wenn Cookies von externen Medien akzeptiert werden, bedarf der Zugriff auf diese Inhalte keiner manuellen Zustimmung mehr.";
    
    
    }
    static async open(delayed = true){
        let popupWindow = new SPLINT.DOMElement.popupWindow("CookieBanner", false, false);
            popupWindow.Class("CookieBanner");
            let headContainer = new SPLINT.DOMElement("CookieBanner_headContainer", "div", popupWindow.content);
                headContainer.Class("headContainer");
                let headContent = new SPLINT.DOMElement.SpanDiv(headContainer, "headline", "Cookie- und Werbeeinstellungen");
                    headContent.Class("inner");

            let MainContentContainer = new SPLINT.DOMElement("CookieBanner_MainContentContainer", "div", popupWindow.content);
                MainContentContainer.Class("mainContentContainer");
                this.#getCookieText(MainContentContainer);
                new SPLINT.DOMElement.HorizontalLine(MainContentContainer);
                let cookieSettings = this.#getCookieSettings(MainContentContainer);
                
                    
            let buttonsContainer = new SPLINT.DOMElement("CookieBanner_buttonsContainer", "div", popupWindow.content);
                buttonsContainer.Class("buttonsContainer");
                let buttonAllowAll = new SPLINT.DOMElement.Button(buttonsContainer, "activate_all", "Alle akzeptieren");
                    buttonAllowAll.Class("activateAll");
                    buttonAllowAll.onclick = function(){
                        cookieSettings[0].disabled = false;
                        cookieSettings[0].checked = true;
                        cookieSettings[1].checked = true;
                        SPLINT.Data.Cookies.cookiesAccepted = 1;
                        SPLINT.Data.Cookies.set("COOKIE_ACCEPTED", 1, 14);
                        popupWindow.element.state().unsetActive();
                        setTimeout(function(){
                            popupWindow.close();
                        }, 2000);
                    }.bind(this);

                let buttonSaveChoice = new SPLINT.DOMElement.Button(buttonsContainer, "saveChoice", "Auswahl bestätigen");
                    buttonSaveChoice.Class("saveChoice");
                    buttonSaveChoice.onclick = function(){
                        cookieSettings[0].disabled = false;
                        cookieSettings[0].checked = true;
                        if(cookieSettings[1].checked){
                            SPLINT.Data.Cookies.cookiesAccepted = 2;
                            SPLINT.Data.Cookies.set("COOKIE_ACCEPTED", 2, 14);
                        } else {
                            SPLINT.Data.Cookies.cookiesAccepted = 1;
                            SPLINT.Data.Cookies.set("COOKIE_ACCEPTED", 1, 14);
                        }
                        popupWindow.element.state().unsetActive();
                        setTimeout(function(){
                            popupWindow.close();
                        }, 2000);
                    }.bind(this);

                // let buttonReject = new SPLINT.DOMElement.Button(buttonsContainer, "Reject", "nur Notwendige Cookies ");
                //     buttonReject.Class("Reject");
                //     buttonReject.onclick = function(){
                //         SPLINT.Data.Cookies.cookiesAccepted = 0;
                //         SPLINT.Data.Cookies.set("COOKIE_ACCEPTED", 0, 14);
                //         popupWindow.element.state().unsetActive();
                //         setTimeout(function(){
                //             popupWindow.close();
                //         }, 2000);
                //     }.bind(this);

                if(delayed){
                    setTimeout(function(){
                        popupWindow.element.state().setActive();
                    }, 1000);
                }
    }
}