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

