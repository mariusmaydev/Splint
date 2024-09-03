
class S_ImageSlideMenu extends S_DOMElement_TEMPLATE {
    constructor(parent, name){
        super("ImageSlideMenu", parent, name);
        this.mainElement.Class("ImageSlideMenuMain");
        this.contentElement = new SPLINT.DOMElement(this.id + "Content", "div", this.mainElement);
        this.contentElement.Class("content");
        this.ElementList = [];
    }
    addSrcWithCallback(name, src = null, onDraw = function(instance, obj, parent){}){
        let obj = new Object();
            obj.type    = "srcCallback";
            obj.name    = name;
            obj.onDraw  = onDraw;
            obj._srcResolve = function(){};  
            Object.defineProperty(obj, "src", {
                set(v) {
                    if(obj._src instanceof Promise) {
                        obj._srcResolve(v);
                    }
                    if(v == null){
                        obj._src     = new Promise(function(resolve){
                            obj._srcResolve = resolve;
                        });
                    } else {
                        obj._src = Promise.resolve(v);
                    }
                },
                get() {
                    return obj._src;
                },
                enumerable: true,
                configurable: true,
              });
            obj.src     = null;
        this.ElementList.push(obj);
    }
    addCanvas(name, canvas){
        let obj = new Object();
            obj.type    = "canvas";
            obj.name    = name;
            if(canvas instanceof Promise) {
                obj.src = canvas;
            } else {
                obj.src     = new Promise(
                    async function(resolve){
                        resolve(canvas)
                });
            }
        this.ElementList.push(obj);
    }
    addImage(name, url){
        let obj = new Object();
            obj.type    = "image";
            obj.name    = name;
            obj.src     = new Promise(
                async function(resolve){
                    let im = new Image();
                        im.src = url;
                        im.onload = function(){
                            let cv = new OffscreenCanvas(im.width, im.height);
                            let ctx = cv.getContext("2d");
                                ctx.save();
                                ctx.drawImage(im, 0, 0);
                                ctx.restore();
                                resolve(cv.transferToImageBitmap());
                        }
            });
        this.ElementList.push(obj);
    }
    draw(){
        this.#drawViewContainer();
        this.#drawPreviewContainer();
    }
    #drawViewContainer(){
        this.viewContainer = new SPLINT.DOMElement(this.id + "ViewContainer", "div", this.contentElement);
        this.viewContainer.Class("ViewContainer");
            this.viewContainerInner = new SPLINT.DOMElement(this.id + "ViewContainerInner", "div", this.viewContainer);
            this.viewContainerInner.Class("ViewContainerInner");
                this.#drawImageViewElements()
    }
    #drawPreviewContainer(){
        this.previewContainer = new SPLINT.DOMElement(this.id + "PreviewContainer", "div", this.contentElement);
        this.previewContainer.Class("PreviewContainer");

            let ImageContainerBT_left = new SPLINT.DOMElement.Button(this.previewContainer, "ImageContainerBT_left");
                ImageContainerBT_left.Class("btLeft");
                ImageContainerBT_left.bindIcon("chevron_left");
                ImageContainerBT_left.setStyleTemplate(SPLINT.DOMElement.Button.STYLE_NONE)

            
            this.previewImageBody = new SPLINT.DOMElement(this.id + "PreviewImageBody", "div", this.previewContainer);
            this.previewImageBody.Class("PreviewImageBody");


            this.#drawImagePreviewElements();
            
            ImageContainerBT_left.onclick = function(){
                let dif = this.previewImageBody.scrollWidth / this.previewImageBody.children.length;
                let aim = this.previewImageBody.scrollLeft - dif;
                let an = function(){
                    if(this.previewImageBody.scrollLeft > aim && this.previewImageBody.scrollLeft > 0){
                        this.previewImageBody.scrollLeft -= 5
                        requestAnimationFrame(an.bind(this));
                    }
                }.bind(this);
                an();
            }.bind(this)

        let ImageContainerBT_right = new SPLINT.DOMElement.Button(this.previewContainer, "ImageContainerBT_right");
            ImageContainerBT_right.Class("btRight");
            ImageContainerBT_right.bindIcon("chevron_right");
            ImageContainerBT_right.setStyleTemplate(SPLINT.DOMElement.Button.STYLE_NONE);
            ImageContainerBT_right.onclick = function(){
                let dif = this.previewImageBody.scrollWidth / this.previewImageBody.children.length;
                let aim = this.previewImageBody.scrollLeft + dif;
                let maxScroll = this.previewImageBody.scrollWidth - this.viewContainer .clientWidth;
                let an = function(){
                    if(this.previewImageBody.scrollLeft <= aim && this.previewImageBody.scrollLeft <= maxScroll+5){
                        this.previewImageBody.scrollLeft += 5
                        requestAnimationFrame(an.bind(this));
                    }
                }.bind(this);
                an();
            }.bind(this)
    }
    
    #drawImagePreviewElements(){
        for(const obj of this.ElementList){
            let imgEleBody = new SPLINT.DOMElement(this.id + "PrevimgDiv_" + obj.name, "div", this.previewImageBody);
                imgEleBody.Class("imgEleBody");
                imgEleBody.classList.add("stdImgContainer");
                let imgEleImage = new SPLINT.DOMElement(this.id + "PrevimgEle_" + obj.name, "canvas", imgEleBody);
                    imgEleImage.width= window.innerWidth;
                    imgEleImage.height= window.innerHeight
                    obj.src.then(function(bmp){
                        // imgEleImage.style.height = imgEleBody.clientHeight + "px";
                        // imgEleImage.style.width = imgEleBody.clientWidth + "px";
                                imgEleImage.width = bmp.width;
                                imgEleImage.height = bmp.height;
                        let ctx = imgEleImage.getContext("2d");
                        // ctx.scale(, 4);
                            // ctx.save();
                                ctx.imageSmoothingEnabled = true;
                                ctx.imageSmoothingQuality = "high";
                            ctx.drawImage(bmp, 0, 0);
                            // ctx.restore();
                        imgEleImage.SPLINT.onResize = function(entry){
                                let target = entry[0].target;
                                        target.width = bmp.width ;
                                        target.height = bmp.height;
                                // imgEleImage.style.height = (target.clientHeight*2) + "px";
                                // imgEleImage.style.width = (target.clientWidth*2) + "px";
                                imgEleImage.width = bmp.width
                                imgEleImage.height = bmp.height
                                // ctx.canvas.style.width = imgEleImage.width * 0.5 + "px";
                                // ctx.canvas.style.height = imgEleImage.height * 0.5 + "px";
                                // ctx.reset();
                                // ctx.clearRect(0, 0, bmp.width, bmp.height);
                                ctx.save();
                                // ctx.scale(0.5,0.5)
                                ctx.imageSmoothingEnabled = true;
                                ctx.imageSmoothingQuality = "high";
                                ctx.scale(0.5, 0.5);
                                ctx.drawImage(bmp, 0, 0, bmp.width, bmp.height, 0, 0, imgEleImage.width * 2, imgEleImage.height * 2);
                                ctx.restore();
                            }
                            // ctx.save();
                            // ctx.imageSommting
                    })

                    imgEleBody.onclick = function(){
                        let all = this.viewContainerInner.children;
                        for(const ele of all){
                            ele.state().unsetActive();
                        }
                        let all2 = this.previewImageBody.children;
                        for(const ele of all2){
                            ele.state().unsetActive();
                        }
                        let ele = document.getElementById(this.id + "imgDiv_" + obj.name);
                            ele.state().setActive();
                            imgEleBody.state().setActive();
                    }.bind(this)
                    obj.elementPrev = imgEleBody;
        }
    }
    
    #drawImageViewElements(){
        for(const obj of this.ElementList){
            let imgEleBody = new SPLINT.DOMElement(this.id + "imgDiv_" + obj.name, "div", this.viewContainerInner);
                imgEleBody.Class("imgEleBody");
                
                if(obj.type == "srcCallback"){
                    obj.onDraw(this, obj, imgEleBody);
                } else {
                    imgEleBody.classList.add("stdImgContainer");
                    let imgEleImage = new SPLINT.DOMElement(this.id + "imgEle_" + obj.name, "canvas", imgEleBody);
                        obj.src.then(function(bmp){
                            imgEleImage.width = bmp.width;
                            imgEleImage.height = bmp.height;
                            let ctx = imgEleImage.getContext("2d");
                                ctx.drawImage(bmp, 0, 0);
                        })
                }
                
        }
    }
}