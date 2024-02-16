  
  class ViewPort {
    static eventStack = [];
    static lastSize = null;
    static #size    = null;
    static {
        window.addEventListener('resize', function(e){
            e.preventDefault();
            ViewPort.#calcSize();
        }, true)
    }
    static isMobile(flag = true){
        if(flag){
            let size = this.getSize();
            if(size == "mobile-small" || size == "mobile"){
                return true;
            }
            return false;
        }
        if (navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)) {
            return true;
        }
        return false;
        return window.navigator.userAgentData.mobile;
    }
    static set onViewPortChanged(func){
        ViewPort.eventStack.push(func);
    }
    static getSize(){
        if(ViewPort.#size == null){
            ViewPort.#calcSize();
        }
        return ViewPort.#size;
    }
    static getComputedPixelRatio(width = null, height = null)                  // get the width and height ofthe viewing device based on its OS
    {
        // let screenWidth = window.screen.width;                                                  // get the width
        // let screenHeight = window.screen.height;                                                // get the height 
        var computedPixelRatio =  (window.screen.availWidth / document.documentElement.clientWidth);                        // a more reliable measure of device pixel ratio due to android firefox bugs...
        computedPixelRatio = window.devicePixelRatio >= computedPixelRatio ? window.devicePixelRatio : computedPixelRatio;  // select whichever value is larger between pixel ratio methods
        
        let height1 = 0;
        let width1 = 0;
        if (width != null && height != null )                                   // if the client is on an android system
        {
            width1 = width / computedPixelRatio;                                 // divide the reported width by the pixel ratio
            height1 = height / computedPixelRatio;                               // divide the reported height by the pixel ratio
        }
        console.log(computedPixelRatio, width, height, width1, height1);
        return computedPixelRatio;
        //alert(screenWidth + " " + screenHeight + " " + window.devicePixelRatio + " " + computedPixelRatio);
    }
    static #calcSize(){
        let width = document.body.getBoundingClientRect().width;
        let height = window.screen.height;
        if(width <= 980){
            ViewPort.#size = 'mobile-small';
        } else if(width > 980 && width < 1200){
            ViewPort.#size = 'mobile'
        } else if(width > 1200){
            ViewPort.#size = 'desktop';
        }
        if(ViewPort.lastSize == null){
            ViewPort.lastSize = ViewPort.#size;
        }
        if(ViewPort.#size != ViewPort.lastSize){
            for(const ev of ViewPort.eventStack){
                ev(ViewPort.#size, ViewPort.lastSize);
            }
            ViewPort.lastSize = ViewPort.#size;
        }
    }
    static isTouchDevice(){
        return (('ontouchstart' in window) ||
           (navigator.maxTouchPoints > 0) ||
           (navigator.msMaxTouchPoints > 0));
    }
  }
//   const spl_windowExtensionsOBJ = new Object();
//         spl_windowExtensionsOBJ.isMobile = function(){
//             console.log(navigator.userAgent);
//             if (navigator.userAgent.match(/Android/i)
//             || navigator.userAgent.match(/webOS/i)
//             || navigator.userAgent.match(/iPhone/i)
//             || navigator.userAgent.match(/iPad/i)
//             || navigator.userAgent.match(/iPod/i)
//             || navigator.userAgent.match(/BlackBerry/i)
//             || navigator.userAgent.match(/Windows Phone/i)) {
//                 return true;
//             }
//             return false;
//             return window.navigator.userAgentData.mobile;
//         };
//         spl_windowExtensionsOBJ.getDeviceTypeCSS = function(){
//             let width = document.body.getBoundingClientRect().width;
//             let height = window.screen.height;
//             if(width <= 980){
//                 return 'mobile-small';
//             } else if(width > 980 && width < 1200){
//                 return 'mobile'
//             } else if(width > 1200){
//                 return 'desktop';
//             }
//         };

//   Window.prototype.Splint = spl_windowExtensionsOBJ;
