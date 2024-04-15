var splitS0="[;]";
var splitS1="[,]";

Array.prototype.remove=function(dx)
  {
      if(isNaN(dx)||dx>this.length){return false;}
          for(var i=0,n=0;i<this.length;i++)
          {
              if(this[i]!=this[dx])
              {
                  this[n++]=this[i]
              }
          }
      this.length-=1
  }
  
function style_display_on()
{
	
	if (window.ActiveXObject) { // IE
		return "block";
	}
	else if (window.XMLHttpRequest) { // Mozilla, Safari,...
		return "table-row";
	}
}

function disableTextField (field)
{
  if(document.all || document.getElementById)
    field.disabled = true;
  else {
    field.oldOnFocus = field.onfocus;
    field.onfocus = skip;
  }
}

function enableTextField (field)
{
  if(document.all || document.getElementById)
    field.disabled = false;
  else {
    field.onfocus = field.oldOnFocus;
  }
}

function isdigit(I,M)
{        
		if(!isdigit(I.value)){
			alert(' 存在非法字符, 只能输入 [ 0 - 9 ]');
//			alert(M + errmsg.err28);
			I.value = I.defaultValue;	
			return false;
		}
	return true;
}
function isdigit(str)
{
	for(j=0 ; j<str.length; j++){
		ch = str.charAt(j);
		if(ch < '0' || ch > '9'){
//			alert(str +' have illegal characters, must be [ 0 - 9 ]');
			return false;
		}
	}
	return true;
}

function valid_range(I,start,end,M)
{
	return __valid_range(I, start, end, M, false);
}

function valid_range_silent(I,start,end)
{
	return __valid_range(I, start, end, "", true);
}

function __valid_range(I, start, end, M, silent)
{
	M1 = unescape(M);
	if(!isdigit(I.value))
	{
		if (!silent) alert("存在非法字符, 只能输入 [ 0 - 9 ]");
		I.value = I.defaultValue;
		I.focus();
		return false;
	}
	d = parseInt(I.value, 10);
	if ( !(d<=end && d>=start) )
	{		
		if (!silent) alert(M1 + '['+ start + ' - ' + end +']');
		I.value = I.defaultValue;
		I.focus();
		return false;
	}
	return true;
}

function valid_ip(F,M)
{
	return __valid_ip(F, M, false);
}

function valid_ip_silent(F)
{
	return __valid_ip(F, "", true);
}

function __valid_ip(F,M, silent)
{
	var m ;
	m=F.value.split(".");
	if(m.length!=4)
	{
		if (!silent) alert('输入非法，请重新输入!');
		F.value=F.defaultValue;
		F.focus();
		return false;
	}
	
	if (m[0]==0&&m[1]==0&&m[2]==0&&m[3]==0 )
	{
		if (!silent) alert('不能设置为 0.0.0.0!');
		F.value=F.defaultValue;
		F.focus();
		return false;
	}
	
	for(i=0;i<4;i++)
	{
		if (m[i].length > 3)
		{
			if (!silent) alert('输入非法，请重新输入!');
			F.value=F.defaultValue;
			F.focus();
			return false;
		}
		if(!isdigit(m[i]))
		{
			if (!silent) alert('输入非法, 请重新输入!');
			F.value=F.defaultValue;
        		F.focus();
			return false;
		}
		d = parseInt(m[i], 10);	
		if(d<0||d>255)
		{
			if (!silent) alert('输入非法，请重新输入!');
			F.value=F.defaultValue;
        		F.focus();
			return false;
		}
	}
	
	return true;
}

var delayAlertTimer = null;
function deferredAlert(strAlert, millis)
{
	if (delayAlertTimer == null)
	{
		delayAlertTimer = setTimeout("alert('" + strAlert + "');delayAlertTimer = null;", millis);
	}
}

function checkDate(o){ 
	var a=/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})/ 
	if (!a.test(o.value)){ 
		alert("无效的日期格式!");
		o.focus();
		return false ;
	} 
	else{}
		
	var t=o.value;
  dataString=t.split("-");

  if(!(2000<=dataString[0]&&dataString[0]<=2100))
  {
  	
  	alert("年份不在有效范围内，年份的有效范围为2000~2100，请重新输入！");
		o.focus();
		return false ;
  	
  } 
	return true ;
} 

function checkreboot(str)
{
    if(confirm(str))
    {
       return true;
    }
    else
    {
        return false;
    }
}

function checkIsNull(o,message){
	if (o.value == "")
	{
		alert(message);
		o.focus();
		return false;
	}else{
		return true;
	}
}

function checkMinLength(o,minLength,message){
	if (o.value.length < minLength )
	{
		alert(message);
		o.focus();
		return false;
	}else{
		return true;
	}
}

function checkMaxLength(o,minLength,message){
	if (o.value.length > minLength )
	{
		alert(message);
		o.focus();
		return false;
	}else{
		return true;
	}
}

