QRjammer
========

QR code jammer for sharing from desktop to mobile device, or device to device ... basically so you don't have to type in the url on your phone...


Default behavior:
- adds a button that generates a QR code for the window.location.href (whatever's in the address bar)
- clicking the button shows the QR for scanners to jump to the URL on your device


Basic Usage:
- include the QRjammer.js (assumes you have jQuery included first)
- when docready or whatever, call this function QRjammer();
- enjoy.

Advanced Usage:
- slam an args object in there to change :
  - the size of the button <code>{size : 50}</code>
