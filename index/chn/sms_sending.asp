<META HTTP-EQUIV="Pragma" CONTENT="no-cache">
<META HTTP-EQUIV="Expires" CONTENT="-1">
<META HTTP-EQUIV="Cache-Control"  CONTENT="no-cache"> 
<META http-equiv="Content-Type" content="text/html; charset=utf-8">
<META http-equiv="X-UA-Compatible" content="IE=EmulateIE8" />
<!--link rel="stylesheet" href="style/normal_ws.css" type="text/css"-->
<!--link rel="stylesheet" href="p/css/iframe.css" type="text/css"-->
<style type="text/css">
textarea{
resize:none;
font-family: 微软雅黑;
}
body{
overflow:hidden;
}
#send_result_form_title{
font-family: 微软雅黑;
}
</style>

<script type="text/javascript" src="../res/sms_1860.js" charset="gb2312"></script>
<script type="text/javascript" src="../res/jquery.js"></script>
<script type="text/javascript" src="../res/sychip.js"></script>
<script language="JavaScript" type="text/javascript">
var debug=0;



var time=null;
var time_p=null;
function checksmssendresult_pre()
{
var parm1="sms_send_rsult.asp";//1:1:3;;;;;;;;;;;;;;;;;;;;  
//2:1:3;2:2:3;;;;;;;;;;;;;;;;;;;
	$.ajax({
		url: parm1,
		cache: false,

		success: function(result) {
		 	if (result.length !== 0)
			{
           var allmsg = result.replace(/\s/gm, "");
					//_checksmssendresult(result);
          if(allmsg==parent.all_number_count)
          {
            	clearTimeout(time_p);
            	time_p = null;

            	setTimeout(function() {
			            checksmssendresult();
		           }, 1000);
          }
					if (debug==1)
			    {
				       window.console.log( result);
			   }

			}
		},
		 
		complete: function(xmlHttpHeader, textStatus) {
		 	xmlHttpHeader = null;
		}
	});
	
	 time_p=setTimeout("checksmssendresult_pre()",3000);

}

function checksmssendresult()
{
var parm1="sms_send_rsult_all.asp";//1:1:3;;;;;;;;;;;;;;;;;;;;  
//2:1:3;2:2:3;;;;;;;;;;;;;;;;;;;
	$.ajax({
		url: parm1,
		cache: false,

		success: function(result) {
		 	if (result.length !== 0)
			{
           //var allmsg = result.replace(/\s/gm, "").split(';');
					_checksmssendresult(result);
					if (debug==1)
			    {
				       window.console.log( result);
			   }

			}
		},
		 
		complete: function(xmlHttpHeader, textStatus) {
		 	xmlHttpHeader = null;
		}
	});
	
	// time=setTimeout("checksmssendresult()",3000);

}
function _checksmssendresult(result)
{
	
	if(parent.send_click_flag==1)
	{
	if(parent.all_number_count==1)
	{
		if(debug==1)
		{
       window.console.log( "parent.all_number_count:"+parent.all_number_count+"|parent.all_number"+parent.all_number);
     }
}else if(parent.all_number_count>1)
	{
		if(debug==1)
		{
		window.console.log( "parent.all_number_count:"+parent.all_number_count+"|parent.all_number[0]");
	  }
	}
    if(result==null||result.length==0)
    {
          if (debug==1)
			    {
				       window.console.log( "result!=null&&result.length!=0");
			    }

          return;
    }else
    {
          result = result.replace(/\s/gm, "").split(';');
          if (debug==1)
			    {
				       window.console.log( "result.length:"+result.length);
			    }          

    }
	var t=0;
	var count=0;
	for(;t<result.length;t++)
	{
		
		if(result[t]!=null&&result[t].length>2)
		{
			count++;
			
		}

		
	}
	
			if(parent.all_number_count==count&&parent.send_click_flag==1&&count!=0)
		{
			if (debug==1)
			{
				window.console.log( "result already received.parent.all_number_count:"+parent.all_number_count+"count:"+count);
			}
			//share.data("sms_sending","nosending");
			//share.data("gServerMode", "");
			change_send_result_form_title("短信发送已完成。");
			clearTimeout(time);
			
		}
	var tmptext="";
	for(t=0;t<count;t++)
	{
		
    var allmsg = result[t].replace(/\s/gm, "").split(':');
    if(allmsg[1]==0)
    {
    	if(parent.all_number_count>1)
    	{
       tmptext+="发给号码"+allmsg[0]+"的短信发送成功;";
      }else if(parent.all_number_count==1)
      	{
      		 tmptext+="发给号码"+parent.all_number+"的短信发送成功;";
      		
      	}

    
    }else if(allmsg[1]==4)
	  {
		   if(parent.all_number_count>1)
		   {
		   tmptext+="发给号码"+allmsg[0]+"的短信发送失败;";
		  }else if(parent.all_number_count==1)
		  	{
		  		
		  		tmptext+="发给号码"+parent.all_number+"的短信发送失败;";
		  	}

	  }	
	}
          if (debug==1)
			    {
				       window.console.log( "parent.all_number_count"+parent.all_number_count+"all_number_count:"+parent.dest_phonenumbertem+"|count:"+count);
			    }   	
	if(parent.all_number_count==count)
	{
		if(parent.send_click_flag==1&&count!=0)
		{
	   document.all.send_result_form_close.style.display="block";
	   document.all.send_result_form_msg.style.display="block";
	   
	   var k=parseInt(String(tmptext).length);
	   var Inputs=String(tmptext);
	   if(Inputs.split("")[k-1].charCodeAt(0)==59)
     {
				tmptext=Inputs.substring(0,(k-1)).toString();
				tmptext=tmptext+"。";	
     }
     document.all.send_result_form_msg.value =tmptext;
    }
  }
  
}

}
function change_send_result_form_title(text)
{
	document.getElementById("send_result_form_title").innerHTML = text;
	
}
function init()
{
//checksmssendresult();

document.getElementById("send_result_form_msg").setAttribute("readOnly", true);

}

function h_close()
{
//console.warn("close");
smsHideModalDialog();


}
function del_time()
{
	clearTimeout(time);
}
</script>

<body onload="init()">
<form name="send_result_form" id="send_result_form">
<div class="wrap"> 
<div style="text-align:center">
<table style="margin:auto;width:80%">
<tr><div id="send_result_form_title" align="center">短信正在发送，请稍候...</div></tr>
</table>
</div>
<textarea style="position: absolute; left: 10%; width:328;display:none " name="send_result_form_msg" id="send_result_form_msg" cols="3" rows="5" ></textarea>
<input style="position: absolute; left: 45%; top:80%;display:none" type="button" class="ie6button" name="send_result_form_close" id="send_result_form_close"  value="关闭" onClick="h_close()" />
</form>
</body>