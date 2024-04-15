var AjaxResult_SUCCESS=0;
var AjaxResult_FAILURE=1;
var DivCloseMode_None =0;
var DivCloseMode_Reload =1;
var DivCloseMode_Alert =2;
var DivCloseMode_TopReload =3;
//关闭等待窗口   
function closediv(CloseMode) {  
    //Close Div    
    document.body.removeChild(document.getElementById("bgDiv"));  
    document.getElementById("msgDiv").removeChild(document.getElementById("msgTitle"));  
    document.body.removeChild(document.getElementById("msgDiv"));
	if(DivCloseMode_Reload == CloseMode)
	{
		location.reload();
	}
	else if (DivCloseMode_TopReload == CloseMode)
	{
		top.location.reload();
	}
}  
//显示等待窗口   
function showdiv(str,CloseMode) {  
    var msgw, msgh, bordercolor;
    var zh_str = zh_Lang_ex();
    if(zh_Lang_now == 't'){
	    var strclose1 ='<br><br><br><input type="button" value="關閉" onClick="closediv('+CloseMode+');" style="border:0;cursor:pointer" >';
	}else{	
	    var strclose1 ='<br><br><br><input type="button" value="关闭" onClick="closediv('+CloseMode+');" style="border:0;cursor:pointer" >';
	}
    msgw = 400; //提示窗口的宽度
    msgh = 100; //提示窗口的高度
    bordercolor = "#336699"; //提示窗口的边框颜色    
    titlecolor = "#99CCFF"; //提示窗口的标题颜色    
  
    var sWidth, sHeight;  
    //sWidth = window.screen.availWidth;  wdl old
    //sHeight = window.screen.availHeight;  wdl old
    sWidth = window.document.body.offsetWidth;  
    sHeight = window.document.body.offsetHeight;  
  
    var bgObj = document.createElement("div");  
    bgObj.setAttribute('id', 'bgDiv');  
    bgObj.style.position = "absolute"; 
	//bgObj.style.position = "relative";  wdl 
    bgObj.style.top = "0";  
    bgObj.style.background = "#777";  
    bgObj.style.filter = "progid:DXImageTransform.Microsoft.Alpha(style=3,opacity=25,finishOpacity=75";  
    bgObj.style.opacity = "0.6";  
    bgObj.style.left = "0";  
    bgObj.style.width = sWidth + "px";  
    bgObj.style.height = sHeight + "px";  
    document.body.appendChild(bgObj);  
    var msgObj = document.createElement("div")  
    msgObj.setAttribute("id", "msgDiv");  
    msgObj.setAttribute("align", "center");  
    msgObj.style.position = "absolute";
	//msgObj.style.position = "relative";    wdl
    msgObj.style.background = "white";  
    msgObj.style.font = "12px/1.6em Verdana, Geneva, Arial, Helvetica, sans-serif";  
    msgObj.style.border = "1px solid " + bordercolor;  
    msgObj.style.width = msgw + "px";  
    msgObj.style.height = msgh + "px";  
    msgObj.style.top = (document.documentElement.scrollTop + (sHeight - msgh) / 2) + "px";  
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

	document.body.appendChild(msgObj);  
    document.getElementById("msgDiv").appendChild(title);  
    var txt = document.createElement("p");  
    txt.style.margin = "1em 0"  
    txt.setAttribute("id", "msgTxt");  

	if(DivCloseMode_None == CloseMode)
	{
		txt.innerHTML =str;	
	}
	else if((DivCloseMode_Reload == CloseMode)
			||(DivCloseMode_Alert == CloseMode)
			||(DivCloseMode_TopReload == CloseMode))
	{
		txt.innerHTML =(str+strclose1);	
	}
	else
	{
		var zh_str = zh_Lang_ex();  
    	if(zh_Lang_now == 't'){
    	    txt.innerHTML ="錯誤碼:"+CloseMode;	
    	}else{	
    	    txt.innerHTML ="错误码:"+CloseMode;	
    	}		
	}	
    //txt.innerHTML = str;   //old
    document.getElementById("msgDiv").appendChild(txt);  
}  
//更新窗口消息
function updatedivmsg(str,CloseMode) 
{ 
	var txt =document.getElementById("msgTxt");
//	var str1 =str+"<br><br><br><label> <a href=\"javascript:closediv();\">关闭</label></a>"	
//	var str1 =str+"<br><br><br><label onclick =\"closediv();\"> 关闭</label>";
//	var str1 =str+"<br><br><br><input type=\"button\" value=\"关闭\" onClick=\"closediv();\" style=\"border:0;cursor:pointer\" >";	    
	var zh_str = zh_Lang_ex();  
	if(zh_Lang_now == 't'){
	    var strclose1 ='<br><br><br><input type="button" value="關閉" onClick="closediv('+CloseMode+');" style="border:0;cursor:pointer" >';
	}else{	
	    var strclose1 ='<br><br><br><input type="button" value="关闭" onClick="closediv('+CloseMode+');" style="border:0;cursor:pointer" >';
	}
	
	if(txt)
	{
		//txt.innerHTML =str;
		if(DivCloseMode_None == CloseMode)
		{
			txt.innerHTML =str;	
		}
		else if((DivCloseMode_Reload == CloseMode)
			||(DivCloseMode_Alert == CloseMode)
			||(DivCloseMode_TopReload == CloseMode))
		{
			txt.innerHTML =(str+strclose1);	
		}
		else
		{
			//txt.innerHTML ="ERROR CloseMode:"+CloseMode;
    		var zh_str = zh_Lang_ex();  
        	if(zh_Lang_now == 't'){
        	    txt.innerHTML ="錯誤碼:"+CloseMode;	
        	}else{	
        	    txt.innerHTML ="错误码:"+CloseMode;	
        	}
		}
	}
    /*	
    var title = document.getElementById("msgTitle");
	title.style.cursor = "pointer";   
    title.innerHTML = "关闭";   
    title.onclick = closediv;   	
    */
}
function createXHR()
{
    var request = false;
    try 
	{
        request = new XMLHttpRequest();//最重要的对象.
    } 
	catch (trymicrosoft) 
	{
        try {
            request = new ActiveXObject("Msxml2.XMLHTTP");
			} 
		catch (othermicrosoft) 
			{
            try 
			{
                request = new ActiveXObject("Microsoft.XMLHTTP");
            } 
			catch (failed) 
			{
                request = false;
            }
        }
    }

    if (!request)
	{
        alert("Error initializing XMLHttpRequest!");
	}
	return request;
}

