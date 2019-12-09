const cacheName = "dex-0";

const assets = [
  // "/assets/global.css",
  // "/assets/pokemon.css",
  // "/assets/search.js",
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

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        console.log(`responding with ${response.url}`);
      }
      return response || fetch(event.request);
    })
  );
});
