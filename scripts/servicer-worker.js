const CACHE_NAME = "app-cache-v1";
const urlsToCache = [
    "/",
    "/index.html",
    "/static/js/bundle.js",
    "/static/js/main.chunk.js",
    "/static/js/0.chunk.js",
    "/static/css/main.chunk.css",
    "/api/dados" 
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log("Cache aberto");
            return cache.addAll(urlsToCache);
        })
    );
});


self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener("activate", event => {
    const cacheWhitelist = [CACHE_NAME];

    event.waitUntil(
        caches.keys().then(cacheNames =>
            Promise.all(
                cacheNames.map(cache => {
                    if (!cacheWhitelist.includes(cache)) {
                        console.log("Removendo cache antigo:", cache);
                        return caches.delete(cache);
                    }
                })
            )
        )
    );
});
