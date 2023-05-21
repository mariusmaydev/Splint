// class radioButton_C extends Button {
//     constructor(parent, name){
//       super(parent, name);
//       this.id   = parent.id + "_radioButton_" + name + "_";
//       this.name = name;
//       this.parent = parent;
//       this.data = [];
//       this.lineFlag = true;
//       this.preventLines = false;
//       this.headline = null;
//       this.onChange = function(e){};
//       this.mainElement = new SPLINT.DOMElement(this.id + "main", "div", parent);
//       this.mainElement.Class("RadioButton");
//       this.button.remove();
//     }
//     get dataObj(){
//       function obj(instance){
//         this.add = function(id, name, dataIn){
//           let data = new Object();
//               data.id   = id;
//               data.name = name;
//               data.data = dataIn;
//           instance.data.push(data);
//         }
//       }
//       return new obj(this);
//     }
//     get Value(){
//       return $(`input[name="${CSS.escape(this.name)}"]:checked`).val();
//     }
//     get headline_ele(){
//       return this.headline;
//     }
//     setValue(value){
//       if(value != null && value != false){
//         $(`input[name="${CSS.escape(this.name)}"]`).filter("[value='" + value + "']").prop('checked', true);
//         $(`div[name="${CSS.escape(this.name)}"]`).filter("[value='" + value + "']").attr('state', 'active');
//       }
//     }
//     Headline(str){
//       this.headline = str;
//     }
//     drawRadio(){
//       if(this.headline != null){
//         this.headline = new spanDiv(this.mainElement, "headline", this.headline);
//         this.headline.div.Class("radio_headline");
//       }
//       let radioDiv = new SPLINT.DOMElement(this.id + "_RadioDiv", "div", this.mainElement);
//           radioDiv.Class("inner");
//       for(let i = 0; i < this.data.length; i++){
//         if(this.lineFlag){
//           new HorizontalLine(radioDiv);
//         } else {
//           this.lineFlag = true;
//         }
//         let data = this.data[i];
//         let inputDiv = new SPLINT.DOMElement(this.id + "inputDiv_" + i, "div", radioDiv);
//             inputDiv.onclick = function(e){
//               input.click();
//               e.stopPropagation();
//             }
//             let input = new SPLINT.DOMElement(this.id + "input_" + i, "input", inputDiv);
//                 input.setAttribute("type", "radio");
//                 input.setAttribute("name", this.name);
//                 input.checked = true;
//                 input.value = data.id;
//             let labelDiv = new SPLINT.DOMElement(parent.id + "_radioButtonLabelDiv_" + this.name + "_" + i, "div", inputDiv.id);
//                 let span0 = new spanDiv(labelDiv, "span0", data.name);
//                 labelDiv.setAttribute("value", data.id);
//                 labelDiv.setAttribute("state", "passive");
//                 labelDiv.setAttribute("name", this.name);
//                 if(data.data != undefined){
//                   let span1 = new spanDiv(labelDiv, "span1", data.data);
//                 }
//             if(data.price != undefined){
//               let price = new priceDiv(inputDiv, data.price);
//             }
//             let displayDiv = new SPLINT.DOMElement(parent.id + "_radioButtonDisplayDiv_" + this.name + "_" + i, "div", labelDiv.id);
//                 displayDiv.setAttribute("name", this.name + "_display");
//                 displayDiv.setAttribute("value", data.id);

//       }
//       $(`input[type="radio"][name="${CSS.escape(this.name)}"]`).on('change', function(e) {
//         $(`div[name="${CSS.escape(this.name)}"]`).attr('state', 'passive');
//         $(`div[name="${CSS.escape(this.name)}"]`).filter("[value='" + e.currentTarget.value + "']").attr('state', 'active');
//         // console.log(e);
//         this.onChange(e);
//       }.bind(this));
//     }
//     getDisplayDiv(value){
//       return $(`div[name="${CSS.escape(this.name + "_display")}"]`).filter("[value='" + value + "']")[0];
//     }
//   }
