/*
 *
 *  Rangoli App
 */

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('rangoli').then(cache => {
      return cache.addAll([
        '/rangoli/dist/',
        '/rangoli/dist/index.html',
        '/rangoli/dist/index.html?homescreen=1',
        '/rangoli/dist/?homescreen=1',
        '/rangoli/dist/styles/main.css',
        '/rangoli/dist/scripts/main.min.js',
        '/rangoli/dist/sounds/rangoli.mp3'
      ])
      .then(() => self.skipWaiting());
    })
  )
});

self.addEventListener('activate',  event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
