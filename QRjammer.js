/**
*
* QR Jammer
* by BeecherTrouble : beechbot.com
* special thanks to Google and Google Charts
*
*/
var QRjammer = function(args) {
	
	if(window.QRJ === undefined)
		window.QRJ = this;
	
	this.defs = args || {};
	this.size = this.defs.size || 300;
	this.loc = this.defs.loc || window.location.href;
	this.addCSS = this.defs.addCSS || true;
	this.appendTo = this.defs.appendTo || false;
	this.addButton = this.defs.addButton || true;
	this.buttonSize = this.defs.buttonSize || 30;
	this.buttonPos = this.defs.buttonClass || 'QRJ_fixed-bottom-right';
	this.buttonAppendTo = this.defs.buttonAppendTo || false;
		//
	this.logoSRC = "data:image/gif;base64,R0lGODlhZABkAIAAAAAAAP///yH5BAAAAAAALAAAAABkAGQAAAL/jI+py+0Po5y02ouz3rz7D4bi2ADmiabqyqpJC8fyI9f2+d46TO++i/gJcY7hMGf09ZI7JPO2fNqc0lmxOg1ia9Fti+pddcPAA5l3PYu16jKjvTbDU2M6Bi3/3vUlvMUfEJMBqCC4xwJmd0GYiDLIZ2C4CLkg+UdpWcHIhngYF7kZEQpKSQGYaVraSDTZmed6CVs5WsdKKpuKu2ryKIs6QfsrcUqb9jmrOoxZ3KfLeZx7LCya/AoNvFwNEcz8lu1MDX57rezbjUxu7ab5nb6tHXhe2L4eXb8L0Cstv1try24OnrF7zwi+o6cIoLh4c/41dDRwDr4w/s5M9FKRzMUt/xkpFoTTEePHNiE5jlRTEstGlRFBnrTYkuRLjSRq2ryJM6fOnTx7+vwJNKjQDg8dFs0XE+VMj80erqySEupSkU0bDo0q5WpSmFrRWZ1qsqpEsCzFulR31lvRp1m3Im3l7uq0g3GHzq3YVe3Crfj0GRz3F+9Mvwm9BuY72FPgu4jRQoS7mN/LvIYL27NMmbHZf5QZ7t3MKzFkzKJj7RMI+q3euqn7KibtmDO2z0E1r4at1XZl2Xl1zwtIe3fo1KoVrvPdzy3hx4BxCya+3Cjq28yFDzd+WOjR4p23d2b7BDwTrOHJSiXOtLlM9FS/e/7q/v3Y+N7Nt2UfVr3S+Pz7+wj/D2CAAoJQAAA7";
			
	// thanks google!	
	this.QRSRC = 'https://chart.googleapis.com/chart?cht=qr&chs=' + this.size + 'x' + this.size + '&chl=' + escape(this.loc);	
	
	/* ===== funcs ==== */
	this.addJamCSS = function() {
		
		var css = '<style id="QRJ_style">';
			css += '#QRJ_jamjar {position:fixed;top:0px;right:0px;bottom:0px;left:0px;display:none;width:100%;background:rgba(0,0,0,0.5) no-repeat center center;}';
			css += '#QRJ_close {position:absolute;top:0.5em;right:0.5em;display:block;cursor:pointer;padding:1em 1em 0.75em;color:#fff;background:#000;background:rgba(0,0,0,0.25);line-height:1;}';
			css += '.QRJ_button {background:#fff;padding:0.25em;cursor:pointer;opacity:0.5;-moz-transition:opacity 0.4s ease;-webkit-transition:opacity 0.4s ease;-o-transition:opacity 0.4s ease;-ms-transition:opacity 0.4s ease;transition:opacity 0.4s ease;}';
			css += '.QRJ_button:focus, .QRJ_button:hover {opacity:1;}';
			css += '.QRJ_fixed-top-left {position:fixed;top:0.25em;left:0.25em;}';
			css += '.QRJ_fixed-top-right {position:fixed;top:0.25em;right:0.25em;}';
			css += '.QRJ_fixed-bottom-left {position:fixed;bottom:0.25em;left:0.25em;}';
			css += '.QRJ_fixed-bottom-right {position:fixed;bottom:0.25em;right:0.25em;}';
			css += '</style>';
					
		if($("#QRJ_style").length <= 0)
			$('head').prepend(css);
		
	} // addJamCSS
	this.addButton = function() {
		
		var button = '<a class="QRJ_button ' + this.buttonPos + '" onclick="QRJ.show()" title="click for QR code"><img src="' + this.logoSRC + '" width="' + this.buttonSize + '" height="' + this.buttonSize + '" alt="click for QR" /></a>',
			el = !this.buttonAppendTo ? $("body") : this.buttonAppendTo;
		
		if($(".QRJ_button").length <= 0)
			el.append(button);
		
	} // addButton
	this.addJamJar = function() {
		
		var JamJar = '<div id="QRJ_jamjar" onclick="QRJ.hide()"><a id="QRJ_close" onclick="QRJ.hide()">close</div>';
		
		if($("#QRJ_jamjar").length <= 0)
			$('body').append(JamJar);
		
	} // addJamJar
	this.show = function() {
		
		this.addQR();
		
		var el = !this.appendTo ? $("#QRJ_jamjar") : this.appendTo;
		
		el.stop().fadeIn('fast');

		
	} // show
	this.hide = function() {
		
		var el = !this.appendTo ? $("#QRJ_jamjar") : this.appendTo;
		
		el.stop().fadeOut('fast');
		
	} // hide
	this.init = function() {
	
		if(this.addCSS)
			this.addJamCSS();
			
		if(this.addButton)
			this.addButton();
			
		if(!this.appendTo) 
			this.addJamJar();

	} // init
	this.getQR = function() {
		
		this.loc = this.defs.loc || window.location.href;
		this.QRSRC = 'https://chart.googleapis.com/chart?cht=qr&chs=' + this.size + 'x' + this.size + '&chl=' + escape(this.loc);	
		
	} // getQR
	this.addQR = function() {
		
		// update QR?
		this.getQR();
		
		if(!this.appendTo) {
			
			$("#QRJ_jamjar").css({'background-image' : 'url(' + this.QRSRC + ')'});
			
		} else {
			
			this.appendTo.append('<img class="QRJ_img" src="' + this.QRSRC + '" alt="QR for : ' + this.loc + '" />');
			
		}
		
	}  //
	
	this.init();
		
} // QRjammer	