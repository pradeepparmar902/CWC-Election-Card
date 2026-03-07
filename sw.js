const CACHE_NAME = 'id-designer-pro-v1';
const urlsToCache = [
  './',
  './index.html',
  './admin.html',
  './view.html',
  './manifest.json',
  // You would typically cache CSS, JS, and image assets here too.
  // Because Vite builds with dynamic hashes, we might use a plugin like vite-plugin-pwa 
  // in a real production build, but this basic service worker covers offline HTML loading.
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request).catch(() => {
            // Optional: return offline fallback page here if fetch fails
        });
      }
    )
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
});
