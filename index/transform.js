function s22t(){
    document.cookie  = 'cmlan=tw';  //ÉèÖÃcokie
    document.body.innerHTML=s2t(document.body.innerHTML);
}
function t22s(){
    document.body.innerHTML=t2s(document.body.innerHTML);
    //ÒÔÏÂÉ¾³ıcookie
    var date=new Date();
    date.setTime(date.getTime()-1000)
    document.cookie="cmlan=tw; expires="+date.toUTCString();
}
//ÅĞ¶ÏÊÇ·ñ´æÔÚÃûÎªcmlanµÄcookie£¬Ê¹ÓÃdocument.cookie.indexOf(¡°cmlan=¡±)À´ÅĞ¶Ï£¬Èç¹û·µ»ØÖµÊÇ-1£¬±íÊ¾²»´æÔÚ¡£
function myfun()
{
    c_start=document.cookie.indexOf("cmlan=");
    if(c_start==-1){
        //document.body.innerHTML=t2s(document.body.innerHTML);  //ÎŞĞè×ª»¯
    }
    else{
        document.body.innerHTML=s2t(document.body.innerHTML);  //¼ÓÔØ×ª»¯Îª·±Ìå
    }
}
/*ÓÃwindow.onloadµ÷ÓÃmyfun()  ÍøÒ³´ò¿ªÊ±¼ÓÔØÒÔÏÂ·½·¨*/
window.onload=myfun;//²»ÒªÀ¨ºÅ

