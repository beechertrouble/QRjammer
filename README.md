QRjammer
========

QR code jammer for sharing from desktop to mobile device, or device to device ... basically so you don't have to type in the url on your phone...
Special thanks to Google and Google Charts for creating the QR image generation service and URL shortener! Demo at : [http://go.beechbot.com/QRjammer](http://go.beechbot.com/QRjammer)

Requires:
--
- jquery 1.9+

Default behavior:
--
- adds a button that generates a QR code and shartened URL for the current page (whatever's in the address bar).
- clicking the button shows the QR for scanners to jump to the URL on your device


Basic Usage:
--
- include the QRjammer.js (assumes you have jQuery included first)
- when docready or later, init via the global like this : 
```javascript
QRjammer.init();
```
- enjoy.

Advanced Usage:
--
- slam an args object in there (like this <code>var myQR = new QRjammer.init({...})</code> ) to change defaults :
- e.g. :
```javascript
QRjammer.init({
	loc : 'http://google.com', // must be a full URL (default: URL)
	size : 200, // size of the QR image in pixels (default: 300)
	addCSS : false, // you can provide your own, if you like (default: true)
	addModal : false, // (default: true)
	addButton : false, // (default: true)
	addShortURL : false, // (default: true)
	buttonSize : '3em', // for the utf8 anchor icon (default: '2em')
	buttonClass : 'QRJ_fixed-top-left', // (default: 'QRJ_fixed-bottom-right')
	buttonAppendTo : $('thing') // where to put the trigger button (defaults to $(body))
});
```
- built-in button classes : QRJ_fixed-top-left, QRJ_fixed-top-right, QRJ_fixed-bottom-left, QRJ_fixed-bottom-right

Methods:
--
- <code>QRjammer.getShortURL(URL);</code> : returns a shortened url (URL is optional)
- <code>QRjammer.getQR(URL);</code> : returns a QR image src (URL is optional)
- <code>QRjammer.show();</code> : opens the modal
- <code>QRjammer.hide();</code> : hides the modal
 