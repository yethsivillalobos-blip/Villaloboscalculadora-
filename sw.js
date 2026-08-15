const CACHE_CALC = 'calculadora-textil-v1';
const recursosCalc = [
  './',
  './index.html',
  './manifest.json',
  './wolf-192.png',
  './wolf-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_CALC).then(cache => cache.addAll(recursosCalc))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if (key !== CACHE_CALC) return caches.delete(key);
      })
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
