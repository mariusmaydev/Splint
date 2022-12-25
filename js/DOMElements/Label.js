function Label(parent, element, value){
    this.element = createLabel(parent, element.id, value);
    this.before = function(){
      element.parentNode.insertBefore(this.element, element);
    }
    this.after = function(){
      element.parentNode.insertBefore(this.element, element.nextSibling);
    }
  }

  function createLabel(grandfather, parentID, content){
    let label = new DOMElement(parentID + "_label", "label", grandfather.id);
        label.setAttribute("for", grandfather.id);
        label.innerHTML = content;
    return label;
  }