function checkLength(o,length,message){
	if (o.value.length != length )
	{
		alert(message);
		o.focus();
		return false;
	}else{
		return true;
	}
}
var ASCIIStrValid = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz' + '0123456789' +  '!$()-.%.:<=>?@[]^_{|}~' + "\'";
function checkASC(keyval,place)
{
         var j, k, flag;
         for ( k=0; k<keyval.value.length; k++ ){                  
                   for(j=0;j<ASCIIStrValid.length;j++){
                            flag = false;
                            if(keyval.value.charAt(k) ==  ASCIIStrValid.charAt(j)){
                                     flag = true;
                                     break;
                            }
                   }
                   if(flag == false){
                       alert("存在非法字符,请重新输入!");                            
                            keyval.value=keyval.defaultValue;
                            keyval.focus();
                            return false;
                   }
         }
         return true;
}


function checkStaticip(keyval,place)
{
         var j, k, flag;
         for ( k=0; k<keyval.value.length; k++ ){                  
                   for(j=0;j<ASCIIStrValid.length;j++){
                            flag = false;
                            if(keyval.value.charAt(k) ==  ASCIIStrValid.charAt(j)){
                                     flag = true;
                                     break;
                            }
                   }
                   if(flag == false){
                       alert("存在非法字符,请重新输入!");                            
                            keyval.value=keyval.defaultValue;
                            keyval.focus();
                            return false;
                   }
         }
         return true;
}

var ASCIIStrValid2 = 'ABCDEF' + 'abcdef' + '0123456789';
function checkHex(keyval,place)
{
         var j, k, flag;
         for ( k=0; k<keyval.value.length; k++ ){                  
                   for(j=0;j<ASCIIStrValid2.length;j++){
                            flag = false;
                            if(keyval.value.charAt(k) ==  ASCIIStrValid2.charAt(j)){
                                     flag = true;
                                     break;
                            }
                   }
                   if(flag == false){
                       alert("存在非法字符,请重新输入!");                            
                            keyval.value=keyval.defaultValue;
                            keyval.focus();
                            return false;
                   }
         }
         return true;
}

<!--
//
// patch of innerText for firefox
//
(function (bool) {
    function setInnerText(o, s) {
        while (o.childNodes.length != 0) {
            o.removeChild(o.childNodes[0]);
        }

        o.appendChild(document.createTextNode(s));
    }

    function getInnerText(o) {
        var sRet = "";

        for (var i = 0; i < o.childNodes.length; i ++) {
            if (o.childNodes[i].childNodes.length != 0) {
                sRet += getInnerText(o.childNodes[i]);
            }

            if (o.childNodes[i].nodeValue) {
                if (o.currentStyle.display == "block") {
                    sRet += o.childNodes[i].nodeValue + "\n";
                } else {
                    sRet += o.childNodes[i].nodeValue;
                }
            }
        }

        return sRet;
    }

    if (bool) {
        HTMLElement.prototype.__defineGetter__("currentStyle", function () {
            return this.ownerDocument.defaultView.getComputedStyle(this, null);
        });

        HTMLElement.prototype.__defineGetter__("innerText", function () {
            return getInnerText(this);
        })

        HTMLElement.prototype.__defineSetter__("innerText", function(s) {
            setInnerText(this, s);
        })
    }
})(/Firefox/.test(window.navigator.userAgent));
//-->


var share = { 
data: function (name, value) { 
var top = window.top, 
cache = top['_CACHE'] || {}; 
top['_CACHE'] = cache; 
return (value != undefined) ? cache[name] = value : cache[name]; 
}, 
remove: function (name) { 
var cache = window.top['_CACHE']; 
if (cache && cache[name]) delete cache[name]; 
} 
};

function initFormSubmitIframe(iframeName, onSubmitted)
{
	var iframe = document.getElementById(iframeName);
	if (iframe == null || iframe == undefined)
		return;

	if (iframe.attachEvent)
	{
		iframe.attachEvent("onload", onSubmitted);
	}
	else
	{
		iframe.onload = onSubmitted;
	}
}

var timerArray = null;

function Timer(_PROC_NAME, _TIMER_ID)
{
	this._PROC_NAME = _PROC_NAME;
	this._TIMER_ID = _TIMER_ID;
}

function deferredTimerCall(funcStr, delayMillis)
{
	try {
		if (timerArray == null)
			timerArray = new Array();
		
		for (i = 0; i < timerArray.length; i++)
		{
			if (timerArray[i]._PROC_NAME == funcStr)
			{
				clearTimeout(timerArray[i]._TIMER_ID);
				timerArray[i]._PROC_NAME = funcStr;
				timerArray[i]._TIMER_ID = setTimeout(funcStr, delayMillis);
				return;
			}
		}
		
		timerArray[i] = new Timer(funcStr, setTimeout(funcStr, delayMillis));
	} catch (e) {
		alert("deferredTimerCall出错：\r\n" + e.description);
	}
}

// Retrieve param from url
Request = {
	QueryString : function(item) {
		var svalue = location.search.match(new RegExp("[\?\&]" + item + "=([^\&]*)(\&?)", "i"));
		return svalue ? svalue[1] : svalue;
	}
}
