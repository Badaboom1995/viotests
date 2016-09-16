(function () {
  var header = {};
  var mainBlocks = {};
  var body = document.querySelector("body");

  header.elem = document.querySelector(".header");
  header.height = header.elem.offsetHeight;

  mainBlocks.elem1 = document.querySelector(".main-block:first-child");
  mainBlocks.elem2 = document.querySelector(".main-block:last-child");
  mainBlocks.elem1Height = mainBlocks.elem1.offsetHeight;
  mainBlocks.elem2Height = mainBlocks.elem2.offsetHeight;

  header.breakpoint1 = header.height+100+mainBlocks.elem1Height+50;
  header.breakpoint2 = 100+mainBlocks.elem1Height+100+mainBlocks.elem2Height+50;
  
  window.onscroll = function(){
  	if (window.pageYOffset >header.breakpoint1){
  		header.elem.classList.add("header--fixed");
  		body.style = "padding-top:100px"
  	}
  	else{
  		header.elem.classList.remove("header--fixed");
  		body.removeAttribute("style");
  	}
  	if(window.pageYOffset >header.breakpoint2){
  		header.elem.classList.add("header--absolute");
  		header.elem.style.top =header.breakpoint2+"px";
  		header.elem.classList.remove("header--fixed");
  	}
  	else {
  		if(header.elem.classList.contains("header--absolute")){
  			header.elem.classList.remove("header--absolute")
	  		header.elem.removeAttribute("style");
	  		header.elem.classList.add("header--fixed");
  		}
  		
  	}
  }
 }());