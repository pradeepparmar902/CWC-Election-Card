// Service Worker v41 — Network-first for HTML, cache-first for assets
const CACHE_NAME = 'id-designer-pro-v41';
const STATIC_ASSETS = [
  './',
];

// Install: pre-cache minimal assets only (no HTML pages — they'll be network-first)
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// Activate: delete old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      )
    )
  );
  event.waitUntil(self.clients.claim());
});

// Fetch: Network-first for HTML pages, cache-first for static assets
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || !event.request.url.startsWith('http')) {
    return;
  }

  const url = new URL(event.request.url);
  const isHtmlPage = url.pathname.endsWith('.html') || url.pathname.endsWith('/');

  if (isHtmlPage) {
    // NETWORK-FIRST for HTML — always get the freshest version
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Optionally update cache with fresh response
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          return response;
        })
        .catch(() => {
          // Fallback to cache if offline
          return caches.match(event.request);
        })
    );
  } else {
    // CACHE-FIRST for other assets (images, js, css, fonts)
    event.respondWith(
      caches.match(event.request).then(cached => {
        return cached || fetch(event.request).catch(err => {
          console.log('Service Worker fetch failed:', err);
          return new Response('Offline or Network Error', {
            status: 503,
            statusText: 'Offline',
            headers: { 'Content-Type': 'text/plain' }
          });
        });
      })
    );
  }
});
