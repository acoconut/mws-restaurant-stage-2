
const version= '1';
const restCacheName = "restaurant-v" + version;
const dynamicCacheName = "dyn-restaurant-v" + version;
const staticFiles = [
    "/",
    "/index.html",
    "/restaurant.html",
    "/css/styles.css",
    "/data/restaurants.json",
    "/js/dbhelper.js",
    '/js/idb.js',
    '/js/idbhelper.js',
    "/js/restaurant_info.js",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
  caches.open(staticCacheName).then(cache => {
    return cache.addAll(UrlsToCache);
  })
)
});

self.addEventListener('activate', event => {
event.waitUntil(
  caches.keys().then(cachesNames => {
    return Promise.all(
      cachesNames.filter(cachesName => {
        return cachesName.startsWith('restaurants-') && cachesName != staticCacheName;
      }).map(cachesName => {
        return caches.delete(cachesName);
      })
    )
  })
);
});

self.addEventListener('fetch', event => {
event.respondWith(
  caches.match(event.request, { ignoreSearch: true }).then(response => {
    if (response) return response;
    return fetch(event.request);
  })
)
});
