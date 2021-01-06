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

