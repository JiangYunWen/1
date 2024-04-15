	if [ -f data/var/boa/wan_config.ini ];then
		echo " data/var/boa/wan_config.ini is ok"
	else
		cp -f /system/web/wan_config.ini /data/var/boa/wan_config.ini
	fi

	chmod 777 /data/var/boa/wan_config.ini

	if [ -f /data/var/boa/language.ini ];then
		echo " data/var/boa/language.ini is ok"
	else
		cp -f /system/web/language.ini /data/var/boa/language.ini
	fi
	chmod 0777 /data/var/boa/language.ini 

	if [ -f /data/var/boa/wantype.ini ];then
		echo " data/var/boa/wantype.ini is ok"
	else
		cp -f /system/web/wantype.ini /data/var/boa/wantype.ini
	fi
	chmod 0777 /data/var/boa/wantype.ini 
