var NotifyWindow = {
set: function() {
var set =this.minbtn.status == 1?[0,1,'block',this.char[0],'minimize']:[1,0,'none',this.char[1],'expand'];
this.minbtn.status=set[0];
this.win.style.borderBottomWidth=set[1];
this.content.style.display =set[2];
this.minbtn.innerHTML =set[3]
this.minbtn.title = set[4];
this.win.style.top = this.getY().top;
},
close: function() {
this.win.style.display = 'none';
window.onscroll = null;
send_new_sms();
},
setOpacity: function(x) {
var v = x >= 100 ? '': 'Alpha(opacity=' + x + ')';
this.win.style.visibility = x<=0?'hidden':'visible';
this.win.style.filter = v;
this.win.style.opacity = x / 100;
},
show: function() {
clearInterval(this.timer2);
var me = this,fx = this.fx(0, 100, 0.1),t = 0;
this.timer2 = setInterval(function() {
t = fx();
me.setOpacity(t[0]);
if (t[1] == 0) {clearInterval(me.timer2) }
},10);
},
fx: function(a, b, c) {
var cMath = Math[(a - b) > 0 ? "floor": "ceil"],c = c || 0.1;
return function() {return [a += cMath((b - a) * c), a - b]}
},
getY: function() {
var d = document,b = document.body, e = document.documentElement;
var s = Math.max(b.scrollTop, e.scrollTop);
var h = /BackCompat/i.test(document.compatMode)?b.clientHeight:e.clientHeight;
var h2 = this.win.offsetHeight;
return {foot: s + h + h2 + 2+'px',top: s + h - h2 - 2+'px'}
},
moveTo: function(y) {
clearInterval(this.timer);
var me = this,a = parseInt(this.win.style.top)||0;
var fx = this.fx(a, parseInt(y));
var t = 0 ;
this.timer = setInterval(function() {
t = fx();
me.win.style.top = t[0]+'px';
if (t[1] == 0) {
clearInterval(me.timer);
me.bind();
}
},10);
},
bind:function (){
var me=this,st,rt;
window.onscroll = function() {
clearTimeout(st);
clearTimeout(me.timer2);
me.setOpacity(0);
st = setTimeout(function() {
me.win.style.top = me.getY().top;
me.show();
},600);
};
window.onresize = function (){
clearTimeout(rt);
rt = setTimeout(function() {me.win.style.top = me.getY().top},100);
}
},
init: function(autoHideMillis) {
function $(id) {return document.getElementById(id)};
this.win=$('msg_win');
var set={minbtn: 'msg_min',closebtn: 'msg_close',title: 'msg_title',content: 'msg_content'};
for (var Id in set) {this[Id] = $(set[Id])};
var me = this;
//this.minbtn.onclick = function() {me.set();this.blur()};
this.closebtn.onclick = function() {me.close()};
this.char=navigator.userAgent.toLowerCase().indexOf('firefox')+1?['_','::','×']:['0','2','×'];
//this.minbtn.innerHTML=this.char[0];
this.closebtn.innerHTML="";
setTimeout(function() {
me.win.style.display = 'block';
me.win.style.top = me.getY().foot;
me.moveTo(me.getY().top);
},0);
if (this.timer3 != null && this.timer3 != undefined) {
clearTimeout(this.timer3);
}
if (autoHideMillis > 0) {
this.timer3 = setTimeout(function() {
me.win.style.display = 'none';
window.onscroll = null;
send_new_sms();
}, autoHideMillis);
}
return this;
}
};

function uiShowNotification(strTitle, strMessage, autoHideSeconds)
{
var objTitle = document.getElementById("msg_title");
	var objMessage = document.getElementById("msg_content");
	if (objTitle == null || objTitle == undefined || 
		objMessage == null || objMessage == undefined)
	{
		return false;
	}
	
	objTitle.innerHTML = strTitle;
	objMessage.innerHTML = strMessage;
	
	NotifyWindow.init(autoHideSeconds * 1000);
}

