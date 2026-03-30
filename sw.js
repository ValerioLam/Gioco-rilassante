// Aggiorniamo la versione qui da v2 a v3
const cacheName = 'relax-game-v3'; 
const assets = [
  './',
  './index.html',
  './manifest.json',
  './faccia.png',
  './musica.mp3'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      // Forza l'attivazione immediata del nuovo SW
      self.skipWaiting(); 
      return cache.addAll(assets);
    })
  );
});

self.addEventListener('activate', e => {
  // Cancella la vecchia cache v2
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys.map(key => {
        if (key !== cacheName) {
          return caches.delete(key);
        }
      }));
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});