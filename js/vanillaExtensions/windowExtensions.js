  
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
    static isMobile(){
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
