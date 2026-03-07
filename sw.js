const CACHE_NAME = 'id-designer-pro-v2';
const urlsToCache = [
  './',
  './index.html',
  './admin.html',
  './view.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});

self.addEventListener('fetch', event => {
  // Only cache GET requests and ignore chrome-extension / vite dev websockets
  if (event.request.method !== 'GET' || !event.request.url.startsWith('http')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Fetch from network
        return fetch(event.request).catch(error => {
          console.log('Service Worker fetch failed:', error);
          // Return a constructed 503 response instead of undefined
          return new Response(
            "Offline or Network Error",
            { status: 503, statusText: "Offline", headers: { "Content-Type": "text/plain" } }
          );
        });
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  event.waitUntil(self.clients.claim());
});
