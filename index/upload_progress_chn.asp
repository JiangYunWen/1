<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"> 
<html xmlns="http://www.w3.org/1999/xhtml"> 
<head> 
<title>Upload</title>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<style>
*{
	margin:0;
	padding:0;
}
body{font-size:12px;}h1{font-size:15px;}
.wrap{
	font-size: 12px;
	margin:40px auto;
	width:400px;
}
.progressbar {
	background-color:#eee;
	color:#222;
	height:16px;
	border:1px solid #bbb;
	text-align:center;
	position:relative;
}
.progressbar .bar {
	background-color:#6CAF00;
	height:16px;
	width:0;
	position:absolute;
	left:0;
	top:0;
	z-index:10;
}
.progressbar .text {
	font-size:12px;
	height:16px;
	position:absolute;
	left:0;
	top:0;
	width:100%;
	line-height:16px;
	z-index:100;
}

</style>

<script type="text/javascript" src="../res/sychip.js" charset="utf-8"></script>
<script type="text/javascript" src="../res/jquery.js"></script>
<script type="text/javascript" language="javascript">

var argType = "progress";

var Color = {
	RED:			"#FF0B34",
	GREEN:		"#2F912F",
	YELLOW:	"#FF8007",
	BLACK:		"#000000"
};

function changeTitle(text, color)
{
	var upload_title = document.getElementById("upload_title");
	if (upload_title != null)
	{
		upload_title.innerHTML = text;
		upload_title.style.color = color;
	}
}

function changeProgress(percentage)
{
	var upload_text = document.getElementById("upload_text");
	var upload_bar = document.getElementById("upload_bar");

	if(typeof(percentage) != 'undefined')
	{
		if (upload_text && upload_bar)
		{
			upload_text.innerHTML = percentage + "%";
			upload_bar.style.width = percentage + "%";
		}
	}else
	{
		if (upload_text && upload_bar)
		{
			upload_text.innerHTML = '0' + "%";
			upload_bar.style.width = '0' + "%";
		}
	
	}
}
var comp=0;
function update_progress()
{
	$.ajax({
		url: "../lcufd.asp",
		cache: false,
		timeout: 4000,

		success: function(result) {
			if (result != null && result.length !== 0)
			{
				var allmsg = result.replace(/\s/gm, "").replace(/\r\n/gm, "").split(',');
				if (allmsg != null)
				{
					var header_count = parseInt(allmsg[0]);
          var count = parseInt(allmsg[1]);

if(count>0)
{
      //var percentage=(count/header_count/1.).toFixed(0)*10;
        var percentage=((count/header_count)*100).toFixed(0);
          //console.warn( allmsg[0]+"    " +allmsg[1]+"   "+percentage);



}else
{
percentage=100;

if(comp==0)
{
comp=1;
		//changeTitle("文件校验成功！", Color.GREEN);
changeTitle("上传完成...",  Color.GREEN);
		  setTimeout(function() {
			if (window.confirm("升级文件上传成功，是否重启完成升级?\n重启期间浏览器将自动关闭，重启时间大约需要几分钟，请勿断电","提示"))
			{

	      	deferredTimerCall("check_file();", 500);
	changeTitle("上传完成...", Color.BLACK);

      }
			else
      {
				hideDialog();
      }
		}, 50);
}
}


					if (!isNaN(percentage))
					{
						share.data("gUploadPercentage", percentage);
						changeProgress(percentage);
					}
				}
			}
		},

		error: function(jqXHR, textStatus, errorThrown) {
			deferredTimerCall("update_progress();", 4000);
		},

		complete: function(xmlHttpHeader, textStatus) {
		 	xmlHttpHeader = null;
		 	deferredTimerCall("update_progress();", 2000);
		}
	});
}

function check_file()
{

	
	$.ajax({
		url: "../lcufd_check.asp",
		cache: false,
		timeout: 0,

		success: function(result) {
			if (result != null && result.length !== 0)
			{
				var allmsg = result.replace(/\s/gm, "").replace(/\r\n/gm, "").split(',');
				if (allmsg != null)
				{
					file_check_finish(allmsg[0]);
				}
				else
				{
					alert("校验结果参数无效！");
					hideDialog();
				}
			}
			else
			{
				alert("校验结果参数无效！");
				hideDialog();
			}
		},
		 
		error: function(jqXHR, textStatus, errorThrown) {
		 	alert("获取校验结果请求失败！");
		 	hideDialog();
		},
		 
		complete: function(xmlHttpHeader, textStatus) {
		 	xmlHttpHeader = null;
		}
	});
}

function file_check_finish(result)
{
	if (result == 0)
	{
    		changeTitle("重启完成", Color.GREEN);
				hideDialog();
				//window.top.location = "/goform/logout";
				window.top.open('','_self');
				window.top.close();  
	}
	else
	{
		changeTitle("文件校验失败！", Color.RED);
		setTimeout(function() {
			if (result == 1)
				alert("文件格式错误");
			else if (result == 2)
				alert("文件上传不完整");
			else if (result == 3)
				alert("所选固件与当前硬件不匹配，请选择正确的固件进行升级");
			else
				alert("未知校验错误");
			hideDialog();
		}, 50);
	}
}



function hideDialog()
{
	$.ajaxSetup({ timeout: 0 });
	share.data("gIgnoreRequests", false);
	share.data("gServerMode", "");
	window.top.tb_remove();
}

function init()
{
argType = Request.QueryString("arg");
if (argType == "progress")
{
	deferredTimerCall("update_progress();", 2000);
	changeTitle("上传中，请稍候...", Color.BLACK);
	changeProgress(0);
}
else if (argType == "checking")
{
	deferredTimerCall("check_file();", 500);
	changeTitle("正在校验文件，大约需要几分钟，请稍候...", Color.BLACK);
	//changeProgress(100);
	changeProgress(share.data("gUploadPercentage"));
}
else
{
	alert("upload_progress参数错误!");
}
//deferredTimerCall("update_progress();", 2000);
//changeTitle("上传中，请稍候...", Color.BLACK);
//changeProgress(0);
}

</script>
</head>

<body style="overflow:hidden" onload="init();">
<div class="wrap" style="text-align:center">
<table style="margin:auto;width:80%">
<tr><div id="upload_title" align="center" style="font-family:微软雅黑;">上传中，请稍候...</div></tr>
<tr>
<td>
<div class="progressbar">
	<div id="upload_text" class="text">0%</div>
	<div id="upload_bar" class="bar" style="width: 0%;"></div>
</div>
</td>
</tr>
</table>
</div>
</body>
</html>
