const CACHE_NAME = 'eb-rescue-v1';
// Get base path from the service worker's location
const BASE_PATH = self.location.pathname.replace('/service-worker.js', '');
const ASSETS_TO_CACHE = [
  BASE_PATH + '/',
  BASE_PATH + '/index.html',
  BASE_PATH + '/manifest.json',
  BASE_PATH + '/logo.png'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});