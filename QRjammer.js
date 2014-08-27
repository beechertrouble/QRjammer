/**
*
* QR Jammer
* by BeecherTrouble : beechbot.com
* special thanks to Google and Google Charts
* requires jquery ...
*
*
*/
(function($, scope) {
		
	var QR = {
			args : false,
			imgSRC : undefined,
			shortURL : undefined,
			inited : false
		}, 
		defaults = {
			loc: window.location.href,
			size : 300,
			addCSS : true,
			addModal : true,
			addButton : true,
			addShortURL : true,
			buttonSize : '2em',
			buttonClass : 'QRJ_fixed-bottom-right',
			buttonAppendTo : false
		},
		modalTemp = '<div id="QRJ_jamjar">'
					+ '<a id="QRJ_close">close</a>'
					+ '<span id="QRJ_vcenter"></span>'
					+ '<div id="QRJ_jamjar_content_wrap">'
						+ '<div id="QRJ_jamjar_content"></div>'
					+ '</div>'
				+'</div>',
		$modal = false;
	
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
				
		var el = !QR.args.buttonAppendTo ? $("body") : QR.args.buttonAppendTo;
		
		if($(".QRJ_button").length <= 0)
			el.append('<a class="QRJ_button ' + QR.args.buttonClass + '" title="click for QR and short URL" style="font-size:' + QR.args.buttonSize + ';">&#9875;</a>');
					
	}; // _addButton()
	
	function _addModal() {
				
		if($("#QRJ_jamjar").length <= 0)
			$('body').append(modalTemp);
			
		$modal = $("#QRJ_jamjar");
					
	}; // _addModal()
	
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
		
		var shorty = QR.addShortURL || QR.shortURL === undefined ? '' : QR.shortURL;
						
		$("#QRJ_jamjar_content").html('<img class="QRJ_img" src="' + QR.imgSRC + '" alt="QR for : ' + QR.args.loc + '" /><div id="QRJ_shortURL_wrap">' + shorty + '</div>');

				
	};  // _addQR()
	
	function _reqShortURL(loc, async) {
		
		if(QR.args.loc === undefined) 
			QR.args.loc = _def(loc, window.location.href);
		
		loc = _def(loc, QR.args.loc);	
		async = _def(async, false);
				
		$.ajax('https://www.googleapis.com/urlshortener/v1/url', {
			data : JSON.stringify( {"longUrl": loc}),
			contentType : 'application/json',
			type : 'POST',
			dataType: "json",
			async : async,
			success: function (d) {
				
				QR.shortURL = d.id;
				if(QR.args.addShortURL && $("#QRJ_shortURL_wrap").length > 0)
					$("#QRJ_shortURL_wrap").text(QR.shortURL);
				
				return QR.shortURL;
									
			},
			error: function(e) {
				
				if(window.console !== undefined)
					console.log(e);
				return QR.shortURL;
									
			}			
		});
		
	}; // _reqShortURL()
	
	/** 
	* public
	*/
	QR.show = function() {

		if(!QR.inited)
			QR.init();
		
		if($("#QRJ_jamjar_content").children().length <= 0)		
			_addQR();
		
		$modal.addClass('showQR');
		
	}; // show
	QR.hide = function() {
				
		$modal.removeClass('showQR');
		
	}; // hide
	QR.init = function(args) {
		
		QR.args = _def(args, defaults);
		
		if(typeof args == 'object') {
			QR.args.loc = _def(args.loc,  defaults.loc);
			QR.args.size = _def(args.size, defaults.size);
			QR.args.addCSS = _def(args.addCSS, defaults.addCSS);
			QR.args.addModal = _def(args.addModal, defaults.addModal);
			QR.args.addButton = _def(args.addButton, defaults.addButton);
			QR.args.addShortURL = _def(args.addShortURL, defaults.addShortURL);
			QR.args.buttonSize = _def(args.buttonSize, defaults.buttonSize);
			QR.args.buttonClass = _def(args.buttonClass, defaults.buttonClass);
			QR.args.buttonAppendTo = _def(args.buttonAppendTo, defaults.buttonAppendTo);
		}
		
		QR.imgSRC = 'https://chart.googleapis.com/chart?cht=qr&chs=' + QR.args.size + 'x' + QR.args.size + '&chl=' + escape(QR.args.loc);
				
		$(document).ready(function() {		
								
			if(QR.args.addCSS)
				_addJamCSS(QR.args.size);
				
			if(QR.args.addModal)  { // add modal ...
			
				_addModal();
				
				if(QR.args.addButton) // add trigger button ...
					_addButton();
					
				_bindings(); // we only need the bindings if the ui bits exist 
				
			}
			
			QR.inited = true;
			
		});
	
			
	}; // init
	QR.getQR = function(loc) {
		
		if(!QR.inited)
			QR.init();
		
		if(loc !== undefined || QR.args.loc === undefined) 
			QR.args.loc = _def(loc, window.location.href);
			
		if(QR.args.addShortURL && (loc !== undefined || QR.shortURL === undefined))
			QR.getShortURL(QR.args.loc, true);
			
		QR.imgSRC = 'https://chart.googleapis.com/chart?cht=qr&chs=' + QR.args.size + 'x' + QR.args.size + '&chl=' + escape(QR.args.loc);	
		
		return QR.imgSRC;
		
	}; // getQR
	QR.getShortURL = function(loc, async) {

		if(QR.shortURL === undefined)
			_reqShortURL(loc, async);
		
		return QR.shortURL;
		
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
