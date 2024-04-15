var chainedTimerRequests = {
	counter: 0,
	append: function(url, cbSuccess) {
		try {
			var node = { _URL: url, _CB_SUCC: cbSuccess, _NEXT: null };
			if (!chainedTimerRequests.chainHead) {
				chainedTimerRequests.chainHead = node;
				chainedTimerRequests.chainLength = 1;
			} else {
				chainedTimerRequests.chainIter = chainedTimerRequests.chainHead;
				while (chainedTimerRequests.chainIter._NEXT) {
					chainedTimerRequests.chainIter = chainedTimerRequests.chainIter._NEXT;
				}
				chainedTimerRequests.chainIter._NEXT = node;
				chainedTimerRequests.chainLength++;
			}
		} catch (e) {
			alert("chainTimerRequests.append³ö´í£º\r\n" + e.description);
		}
	},
	start: function(interval, keepalive) {
		chainedTimerRequests.counter++;
		chainedTimerRequests.chainTimer = null;
		
		if (!chainedTimerRequests.chainTimerStarted) {
			chainedTimerRequests.chainTimerStarted = true;
			chainedTimerRequests.chainIter = chainedTimerRequests.chainHead;
			chainedTimerRequests.chainTimeout = interval;
			
			if (keepalive == true) {
				setInterval(function() {
					chainedTimerRequests.log("[CHAINED_TIMER] KEEPALIVE: check begin, counter=" + 
						chainedTimerRequests.counter + ", last=" + chainedTimerRequests.lastCount);
					if (!chainedTimerRequests.lastCount) {
						chainedTimerRequests.lastCount = chainedTimerRequests.counter;
					} else if (chainedTimerRequests.chainTimer == null && 
						chainedTimerRequests.lastCount == chainedTimerRequests.counter) {
						chainedTimerRequests.log("[CHAINED_TIMER] KEEPALIVE: resurrected from death");
						chainedTimerRequests.counter = 0;
						chainedTimerRequests.start(chainedTimerRequests.chainTimeout);
					}
					chainedTimerRequests.lastCount = chainedTimerRequests.counter;
				}, chainedTimerRequests.chainLength * interval * 8);
			}
		}
		
		if (share.data("gIgnoreRequests")) {
			chainedTimerRequests.chainTimer = setTimeout(chainedTimerRequests.start, chainedTimerRequests.chainTimeout * 4);
			return;
		}
		
		chainedTimerRequests.log("[CHAINED_TIMER] \"" + chainedTimerRequests.chainIter._URL + "\" request begin @ " + chainedTimerRequests.counter);
		
		$.ajax({
			url: chainedTimerRequests.chainIter._URL,
			cache: false,
			timeout: 10000,
	
			success: function(result) {
				chainedTimerRequests.log("[CHAINED_TIMER] \"" + chainedTimerRequests.chainIter._URL + "\" request end, executing callback");
				
				if (chainedTimerRequests.chainIter._CB_SUCC)
					chainedTimerRequests.chainIter._CB_SUCC(result);
					
				chainedTimerRequests.log("[CHAINED_TIMER] \"" + chainedTimerRequests.chainIter._URL + "\" callback end, go on to next request");
			},
	
			error: function(jqXHR, textStatus, errorThrown) {
				chainedTimerRequests.log("[CHAINED_TIMER] \"" + chainedTimerRequests.chainIter._URL + "\" request error: \"" + textStatus + "\", go on to next request");
			},

			complete: function(xmlHttpHeader, textStatus) {
				xmlHttpHeader = null;
				
				if (chainedTimerRequests.chainIter._NEXT) {
					chainedTimerRequests.chainIter = chainedTimerRequests.chainIter._NEXT;
					chainedTimerRequests.start(chainedTimerRequests.chainTimeout);
				} else {
					chainedTimerRequests.chainIter = chainedTimerRequests.chainHead;
					chainedTimerRequests.chainTimer = setTimeout(chainedTimerRequests.start, chainedTimerRequests.chainTimeout);
				}
			}
		});
	},
	log: function(string) {
		if (window.console) {
			var time = new Date();
			var h = parseInt(time.getHours());
			var m = parseInt(time.getMinutes());
			var s = parseInt(time.getSeconds());
			h = (h < 10) ? ("0" + h) : ("" + h);
			m = (m < 10) ? ("0" + m) : ("" + m);
			s = (s < 10) ? ("0" + s) : ("" + s);
			window.console.log(h + ":" + m + ":" + s + "  " + string);
		}
	}
};