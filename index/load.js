function setCookieValue(vars){
	document.cookie="code="+vars;
	parent.frames.location.href="index.htm";
    parent.frames.topFrame.location.reload();
    parent.frames.lefgFrame.location.reload();
    //parent.frames.mainFrame.location.reload();
}
function setCodeValue(){
	var arrCookie=document.cookie.split(";");
	//alert("arrCookie=|"+arrCookie+"|");
	for(var i=0;i<arrCookie.length;i++){ 
		var arr=arrCookie[i].split("code=");
		//alert("arr=|"+arr+"|");
		if("t" == arr[1]){
		    //alert("OK");
			zh_tran("t");
		}
		/*
		if((arr[0]=="code")){
			if(arr[1]=="t"){
			    alert("OK");
				zh_tran(arr[1]);
			}
		}
		*/
	}

}
function englishrefresh(){
    //parent.frames.topFrame.location.reload();
    //parent.frames.lefgFrame.location.reload();
    //setCookie('zh_choose', 'e', zh_expires);
}
function setEngilsh(){
    //window.location.href="bottomFrame_english.html";    
    //window.location.href="topFrame_english.html";
    //window.location.href="index_english.htm";
    //setCookie('zh_choose', 'e', zh_expires);
    parent.frames.location.href="index_english.htm";
    
}