//*===========================================================================
//* (c)copyright 2000 liqwei
//* Email: liqwei(at)liqwei.com
//*  Site: http://www.liqwei.com/
//*===========================================================================
//* ¹¦ÄÜ£º¸ºÔğ¼ò·±Ìå×ª»»£¬ĞèÒª·ÅÔÚÒ³Ãæµ×²¿£»
//* °æ±¾£ºv1.0£»
//*===========================================================================
//¹¦ÄÜ£º×ª»»¶ÔÏó£¬Ê¹ÓÃµİ¹é£¬Öğ²ã°şµ½ÎÄ±¾£»
function transformContent(switcherId, fobj){
    if(typeof(fobj)=="object"){
        var obj=fobj.childNodes
    } else {    
        if(parseInt(fobj)!=0){ //ÔÚÒ³Ãæ³õÊ¼»¯Ê±¿ØÖÆ²»¸üĞÂµ±Ç°Ò³ÃæÓïÑÔ×´Ì¬£»
            var switcherObj = document.getElementById(switcherId);
            with(switcherObj){
                if(parseInt(isCurrentFt)){
                    innerHTML = innerHTML.replace('¼ò','·±')
                    title = title.replace('¼ò','·±')
                }else{
                    innerHTML = innerHTML.replace('·±','¼ò')
                    title = title.replace('·±','¼ò')
                }
            }
            switcherObj.innerHTML=transformText(switcherObj.innerHTML, isCurrentFt)
            switcherObj.title=transformText(switcherObj.title, isCurrentFt)    
            
            if(isCurrentFt=="1"){isCurrentFt="0"}else{isCurrentFt="1"}
            writeCookie("isCurrentFt",isCurrentFt)
        }
        var obj=document.body.childNodes
    }
    for(var i=0;i<obj.length;i++){
        var OO=obj.item(i)
        if("||BR|HR|TEXTAREA|".indexOf("|"+OO.tagName+"|")>0||OO.id==switcherId)continue;
        if(OO.title!=""&&OO.title!=null)OO.title=transformText(OO.title, isCurrentFt);
        if(OO.alt!=""&&OO.alt!=null)OO.alt=transformText(OO.alt, isCurrentFt);
        if(OO.tagName=="INPUT"&&OO.value!=""&&OO.type!="text"&&OO.type!="hidden")OO.value=transformText(OO.value, isCurrentFt);
        if(OO.nodeType==3){OO.data=transformText(OO.data, isCurrentFt)}
        else transformContent(switcherId, OO)
    }
}
//¹¦ÄÜ£º×ª»»Ö¸¶¨×Ö·û´®£»
function transformText(txt, isFt){
    if(txt==null || txt=="")return ""
    if(parseInt(isFt)){return s2t(txt)}else{return t2s(txt)}
}
//¹¦ÄÜ£º¼òÌå×Ö·û×ªÎª·±Ìå×Ö·û£»
function s2t(cc){
    var str='',ss=jtpy(),tt=ftpy();
    for(var i=0;i<cc.length;i++){
        var c = cc.charAt(i);
        if(c.charCodeAt(0)>10000&&ss.indexOf(c)!=-1)str+=tt.charAt(ss.indexOf(c));
          else str+=c;
    }
    return str;
}
//¹¦ÄÜ£º·±Ìå×Ö·û×ªÎª¼òÌå×Ö·û£»
function t2s(cc){
    var str='',ss=jtpy(),tt=ftpy();
    for(var i=0;i<cc.length;i++){
        var c = cc.charAt(i);
        if(c.charCodeAt(0)>10000&&tt.indexOf(c)!=-1)str+=ss.charAt(tt.indexOf(c));
          else str+=c;
    }
    return str;
}
function jtpy(){
    return '°¨°ª°­°®°¿°À°Â°Ó°Õ°Ú°Ü°ä°ì°í°ï°ó°÷°ù°ş±¥±¦±¨±«±²±´±µ±·±¸±¹±Á±Ê±Ï±Ğ±Õ±ß±à±á±ä±ç±è±î±ñ±ô±õ±ö±÷±ı²¦²§²¬²µ²·²¹²Î²Ï²Ğ²Ñ²Ò²Ó²Ô²Õ²Ö²×²Ş²à²á²â²ã²ï²ó²ô²õ²ö²÷²ø²ù²ú²û²ü³¡³¢³¤³¥³¦³§³©³®³µ³¹³¾³Â³Ä³Å³Æ³Í³Ï³Ò³Õ³Ù³Û³Ü³İ³ã³å³æ³è³ë³ì³ï³ñ³ó³÷³ø³ú³û´¡´¢´¥´¦´«´¯´³´´´¸´¿´Â´Ç´Ê´Í´Ï´Ğ´Ñ´Ó´Ô´Õ´Ü´í´ï´ø´ûµ£µ¥µ¦µ§µ¨µ¬µ®µ¯µ±µ²µ³µ´µµµ·µºµ»µ¼µÁµÆµËµĞµÓµİµŞµãµæµçµíµöµ÷µüµıµş¶¤¶¥¶§¶©¶«¶¯¶°¶³¶·¶¿¶À¶Á¶Ä¶Æ¶Í¶Ï¶Ğ¶Ò¶Ó¶Ô¶Ö¶Ù¶Û¶á¶ì¶î¶ï¶ñ¶ö¶ù¶û¶ü·¡·¢·£·§·©·¯·°·³·¶···¹·Ã·Ä·É·Ï·Ñ·×·Ø·Ü·ß·à·á·ã·æ·ç·è·ë·ì·í·ï·ô·ø¸§¸¨¸³¸´¸º¸¼¸¾¸¿¸Ã¸Æ¸Ç¸É¸Ï¸Ñ¸Ó¸Ô¸Õ¸Ö¸Ù¸Ú¸Ş¸ä¸é¸ë¸ó¸õ¸ö¸ø¹¨¹¬¹®¹±¹³¹µ¹¹¹º¹»¹Æ¹Ë¹Ğ¹Ø¹Û¹İ¹ß¹á¹ã¹æ¹è¹é¹ê¹ë¹ì¹î¹ñ¹ó¹ô¹õ¹ö¹ø¹ú¹ıº§º«ºººÒº×ºØºáºäºèºìºóºø»¤»¦»§»©»ª»­»®»°»³»µ»¶»·»¹»º»»»½»¾»À»Á»Æ»Ñ»Ó»Ô»Ù»ß»à»á»â»ã»ä»å»æ»ç»ë»ï»ñ»õ»ö»÷»ú»ı¼¢¼¥¼¦¼¨¼©¼«¼­¼¶¼·¼¸¼»¼Á¼Ã¼Æ¼Ç¼Ê¼Ì¼Í¼Ğ¼Ô¼Õ¼Ö¼Ø¼Û¼İ¼ß¼à¼á¼ã¼ä¼è¼ê¼ë¼ì¼î¼ï¼ğ¼ñ¼ò¼ó¼õ¼ö¼÷¼ø¼ù¼ú¼û¼ü½¢½£½¤½¥½¦½§½¬½¯½°½±½²½´½º½½½¾½¿½Á½Â½Ã½Ä½Å½È½É½Ê½Î½Ï½Õ½×½Ú¾¥¾ª¾­¾±¾²¾µ¾¶¾·¾º¾»¾À¾Ç¾É¾Ô¾Ù¾İ¾â¾å¾ç¾é¾î½Ü½à½á½ë½ì½ô½õ½ö½÷½ø½ú½ı¾¡¾¢¾£¾õ¾ö¾÷¾ø¾û¾ü¿¥¿ª¿­¿Å¿Ç¿Î¿Ñ¿Ò¿Ù¿â¿ã¿ä¿é¿ë¿í¿ó¿õ¿ö¿÷¿ù¿úÀ¡À£À©À«À¯À°À³À´ÀµÀ¶À¸À¹ÀºÀ»À¼À½À¾À¿ÀÀÀÁÀÂÀÃÀÄÀÌÀÍÀÔÀÖÀØÀİÀàÀáÀéÀëÀïÀğÀñÀöÀ÷ÀøÀùÀúÁ¤Á¥Á©ÁªÁ«Á¬Á­Á¯Á°Á±Á²Á³Á´ÁµÁ¶Á·Á¸Á¹Á½Á¾ÁÂÁÆÁÉÁÍÁÔÁÙÁÚÁÛÁİÁŞÁäÁåÁèÁéÁëÁìÁóÁõÁúÁûÁüÁıÂ¢Â£Â¤Â¥Â¦Â§Â¨Â«Â¬Â­Â®Â¯Â°Â±Â²Â³Â¸Â»Â¼Â½Â¿ÂÀÂÁÂÂÂÅÂÆÂÇÂËÂÌÂÍÂÎÂÏÂĞÂÒÂÕÂÖÂ×ÂØÂÙÂÚÂÛÂÜÂŞÂßÂàÂáÂâÂæÂçÂèÂêÂëÂìÂíÂîÂğÂòÂóÂôÂõÂöÂ÷ÂøÂùÂúÃ¡Ã¨ÃªÃ­Ã³Ã´Ã¹Ã»Ã¾ÃÅÃÆÃÇÃÌÃÎÃÕÃÖÃÙÃàÃåÃíÃğÃõÃöÃùÃúÃıÄ±Ä¶ÄÆÄÉÄÑÄÓÄÔÄÕÄÖÄÙÄåÄìÄíÄğÄñÄôÄöÄ÷ÄøÄûÄüÄşÅ¡Å¢Å¥Å¦Å§Å¨Å©Å±ÅµÅ·Å¸Å¹Å»Å½ÅÌÅÓ¹ú°®ÅâÅçÅôÆ­Æ®ÆµÆ¶Æ»Æ¾ÆÀÆÃÆÄÆËÆÌÆÓÆ×ÆêÆëÆïÆñÆôÆøÆúÆıÇ£Ç¤Ç¥Ç¦Ç¨Ç©Ç«Ç®Ç¯Ç±Ç³Ç´ÇµÇ¹ÇºÇ½Ç¾Ç¿ÇÀÇÂÇÅÇÇÇÈÇÌÇÏÇÔÇÕÇ×ÇáÇâÇãÇêÇëÇìÇíÇîÇ÷ÇøÇûÇıÈ£È§È¨È°È´ÈµÈÃÈÄÈÅÈÆÈÈÈÍÈÏÈÒÈÙÈŞÈíÈñÈòÈóÈ÷ÈøÈúÈüÉ¡É¥É§É¨É¬É±É´É¸É¹ÉÁÉÂÉÄÉÉÉËÉÍÉÕÉÜÉŞÉãÉåÉèÉğÉóÉôÉöÉøÉùÉşÊ¤Ê¥Ê¦Ê¨ÊªÊ«Ê¬Ê±Ê´ÊµÊ¶Ê»ÊÆÊÍÊÎÊÓÊÔÊÙÊŞÊàÊäÊéÊêÊôÊõÊ÷ÊúÊıË§Ë«Ë­Ë°Ë³ËµË¶Ë¸Ë¿ËÇËÊËËËÌËÏËĞËÓËÕËßËàËäËçËêËïËğËñËõËöËøÌ¡Ì¢Ì§Ì¯Ì°Ì±Ì²Ì³Ì·Ì¸Ì¾ÌÀÌÌÌÎÌĞÌÚÌÜÌàÌâÌåÌëÌõÌùÌúÌüÌıÌşÍ­Í³Í·Í¼Í¿ÍÅÍÇÍÉÍÑÍÒÍÔÍÕÍÖÍİÍàÍäÍåÍçÍòÍøÎ¤Î¥Î§ÎªÎ«Î¬Î­Î°Î±Î³Î½ÎÀÎÂÎÅÎÆÎÈÎÊÎÍÎÎÎÏÎĞÎÑÎØÎÙÎÚÎÜÎŞÎßÎâÎëÎíÎñÎóÎıÎşÏ®Ï°Ï³Ï·Ï¸ÏºÏ½Ï¿ÏÀÏÁÏÃÏÇÏÊÏËÏÌÏÍÏÎÏĞÏÔÏÕÏÖÏ×ÏØÏÚÏÛÏÜÏßÏáÏâÏçÏêÏìÏîÏôÏúÏşĞ¥Ğ«Ğ­Ğ®Ğ¯Ğ²Ğ³Ğ´ĞºĞ»Ğ¿ĞÆĞËĞÚĞâĞåĞéĞêĞëĞíĞ÷ĞøĞùĞüÑ¡Ñ¢Ñ¤Ñ§Ñ«Ñ¯Ñ°Ñ±ÑµÑ¶Ñ·Ñ¹Ñ»Ñ¼ÑÆÑÇÑÈÑËÑÌÑÎÑÏÑÕÑÖÑŞÑáÑâÑåÑèÑéÑìÑîÑïÑñÑôÑ÷ÑøÑùÑşÒ¡Ò¢Ò£Ò¤Ò¥Ò©Ò¯Ò³ÒµÒ¶Ò½Ò¿ÒÃÒÅÒÇÒÍÒÏÒÕÒÚÒäÒåÒèÒéÒêÒëÒìÒïÒñÒõÒøÒûÓ£Ó¤Ó¥Ó¦Ó§Ó¨Ó©ÓªÓ«Ó¬Ó±Ó´ÓµÓ¶Ó¸Ó»Ó½Ó¿ÓÅÓÇÓÊÓËÓÌÓÎÓÕÓßÓãÓæÓéÓëÓìÓïÓõÓùÓüÓşÔ¤Ô¦Ô§Ô¨Ô¯Ô°Ô±Ô²ÔµÔ¶Ô¸Ô¼Ô¾Ô¿ÔÀÔÁÔÃÔÄÔÆÔÇÔÈÔÉÔËÔÌÔÍÔÎÔÏÔÓÔÖÔØÔÜÔİÔŞÔßÔàÔäÔæÔîÔğÔñÔòÔóÔôÔùÔúÔıÔşÕ¡Õ¢Õ©Õ«Õ®Õ±ÕµÕ¶Õ·Õ¸Õ»Õ½ÕÀÕÅÕÇÕÊÕËÕÍÕÔÕİÕŞÕàÕâÕêÕëÕìÕïÕòÕóÕõÕöÕøÖ¡Ö£Ö¤Ö¯Ö°Ö´Ö½Ö¿ÖÀÖÄÖÊÖÓÖÕÖÖÖ×ÖÚÖßÖáÖåÖçÖèÖíÖîÖïÖòÖõÖöÖüÖıÖş×¤×¨×©×ª×¬×®×¯×°×±×³×´×¶×¸×¹×º×»×Ç×È×Ê×Õ×Ù×Û×Ü×İ×Ş×ç×é×êÖÂÖÓÃ´ÎªÖ»Ğ××¼Æô°åÀïö¨ÓàÁ´Ğ¹';
}
function ftpy(){
    return '°}Ì@µKÛÂOÒ\ŠW‰ÎÁT”[”¡îCŞk½OÍ½‰æ^Ör„ƒï–ŒšˆóõUİ…Øä^ªN‚ä‘v¿‡¹P®…”Àé]ß…¾ÙH×ƒŞqŞpü‚°TlIÙe”Pï“ÜÀãKñgÊNÑa…¢ĞQšˆ‘M‘K NÉnÅ“‚}œæú‚ÈƒÔœyŒÓÔŒ”v“½Ïsğ’×‹ÀpçP®bêUîˆö‡LéLƒ”ÄcS•³ânÜ‡Ø‰mêÒr“Î·Q‘ÍÕ\òG°VßtñYuıXŸë›_ÏxŒ™® ÜP»I¾Iáh™»NäzërµAƒ¦Ó|Ì‚÷¯êJ„“åN¼ƒ¾bŞoÔ~ÙnÂ”Ê[‡èÄ…²œ¸Zåeß_§ÙJ“ú†Îà“ÛÄ‘‘„ÕQ—®”“õühÊ™n“vu¶\Œ§±IŸôà‡”³œìßf¾†üc‰|ëŠÕáÕ{µşÕ™¯Bá”í”åVÓ†–|„Ó—ƒöôY Ùªš×xÙ€åƒå‘”à¾„ƒ¶ê Œ¦‡îDâgŠZùZî~ÓºğIƒº –ğDÙE°lÁPéy¬mµ\âCŸ©¹ ØœïˆÔL¼ïwUÙM¼Š‰Š^‘¼SØS—÷ähïL¯‚ñT¿pÖSøPÄwİ—“áİoÙxÑ}Ø“Ó‡‹D¿`Ô“â}ÉwÖÚs¶’ÚMŒù„‚ä“¾VÅVæ€”Røéwãt‚€½oıŒmì–Ø•âhœÏ˜‹Ù‰òĞMî™„êPÓ^ğ^‘TØVÒÎùšwı”é|Ü‰Ô™™ÙF„£İLå‡øß^ñ”ínhéuúQÙR™MŞZø™¼táá‰Ø×oœû‘ô‡WÈA®‹„Ô’‘Ñ‰Äšg­hß€¾“Q†¾¯ˆŸ¨œoüSÖe“]İxš§ÙV·x•ş Z¡ÖMÕdÀLÈœ†â·«@Ø›µœ“ô™C·eğ‡×Iëu¿ƒ¾ƒ˜Oİ‹¼‰”D×ËE„©úÓ‹Ó›ëHÀ^¼oŠAÇvîaÙZâ›ƒrñ{š±OˆÔ¹{égÆD¾}ÀO™z‰Aû|’ş“ìº†ƒ€œpË]™‘èbÛ`ÙvÒŠæIÅ„¦ğTuR¾{ÊY˜ªª„ÖváuÄz²òœ‹É”‡ãq³CƒeÄ_ïœÀU½gŞIİ^·MëA¹Çoó@½›îiìoçR½¯d¸‚œQ¼mıÅfñxÅe“şä‘Ö„¡ùN½‚Ü½YÕ]ŒÃ¾oå\ƒHÖ”ßM•x a±M„ÅÇGÓX›QÔE½^âxÜŠòEé_„Pîwš¤Õn‰¨‘©“¸ìÑÕF‰Kƒ~Œ’µV•ç›rÌh¸Qğ¢”UéŸÏÅDÈRíÙ‡Ë{™Ú”r»@ê@Ìm‘×”ˆÓ[‘ĞÀ| €E“Æ„Ú³˜·èD‰¾îœI»hëxÑYõ¶Yû…–„îµ[•Ñrë`‚zÂ“ÉßBç ‘ziºŸ”¿Ä˜æœ‘ÙŸ’¾š¼Z›öƒÉİvÕ¯Ÿß|ç‚«CÅRà÷[„CÙUıgâœRì`XîIğs„¢ıˆÃ@‡µ»\‰Å”në]˜ÇŠä“§ºtÌJ±RïB] t“ïûuÌ”ô”ÙTµ“ä›ê‘óH…ÎäX‚HŒÒ¿|‘]V¾Gn”Œ\´y’àİ†‚öœS¾]Õ“Ì}Á_ß‰èŒ»jò…ñ˜½j‹Œ¬”´aÎ›ñRÁR†áÙIûœÙuß~Ã}²mğzĞUMÖ™Øˆå^ãTÙQ÷áüq›]æVéT‚ƒåi‰ôÖi›Ò’¾d¾’Rœç‘‘é}øQã‘Ö‡Ö\®€âc¼{ëy“ÏÄXÀô[ğHÄ”f“Óá„øBÂ™ımè‡æ‡™ªŸå¸”Qôâo¼~Ä“âŞr¯‘ÖZšWútšª‡Ia±Pı‹‡øÛÙr‡Šùiò_ïhîlØšÌO‘{ÔuŠîH“ää˜ã×VÄšıRòTØM†™šâ—‰Ó™ ¿’LâTãUßwºÖtåXãQ“œ\×l‰q˜Œ†Ü ËNŠ“Œæ@˜ò†ÌƒSÂN¸[¸`šJÓHİpšäƒAí•Õˆ‘c­‚¸FÚ……^Ü|òŒıxïE™à„ñ…sùo×Œğˆ”_À@ŸáígÕJ¼x˜s½qÜ›äJéc™¢Ë_öwÙ‚ã†Êò}’ß­š¢¼†ºY•ñéWê„Ù ¿˜‚ûÙpŸı½BÙd”z‘ØÔO¼Œ‹ğÄIBÂ•ÀK„ÙÂ}Ÿª{ñÔŠŒÆ•rÎgŒ×Rñ‚„İáŒï—Ò•Ô‡‰Û«F˜Ğİ”•øÚHŒÙĞg˜äØQ”µ›ëpÕl¶í˜Õf´T q½zï•Â–‘ZíÔAÕb”\ÌKÔVÃCëm½—šqŒO“p¹S¿s¬æi«H“é”E”‚Ø°c©‰¯×TÕ„šUœ« Cı¿lòvÖ`äRî}ówŒÏ—lÙNèFdÂ ŸNã~½yî^ˆD‰TˆFîjÍ‘Ã“ørñWñ„™E¸DÒm³îBÈf¾Wífß`‡ú ‘H¾SÈ”‚¥ƒ^¾•Ö^ĞlœØÂ„¼y·€†–®Y“ëÎœu¸C†èæuõÕ_ŸoÊ…Ç‰]ìF„ÕÕ`åa ŞÒuÁ•ãŠ‘ò¼šÎrİ {‚bªMBåvõrÀwûyÙtã•éeï@ëU¬F«I¿hğWÁw‘—¾€ûè‚àlÔ”í‘í—Ê’äN•Ô‡[Ï…f’¶”yÃ{ÖCŒ‘aÖxä\á…Åd›°çnÀCÌ“‡uíšÔS¾wÀmÜ‘Òßx°_½kŒW„ìÔƒŒ¤ñZÓ–Óßd‰ºøfø††¡†Ó éŸŸû}‡Àî†éØW…’³©ÖVòø„—î“P¯ƒê–°WğB˜Ó¬“uˆòßb¸GÖ{Ë ”í“˜IÈ~átãîUßzƒx¤ÏË‡ƒ|‘›ÁxÔ„×hÕx×g®À[Êaêãyï‹™Ñ‹ëú—‘ªÀt¬“Î IŸÉÏ‰·f†Ñ“í‚ò°bÛxÔœ¥ƒ‘nà]â™ªqß[ÕTİ›ô~OŠÊÅcZÕZ»n¶Rªz×uîAñSøxœYŞ@ˆ@†TˆA¾‰ßhîŠ¼sÜSè€[»›‚é†ë…ày„òëEß\ÌNáj•íësÄİd”€•ºÙÚEóvè——¸^ØŸ“ñ„tÉÙ\Ù›¼™„ÜˆåélÔpıS‚ùšÖ±K”Øİšä—£‘ğ¾`ˆq¤Ù~Ã›ÚwÏUŞHæNß@Ø‘á˜‚ÉÔ\æ‚ê‡’ê± ªb¬à×C¿—ÂšˆÌ¼ˆ“´”SÃÙ|æR½K·NÄ[Ğ\ÖaİS°™•ƒóEØiÖTÕD T²š‡ÚÙAèTºBñvŒ£´uŞDÙ˜¶ÇfÑbŠy‰Ñ îåFÙ˜‰‹¾YÕáÆÙYnÛ™¾C¿‚¿vàuÔ{½Mè¿@çŠüNéëbƒ´œÊ†¢é›ÑeìZğNå€›ª';
}
//¹¦ÄÜ£º»ñÈ¡Ö¸¶¨Ãû³ÆµÄ Cookie Öµ£»
function readCookie(name) {
  var value = "";
  if(document.cookie.length > 0){
      var prefix = name + "="; 
      var begin = document.cookie.indexOf(prefix);
      if (begin != -1) {
            begin += prefix.length;
            var end = document.cookie.indexOf(";", begin);
            if (end == -1)    end = document.cookie.length;
            value = unescape(document.cookie.substring(begin, end));
      }
  }
  return value;
}
//¹¦ÄÜ£ºÉèÖÃÖ¸¶¨Ãû³ÆµÄ Cookie Öµ£»
function writeCookie(name, value, days){
    var argv = writeCookie.arguments;
    var argc = writeCookie.arguments.length;
    var days = (argc>2)?argv[2]:null;
    if(days!=null){
        var expireDate = new Date();
        expireDate.setTime(expireDate.getTime() + (days*1000*3600*24));
    }
    document.cookie = name+"="+escape(value) + ((days==null)?"":("; expires=" +expireDate.toGMTString())) +"; path=/";
}

