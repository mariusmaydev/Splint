
SPLINT.Events.onInitComplete = function(){
    eval("new " + "P_" + document.body.id.replace("BODY", "") + "()");
}