/**
*
* QR Jammer
* by BeecherTrouble : beechbot.com
* special thanks to Google and Google Charts
* requires jquery ...
*
*/
(function($, scope) {
		
	var QR = {
			shortURL : undefined
		},
		size, 
		addCSS, 
		appendTo, 
		addButton,
		buttonSize,
		buttonClass,
		buttonAppendTo, 
		JamJar = '<div id="QRJ_jamjar"><a id="QRJ_close">close</a><span id="QRJ_vcenter"></span><div id="QRJ_jamjar_content_wrap"><div id="QRJ_jamjar_content"></div></div></div>';
	
	/** 
	* private
	*/
	function _addJamCSS(size) {
		
		var css = '<style id="QRJ_style" type="text/css">'
				+ '#QRJ_jamjar,'
				+ '#QRJ_jamjar_content,'
				+ '#QRJ_jamjar_content img,'
				+ '#QRJ_close'
				+ '#QRJ_vcenter {'
						+ 'position:relative;'
						+ 'display:block;'
					+ '}'
				+ '#QRJ_jamjar {'
						+ 'position:fixed;'
						+ 'top:0px;'
						+ 'right:-25px;'
						+ 'bottom:100%;'
						+ 'left:0px;'
						+ 'padding:0 25px 0 0;'
						+ 'overflow-x:hidden;'
						+ 'overflow-y:scroll;'
						+ 'width:107%;'
						+ 'opacity:0;'
						+ 'font-size:16px;'
						+ 'background:rgba(0,0,0,0.5);'
						+ 'box-sizing:content-box;'
						+ 'transition:all 0.3s ease;'
						+ 'z-index:999999999;'
					+ '}'
				+ '#QRJ_jamjar.showQR{'
						+ 'bottom:0%;'
						+ 'opacity:1;'
					+ '}'
				+ '#QRJ_vcenter {'
						+ 'display:inline-block;'
						+ 'height:100%;'
						+ 'width:1px;'
						+ 'margin-left:-5px;'
						+ 'vertical-align:middle;'
					+ '}'
				+ '#QRJ_jamjar_content_wrap {'
						+ 'display:inline-block;'
						+ 'vertical-align:middle;'
						+ 'width:100%;'
					+ '}'
				+ '#QRJ_jamjar_content {'
						+ 'text-align:center;'
						+ 'padding:2em 2em 1em;'
						+ 'color:#fff;'
						+ 'background:#000;'
						+ 'max-width:' + size + 'px;'
						+ 'margin:2em auto;'
					+ '}'
				+ '#QRJ_jamjar_content img {'
						+ 'margin:0px auto;'
						+ 'width:100%;'
						+ 'height:auto;'
						+ 'max-width:100%;'
					+ '}'
				+ '#QRJ_shortURL_wrap {'
						+ 'font-size:1.5em;'
						+ 'padding:0.5em 0 0;'
						+ 'line-height:1;'
					+ '}'
				+ '#QRJ_close {'
						+ 'position:fixed;'
						+ 'top:0.5em;'
						+ 'right:0.5em;'
						+ 'cursor:pointer;'
						+ 'padding:1em 1em 0.75em;'
						+ 'color:#fff;'
						+ 'background:rgba(0,0,0,0.25);'
						+ 'line-height:1;'
						+ 'transition:all 0.3s ease;'
					+ '}'
				+ '#QRJ_close:focus,'
				+ '#QRJ_close:hover {'
						+ 'background:rgba(0,0,0,0.5);'
					+ '}'
				+ '.QRJ_button {'
						+ 'background:#fff;'
						+ 'color:#000;'
						+ 'display:inline-block;'
						+ 'position:relative;'
						+ 'padding:0 0.25em;'
						+ 'line-height:1;'
						+ 'text-align:center;'
						+ 'border:0px none !important;'
						+ 'cursor:pointer;'
						+ 'opacity:0.5;'
						+ 'transition:opacity 0.4s ease;'
						+ 'box-sizing:border-box;'
						+ 'z-index:999999999;'
					+ '}'
				+ '.QRJ_fixed-top-left {position:fixed;top:0.25em;left:0.25em;}'
				+ '.QRJ_fixed-top-right {position:fixed;top:0.25em;right:0.25em;}'
				+ '.QRJ_fixed-bottom-left {position:fixed;bottom:0.25em;left:0.25em;}'
				+ '.QRJ_fixed-bottom-right {position:fixed;bottom:0.25em;right:0.25em;}'
			+ '</style>';
					
		if($("#QRJ_style").length <= 0)
			$('head').prepend(css);
		
	}; // _addJamCSS()
	
	 function _addButton() {
		
		var button = '<a class="QRJ_button ' + buttonClass + '" title="click for QR and short URL" style="font-size:' + buttonSize + ';">&#9875;</a>';
		
		var el = !buttonAppendTo ? $("body") : buttonAppendTo;
		
		if($(".QRJ_button").length <= 0)
			el.append(button);
					
	}; // _addButton()
	
	function _addJamJar() {
				
		if($("#QRJ_jamjar").length <= 0)
			$('body').append(JamJar);
					
	}; // _addJamJar()
	
	function _def(ting, def) {
		
		return ting !== undefined ? ting : def;
		
	}; // _def()
	
	function _bindings() {
		
		$(document).ready(function() {
			
			$(document.body)
				.on('click', '#QRJ_jamjar_content', function(e) {
					e.preventDefault();
					e.stopPropagation();	
				})
				.on('click', "#QRJ_close, #QRJ_jamjar", function(e) { 
					e.preventDefault(); 
					QR.hide(); 
				})
				.on('click', ".QRJ_button", function(e) {
					e.preventDefault();
					QR.show(); 
				});	
		
		});
		
	}; // _bindings();
	
	function _addQR() {
		
		// update QR?
		QR.getQR();
		
		var shorty = QR.shortURL === undefined ? '' : QR.shortURL;
						
		$("#QRJ_jamjar_content").html('<img class="QRJ_img" src="' + QR.QRSRC + '" alt="QR for : ' + QR.loc + '" /><div id="QRJ_shortURL_wrap">' + shorty + '</div>');

				
	};  //
	
	/** 
	* public
	*/
	QR.show = function() {
		
		if($("#QRJ_shortURL_wrap").length <= 0)		
			_addQR();
		
		var el = !appendTo ? $("#QRJ_jamjar") : appendTo;
		
		el.addClass('showQR');

		
	}; // show
	QR.hide = function() {
		
		var el = !appendTo ? $("#QRJ_jamjar") : appendTo;
		
		el.removeClass('showQR');
		
	}; // hide
	QR.init = function(args) {
		
		args = _def(args, {});
		
		size = _def(args.size, 300);
		addCSS = _def(args.addCSS, true);
		appendTo = _def(args.appendTo, false);
		addButton = _def(args.addButton, true);
		buttonSize = _def(args.buttonSize, '2em');
		buttonClass = _def(args.buttonClass, 'QRJ_fixed-bottom-right');
		buttonAppendTo = _def(args.buttonAppendTo, false);
		
		QR.loc = _def(args.loc,  window.location.href);
		
		$(document).ready(function() {		
			
			_bindings();
					
			if(addCSS)
				_addJamCSS(size);
				
			if(addButton)
				_addButton();
				
			if(!appendTo) 
				_addJamJar();
		});
			
	}; // init
	QR.getQR = function(loc) {
		
		if(QR.loc === undefined) {
			QR.loc = _def(loc, window.location.href);
			QR.shortURL = QR.loc;
		}
		
		if(!loc === undefined || QR.shortURL === undefined)
			QR.getShortURL();
			
		QR.QRSRC = 'https://chart.googleapis.com/chart?cht=qr&chs=' + size + 'x' + size + '&chl=' + escape(QR.loc);	
		
	}; // getQR
	QR.getShortURL = function(loc) {
		
		QR.loc = _def(loc,  window.location.href);
				
		$.ajax('https://www.googleapis.com/urlshortener/v1/url', {
			data : JSON.stringify( {"longUrl": QR.loc}),
			contentType : 'application/json',
			type : 'POST',
			dataType: "json",
			success: function (d) {
				
				QR.shortURL = d.id;
				$("#QRJ_shortURL_wrap").text(QR.shortURL);
				
			},
			error: function(e) {
				
				if(window.console !== undefined)
					console.log(e);
					
			}
		});
		
	}; // getShortURL
	
	/**
	* Apply the function to the supplied scope (window)
	*/
	scope.QRjammer = QR;
	
	return QR;
			
})(($ || jQuery), (typeof scope === 'undefined' ? window : scope)); // QRjammer	

/**
* Expose QRjammer as an AMD
*/
if (typeof define === "function") 
	define("QRjammer", [], function () { return QRjammer; } );
