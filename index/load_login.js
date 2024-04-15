function setCookieValuelogin(vars){
	document.cookie="code="+vars;
	window.location.href="login.html";   
}
function setCookieValuemodify(vars){
	document.cookie="code="+vars;
	window.location.href="modify.html";
}
function setCookieValueregist(vars){
	document.cookie="code="+vars;
	window.location.href="regist.html";    
}
function setCookieValuemanagement(vars){
	document.cookie="code="+vars;
	window.location.href="management.html";    
}
function setCodeValuelogin(){
	var arrCookie=document.cookie.split("; ");
	//alert(arrCookie); 
	for(var i=0;i<arrCookie.length;i++){ 
		var arr=arrCookie[i].split("="); 
		if(arr[0]=="code"){
			if(arr[1]=="t"){
				zh_tran(arr[1]);
			}
		}
	}
}
function englishrefresh(){
    //parent.frames.topFrame.location.reload();
    //parent.frames.lefgFrame.location.reload();
}
function setEngilshlogin(){
    //window.location.href="bottomFrame_english.html";    
    //window.location.href="topFrame_english.html";
    //window.location.href="login_english.htm";
    //parent.frames.location.href="login_english.htm";
    //self.location.href="login_english.htm";
    //window.alert("OK");
    parent.location.href="login_english.html";
}
function setEngilshmodify(){
    //window.location.href="bottomFrame_english.html";    
    //window.location.href="topFrame_english.html";
    window.location.href="modify_english.html";
    //parent.frames.location.href="modify_english.htm";    
}
function setEngilshregist(){
    //window.location.href="bottomFrame_english.html";    
    //window.location.href="topFrame_english.html";
    window.location.href="regist_english.html";
    //parent.frames.location.href="regist_english.htm";    
}
function setEngilshmanagement(){
    //window.location.href="bottomFrame_english.html";    
    //window.location.href="topFrame_english.html";
    window.location.href="management_english.html";
    //parent.frames.location.href="management_english.htm";    
}
