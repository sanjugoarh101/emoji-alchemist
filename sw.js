const CACHE_NAME = 'emoji-alchemist-v1.0.0';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/combinations.json',
  '/manifest.json',
  '/icon.png'
];

// Install Event - Pre-cache core assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Pre-caching offline game assets for', CACHE_NAME);
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activate Event - Clean up previous cache versions & claim clients
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => key !== CACHE_NAME && caches.delete(key)))
    ).then(() => self.clients.claim())
  );
});

// Message Event - Support explicit skipWaiting requests for in-app updates
self.addEventListener('message', (event) => {
  if (event.data && (event.data.action === 'skipWaiting' || event.data.type === 'SKIP_WAITING')) {
    console.log('[ServiceWorker] skipWaiting message received, activating immediately.');
    self.skipWaiting();
  }
});

// Periodic Background Sync - Check and fetch updates when connected to internet in background
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'check-update' || event.tag === 'check-game-updates') {
    console.log('[ServiceWorker] Periodic background sync triggered tag:', event.tag);
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        return Promise.all(
          ASSETS_TO_CACHE.map((asset) => {
            return fetch(asset, { cache: 'no-cache' })
              .then((response) => {
                if (response && response.status === 200) {
                  return cache.put(asset, response);
                }
              })
              .catch((err) => {
                console.warn('[ServiceWorker] Periodic sync asset fetch error for:', asset, err);
              });
          })
        );
      })
    );
  }
});

// Fetch Event - Explicit cache fallback listener for Chrome WebAPK & offline readiness
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});
