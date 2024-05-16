var URLSite = window.location.href;
var TituloSite = document.title;
function addfav(){
//if (document.all) window.external.AddFavorite(URLSite,TituloSite);
	if (window.sidebar)
        {
          window.sidebar.addPanel(TituloSite, URLSite,"");
        }
    else if( window.external ) { window.external.AddFavorite( URLSite, TituloSite); }
    else if(window.opera && window.print) { return true; }
    else { alert('N�o foi poss�vel adicionar esta p�gina aos favoritos automaticamente.\n'+'Por favor, pressione CTRL + D para adicionar manualmente.'); }
}



function getHTTPObject() {
    var xmlhttp;
    /*@cc_on
    @if (@_jscript_version >= 5)
    try {
    xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
    try {
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    } catch (e) {
    xmlhttp = false;
    }
    }
    @else
    xmlhttp = false;
    @end @*/
    if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
    try {
    xmlhttp = new XMLHttpRequest();
    } catch (e) {
    xmlhttp = false;
    }
    }
    return xmlhttp;
}
var http = getHTTPObject();
function bigthumb(gal,foto) {
  var b="ie";
    if(navigator.appName != "Microsoft Internet Explorer")
    	{
    		b="ff";
    	}
  //document.getElementById("intro").style.display="none";
  http.open("GET", "bigthumb.php?gal="+gal+"&foto="+foto+"&b="+b, true);
  http.onreadystatechange = function(){
	if (http.readyState==4){
	  document.getElementById('big').innerHTML = "<table cellpadding='0' cellspacing='0'><tr><td class='carregar' width='310' valign='top'><div style='width:310px;'>"+http.responseText+"</div></td></tr></table>";
	}
	else{
	  document.getElementById('big').innerHTML = "<table cellpadding='0' cellspacing='0'><tr><td class='carregar' width='310'><div style='width:310px;margin-top:80px;'>A carregar...</div></td></tr></table>";
	}
  }
  http.send(null);
}

var http2 = getHTTPObject();
function dinpopup(s,w,h,l,id) {
  var b="ie";
    if(navigator.appName != "Microsoft Internet Explorer")
    	{
    		b="ff";
    	}
  //document.getElementById("intro").style.display="none";
  http2.open("GET", "dinimg.php?s="+s+"&w="+w+"&h="+h+"&l="+l+"&b="+b+"&lfoto="+id, true);
  http2.onreadystatechange = function(){
	if (http2.readyState==4){
	  document.getElementById('dinimg').innerHTML = "<table cellpadding='0' cellspacing='0' onclick=\"hm('box')\"><tr><td class='carregar' width='450' valign='top'><div style='width:450px;'>"+http2.responseText+"</div></td></tr></table>";
	}
	else{
	  document.getElementById('dinimg').innerHTML = "<table cellpadding='0' cellspacing='0'><tr><td class='carregar' width='450'><div style='width:450px;margin-top:80px;'>A carregar...</div></td></tr></table>";
	}
  }
  http2.send(null);
}

function comprar(campo,frm)
	{
        document.forms[frm].elements[campo].value++;
        //alert(document.forms[frm].elements[campo].value);
        document.forms[frm].submit();
               /*
		valor=parseInt(campo.value);
		if (isNaN(valor)){valor=0};
		campo.value=parseInt(valor);*/
	}

function envia(a)
    {
        document.location=a;
    }

function digito(evt)
	{
         var charCode = (evt.which) ? evt.which : event.keyCode
         if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode!=46)
            return false;

         return true;
	}
function inteiro(campo)
	{
		valor=parseInt(campo.value);
		if (isNaN(valor)){valor=0};
		campo.value=parseInt(valor);
	}
function imagem(largura,altura,img,leg,id){
      
      if(document.getElementById("box"))
        {
              dinpopup(img,largura,altura,leg,id);
              if(leg!=""){altura+=20;}
              var sizesPage = getPageSize();

              var p="px";
              bodyOverlay();
              document.getElementById("box").style.top=posTop()+arrayPageSize[3]/2-altura/2+p;
              document.getElementById("box").style.left=posLeft()+arrayPageSize[2]/2-largura/2+p;
              document.getElementById("box").style.display="block";
        }

    }

var httpobj=new Array(document.images.length);
var tamanho=new Array(document.images.length);
var popups=new Array(document.images.length);
var popupsimgs=new Array(document.images.length);
function tamimg(n,p)
	{ 
	
			httpobj[n]	= getHTTPObject();
		  var b="ie";
			if(navigator.appName != "Microsoft Internet Explorer")
				{
					b="ff";
				}
		  httpobj[n].open("GET", "tamimg.php?i="+p, true);
		  httpobj[n].onreadystatechange = function(){
			if (httpobj[n].readyState==4){
				tamanho[n] = httpobj[n].responseText;
				//alert(tamanho[n]);
				tamanho[n]=tamanho[n].split(",");
				var onC='imagem('+tamanho[n][0]+','+tamanho[n][1]+',"'+popups[n]+'","")';
				
				popupsimgs[n].onclick = new Function(onC);

			}
		  }
		  httpobj[n].send(null);
	}
	
	
function insertIMG() 
{
	
   var arVersion = navigator.appVersion.split("MSIE");
   var version = parseFloat(arVersion[1]);
      for(var i=0; i<document.images.length; i++)
      {
         var img = document.images[i];
         var imgName = img.src.toUpperCase();
		 var imgLastName= imgName.split("/");
         if (imgLastName[imgLastName.length-1].substring(0, 6) == "THUMB_")
         {
		   p=img.src.replace("thumb_","");
		   popups[i]=p;
		   popupsimgs[i]=img;
	   	   tamimg(i,p);	
		   img.setAttribute('className', 'thumbs');
         }
      }
}