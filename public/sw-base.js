importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js');

if (!self.define) {
    const e = e => {
            "require" !== e && (e += ".js");
            let r = Promise.resolve();
            return s[e] || (r = new Promise((async r => {
                if ("document" in self) {
                    const s = document.createElement("script");
                    s.src = e, document.head.appendChild(s), s.onload = r
                } else importScripts(e), r()
            }))), r.then((() => {
                if (!s[e]) throw new Error(`Module ${e} didn’t register its module`);
                return s[e]
            }))
        },
        r = (r, s) => {
            Promise.all(r.map(e)).then((e => s(1 === e.length ? e[0] : e)))
        },
        s = {
            require: Promise.resolve(r)
        };
    self.define = (r, i, o) => {
        s[r] || (s[r] = Promise.resolve().then((() => {
            let s = {};
            const t = {
                uri: location.origin + r.slice(1)
            };
            return Promise.all(i.map((r => {
                switch (r) {
                    case "exports":
                        return s;
                    case "module":
                        return t;
                    default:
                        return e(r)
                }
            }))).then((e => {
                const r = o(...e);
                return s.default || (s.default = r), s
            }))
        })))
    }
}



workbox.routing.registerRoute(
  /.*(?:googleapis|gstatic)\.com.*$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "google-fonts-stylesheets"
  })
);

workbox.routing.registerRoute(
  /.*(?:firebasestorage.googleapis)\.com.*$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "post-images"
  })
);

define("./sw.js", ["./workbox-968e5e25"], (function (e) {
    "use strict";
    self.addEventListener("message", (e => {
        e.data && "SKIP_WAITING" === e.data.type && self.skipWaiting()
    })), e.precacheAndRoute(self.__WB_MANIFEST)
}));
//# sourceMappingURL=sw.js.map