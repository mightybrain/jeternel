class Burger{

    constructor(button){
        this.buttonElement = button;
        this.init();
    }

    init(){
        this.buttonElement.addEventListener("click", function(){

            document.body.classList.toggle("js-burger-menu-is-open");
            
            if(!this.classList.contains("js-burger-is-open")){
                this.classList.add("js-burger-is-open");
            }else if(this.classList.contains("js-burger-is-open")){
                this.classList.remove("js-burger-is-open");
            }

        })
    }

}

if(document.querySelector(".js-burger")){
    new Burger(document.querySelector(".js-burger"));
};


// Основной слайдер на главной странице
if(document.querySelector(".js-capabilities-slider")){

    new Swiper(".js-capabilities-slider", {
        init: true,
        loop: false,
        slidesPerView: "auto",
        direction: "horizontal",
        breakpoints: {
            320: {
                spaceBetween: 20,
                speed: 300
            },
            961: {
                spaceBetween: 100,
                speed: 1200
            },
            1201: {
                spaceBetween: 218,
                speed: 1200
            },
            1441: {
                spaceBetween: 254,
                speed: 1200
            }
        },
        watchOverflow: true,
        navigation: {
            nextEl: ".js-capabilities-slider-arrow-right",
            prevEl: ".js-capabilities-slider-arrow-left",
        },
    });

};

if(document.querySelector(".js-sales-slider")){

    new Swiper(".js-sales-slider", {
        init: true,
        loop: false,
        slidesPerView: "auto",
        direction: "horizontal",
        breakpoints: {
            320: {
                spaceBetween: 20,
                speed: 300
            },
            961: {
                spaceBetween: 100,
                speed: 1200
            },
            1201: {
                spaceBetween: 218,
                speed: 1200
            },
            1441: {
                spaceBetween: 254,
                speed: 1200
            }
        },
        watchOverflow: true,
        navigation: {
            nextEl: ".js-sales-slider-arrow-right",
            prevEl: ".js-sales-slider-arrow-left",
        },
    });

};


// Инициализация карты Яндекс
function mapInit(){ 
    let map = new ymaps.Map("map", {
        center: [55.176234, 61.364842],
        zoom: 13
    }),

    MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
        '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
    ),

    branchPlacemarks = [
        [55.154820, 61.394523],
        [55.195015, 61.334515],
        [55.160545, 61.378281],
        [55.173355, 61.306164]
    ]

    branchPlacemarks.forEach(function(item){
        map.geoObjects.add(
            new ymaps.Placemark(item, {
                hintContent:"",
                balloonContent:""
            }, {
                iconLayout: 'default#image',
                iconImageHref: '../images/pin.png',
                iconImageSize: [52, 52],
                iconImageOffset: [0, 0]
            })      
        )
    });

    map.behaviors.disable("scrollZoom");
    map.controls.remove("searchControl");
    map.controls.remove("rulerControl");
    map.controls.remove("typeSelector");
    map.controls.remove("trafficControl");
    map.controls.remove("geolocationControl");
    map.controls.remove("fullscreenControl");
    map.controls.remove("routeButtonControl");
};    

if(document.getElementById("map")){
    ymaps.ready(mapInit);
};


class BubbleCreator{

    constructor(element){
        this.element = element;
        this.bubbleSize;
        this.isHovered = false;
        this.calcBubbleSize();
        this.init();
    }

    calcBubbleSize(){
        this.bubbleSize = this.element.offsetWidth;
        if(this.element.offsetWidth > this.element.offsetHeight){
            this.bubbleSize = this.element.offsetHeight;
        }
    }

    init(){
        let _this = this;

        this.element.addEventListener("mouseenter", function(){
            if(_this.isHovered){
                return;
            }
            _this.isHovered = true;

            let bubbleContainer = document.createElement("div");
            bubbleContainer.className = "bubble-container";
            bubbleContainer.style.width = _this.bubbleSize + "px";
            bubbleContainer.style.height = _this.bubbleSize + "px";
            bubbleContainer.style.left = event.clientX - _this.element.getBoundingClientRect().left - _this.bubbleSize / 2 + "px";
            bubbleContainer.style.top = event.clientY - _this.element.getBoundingClientRect().top - _this.bubbleSize / 2 + "px";
        
            let bubble = document.createElement("div");
            bubble.className = "bubble";
        
            bubbleContainer.append(bubble);
            _this.element.prepend(bubbleContainer);
            setTimeout(function(){
                bubbleContainer.remove();
            }, 700);
        })

        this.element.addEventListener("mouseleave", function(){
            _this.isHovered = false;
        })
    }

}

if(document.querySelector(".js-bubble-hover")){

    let bubbleCreators = [];
    document.querySelectorAll(".js-bubble-hover").forEach(function(item){
        bubbleCreators.push(new BubbleCreator(item));
    })

    window.addEventListener("resize", function(){

        bubbleCreators.forEach(function(item){
            item.calcBubbleSize();
        })

    })
}


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


function checkHiddenElems(){
    document.querySelectorAll(".js-animated-showing").forEach(function(item){
        if(item.getBoundingClientRect().top < document.documentElement.clientHeight / 1.5){
            item.classList.remove("js-animated-showing");
            /*setTimeout(function(){
                item.classList.remove("js-animated-showing");
            }, 200);*/
        }
    })
}

if(document.querySelector(".js-animated-showing")){
    window.addEventListener("load", checkHiddenElems);
    window.addEventListener("scroll", checkHiddenElems);
}