//************************************ 		等待（进度）窗口		************************************
//显示等待窗口  
function showWaitDlg(caption, msg, callback)
{
	var msgw, msgh, bordercolor;  
	msgw = 300;
	msgh = 75;
	bordercolor = "#336699";
	titlecolor = "#99CCFF";

	var sWidth, sHeight;  
	sWidth = document.body.clientWidth;
	sHeight = document.body.clientHeight;
	
	var msgTop = document.body.scrollTop || document.documentElement.scrollTop;

	var bgObj = document.createElement("div");  
	bgObj.setAttribute('id', 'bgDiv');  
	bgObj.style.position = "absolute";  
	bgObj.style.top = msgTop;
	bgObj.style.background = "#777";  
	bgObj.style.filter = "progid:DXImageTransform.Microsoft.Alpha(style=3,opacity=50,finishOpacity=50";  
	bgObj.style.opacity = "0.6";  
	bgObj.style.left = "0";  
	bgObj.style.width = sWidth + "px";  
	bgObj.style.height = sHeight + "px";  
	document.body.appendChild(bgObj);  

	var msgObj = document.createElement("div")  
	msgObj.setAttribute("id", "msgDiv");  
	msgObj.setAttribute("align", "center");  
	msgObj.style.position = "absolute";  
	msgObj.style.background = "white";  
	msgObj.style.font = "12px/1.6em Verdana, Geneva, Arial, Helvetica, sans-serif";  
	msgObj.style.border = "1px solid " + bordercolor;  
	msgObj.style.width = msgw + "px";  
	msgObj.style.height = msgh + "px";  
	msgObj.style.top = (msgTop + (sHeight - msgh) / 2) + "px";  
	msgObj.style.left = (sWidth - msgw) / 2 + "px";  

	var title = document.createElement("h4");  
	title.setAttribute("id", "msgTitle");  
	title.setAttribute("align", "right");  
	title.style.margin = "0";  
	title.style.padding = "3px";  
	title.style.background = bordercolor;  
	title.style.filter = "progid:DXImageTransform.Microsoft.Alpha(startX=20, startY=20, finishX=100, finishY=100,style=1,opacity=75,finishOpacity=100);";  
	title.style.opacity = "0.75";  
	title.style.border = "1px solid " + bordercolor;  
	title.style.height = "18px";  
	title.style.font = "12px Verdana, Geneva, Arial, Helvetica, sans-serif";  
	title.style.color = "white";  
	title.style.cursor = "pointer";
	title.innerHTML = caption;
	title.onclick = callback; 
 
	document.body.appendChild(msgObj);  
	document.getElementById("msgDiv").appendChild(title);  

	var txt = document.createElement("p");
	txt.style.margin = "12px" 
	txt.setAttribute("id", "msgTxt");
	txt.innerHTML = msg;  
	document.getElementById("msgDiv").appendChild(txt);
	
	document.body.onmousewheel = function(){return false;}
	document.body.onkeydown = function(){return false;}
	document.body.onkeypress = function(){return false;}
}

// 更改等待窗口文字
function changeWaitDlgMsg(msg)
{
	var txt = document.getElementById("msgTxt");
	if (txt)
	{
		txt.innerHTML = msg;
	}
}

//关闭等待窗口  
function closeWaitDlg()
{
	document.body.removeChild(document.getElementById("bgDiv"));
	document.getElementById("msgDiv").removeChild(document.getElementById("msgTitle"));
	document.body.removeChild(document.getElementById("msgDiv"));
	document.body.onmousewheel = function(){return true;}
	document.body.onkeydown = function(){return true;}
	document.body.onkeypress = function(){return true;}
}

function  send_new_sms()
{
var param = "";

	$.ajax({
type: "POST",

		url: "/boafrm/formsms_set_sms_new_flag",
		cache: false,
    data:param,

		success: function(result) {
			if (result != null && result.length !== 0)
			{
      // result_fun();
 //document.body.innerHTML=result;
			}
		},
		  
		complete: function(xmlHttpHeader, textStatus) {
			xmlHttpHeader = null;
		  	

		}
	});
}