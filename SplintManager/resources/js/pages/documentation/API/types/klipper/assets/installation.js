
class A_klipperAPI_installation extends templateExtendedPage_content {
    constructor(parent){
        super("installation", parent);
        // this.draw();
        super.draw();
        super.headline = "TEST";
        this.draw();
    }
    draw(){
        let tutorialContainer = new SPLINT.DOMElement(this.id + "TutorialContainer", "div", this.content);
        let bt_tutorial = new SPLINT.DOMElement.Button(tutorialContainer, "tutorialContainer", "installation on windows");    
            bt_tutorial.basicStyling = S_constants.BUTTON_STYLES.LINK;
            bt_tutorial.onclick = function(){
                window.open("https://3dpandme.com/2022/08/25/tutorial-running-klipper-on-a-windows-pc-using-wsl/", "_blank").focus();
            }
    }
}