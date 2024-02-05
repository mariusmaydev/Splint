
class S_constants extends SPLINT {
    static {
        this.BUTTON_STYLES = class {
            static {
                this.BASIC      = "s-button_basic";
                this.LINK       = "s-button_link";
                this.DEFAULT    = "button_Default";
                this.STANDARD   = "button_General";
                this.GENERAL    = "button_General";
                this.NONE  = null;
            }
        }
        SPLINT.Events.onInitComplete = function(){
            S_constants.SPLINT.secureValues(true);
        }
    }
}
class SPLINT_constants extends S_constants {};
class S extends S_constants {}; 