
const version= '1';
const staticCacheName = "restaurants-v" + version;
const dynamicCacheName = "dyn-restaurant-v" + version;

self.addEventListener("install", (event) => {
  event.waitUntil(
  caches.open(staticCacheName).then(cache => {
    return cache.addAll([
      '/public/index.html',
      '/public/restaurant.html',
      '/public/css/styles.css',
      '/public/data/restaurants.json',
      '/public/js/dbhelper.js',
      '/public/js/idb.js',
      '/public/js/idbhelper.js',
      '/public/js/restaurant_info.js',
      '/public/js/main.js',
      '/public/img-src/',
      '/public/img-src/1.webp',
      '/public/img-src/2.webp',
      '/public/img-src/3.webp',
      '/public/img-src/4.webp',
      '/public/img-src/5.webp',
      '/public/img-src/6.webp',
      '/public/img-src/7.webp',
      '/public/img-src/8.webp',
      '/public/img-src/9.webp',
      '/public/img-src/10.webp',
      '/public/img-src/icon_192.png',
      '/public/img-src/icon_256.png',
      '/public/img-src/icon_512.png',
    ]);
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

self.addEventListener('load', event => {
  [].forEach.call(document.querySelectorAll('img[data-src]'), function(img) {
      img.removeAttribute('data-src');
  })
});

self.addEventListener('fetch', event => {
event.respondWith(
  caches.match(event.request, { ignoreSearch: true }).then(response => {
    if (response) return response;
    return fetch(event.request);
  })
)
});