function WebPostProcess(SrvProcess,Param,CallBack)
{
    var xhr = createXHR();
	var rsp_txt;
    xhr.onreadystatechange = function () 
	{
//		document.getElementById('out').innerHTML =xhr.readyState;
		if (xhr.readyState == 4) 
		{
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) 
			{
				if(null!=CallBack)
				{
					CallBack(AjaxResult_SUCCESS,xhr.responseText);
					return;
				}
				rsp_txt = xhr.responseText;
				allmsg=rsp_txt.split('*');
				if((allmsg[0] == "OK")||(allmsg[0] == "success"))
				{
					updatedivmsg("更新成功!",DivCloseMode_Reload);
//					alert("更新成功!");					
//					location.reload();
				}
				else
				{
    				var zh_str = zh_Lang_ex();  
                	if(zh_Lang_now == 't'){
                	    updatedivmsg("更新失敗!",DivCloseMode_Reload);
                	}else{	
                	    updatedivmsg("更新失败!",DivCloseMode_Reload);
                	}
				}
            }
            else 
			{
				if(null!=CallBack)
				{
					//CallBack(AjaxResult_FAILURE,"Request was unsuccessful:" + xhr.status);
					return;
				}			    
                updatedivmsg("更新成功!",DivCloseMode_Reload);
			    /*
			    var zh_str = zh_Lang_ex();
            	if(zh_Lang_now == 't'){
            	    updatedivmsg("更新失敗!"+"請求失敗:" + xhr.status,DivCloseMode_Reload);
            	}else{	
            	    updatedivmsg("更新失败!"+"请求失败:" + xhr.status,DivCloseMode_Reload);
            	}
            	*/
//				updatedivmsg("更新失败!"+"Request was unsuccessful:" + xhr.status,DivCloseMode_Reload);				
//              alert("Request was unsuccessful:" + xhr.status);
//				document.getElementById('out').innerHTML ="Request was unsuccessful:" + xhr.status;
//				alert("更新失败!");
//				location.reload();
            }
        }
    };
//必须在调用open()之前指定onreadystatechange事件处理程序,才能确保跨浏览器兼容性.
//  xhr.send(null);
	xhr.open("POST", SrvProcess, true);
    xhr.send(Param);
}

//屏蔽F5   
document.onkeydown = mykeydown;  
function mykeydown() 
{  
    if (event.keyCode == 116) //屏蔽F5刷新键      
    {  
        window.event.keyCode = 0;  
        return false;  
    }  
}   

