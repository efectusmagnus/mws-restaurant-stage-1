/**
* @describe serviceWorker. Registration is located in "js/main.js"
*/

/**
* @describe Name of cache and path of urls to cache.
*/
const staticCacheName = 'restaurant-reviews-v1';

// list of assets to cache on install
// cache each restaurant detail page as well
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(staticCacheName)
      .then(cache => {
        return cache.addAll([
          '/index.html',
          '/css/styles.css',
          '/js/dbhelper.js',
          '/js/register_sw.js',
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
          '/img/offline.png'
        ]).catch(error => {
          console.log('Caches open failed: ' + error);
        });
      })
  );
});

/**
* @describe Intercept all requests.
* @returns {String} Either return cached files or fetch from network
*/
self.addEventListener('fetch', event => {
  /**
  * @describe Extends lifetime of the event
  * @param {Method} event.respondWith()
  * Extra-info: In service workers, extending the life of an event prevents the
  * browser from terminating the service worker before asynchronous operations
  * within the event have completed.
  * Source: https://developer.mozilla.org/en-US/docs/Web/API/ExtendableEvent/waitUntil
  */
  event.respondWith(
    // Add cache.put to cache images on each fetch
    /**
    * @describe
    * @param {Method} caches.match(event.request)
    * @returns {Promise} returns a Promise that resolves to the Response
    * associated with the first matching request in the Cache object.
    * Extra-Info: takes the current web request that triggered the fetch event
    * and looks in the cache for a resource that matches. The match is
    * performed by looking at the URL string. The match method returns a
    * promise that resolves even if the file is not found in the cache.
    * Source: https://developer.mozilla.org/en-US/docs/Web/API/Cache/match
    */
    caches.match(event.request).then(response => {
      return response || fetch(event.request).then(fetchResponse => {
        return caches.open(staticCacheName).then(cache => {
          /**
          * @describe allows key/value pairs to be added to the current Cache object.
          * @param {Method} cache.put()
          * Source: https://developer.mozilla.org/en-US/docs/Web/API/Cache/put
          */
          cache.put(event.request, fetchResponse.clone());
          return fetchResponse;
        });
      });
    }).catch(error => {
      if (event.request.url.includes('.jpg')) {
        return caches.match('/img/offline.png');
      }
      return new Response('Not connected to the internet', {
        status: 404,
        statusText: "Not connected to the internet"
      });
    })
  );
});

/**
* @describe delete old static caches
* @param {Method} event.waitUntil()
* @returns {Promise} Extends lifetime of the event
*
*/
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
