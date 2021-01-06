class ResultPreview{

    constructor(elem){
        this.container = elem;
        this.containerWidth;
        this.overlay = this.container.querySelector(".js-result-overlay");
        this.isEnable;
        this.calcContainerWidth();
        this.checkEnable();
        this.init();
    }

    calcContainerWidth(){
        this.containerWidth = this.container.offsetWidth;
    }

    checkEnable(){
        if(document.documentElement.clientWidth > 1100){
            this.isEnable = true;
        }else{
            this.isEnable = false;
        }
    }

    init(){
        let _this = this;
        let widthChanger;
        let overlayCurWidth = 0;
        let overlayNedWidth = 0;

        this.container.addEventListener("mouseenter", function(){
            if(!_this.isEnable){
                return;
            }
            _this.overlay.style.transition = "none";
            widthChanger = setInterval(function(){
                if(overlayCurWidth > overlayNedWidth){
                    _this.overlay.style.width = overlayCurWidth - 1 + "%";
                    overlayCurWidth = overlayCurWidth - 1;
                }else if(overlayCurWidth < overlayNedWidth){
                    _this.overlay.style.width = overlayCurWidth + 1 + "%";
                    overlayCurWidth = overlayCurWidth + 1;
                }
            }, 5)
        })

        this.container.addEventListener("mouseleave", function(){
            if(!_this.isEnable){
                return;
            }
            clearInterval(widthChanger);
            overlayNedWidth = 0;
            overlayCurWidth = 0;
            _this.overlay.removeAttribute("style");
            _this.overlay.style.transition = "width .3s 0s linear";
        })

        this.container.addEventListener("mousemove", function(){
            if(!_this.isEnable){
                return;
            }
            overlayNedWidth = Math.floor((event.clientX - _this.container.getBoundingClientRect().left) / _this.containerWidth * 100);
        })
    }
}

if(document.querySelector(".js-result-container")){
    window.resultPreviews = [];
    document.querySelectorAll(".js-result-container").forEach(function(item){
        window.resultPreviews.push(new ResultPreview(item));
    })

    window.addEventListener("resize", function(){
        window.resultPreviews.forEach(function(item){
            item.calcContainerWidth();
            item.checkEnable();
        })
    })
}

