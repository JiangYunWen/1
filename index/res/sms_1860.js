var debug=0;
var time_read_or_unread=0;
//************************************ Ajax��غ��� ************************************
function ajaxCreateXMLHTTP() {
	var xmlHttp=null;
 
	try
	{
	   // Firefox, Opera 8.0+, Safari
	    xmlHttp=new XMLHttpRequest();
	}
	catch (e)
	{
		// Internet Explorer
		try
		{
			xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch (e)
		{
			try
			{
				xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch (e)
			{
				alert("�����������֧��AJAX��");
			}
		}
	}

	if (xmlHttp != null)
	{
		if (xmlHttp.overrideMimeType)
		{
			xmlHttp.overrideMimeType('text/xml');
		}
	}
	
	return xmlHttp;
}

function ajaxSendRequestSync(requestAsp) {
	
	var allmsg = null;
	
	try {
		var xmlHttp = ajaxCreateXMLHTTP();
		if (xmlHttp != null)
		{
			xmlHttp.open("GET", requestAsp, false);
			xmlHttp.setRequestHeader("If-Modified-Since","0");
			xmlHttp.send(null);
			if (xmlHttp.readyState == 4)
			{
				if (xmlHttp.status == 200)
				{
					// success
					if (xmlHttp.responseText.length !== 0)
					{
						var rspTxt = xmlHttp.responseText;
						rspTxt.replace(/\s/gm, '').replace(/\r\n/gm, '');		// ȥ���س����ո��
						allmsg = rspTxt.split('*');
						//allmsg = rspTxt;
					}
				}
				else
				{
					// error
					allmsg = null;
				}
			}
			
			xmlHttp = null;
		}
		else
		{
			alert("�������֧��XMLHTTP���");
		}
	} catch (e) {
		//alert("ajaxSendRequest: " + e);
	}
	
	return allmsg;
}

function ajaxSendRequestAsync(requestAsp, cbSuccess, cbError) {
	
	$.ajax({
		url: requestAsp,
		cache: false,

		// ajax����ɹ�
		success: function(result) {
		 	if (result.length !== 0)
			{
				var allmsg = null;
				var rspTxt = result;
				rspTxt.replace(/\s/gm, "").replace(/\r\n/gm, "");		// ȥ���س����ո��
				allmsg = rspTxt.split('*');
				
				if (cbSuccess != null) {
					cbSuccess(allmsg);
				}
			}
		},
		 
		// ajax�������
		error: function(jqXHR, textStatus, errorThrown) {
		 	errorCode = jqXHR.status/* + textStatus + errorThrown*/;
		 	if (cbError != null) {
		 		cbError(errorCode);
		 	}
		},
		 
		// ajax������ɣ���success��error֮����ã�
		complete: function(xmlHttpHeader, textStatus) {
		 	// �ÿ���ʹ֮�ܹ��ͷţ������ڴ�ռ�ó�������
		 	xmlHttpHeader = null;
		}
	});
}

//************************************ 		���Ž�����غ���		************************************

// �����б��е�ö��
var ListColumn = {
	CHECKBOX: 	0,
	STATUS:			1,			// READ / UNREAD, SHOW ICON
	NUMBER:		2,
	MESSAGE:		3,
	DATETIME:		4,
	STORAGE:		5,			// SIM / PHONE, SHOW ICON
	COUNT:			6
};

var DataField = {
	STATUS:			0,
	UID:					1,
	NUMBER:		2,
	MESSAGE:		3,
	DATETIME:		4,
	STORAGE:		5,
	COUNT:			6
};

var DataFieldName = {
	STATUS:			"sta",
	UID:					"uid",
	NUMBER:		"num",
	MESSAGE:		"msg",
	DATETIME:		"time",
	STORAGE:		"loc"
};

var SmsStatusIcon = {
	ICON_OVERRIDE:	-1,
	ICON_DEFAULT:	-2
};

// sms�б���ͼ�����ö���ģ��
function StatusIcon(_STATUS_VALUE, _ICON_FILE)
{
	this._STATUS_VALUE = _STATUS_VALUE;
	this._ICON_FILE = _ICON_FILE;
}

// sms_box����ģ��
function SmsBox(
	_XML_FILE, 
	_TABLE_NAME, 
	_ASP_LOAD, 
	_ASP_SUBMIT, 
	_ACTION, 
	onSuccess, 
	onError,
	onReload)
{
	this._XML_FILE = _XML_FILE;
	this._TABLE_NAME = _TABLE_NAME;
	this._ASP_LOAD = _ASP_LOAD;
	this._ASP_SUBMIT = _ASP_SUBMIT;
	this._ACTION = _ACTION;
	this.onSuccess = onSuccess;
	this.onError = onError;
	this.onReload = onReload;
}

var gSmsBox = null;
var gSmsValueArray = null;
// StatusIcon��������
var gSmsStatusIconArray = null;

var gSmsListUpdated = false;

var gErrorString = "";

var gSmsLoadXmlRetryTimer = null;

//var gnewsmsexist = 0;//�½�����0������ 1����
//var gdelteingexist = 0; //0������ 1����

function getErrorString()
{
	return gErrorString;
}

function smsListInitAsync(smsBox)
{
	var ret = null;
	
	if (gSmsBox == null) {
		gSmsBox = new SmsBox(
			smsBox._XML_FILE,
			smsBox._TABLE_NAME,
			smsBox._ASP_LOAD,
			smsBox._ASP_SUBMIT,
			smsBox._ACTION,
			smsBox.onSuccess,
			smsBox.onError,
			smsBox.onReload
		);
	}
	
	if (isDeletingSms) {
		gSmsBox.onError();
		return;
	}
	
	if (window.parent.pause_refresh == true) {
		gSmsBox.onError();
		return;
	}
	
	ajaxSendRequestAsync(
	
		gSmsBox._ASP_LOAD, 
		
		// Ajax success
		function(result) {
			if (result == null)
			{
				gErrorString = "�����б�����ʧ�ܣ�";
				gSmsBox.onError();
				if(share.data("gnewsmsexist")==0)
				{
					if(debug==1)
					{
					console.warn( "244linegdelteingexist:"+share.data("gdelteingexist") );
				  }
					if(share.data("gdelteingexist")==1)
					{
						share.data("gdelteingexist", 0);
				     smsHideModalDialog();
			    }
			  }
				return null;
			}
			
			var begin = result[0];
			if (begin.indexOf("INIT_BUSY") >= 0)
			{
				gErrorString = "��ȡ���Ų������ڽ����У����Ժ���ˢ��";
				gSmsBox.onError();
				if(share.data("gnewsmsexist")==0)
				{
					if(debug==1)
					{
					   console.warn( "256linegdelteingexist:"+share.data("gdelteingexist") );
				  }
				  if(share.data("gdelteingexist")==1)
					{
						 share.data("gdelteingexist", 0);
				     smsHideModalDialog();
			    }
			  }
				return null;
			}
			else if (begin.indexOf("INIT_ERROR") >= 0)
			{
				gErrorString = "��ȡ����ʱ�����������Ժ�����";
				gSmsBox.onError();
				if(share.data("gnewsmsexist")==0)
				{
					if(debug==1)
					{
					  console.warn( "268linegdelteingexist:"+share.data("gdelteingexist"));
				  }
				 	if(share.data("gdelteingexist")==1)
					{
						share.data("gdelteingexist", 0);
				    smsHideModalDialog();
			    }
				}
				return null;
			}
			else
			{
				if (begin.indexOf("INIT_NO_CHANGE") >= 0 && gSmsListUpdated)
				{
					/* no change happened, and the list is already updated, do nothing */
					gErrorString = "";
					gSmsBox.onSuccess();
					

					return null;
				}
				
//gSmsBox._TABLE_NAME
//console.log( "nothing selected, can't validate, returning nothing"+gSmsBox._TABLE_NAME );
if(gSmsBox._TABLE_NAME=="sms_draftbox_table")
{
share.data("do_msm_del_status_draft",0);
//console.warn( gSmsBox._TABLE_NAME );
}

if(gSmsBox._TABLE_NAME=="sms_inbox_table")
{

share.data("do_msm_del_status_inbox",0 );
//console.warn( gSmsBox._TABLE_NAME );
}


if(smsBox._ASP_LOAD=="sms_outbox_load.asp")
{
share.data("do_msm_del_status_outbox",0);
//console.warn( smsBox._ASP_LOAD );
}

if(smsBox._ASP_LOAD=="sms_sentbox_load.asp")
{

share.data("do_msm_del_status_sentbox",0 );
//console.warn( smsBox._ASP_LOAD );
}
   				var tmp_inbox_flag=0;
   				if(gSmsBox._TABLE_NAME=="sms_inbox_table")
   				{
   				   var myDate = new Date();
   				   time_read_or_unread_tmp=myDate.getTime();
             if((time_read_or_unread_tmp-time_read_or_unread)>3000)
             {
                tmp_inbox_flag=0;
             }else{

               tmp_inbox_flag=1;
               gSmsBox.onSuccess();
             }
   				
   				}else
   				{
   				
   				  tmp_inbox_flag=0
   				}
   
         if(tmp_inbox_flag==0)
         {
				     smsListReadXmlFileAsync();
         }    
			}
		},
		
		// Ajax error
		function(error) {
			if (gSmsBox.onError != null) {
				gSmsBox.onError(error);
			}
		}
	);
}

function smsAddStatusIcon(statusVal, iconFile)
{
	if (gSmsStatusIconArray == null)
		gSmsStatusIconArray = new Array;

	gSmsStatusIconArray[gSmsStatusIconArray.length] = new StatusIcon(statusVal, iconFile);
}

function smsListReadXmlFileAsync()
{
	if (gSmsLoadXmlRetryTimer != null)
	{
		clearTimeout(gSmsLoadXmlRetryTimer);
		gSmsLoadXmlRetryTimer = null;
	}
	
	if (isDeletingSms) {
		gSmsBox.onError();
		return;
	}
	
	smsLoadXmlAsync(
		gSmsBox._XML_FILE,
		
		// Load success
		smsListParseXml,
		
		// Load fail, delay and retry
		function(error) {
			gSmsLoadXmlRetryTimer = setTimeout("smsListReadXmlFileAsync();", 3000);
		}
	);
}

function smsLoadXmlAsync(xmlFile, cbSuccess, cbError)
{
	$.ajax({
		url: xmlFile,
		cache: false,
		dataType: "xml",

	  success: function(xml) {
			if (cbSuccess != null) {
				cbSuccess(xml,xmlFile);
			}
	  },

	  error: function(jqXHR, textStatus, errorThrown) {
	  	errorCode = jqXHR.status/* + textStatus + errorThrown*/;
	  	if (cbError != null) {
	  		cbError(errorCode);
	  	}
	  },

	  complete: function(xmlHttpHeader, textStatus) {
	  	xmlHttpHeader = null;
	  }
	});
}

function smsListParseXml(xmlDoc,xmlFile)
{
	if (xmlDoc == null)
		return;

	var smsList = new Array;
	var smsValue = new Array;
	
	var members = xmlDoc.getElementsByTagName("sms");
	var maxRes = members.length;
	
	for(i=0;i<maxRes;i++)
	{
		smsList[i]=new Array(DataField.COUNT);
	}
	
	for(i=0; i<maxRes; i++)
	{
		smsValue[i]=new Array(2);
	}
	
	for(i=0; i<maxRes; i++)
	{
		var status = members[i].getElementsByTagName(DataFieldName.STATUS);
		var id = members[i].getElementsByTagName(DataFieldName.UID);
		var number = members[i].getElementsByTagName(DataFieldName.NUMBER);
		var mesage = members[i].getElementsByTagName(DataFieldName.MESSAGE);
		var sms_time = members[i].getElementsByTagName(DataFieldName.DATETIME);
		var storage = members[i].getElementsByTagName(DataFieldName.STORAGE);
		
		smsValue[i][0]=smsList[i][DataField.STATUS]=status[0].firstChild.nodeValue;
		smsValue[i][1]=smsList[i][DataField.UID]=id[0].firstChild.nodeValue;
	
var gl_IE_ver=0;		
if(navigator.appName == "Microsoft Internet Explorer"){ 
      if(!-[1,]==false)
      {
      //IE9+
              var reg = /9\.0/; 
              var reg2=/11\.0/; 
      
              var str = navigator.userAgent; 
              //reg.test(str); 
              if (reg.test(str)) { 
                 // alert("ie9"); 

								gl_IE_ver=9;
                 
              }else if(reg2.test(str))
              {
      
                // alert("ie11"); 
								gl_IE_ver=11;
                
              }else
              {
                // alert("ie10"); 
								gl_IE_ver=10;
                 
              }
      
      
      
      }else
      {
      //IE8
      //alert("ie8"); 
			gl_IE_ver=8;
         
      }
		}else
    {

     		gl_IE_ver=99;//not ie
    }

if(gl_IE_ver=10||gl_IE_ver>90)
{
			if(number[0].firstChild==null){
				smsList[i][DataField.NUMBER]="";
			}else{
				smsList[i][DataField.NUMBER]=number[0].firstChild.nodeValue;
			}
			
			if(mesage[0].firstChild==null){
				smsList[i][DataField.MESSAGE]="";
			}else{
				smsList[i][DataField.MESSAGE]=mesage[0].firstChild.nodeValue;
			}

}else
{
			if(number[0].text==""){
				smsList[i][DataField.NUMBER]="";
			}else{
				smsList[i][DataField.NUMBER]=number[0].firstChild.nodeValue;
			}
			
			if(mesage[0].text==""){
				smsList[i][DataField.MESSAGE]="";
			}else{
				smsList[i][DataField.MESSAGE]=mesage[0].firstChild.nodeValue;
			}

}

//console.warn(mesage[0].firstChild.nodeValue);

		smsList[i][DataField.DATETIME] = sms_time[0].firstChild.nodeValue;
		smsList[i][DataField.STORAGE] = storage[0].firstChild.nodeValue;
	}
	
	gSmsValueArray = smsValue;
	

	// Xml parse OK, proceed to next step: Generate the html list
	smsListPrepareTableFromXml(smsList, smsValue, maxRes,xmlFile);
}

function smsListPrepareTableFromXml(smsList, smsValue, smsCount,xmlFile)
{
	var smsCount = smsCount;
	if (smsCount < 0)
	{
		gErrorString = "��ȡ�����б�ʧ�ܣ�";
		gSmsBox.onError();
		return;
	}
	
	if (isDeletingSms)
	{
		gSmsBox.onError();
		return;
	}
	
	var list_idx = 0;
	var list_table = document.getElementById(gSmsBox._TABLE_NAME);
	var exist_rows = list_table.rows.length;
	
	for (list_idx = 0; list_idx < (exist_rows - smsCount); list_idx++)
	{
		       list_table.deleteRow(0);
		       	if(debug==1)
			{
				console.warn( "480linegdelteingexist:"+share.data("gdelteingexist")+"gnewsmsexist:"+share.data("gnewsmsexist") +"exist_rows:"+exist_rows+"smsCount:"+smsCount+"list_idx:"+list_idx);
			}

	}
	
	var smsbox=share.data("box");
		  if(debug==1)
			{
				console.warn("smsbox:"+smsbox );
			}
		
		if(smsbox==xmlFile)
		{

			if(debug==1)
			{
				console.warn( "490linegdelteingexist:"+share.data("gdelteingexist")+"gnewsmsexist:"+share.data("gnewsmsexist") +"exist_rows:"+exist_rows+"smsCount:"+smsCount+"list_idx:"+list_idx);
			}
			if(share.data("gnewsmsexist")==0)
			{

			   if(share.data("gdelteingexist")==1)
				{
					share.data("gdelteingexist", 0);
				       smsHideModalDialog();
				      share.data("box","" );
			   }
		  }

   }
	
	for (list_idx = 0; list_idx < smsCount; list_idx++) 
	{
		var row_tmp = null;
		
		if (list_idx < exist_rows)
			row_tmp = list_table.rows[list_idx];
		else
			row_tmp = smsListCreateRow(gSmsBox._TABLE_NAME, -1);
		
		if (row_tmp != null && row_tmp.cells.length < ListColumn.COUNT)
		{
			smsListRowClearCells(row_tmp);
			smsListRowPopulateCells(row_tmp);
			smsListRowSetEventHandlers(row_tmp);
		}
		
		smsListUpdateRow(row_tmp, smsList[list_idx]);
	}

	gSmsListUpdated = true;
	
	// Notify UI
	if (gSmsBox.onSuccess != null)
		gSmsBox.onSuccess(smsList, smsValue, smsCount);
}

function smsListCreateRow(tableName, postion)
{
	var row_tmp = document.getElementById(tableName).insertRow(postion);
	
	// Set event handlers
	smsListRowSetEventHandlers(row_tmp);
	
	// Create cells
	smsListRowPopulateCells(row_tmp);
	
	return row_tmp;
}

function smsListRowSetEventHandlers(row_item)
{
	row_item.onclick = function s1()
	{
		var sms_list = document.getElementById(gSmsBox._TABLE_NAME);
		if (sms_list != null)
		{
			var obj = event.srcElement;
			if (obj.tagName.toLowerCase() == "td")
			{
				var tr = obj.parentNode;
				for (var i = 0; i < sms_list.rows.length; i++)
				{
					sms_list.rows[i].style.backgroundColor = "";
					sms_list.rows[i].tag = false;
				}
				tr.style.backgroundColor = "#CCCCFF";
				tr.tag = true;
			}
		}
	};
	
	row_item.onmouseover=function s2()
	{
		var obj = event.srcElement;
		if (obj.tagName.toLowerCase() == "td")
		{
			var tr = obj.parentNode;
			if (!tr.tag)
				tr.style.backgroundColor = "#E1E9FD";
		}
	};
	
	row_item.onmouseout=function s3()
	{
		var obj = event.srcElement;
		if (obj.tagName.toLowerCase() == "td")
		{
			var tr = obj.parentNode;
			if (!tr.tag)
				tr.style.backgroundColor = "";
		}
	};
	
	row_item.ondblclick=function s4()
	{
		var rowid = getRowNo(this);
		var colRows = document.getElementById(gSmsBox._TABLE_NAME).rows;
		var item;
		if(navigator.appName == "Microsoft Internet Explorer"){ 
      if(!-[1,]==false)
      {
      //IE9+
              var reg = /9\.0/; 
              var reg2=/11\.0/; 
      
              var str = navigator.userAgent; 
              //reg.test(str); 
              if (reg.test(str)) { 
                 // alert("ie9"); 
                 item = document.getElementsByName("SelectCheckbox");
              }else if(reg2.test(str))
              {
      
                // alert("ie11"); 
                item = document.getElementsByName("SelectCheckbox");
              }else
              {
                // alert("ie10"); 
                 item = document.getElementsByName("selectcheckbox");
              }
      
      
      
      }else
      {
      //IE8
      //alert("ie8"); 
         item = document.getElementsByName("SelectCheckbox");
      }
		}else{
			item = document.getElementsByName("selectcheckbox");
		}

if(gSmsBox._TABLE_NAME=="sms_inbox_table")
{
   var myDate = new Date();
   time_read_or_unread=myDate.getTime();

if(debug==1)
{
console.warn( gSmsBox._TABLE_NAME);
console.warn( document.getElementById(gSmsBox._TABLE_NAME).rows[rowid].cells[1].innerHTML);
console.warn( document.getElementById(gSmsBox._TABLE_NAME).rows[rowid].cells[2].innerHTML);
console.warn( document.getElementById(gSmsBox._TABLE_NAME).rows[rowid].cells[3].innerHTML);
console.warn( document.getElementById(gSmsBox._TABLE_NAME).rows[rowid].cells[4].innerHTML);
console.warn( document.getElementById(gSmsBox._TABLE_NAME).rows[rowid].cells[5].innerHTML);

}
var cell = document.getElementById("total_count").innerHTML;
//cell.innerHTML
//console.warn( cell.innerHTML);

//var cell ="����1000�����ţ�δ��99��";
//cell=cell.search(/δ��/));
var place_in=cell.search(/δ��/);

var part_one=cell.substring(0,place_in+2);

var weiducount=parseInt(cell.substring(place_in+2,cell.length-1),10)-1;
if(weiducount>=0)
{
var fin=part_one+weiducount+"��";

document.getElementById("total_count").innerHTML=fin;
}

//console.warn(colRows[0].getElementsByTagName(DataFieldName.STATUS).innerHTML);

//document.getElementById(gSmsBox._TABLE_NAME).rows[rowid].innerHTML
//var row_tmp[][]=colRows[rowid];
//colRows[rowid]
var row_tmp=document.getElementById(gSmsBox._TABLE_NAME).rows[rowid];
//row_tmp.cells[1].innerHTML="<img src='graphics/sms_read.png'>";
var isIE =!!window.ActiveXObject;
var isIE6 =isIE&&!window.XMLHttpRequest;
var isIE8 =isIE&&!!document.documentMode;
var isIE7 = isIE&&!isIE6&&!isIE8;
var png_flag=0;

var readpng="data:image/png;base64,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";

var  pngtmp="<img src='";
pngtmp=pngtmp+readpng+"'>";

if(isIE)
{
if(isIE6)
{

//.write("IE6");
  
	 row_tmp.cells[1].innerHTML="<img src='graphics/sms_read.png'>";
png_flag=1;

}else if(isIE8)
{

//document.write("IE8");
	  //	smsAddStatusIcon(1, readpng);
row_tmp.cells[1].innerHTML=pngtmp;
	  
png_flag=1;


}else if(isIE7)
{

//document.write("IE7");
   //  	smsAddStatusIcon(1, "graphics/sms_read.png");
row_tmp.cells[1].innerHTML="<img src='graphics/sms_read.png'>";

	  
png_flag=1;


}



}else
{
	   row_tmp.cells[1].innerHTML=pngtmp;
	  
png_flag=1;

}	
if(png_flag==0)
{
	   row_tmp.cells[1].innerHTML=pngtmp;
	 

}


//var cell0=document.getElementById(gSmsBox._TABLE_NAME).rows[rowid].cells[0].innerHTML;
//var cell1=document.getElementById(gSmsBox._TABLE_NAME).rows[rowid].cells[1].innerHTML;
//var cell2=document.getElementById(gSmsBox._TABLE_NAME).rows[rowid].cells[2].innerHTML;
//var cell3=document.getElementById(gSmsBox._TABLE_NAME).rows[rowid].cells[3].innerHTML;
//var cell4=document.getElementById(gSmsBox._TABLE_NAME).rows[rowid].cells[4].innerHTML;
//var cell5=document.getElementById(gSmsBox._TABLE_NAME).rows[rowid].cells[5].innerHTML;
//cell1=<img src="graphics/sms_unread.png">;
//
//
//document.getElementById(gSmsBox._TABLE_NAME).deleteRow(rowid);
//var row_tmp =document.getElementById(gSmsBox._TABLE_NAME).insertCell(rowid);
//			smsListRowClearCells(row_tmp);
//			smsListRowPopulateCells(row_tmp);
//			smsListRowSetEventHandlers(row_tmp);
//
//row_tmp.cells[0].innerHTML=cell0;
//row_tmp.cells[1].innerHTML=cell1;
//row_tmp.cells[2].innerHTML=cell2;
//row_tmp.cells[3].innerHTML=cell3;
//row_tmp.cells[4].innerHTML=cell4;
//row_tmp.cells[5].innerHTML=cell5;



//document.getElementById(gSmsBox._TABLE_NAME).rows[rowid].cells[1].innerHTML=
//document.getElementById(gSmsBox._TABLE_NAME).deleteRow(rowid);



		var param = "" + gSmsBox._ACTION + "=" + gSmsValueArray[rowid][1];
		$.get('/goform/formSyWebCfg?oem_cfg=changed&action=Apply&'+param,function(r){ });
	}	
		document.all.lc_sms_index.value = item[rowid].value;
		if (document.all.lc_sms_msg_id != null)
			document.all.lc_sms_msg_id.value = gSmsValueArray[rowid][1];
		document.all.lc_sms_phone_number.value = colRows[rowid].cells[DataField.NUMBER].innerText;
		document.all.lc_sms_message.value = convertHtmlToText(colRows[rowid].cells[DataField.MESSAGE].innerHTML);
		
		smsShowModalDialog(gSmsBox._ASP_SUBMIT, window);
	};
}

function smsListRowClearCells(row_item)
{
	while (row_item.cells.length > 0)
	{
		row_item.deleteCell(0);
	}
}

function smsListRowPopulateCells(row_item)
{
	// checkbox
	var cell_tmp = document.createElement("td");
	var e = document.createElement("input");
	e.type = "checkbox";
	e.name = "selectcheckbox";
	e.id="SelectCheckbox";
	e.onclick = checkboxOnClick;
	cell_tmp.appendChild(e);
	cell_tmp.align = "center";
	row_item.appendChild(cell_tmp);

	// status
	cell_tmp = document.createElement("td");
	cell_tmp.align = "center";
	cell_tmp.setAttribute("width","35");
	var img_status = document.createElement("img");
	img_status.setAttribute("src", "");
	cell_tmp.appendChild(img_status);
	cell_tmp.align = "center";
	//cell_tmp.style.display="none";
	row_item.appendChild(cell_tmp);

	// phone Number
	cell_tmp = document.createElement("td");
	cell_tmp.setAttribute("width","100");
	row_item.appendChild(cell_tmp);

	// msg
	cell_tmp = document.createElement("td");
	cell_tmp.setAttribute("width","360");
	row_item.appendChild(cell_tmp);

	// date
	cell_tmp = document.createElement("td");
	cell_tmp.setAttribute("width","110");
	row_item.appendChild(cell_tmp);
	
	// storage
	cell_tmp = document.createElement("td");
	cell_tmp.setAttribute("width","25");
	var img_storage= document.createElement("img");
	img_storage.setAttribute("src", "");
	cell_tmp.appendChild(img_storage);
	cell_tmp.align = "center";
	row_item.appendChild(cell_tmp);
}

function smsListUpdateRow(row_item, sms_item)
{
	if (row_item == null || (row_item != null && row_item.cells.length < ListColumn.COUNT))
	{
		alert("��Ч���ж���");
		return;
	}
	
	// checkbox
	var checkbox = row_item.cells[ListColumn.CHECKBOX].childNodes[0];
	checkbox.checked = false;
	//row_item.cells[0].getElementById("SelectCheckbox").value = sms_item[1];

	// status
	var img_status = row_item.cells[ListColumn.STATUS].childNodes[0];
	for (i = 0; i < gSmsStatusIconArray.length; i++)
	{
		// ������״̬������Ӧ����ͼ��
		// �����õ�״ֵ̬ΪSmsStatusIcon.ICON_OVERRIDE (-1)����ǿ��ʹ�ö�Ӧ��ͼ��
		if ((gSmsStatusIconArray[i]._STATUS_VALUE == SmsStatusIcon.ICON_OVERRIDE) || 
				(sms_item[DataField.STATUS] == gSmsStatusIconArray[i]._STATUS_VALUE))
		{
			img_status.setAttribute("src", gSmsStatusIconArray[i]._ICON_FILE);
			break;
		}
		else if (gSmsStatusIconArray[i]._STATUS_VALUE == SmsStatusIcon.ICON_DEFAULT)
		{
			img_status.setAttribute("src", gSmsStatusIconArray[i]._ICON_FILE);
		}
	}

	// phone Number
	row_item.cells[ListColumn.NUMBER].innerText = sms_item[DataField.NUMBER];

	// msg
	row_item.cells[ListColumn.MESSAGE].innerHTML = convertTextToHtml(sms_item[DataField.MESSAGE]);
	//row_item.cells[ListColumn.MESSAGE].innerText = sms_item[DataField.MESSAGE];

	// date
	row_item.cells[ListColumn.DATETIME].innerText = sms_item[DataField.DATETIME];
	
	// storage
	var img_storage = row_item.cells[ListColumn.STORAGE].childNodes[0];
	img_storage.setAttribute("src", (sms_item[DataField.STORAGE] == 2) ? "graphics/phone.png" : "graphics/sim1.png");
	//row_item.cells[ListColumn.STORAGE].innerHTML = sms_item[DataField.STORAGE];
}

function checkboxOnClick()
{
	smsSelBtnStateClear(document.getElementById("select_sms"));
}

function convertTextToHtml(stringIn)
{
	// ע���滻�ո�ʱ��Ҫ��&nbsp;���һ���ո񣬱�������&nbsp;�޷�����
	//return stringIn.replace(/ /gm, "&nbsp; ").replace(/(\r\n)|(\n)|(\r)/gm, "<br/>");
stringIn=stringIn.replace( /(\<|\>|\&|\'|\")/g,
                          function($0, $1)
                          {
                              return{
                                  "<" : "&lt;"
                                , ">" : "&gt;"
                                , "&" : "&amp;"
                                , "'" : "&#39;"
                                , "\"": "&quot;"        
                              }[$1];
                          }
                         );

return stringIn.replace(/ /gm, "&nbsp; ").replace(/(\r\n)|(\n)|(\r)/gm, "<br/>");

}

function convertHtmlToText(stringIn)
{
	return stringIn.replace(/\&nbsp\; {0,}/gmi, " ").replace(/\<br\s*\/{0,}\s*\>/gmi, "\r\n")
		.replace(/\&lt\;/gmi, "<").replace(/\&gt\;/gmi, ">")
		.replace(/\&amp\;/gmi, "&").replace(/\&quot\;/gmi, "\"");
}

//�õ��ж���
function getRowObj(obj)
{
   var i = 0;
   while(obj.tagName.toLowerCase() != "tr"){
    obj = obj.parentNode;
    if(obj.tagName.toLowerCase() == "tbody")return null;
   }
   return obj;
}

//���ݵõ����ж���õ����ڵ�����
function getRowNo(obj){
	var trObj = getRowObj(obj); 
	var trArr = trObj.parentNode.children;
	for(var trNo= 0; trNo < trArr.length; trNo++){
		if(trObj == trObj.parentNode.children[trNo]){
			return trNo;
		}
	}
}

function newSms()
{
	smsShowModalDialog("sms_sub_new.asp", null);
	share.data("gnewsmsexist", 1);

}

function smsShowModalDialog(pageUrl, pageArgs)
{

 
	var url = pageUrl;
	url += (pageUrl.indexOf("?") > 0) ? "&amp;" : "?";
	url += "placeValuesBeforeTB_=savedValues&amp;TB_iframe=true&amp;TB_iniframe=true&amp;height=300&amp;width=430&amp;modal=true";
	//share.data("dialogArgs", pageArgs);
	//share.data("gIgnoreRequests", true);

//console.warn("smsShowModalDialog:"+ url+window.top.frames["index"]);

console.warn("smsShowModalDialog:"+ window.parent.parent.parent.document.location);
	//window.top.tb_show("", url, null);
window.parent.parent.parent.tb_show("", url, null);
//window.top.document.getElementById("title").tb_show("", url, null);
//window.top.frames["code"].tb_show("", url, null);
//window.top.frames["title"].tb_show("", url, null);
}

function smsShowsendingModalDialog(pageUrl, pageArgs)
{
	var url = pageUrl;
	url += (pageUrl.indexOf("?") > 0) ? "&amp;" : "?";
	url += "placeValuesBeforeTB_=savedValues&amp;TB_iframe=true&amp;TB_iniframe=true&amp;height=140&amp;width=330&amp;modal=true";
	share.data("dialogArgs", pageArgs);
	//share.data("gIgnoreRequests", true);
	window.top.tb_show("", url, null);
}
function smsdelShowModalDialog(pageUrl, pageArgs)
{
	share.data("gdelteingexist", 1);
if(debug==1)
{
	console.warn( "smsdelShowModalDialog gdelteingexist:"+share.data("gdelteingexist") );
}
	var url = pageUrl;
	url += (pageUrl.indexOf("?") > 0) ? "&amp;" : "?";
	url += "placeValuesBeforeTB_=savedValues&amp;TB_iframe=true&amp;TB_iniframe=true&amp;height=93&amp;width=291&amp;modal=true";
	share.data("dialogArgs", pageArgs);
	//share.data("gIgnoreRequests", true);
	window.top.tb_show("", url, null);
	
}

function smsHideModalDialog()
{
	window.top.tb_remove();
	//share.data("gIgnoreRequests", false);
	share.data("gnewsmsexist", 0);
}

function smsShowWaitAnimation()
{
	var img_td = document.getElementById("refresh_wait");
	if (img_td == null || img_td == undefined)
		return false;
		
	__smsHideWaitAnimation();

	var img_element = document.createElement("img");
	img_element.setAttribute("src", "graphics/wait.gif");
	img_td.appendChild(img_element);
	img_td.align = "center";
}

function smsHideWaitAnimation()
{
	setTimeout("__smsHideWaitAnimation();", 1000);
}

function __smsHideWaitAnimation()
{
	var img_td = document.getElementById("refresh_wait");
	if (img_td == null || img_td == undefined)
		return false;

	while (img_td.firstChild != null)
	{
		img_td.removeChild(img_td.firstChild);
	}
}

//************************************ 		���Ž����ѡ����		************************************
function smsToggleSelectAll(btn)
{
	var selectDoc = smsGetCheckedItems();

	if (btn.value == " ȫѡ " || btn.value == null){
		smsCheckAll(selectDoc);
		btn.value = " ȫ��ѡ ";
	}else{
		smsUncheckAll(selectDoc);
		btn.value = " ȫѡ ";
	}
	
	btn.disabled = true;
	setTimeout(function() { btn.disabled = false; }, 500);
}

function smsCheckAll(checkbox)
{
	if (checkbox == null)
		return false;
	
	for (i=0;i<checkbox.length;i++){
		if (checkbox[i].checked == false)
			checkbox[i].checked = true;
	}
}

function smsUncheckAll(checkbox)
{
	if (checkbox == null)
		return false;

	for (i=0; i<checkbox.length; i++){
		if (checkbox[i].checked == true)
			checkbox[i].checked = false;
	}
}

function smsSelBtnStateClear(btn)
{
	var checkedCnt = 0;
	var checkbox = smsGetCheckedItems();
	for (i=0; i<checkbox.length; i++){
		if (checkbox[i].checked == true)
			checkedCnt++;
	}
	if (checkedCnt == 0)
		btn.value = " ȫѡ ";
	else if (checkedCnt == checkbox.length)
		btn.value = " ȫ��ѡ ";
}

function smsGetCheckedItems()
{
	var listItems;
	if (navigator.appName == "Microsoft Internet Explorer")
	{ 
      if(!-[1,]==false)
      {
      //IE9+
              var reg = /9\.0/; 
              var reg2=/11\.0/; 
      
              var str = navigator.userAgent; 
              //reg.test(str); 
              if (reg.test(str)) { 
                 // alert("ie9"); 
                 listItems = document.getElementsByName("SelectCheckbox");
              }else if(reg2.test(str))
              {
      
                // alert("ie11"); 
                listItems = document.getElementsByName("SelectCheckbox");
              }else
              {
                // alert("ie10"); 
                 listItems = document.getElementsByName("selectcheckbox");
                // console.warn( listItems.length );

              }
      
      
      
      }else
      {
      //IE8
      //alert("ie8"); 
         listItems = document.getElementsByName("SelectCheckbox");
      }
	}
	else
	{
		listItems = document.getElementsByName("selectcheckbox");
	}
	return listItems;
}

//************************************ 			����ɾ������			************************************
var selCount = 0;
var delCount = 0;
var delIndex = 0;
var listIndex = 0;
var listItems = null;
var timerDeleting = null;
var isDeletingSms = false;

function smsDelete()
{
	if (isDeletingSms)
		return;
		
	selCount = 0;
	
	listItems = smsGetCheckedItems();
	if (listItems != null)
	{
		for (i=0; i<listItems.length; i++)
		{
			if (listItems[i].checked == true)
				selCount++;
		}
		
		if (selCount > 0)
		{
			var confirmed = window.confirm("�Ƿ�ɾ��ѡ��Ķ���?", "ϵͳ��ʾ");
			if (confirmed)
				smsStartDeleting();
		}
		else
		{
			alert("����ѡ��Ҫ����Ķ���!");
		}
	}
}

function smsStartDeleting()
{
	delIndex = 0;
	delCount = 0;
	listIndex = 0;
	
	// ������ʱ��
	timerDeleting = setTimeout('smsDoDelete();', 10);
	if (timerDeleting)
	{
		isDeletingSms = true;
		//showWaitDlg("", "��ʼɾ������", null);
		smsdelShowModalDialog("sms_delteing.html", window);
	}
}

function smsDoDelete()
{
	while (listItems[listIndex].checked != true)
	{
		listIndex++;
		if (listIndex >= listItems.length)
		{
			smsFinishDeleting();
			return;
		}
	}

	delIndex++;
	//changeWaitDlgMsg("����ɾ������ (" + delIndex + "/" + selCount + ")�����Ժ�...");

	param = "";
	param +="lc_sms_delete=";
	param += smsBoxValue[listIndex][1];
	
	var urlDelete = "/goform/formSyWebCfg?oem_cfg=changed&action=Apply&" + param;
	
	ajaxSendRequestAsync(
		urlDelete,
		
		// ajax����ɹ�
		function(result) {
	  		if (result[0].toLowerCase().indexOf("success") >= 0)
				delCount++;
			
			listIndex++;
			smsCheckFinishedDeleting();
	 	},
	  
		// ajax�������
		function(error) {
			alert("����ɾ��������ʧ��\n\n" + getNetError(error));
			smsFinishDeleting();
		}
	);
}

function smsCheckFinishedDeleting()
{
	if (listIndex >= listItems.length || delCount == selCount)
	{
		// �ѵ���ĩβ
		smsFinishDeleting();
	}
	else
	{
		// ������ʱ��
		timerDeleting = setTimeout('smsDoDelete();', 10);
		if (timerDeleting == null)
		{
			alert("��ʱ������ʧ�ܣ�");
			smsFinishDeleting();
		}
	}
}

function smsFinishDeleting()
{
	//closeWaitDlg();
	//smsHideModalDialog();
	
	isDeletingSms = false;

	if (timerDeleting != null)
	{
		clearTimeout(timerDeleting);
		timerDeleting = null;
	}
	if(debug==1)
	{
	console.warn( "smsFinishDeleting" );
  }
	setTimeout('smsShowDeleteResult();', 50);
}

function smsShowDeleteResult()
{
	if (delCount > 0)
	{
		var result = "�ɹ�ɾ��" + delCount + "��";
		if (selCount > delCount)
		{
				result += "\nʣ��" + (selCount - delCount) + "��δ��ɾ����������";
			 // smsHideModalDialog();
		    
		}
        
		    if (gSmsBox.onReload)
         {

            smsdelShowModalDialog("sms_refresh.html", window);
            delayalert(result);
            gSmsBox.onReload();
         }
	 
	   if(debug==1)
	   {  
	      console.warn( "delCount:"+delCount+";selCount:"+selCount );
	   }
	}
	else
		alert("ɾ������ʧ��");


}
function delayalert(result)
{
setTimeout(function() {
alert(result);
},500);

}



function getNetError(errorCode)
{
	var strError = "";
	switch (errorCode)
	{
	case 12002:
		strError = "����ʱ���������豸��æ�����Ժ�����";
		break;
		
	case 12029:
		strError = "�޷�����Web���������������豸��æ�����Ժ�����";
		break;
		
	case 12030:
		strError = "��Web�����������ӱ���ֹ���������豸��æ�����Ժ�����";
		break;
		
	case 12031:
		strError = "��Web�����������ӱ����ã��������豸��æ�����Ժ�����";
		break;
		
	default:
		strError = "����δ֪���� [" + errorCode + "]�����Ժ�����";
		break;
	}
	return strError;
}

//************************************ 			������������⺯��		************************************
var phoneMaxLen = 20;		// ����������󳤶�
var phoneMaxCnt = 5;		// һ��Ⱥ�������Ӻ���ĸ���
var msgMaxLen = 540;

var PhoneError = {
	NO_ERROR:				0,
	EMPTY_NUM:			1,
	INVALID_CHAR:		2,
	INVALID_FORMAT:	3,
	MAX_PHONE_CNT:	4,
	MAX_PHONE_LEN:	5
};

String.prototype.getBytes = function()
{
	return this.replace(/[^\x00-\xFF]/gi, "**").length;
}

function getErrorMessage(errorCode)
{
	var errorMsg = "";
	switch (errorCode)
	{
	case PhoneError.EMPTY_NUM:
		errorMsg = "���벻��Ϊ�գ�";
		break;
	case PhoneError.INVALID_CHAR:
		errorMsg = "�����а����Ƿ��ַ������������֡��Ӻ�(+)���ֺ�(;)��ո�";
		break;
	case PhoneError.INVALID_FORMAT:
		errorMsg = "�����ʽ����ȷ������д��ȷ���ֻ����룡";
		break;
	case PhoneError.MAX_PHONE_CNT:
		errorMsg = "��Ӻ����������ܳ���5�������飡";
		break;
	case PhoneError.MAX_PHONE_LEN:
		errorMsg = "��������ĳ��Ȳ��ܳ���20���ַ������飡";
		break;
	}
	return errorMsg;
}

function formatPhoneNum(phone)
{
	var regSpace = /\s+/gm;
	var regEndSemicolon = /\;\s*$/;
	
	// ȥ������Ŀհ��ַ�
	var num = phone.replace(regSpace, "");
	if (num.length > 0)
	{
		// ȥ��ĩβ����ķֺ�
		num = num.replace(regEndSemicolon, "");
	}
	
	return num;
}

function phoneNumberCount(phone)
{
	var num = formatPhoneNum(phone);
	if (num.length > 0)
	{
		var numArray = num.split(";");
		return (numArray != null) ? numArray.length : 0;
	}
	else
	{
		return 0;
	}
}

function validatePhoneNum(phone)
{
	var regInvalidChar = /[^0-9\;\+\s]+/gm;
	var regPhone = /^((\+*86)|(\(\+*86\)))?([0-9]+)$/;
	
	var num = formatPhoneNum(phone);
	if (num.length <= 0)
	{
		return PhoneError.EMPTY_NUM;
	}
	// �������������֡��ֺ�";"(�ָ��Ը�����)���Ӻ�"+"���Լ��ո�
	else if (regInvalidChar.test(num))
	{
		return PhoneError.INVALID_CHAR;
	}
	
	// �жϺ���Ϸ���
	var numArray = num.split(";");
	if (numArray != null)
	{
		if (numArray.length <= 0)
		{
			return PhoneError.EMPTY_NUM;
		}

		if (numArray.length > phoneMaxCnt)
		{
			return PhoneError.MAX_PHONE_CNT;
		}
			
		for (i = 0; i < numArray.length; i++)
		{
			if (numArray[i].length == 0)
			{
				return PhoneError.EMPTY_NUM;
			}
			else if (numArray[i].length > phoneMaxLen)
			{
				return PhoneError.MAX_PHONE_LEN;
			}
			else if (!regPhone.test(numArray[i]))
			{
				return PhoneError.INVALID_FORMAT;
			}
		}
		
		return PhoneError.NO_ERROR;
	}
	else
	{
		return (regPhone.test(num) ? PhoneError.NO_ERROR : PhoneError.INVALID_FORMAT);
	}
}

function checkPhoneNumber(objPhoneEdit)
{
	var regInvalidChar = /[^0-9\;\+]+/gm;
	var regDupSemicolon = /\;(\s{0,}\;)+/gm;
	var regDupPlus = /\+(\s{0,}\+)+/gm;
	var regStartSemicolon = /^\s*\;/;
	var validInput = objPhoneEdit.value;
	
	if (regInvalidChar.test(validInput))
	{
		deferredAlert("�����а����Ƿ��ַ������������֡��Ӻ�(+)�ͷֺ�(;)", 400);

		validInput = validInput.replace(regInvalidChar, "");
		objPhoneEdit.value = validInput;
		
		return;
	}
	
	if (regDupSemicolon.test(validInput))
	{
		validInput = validInput.replace(regDupSemicolon, ";");
		objPhoneEdit.value = validInput;
	}
	
	if (regDupPlus.test(validInput))
	{
		validInput = validInput.replace(regDupPlus, "+");
		objPhoneEdit.value = validInput;
	}
	
	if (regStartSemicolon.test(validInput))
	{
		validInput = validInput.replace(regStartSemicolon, "");
		objPhoneEdit.value = validInput;
	}
	
	// Remove plus signs that not appear at the beginning
	var tempStr = validInput.replace(/^\s*\+/, "*").replace(/;\s*\+/gm, ";*");
	if (/\+/gm.test(tempStr))
	{
		tempStr = tempStr.replace(/\+/gm, "");
		validInput = tempStr.replace("*", "+");
		objPhoneEdit.value = validInput;
	}
}

function getNumbersArray(phone)
{
	var resultArray = [];
	var num = formatPhoneNum(phone);
	var numArray = num.split(";");
	if (numArray != null && numArray.length > 0)
	{
		var hashMap = {};
		for (i = 0; i < numArray.length; i++)
		{
			var tempNum = numArray[i].replace(/^\+86/, "").replace(/^86/, "");
			if (!hashMap[tempNum])
			{
				hashMap[tempNum] = true;
				resultArray.push(numArray[i]);
			}
		}
	}
	return {IS_UNIQUE: (resultArray.length == numArray.length), UNIQUE_ARRAY: resultArray};
}

function makeNumbersUnique(objPhoneEdit)
{
	if (objPhoneEdit == null || objPhoneEdit == undefined)
		return false;

	var validInput = objPhoneEdit.value;
	var result = getNumbersArray(validInput);
	if (!result.IS_UNIQUE)
	{
		var strUnique = "";
		var uniqueArray = result.UNIQUE_ARRAY;
		for (i = 0; i < uniqueArray.length; i++)
		{
			strUnique += uniqueArray[i] + ";";
		}
		objPhoneEdit.value = strUnique;
	}
	
	return !result.IS_UNIQUE;
}

function checkMessageText(objMsgEdit)
{
	var inputString = objMsgEdit.value.replace(/\r\n/gm, "\n");
	var inputCnt = inputString.getBytes();
	if (inputCnt > msgMaxLen)
	{
		// Clamp user input to the max limit
		while ((inputString = inputString.substr(0, inputString.length - 1)).getBytes() > msgMaxLen);
		objMsgEdit.value = inputString;

		deferredAlert("���������Ѵﵽ��󳤶����ƣ�", 400);
	}
	return ("" + inputString.getBytes() + "/" + msgMaxLen);
}

function canSendSms()
{
	var sms_status_set = ajaxSendRequestSync("sms_send_check.asp");
	if (sms_status_set != null)
	{
		// Check SIM
		var sim_status = sms_status_set[1];
		if (sim_status != 0)		// LCWEB_SIM_STATUS_SIM_NORMAL
		{
			return {_RESULT: false, _ERROR: "��SIM����SIM����Ч��"};
		}
		
		// Check network
		var net_status = sms_status_set[2];
		if (net_status.indexOf("GSM") < 0 && 
			net_status.indexOf("EDGE") < 0 && 
			net_status.indexOf("TD-SCDMA") < 0 && 
			net_status.indexOf("HSPDA") < 0 && 
			net_status.indexOf("HSUPA") < 0 && 
			net_status.indexOf("LTE") < 0)
		{
			return {_RESULT: false, _ERROR: "���������"};
		}
		
		// Check if sms is still sending
		var is_sms_sending = sms_status_set[0];
		if (is_sms_sending != 0)
		{
			return {_RESULT: false, _ERROR: "��ǰ�ж������ڷ��ͣ����Ժ�����"};
		}

		return {_RESULT: true, _ERROR: ""};
	}
	else
	{
		return {_RESULT: false, _ERROR: "������״̬ʧ�ܣ������Է���"};
	}
}
