const cacheName = "dex-0";

const assets = [
  "/assets/css/global.css",
  "/assets/css/pokemon.css",
  "/assets/js/search.js",
];

self.addEventListener("install", event => {
  console.log("SW installing");
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches
      .keys()
      // delete any old caches (that don't match current name)
      .then(cacheNames =>
        Promise.all(
          cacheNames
            .filter(name => name !== cacheName)
            .map(name => caches.delete(name))
        )
      )
  );
});

const sameOrigin = event =>
  new URL(event.request.url).origin === self.location.origin;

self.addEventListener("fetch", event => {
  const { request } = event;

  // don't cache any external resources
  // can only cache GETs
  if (
    !sameOrigin(event) ||
    request.method !== "GET" ||
    request.url.includes("browser-sync")
  )
    return fetch(request);

  event.respondWith(
    caches.open(cacheName).then(cache =>
      cache.match(request).then(cachedResponse => {
        // always get a fresh copy from the network
        // this updates the cache for next time
        // https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/
        const fetchPromise = fetch(request).then(response => {
          cache.put(request, response.clone());
          return response;
        });
        // if req is cached return it immediately
        // otherwise use the network version
        return cachedResponse || fetchPromise;
      })
    )
  );
});
