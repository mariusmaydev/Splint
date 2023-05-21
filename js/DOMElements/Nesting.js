
class S_Nesting {
    constructor(parent, name, obj = new SPLINT.autoObject()){
        this._data = obj;
        this.parent = parent;
        this.name = name;
        this.id = "S_Nesting_" + name + "_";
        this.mainElement = new SPLINT.DOMElement(this.id + "Body", "div", this.parent);
        this.mainElement.Class("S-Nesting");
        this.mainElement.Class("S-DOMComponent");
        this.callBack = function(element, entry, key, index, id){};
        this.onEnter    = null;
        this.onEdit     = null;
        this.onRemove   = null;
        this.onAdd      = null;
    }
    
    set data(obj) {
        this._data = obj;
    }
    // set callBack(func){
    //     // this.callBack = func;
    // }
    set header(v){
        this._header = v;
    }
    set input(v){
        this._input = v;
    }
    draw(){
        // this._data = this._data.parseToObject();
        let counter = 0;
        this.obj = this._data.SPLINT.toDOMStructure(this.mainElement, function(element, entry, key, index, obj){
            let id = this.id + "_" + key + "" + element.getAttribute("ivalue") + "" + index + "_";
            if(key != "attr"){
            let ele = new SPLINT.DOMElement(id + "expander", "div", element);
                let headBody = new SPLINT.DOMElement(id + "headBody", "div", ele);
                    headBody.Class("I_headBody");

                    let head = null;
                  if(entry.attr != undefined && entry.attr.name != undefined){
                        head = new SPLINT.DOMElement.SpanDiv(headBody, "head", entry.attr.name);
                        head.Class("I_header");
                  } else {
                        head = new SPLINT.DOMElement.SpanDiv(headBody, "head", key);
                        head.Class("I_header");
                  }
                    let head_buttons = new SPLINT.DOMElement(id + "headButtons", "div", headBody);
                        head_buttons.Class("I_headButtons");

                        
                        if(this.onEdit != null){
                            let buttonEdit = new S_Button(head_buttons, "edit");
                                buttonEdit.bindIcon("edit");
                                buttonEdit.onclick = function(event){
                                    event.stopPropagation();
                                    let c = ele.attributes.ivalue.value;
                                    let path = c.split(".");
                                        path.splice(0, 1);
                                    head.div.state().setActive();
                                    let editInput = new SPLINT.DOMElement.InputDiv(head.div, "I_editInput", head.value);
                                        editInput.Class("I_editInputDiv");
                                        editInput.input.onclick = function(e){
                                            e.stopPropagation();
                                        }
                                    let button_submit = new S_Button(editInput.inputBody, "submit_editCategory");
                                        button_submit.bindIcon("done");
                                        button_submit.onclick = async function(event){
                                            event.stopPropagation();
                                            head.div.state().unsetActive();
                                            editInput.remove();
                                            this.onEdit(event, path, editInput.value);

                                        //   let a = await HashtagHelper.getTag();
                                        //   console.log(a)  
                                          // ProjectHelper.Design().addTags(input.value).then(function(){

                                            // });
                                        }.bind(this);
                                }.bind(this);
                        }

                        if(this.onRemove != null){
                            let buttonRemove = new S_Button(head_buttons, "remove");
                                buttonRemove.bindIcon("delete");
                                buttonRemove.onclick = function(event){
                                    event.stopPropagation();
                                    let c = ele.attributes.ivalue.value;
                                    let path = c.split(".");
                                        path.splice(0, 1);
                                    this.onRemove(event, path);
                                }.bind(this);
                        }

                        if(this.onAdd != null){
                            let buttonAdd = new S_Button(head_buttons, "add");
                                buttonAdd.bindIcon("add");
                                buttonAdd.onclick = function(event){
                                    event.stopPropagation();
                                    let c = ele.attributes.ivalue.value;
                                    let path = c.split(".");
                                        path.splice(0, 1);
                                    // this.onAdd(event, path);
                                    let n_Expander = new SPLINT.DOMElement(id + "new_expander", "div", ele);
                                        n_Expander.Class("I_expander");
                                        n_Expander.before(ele.children[1]);
                                        n_Expander.setAttribute("ivalue", element.getAttribute("ivalue") + ".new");
                                        let n_headBody = new SPLINT.DOMElement(id + "new_headBody", "div", n_Expander);
                                            n_headBody.Class("I_headBody");
                                            let n_head = new SPLINT.DOMElement.SpanDiv(n_headBody, "head", "new");
                                                n_head.Class("I_header");
                                                n_head.div.state().setActive();
                                            let n_editInput = new SPLINT.DOMElement.InputDiv(n_head.div, "I_editInput", n_head.value);
                                                n_editInput.Class("I_editInputDiv");
                                                n_editInput.input.onclick = function(event){
                                                    
                                                    event.stopPropagation();
                                                }
                                            let n_button_submit = new S_Button(n_editInput.inputBody, "submit_newCategory");
                                                n_button_submit.bindIcon("done");
                                                n_button_submit.onclick = async function(event){
                                                    event.stopPropagation();
                                                    n_head.div.state().unsetActive();
                                                    n_editInput.remove();
                                                    this.onAdd(event, path, n_editInput.value);
                                                }.bind(this);
                                            let n_button_cancel = new S_Button(n_editInput.inputBody, "cancel_newCategory");
                                                n_button_cancel.bindIcon("close");
                                                n_button_cancel.onclick = async function(event){
                                                    event.stopPropagation();
                                                    n_head.div.state().unsetActive();
                                                    n_editInput.remove();
                                                    n_Expander.remove();
                                                    // this.onAdd(event, path, n_editInput.value);
                                                }.bind(this);
                                }.bind(this);
                        }

                    headBody.onmouseenter = function(){
                        head_buttons.style.visibility = "visible";
                    }
                    headBody.onmouseleave = function(){
                        head_buttons.style.visibility = "hidden";
                    }
                  
                //   if(this.onEnter != null){
                //     let ele1 = new SPLINT.DOMElement(id + "inputBody", "div", headBody);
                //         ele1.Class("I_inputBody");
                //         let input = new n_InputDiv(ele1, "I_input", "test", 0);
                //             input.onEnter = function(event){
                //                 let c = ele.attributes.ivalue.value;
                //                 let path = c.split(".");
                //                     path.splice(0, 1);
                //                 this.onEnter(event, path);
                //             }.bind(this);
                //             input.disableAnimation();
                //   }
                ele.Class("I_expander");
                let path = "";
                if(element.attributes.ivalue != undefined){
                    let c = element.attributes.ivalue.value;
                        path = c.split(".");
                        path.splice(0, 1);
                }
                this.callBack(ele, path, key, index, id, obj);
                counter++;
                return ele;
            }
            return false;
        }.bind(this));
    }
}
// let testOBJ = new SPLINT.autoObject();
// testOBJ.b.attr.name = "test";
// testOBJ.b.b.attr.name = "o";
// testOBJ.a.f.h.d.attr.name = "ok";
// testOBJ.a.f.h.f.attr.name = "ok";
// console.dir(testOBJ);
// testOBJ.toDOMStructure(document.body, function(element, entry, key, index){
//   console.log(index);
//   if(key != "attr"){
//     let ele = new SPLINT.DOMElement("/UID()/", "div", element);
//         let headBody = new SPLINT.DOMElement(ele.id + "_headBody", "div", ele);
//             headBody.Class("I_headBody");

//           if(entry.attr != undefined){
//             let head = new SPLINT.DOMElement.SpanDiv(headBody, "head", entry.attr.name);
//                 head.Class("I_header");
//           } else {
//             let head = new SPLINT.DOMElement.SpanDiv(headBody, "head", key);
//                 head.Class("I_header");
//           }

//           if(index == 0){
//             let ele1 = new SPLINT.DOMElement("/UID()/_inputBody", "div", headBody);
//                 ele1.Class("I_inputBody");
//                 let input = new n_InputDiv(ele1, "I_input", "test", 0);
//                     input.disableAnimation();
//           }
//         ele.Class("I_expander");
//     return ele;
//   }
//   return false;
// });