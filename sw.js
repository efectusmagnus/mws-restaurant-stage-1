/**
 * The Registration is located in "js/main.js"
 */
/*=======================Installing serviceWorker ===========================*/
/**
 * Name of cache and path of urls to cache
 */
const staticCacheName = 'restaurant-reviews-v1';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(staticCacheName)
      .then(cache => {
        return cache.addAll([
          '/',
          '/index.html',
          '/css/styles.css',
          '/js/dbhelper.js',
          '/js/main.js',
          '/js/restaurant_info.js',
          '/restaurant.html?id=1',
          '/restaurant.html?id=2',
          '/restaurant.html?id=3',
          '/restaurant.html?id=4',
          '/restaurant.html?id=5',
          '/restaurant.html?id=6',
          '/restaurant.html?id=7',
          '/restaurant.html?id=8',
          '/restaurant.html?id=9',
          '/restaurant.html?id=10',
          '/data/manifest.json',
          '/img/Efectusmagnus-white-192.png',
          '/img/Efectusmagnus-white-512.png',
          '/img/owl-offline.png'
        ]).catch(error => {
          console.log('Caches open failed :( ' + error);
        });
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    // retrieving from a cache/ finding item in a cache
    caches.match(event.request).then(response => {
      return response || fetch(event.request).then(fetchResponse => {
        // creating and openning a cache
        return caches.open(staticCacheName).then(cache => {
          cache.put(event.request, fetchResponse.clone());
          return fetchResponse;
        });
      });
    }).catch(error => {
      //if can not fetch image, return owl image saying it's offline
      if (event.request.url.includes('.jpg')) {
        return caches.match('/img/owl-offline.png');
      }
      return new Response('Not connected to the internet :(', {
        status: 404,
        statusText: "Not connected to the internet"
      });
    })
  );
});
//delete unused chaches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => {
          return cacheName.startsWith('restaurant-reviews-') && cacheName !== staticCacheName;
        }).map(cacheName => {
          return caches.delete(cacheName);
        })
      );
    })
  );
});
