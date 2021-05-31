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
    })), e.precacheAndRoute([{"revision":"a78aead1a5430296eb53b31ae102c6b8","url":"app/async/asyncReducer.js"},{"revision":"b994ca48be0dc15d0d23a130aabc9266","url":"app/common/modals/modalReducer.js"},{"revision":"ce2b2b1458845f0376e85f3a083262ec","url":"app/common/util/util.js"},{"revision":"9da7f0bec10987798dd6322ac4b38325","url":"app/config/firebase.js"},{"revision":"9dd0f5eebbeba91e5f9f69cf1fb2aafa","url":"app/firestore/firebaseService.js"},{"revision":"b08891772ea56a0c327c542c2226de55","url":"app/firestore/firestoreService.js"},{"revision":"4c8523e879fba4ff6029221c3dcd86df","url":"app/hooks/useFirestoreCollection.js"},{"revision":"846674e5db9d0fc485db0fefe12ed112","url":"app/hooks/useFirestoreDoc.js"},{"revision":"d0f52928fcd28dadbb6cb67b9becc6ee","url":"app/layout/styles.css"},{"revision":"d41dd767253c160d9bf191f4182bf054","url":"app/store/configureStore.js"},{"revision":"57c4a98f22f8f561c6895d7a88cabe3a","url":"app/store/rootReducer.js"},{"revision":"d03bac53b9cc2a7c60a0b0fb4ebcbf38","url":"features/auth/authActions.js"},{"revision":"1bc7e391c5ddbbd4ddb99fd0c8eca084","url":"features/auth/authConstants.js"},{"revision":"a533a612a4d1e9d695acbac1b359d2be","url":"features/auth/authReducer.js"},{"revision":"f5932c08b8c92e64a8c7bb7f10181570","url":"features/events/eventActions.js"},{"revision":"12f6a6cc7435d9df0bc7bf18f80993bc","url":"features/events/eventDashboard/eventConstants.js"},{"revision":"9b8d7c59319186c6cff1ca3b6fc3aa59","url":"features/events/eventReducer.js"},{"revision":"1dddfcd07131eb365bf5e62c7bb5c3e4","url":"features/profiles/profileConstants.js"},{"revision":"e32ac1b29bf56c112efb4c372af4f1a8","url":"features/profiles/profilePage/profileActions.js"},{"revision":"5e6eff4a5ffdc7963e791b327895d4bb","url":"features/profiles/profilePage/profileReducer.js"},{"revision":"2fef04ac5c48b905e1e20192e4cbbf28","url":"features/sandbox/testReducer.js"},{"revision":"f94bfb0d99adbb3e0d359e88254bedde","url":"index.js"},{"revision":"ee780d5bd6cfe5089b17a31f8346ad5a","url":"reportWebVitals.js"},{"revision":"38a7df1dbf951646ed6e18d7e1d3dd2f","url":"service-worker.js"},{"revision":"a0bf88f839f198ec05b66d601c6b7da1","url":"serviceWorkerRegistration.js"},{"revision":"1a77571e1a8cf36018a41bcedf60db75","url":"setupTests.js"}])
}));
//# sourceMappingURL=sw.js.map