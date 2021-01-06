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