var isCurrentFt;
//¹¦ÄÜ£ºÒ³Ãæ³õÊ¼»¯º¯Êı
//    switcherId  ÎÄ×ÖÁ´½Ó£¬µã»÷¸ºÔğ¼ò·±ÇĞ»»£¬½¨Òé£º<a id="switcher_link" href="#">·±ÌåÖĞÎÄ</a>£»
//    isDefaultFt µ±Ç°ÎÄµµÄ¬ÈÏÊÇ·ñÎª·±ÌåÖĞÎÄ£»
//    delay Ò³Ãæ¼ÓÔØºóµÄ×ª»»ÑÓ³ÙÊ±¼ä£¬µ¥Î»ºÁÃë£»
//    Ê¹ÓÃµÄ Cookie ±äÁ¿Ãû³Æ£ºisCurrentFt
function initPageLanguage(switcherId, isDefaultFt, delay){
    isDefaultFt = isDefaultFt?"1":"0";
    var switcherObj=document.getElementById(switcherId)
    isCurrentFt=readCookie("isCurrentFt")
    if(isCurrentFt==null || isCurrentFt=="") isCurrentFt=isDefaultFt
    with(switcherObj){
        if(typeof(document.all)!="object") {//·ÇIEä¯ÀÀÆ÷
            href="javascript:transformContent('"+ switcherId +"');"
        }else{
            href="#";
            onclick= new Function("transformContent('"+ switcherId +"');return false;")
        }
        if(title == null || title=="") title = "µã»÷ÒÔ·±ÌåÖĞÎÄ·½Ê½ä¯ÀÀ";
        if(parseInt(isCurrentFt)) {
            innerHTML = innerHTML.replace('·±','¼ò')
            title = title.replace('·±','¼ò')
        }
        innerHTML = transformText(innerHTML, parseInt(isCurrentFt)?0:1)
        title = transformText(title, parseInt(isCurrentFt)?0:1)
    }        
    if(isCurrentFt!=isDefaultFt){setTimeout("transformContent('"+ switcherId +"',0)",delay)}
}
// ³õÊ¼»¯µ÷ÓÃ½Ó¿Ú
//initPageLanguage("switcher_link", false, 50);