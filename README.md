QRjammer
========

QR code jammer for sharing from desktop to mobile device, or device to device ... basically so you don't have to type in the url on your phone...
Special thanks to Google and Google Charts for creating the QR image generation service!

Default behavior:
- adds a button that generates a QR code for the window.location.href (whatever's in the address bar)
- clicking the button shows the QR for scanners to jump to the URL on your device


Basic Usage:
- include the QRjammer.js (assumes you have jQuery included first)
- when docready or whatever, call this function <code>QRjammer();</code>
- enjoy.

Advanced Usage:
- slam an args object in there (like this <code>QRjammer({...})</code> ) to change defaults :
  - the URL for the QR <code>{loc : 'http://google.com'}</code>
      - defaults to window.location.href  
  - the size of the QR code image <code>{size : 200}</code>
      - defaults to 300
  - the size of the button <code>{buttonSize : 50}</code>
      - defaults to 30
  - the position/class of the button <code>{buttonClass : 'QRJ_fixed-top-left'} 
      - defaults to bottom right | built-in classes : 
        - QRJ_fixed-top-left, QRJ_fixed-top-right, QRJ_fixed-bottom-left, QRJ_fixed-bottom-right 
  - add default CSS <code>{addCSS : false}</code>
      - defaults to true
  - where to append the QR image <code>{appendTo : $(whatever) }</code>
      - defaults to <code>$('body')</code>
      - NOTE: default behavior will create a modal view, non-default will drop an img into your appendTo element
  - where to append the QR button <code>{buttonAppendTo : $(whatever) }</code>
      - defaults to <code>$('body')</code>
