
class Tooltip_S {
    constructor(value, direction, parent) {
        this.parent = parent;
        this.value = value;
        this.direction = direction;
        this.id = parent.id + "_tooltip";
        this.gen();
    }
    gen(){
        this.parent.classList.add("tooltip_S");
        this.parent.setAttribute("data-tooltip-direction", this.direction);
        this.parent.setAttribute("data-tooltip-value", this.value);
    }
    remove(){
        this.parent.classList.remove("tooltip_S");
        this.parent.removeAttribute("data-tooltip-direction");
        this.parent.removeAttribute("data-tooltip-value");

    }
}