  
  const spl_windowExtensionsOBJ = new Object();
        spl_windowExtensionsOBJ.isMobile = function(){
            return window.navigator.userAgentData.mobile;
        };
        spl_windowExtensionsOBJ.getDeviceTypeCSS = function(){
            let width = $(window).width();
            let height = $(window).height();
            if(width < 672){
                return 'mobile';
            } else if(width > 672 && width < 990){
                return 'tablet'
            } else if(width > 990 && width < 1296){
                return 'desktop-small';
            } else if(width > 1296){
                return 'desktop';
            }
        };

  Window.prototype.Splint = spl_windowExtensionsOBJ;