/**
* serviceWorker
* Registration is located in "js/register_sw.js"
*/

/**
* @describe Name of cache and path of urls to cache.
*/
const cacheName = 'restaurant-reviews-app-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/restaurant.html',
  '/css/styles.css',
  '/data/restaurant.json',
  'js/dbhelper.js',
  'js/main.js',
  'js/register_sw.js',
  'js/restaurant_info.js',
  'img/1.jpg',
  'img/2.jpg',
  'img/3.jpg',
  'img/4.jpg',
  'img/5.jpg',
  'img/6.jpg',
  'img/7.jpg',
  'img/8.jpg',
  'img/9.jpg',
  'img/10.jpg',
];

/**
* @describe Installing serviceWorker.
*/
self.addEventListener('install', e => {
  console.log('Service Worker has been installed! :)');
  e.waitUntil(
    caches.open('cacheName').then(cache => {
      console.log('Service Worker is caching the files! :)');
      return cache.addAll(urlsToCache);
    }).catch(err => {
      console.log(`Installation of Service Worker has failed due to ${err}`);
    })
  );
});

/**
* @describe serviceWorker intercepts request and return cached version.
*/
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});
