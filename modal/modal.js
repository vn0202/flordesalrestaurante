function posLeft() {return typeof window.pageXOffset != 'undefined' ? window.pageXOffset:document.documentElement && document.documentElement.scrollLeft? document.documentElement.scrollLeft:document.body.scrollLeft? document.body.scrollLeft:0;}
function posTop() {return typeof window.pageYOffset != 'undefined' ? window.pageYOffset:document.documentElement && document.documentElement.scrollTop? document.documentElement.scrollTop: document.body.scrollTop?document.body.scrollTop:0;}

function getPageSize(){
	
	var xScroll, yScroll;
	if (window.innerHeight && window.scrollMaxY) {
		xScroll = document.body.scrollWidth;
		yScroll = window.innerHeight + window.scrollMaxY;
	} else if (document.body.scrollHeight > document.body.offsetHeight){ // all but Explorer Mac
		xScroll = document.body.scrollWidth;
		yScroll = document.body.scrollHeight;
	} else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
		xScroll = document.body.offsetWidth;
		yScroll = document.body.offsetHeight;
	}
	var windowWidth, windowHeight;
	if (self.innerHeight) {	// all except Explorer
		windowWidth = self.innerWidth;
		windowHeight = self.innerHeight;
	} else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
		windowWidth = document.documentElement.clientWidth;
		windowHeight = document.documentElement.clientHeight;
	} else if (document.body) { // other Explorers
		windowWidth = document.body.clientWidth;
		windowHeight = document.body.clientHeight;
	}
	// for small pages with total height less then height of the viewport
	if(yScroll < windowHeight){
		pageHeight = windowHeight;
	} else {
		pageHeight = yScroll;
	}

	// for small pages with total width less then width of the viewport
	if(xScroll < windowWidth){
		pageWidth = windowWidth;
	} else {
		pageWidth = xScroll;
	}
	arrayPageSize = new Array(pageWidth,pageHeight,windowWidth,windowHeight)
}

var timer;

function bodyOverlay() {
	  var objBody = document.getElementsByTagName('body').item(0);
	  var sizesPage = getPageSize();
	  var bodyOverlay = document.createElement("div");
	  bodyOverlay.setAttribute('id','bodyOverlay');
	  bodyOverlay.style.height = arrayPageSize[1] + 'px'; // fundo com o tamanho total da p�gina.
	  if (!document.getElementById('bodyOverlay')) {
		    objBody.insertBefore(bodyOverlay, objBody.firstChild);
	  }
}

function hm(obj) {
    document.getElementById(obj).style.display="none";
	  var bodyOverlay = document.getElementById('bodyOverlay');
	  if (bodyOverlay) {
		    bodyOverlay.parentNode.removeChild(bodyOverlay);
	  }
  }