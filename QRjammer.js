/**
*
* QR Jammer
* v 1.0
* by BeecherTrouble : beechbot.com
* special thanks to Google and Google Charts
* requires jquery ...
*
*/
var QRjammer = (function() {
	
	var QR = {},
		size,addCSS,appendTo,addButton,buttonSize,buttonClass,buttonAppendTo, JamJar;
	
	/* ===== funcs ==== */
	QR.addJamCSS = function() {
		
		var css = '<style id="QRJ_style">'
				+ '#QRJ_jamjar {position:fixed;top:0px;right:-20px;bottom:100%;opacity:0;left:0px;display:block;overflow-x:hidden;overflow-y:scroll;width:100%;background:rgba(0,0,0,0.5) no-repeat center center;transition:all 0.3s ease;}'
				+ '#QRJ_jamjar.showQR{bottom:0%;opacity:1;}'
				+ '#QRJ_jamjar_content {position:relative;display:block;text-align:center;padding:2em 2em 1em;color:#fff;background:#000;max-width:' + size + 'px;margin:4em auto 2em;}'
				+ '#QRJ_jamjar_content img {position:relative;display:block;margin:0px auto;max-width:100%;}'
				+ '#QRJ_shortURL_wrap {font-size:2em;padding:0.5em 0 0;line-height:1em;}'
				+ '#QRJ_close {position:absolute;top:0.5em;right:0.5em;display:block;cursor:pointer;padding:1em 1em 0.75em;color:#fff;background:#000;background:rgba(0,0,0,0.25);line-height:1;}'
				+ '.QRJ_button {background:#fff;color:#00;textdisplay:inline-block;position:relative;padding:0 0.25em;line-height:1;text-align:center;border:0px none !important;cursor:pointer;opacity:0.5;-moz-transition:opacity 0.4s ease;-webkit-transition:opacity 0.4s ease;-o-transition:opacity 0.4s ease;-ms-transition:opacity 0.4s ease;transition:opacity 0.4s ease;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;-o-box-sizing:border-box;-ms-box-sizing:border-box;box-sizing:border-box;}'
				+ '.QRJ_fixed-top-left {position:fixed;top:0.25em;left:0.25em;}'
				+ '.QRJ_fixed-top-right {position:fixed;top:0.25em;right:0.25em;}'
				+ '.QRJ_fixed-bottom-left {position:fixed;bottom:0.25em;left:0.25em;}'
				+ '.QRJ_fixed-bottom-right {position:fixed;bottom:0.25em;right:0.25em;}'
			+ '</style>';
					
		if($("#QRJ_style").length <= 0)
			$('head').prepend(css);
		
	} // addJamCSS
	QR.addButton = function() {
		
		var button = '<a class="QRJ_button ' + buttonClass + '" title="click for QR and short URL" style="font-size:' + buttonSize + ';">&#9875;</a>';
		
		var el = !buttonAppendTo ? $("body") : buttonAppendTo;
		
		if($(".QRJ_button").length <= 0)
			el.append(button);
			
		$(".QRJ_button").on('click', function(e) { e.preventDefault(); QR.show(); });
		
	} // addButton
	QR.addJamJar = function() {
		
		JamJar = '<div id="QRJ_jamjar"><a id="QRJ_close">close</a><div id="QRJ_jamjar_content"></div></div>';
		
		if($("#QRJ_jamjar").length <= 0)
			$('body').append(JamJar);
			
		$("#QRJ_close").on('click', function(e) { e.preventDefault(); QR.hide(); });
		
	} // addJamJar
	QR.show = function() {
		
		QR.addQR();
		
		var el = !appendTo ? $("#QRJ_jamjar") : appendTo;
		
		el.addClass('showQR');

		
	} // show
	QR.hide = function() {
		
		var el = !appendTo ? $("#QRJ_jamjar") : appendTo;
		
		el.removeClass('showQR');
		
	} // hide
	QR.init = function(args) {
		
		QR.defs = args || {};
		
		size = QR.defs.size || 300;
		QR.loc = QR.defs.loc || window.location.href;
		addCSS = QR.defs.addCSS || true;
		appendTo = QR.defs.appendTo || false;
		addButton = QR.defs.addButton || true;
		buttonSize = QR.defs.buttonSize || '2em';
		buttonClass = QR.defs.buttonClass || 'QRJ_fixed-bottom-right';
		buttonAppendTo = QR.defs.buttonAppendTo || false;
				
		// thanks google!	
		QR.QRSRC = 'https://chart.googleapis.com/chart?cht=qr&chs=' + size + 'x' + size + '&chl=' + escape(QR.loc);
				
		if(addCSS)
			QR.addJamCSS();
			
		if(addButton)
			QR.addButton();
			
		if(!appendTo) 
			QR.addJamJar();
			
	} // init
	QR.getQR = function() {
		
		QR.loc = QR.defs.loc || window.location.href;
		QR.shortURL = QR.loc;
		QR.getShortURL();
		QR.QRSRC = 'https://chart.googleapis.com/chart?cht=qr&chs=' + size + 'x' + size + '&chl=' + escape(QR.loc);	
		
	} // getQR
	QR.getShortURL = function() {
				
		$.ajax('https://www.googleapis.com/urlshortener/v1/url', {
			data : JSON.stringify( {"longUrl": QR.loc}),
			contentType : 'application/json',
			type : 'POST',
			dataType: "json",
			success: function (d) {
				
				QR.shortURL = d.id;
				$("#QRJ_shortURL_wrap").text(QR.shortURL);
				
			}
		});
		
	} // getShortURL
	QR.addQR = function() {
		
		// update QR?
		QR.getQR();
						
		$("#QRJ_jamjar_content").html('<img class="QRJ_img" src="' + QR.QRSRC + '" alt="QR for : ' + QR.loc + '" /><div id="QRJ_shortURL_wrap"></div>');

				
	}  //

	
	return QR;
			
}()); // QRjammer	