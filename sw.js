// Service Worker for 규림한의원 청주점
// Bump CACHE_NAME whenever the precached payload should be invalidated.
const CACHE_NAME = 'kyurim-v20260505a';
const OFFLINE_URL = '/offline.html';

// Assets to cache on install. Version query params are preserved so cache
// busting remains deterministic across service worker releases.
const PRECACHE_ASSETS = [
    '/',
    '/index.html',
    '/summer-luxe.css?v=20260504b',
    '/style.min.css?v=20260425c',
    '/spring.min.css?v=20260425c',
    '/summer-luxe-events.css?v=20260504h',
    '/script.min.js?v=20260505a',
    '/offline.html'
];

// Keep query params in cache keys so HTML `?v=` cache-busting actually works.
function cacheKeyFor(request) {
    return request;
}

// Install event - precache assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[SW] Precaching assets');
                return cache.addAll(PRECACHE_ASSETS);
            })
            .then(() => self.skipWaiting())
            .catch((error) => {
                console.error('[SW] Precache failed:', error);
                return self.skipWaiting();
            })
    );
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames
                        .filter((name) => name !== CACHE_NAME)
                        .map((name) => caches.delete(name))
                );
            })
            .then(() => self.clients.claim())
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') return;

    // Skip external requests
    if (!event.request.url.startsWith(self.location.origin)) return;

    const matchKey = cacheKeyFor(event.request);

    event.respondWith(
        caches.match(matchKey)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    return cachedResponse;
                }

                return fetch(event.request)
                    .then((response) => {
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Store under the normalized key so future versioned
                        // requests for the same asset hit the cache.
                        const responseToCache = response.clone();
                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(matchKey, responseToCache);
                            });

                        return response;
                    })
                    .catch(() => {
                        if (event.request.mode === 'navigate') {
                            return caches.match(OFFLINE_URL);
                        }
                    });
            })
    );
});

// Background sync for form submissions
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-form') {
        event.waitUntil(syncForms());
    }
});

async function syncForms() {
    // Get pending form submissions from IndexedDB
    // Implementation depends on form handling needs
    console.log('[SW] Syncing forms...');
}

// Push notification handler
self.addEventListener('push', (event) => {
    if (!event.data) return;

    let data;
    try { data = event.data.json(); } catch (e) { return; }
    const options = {
        body: data.body || '규림한의원에서 알림이 왔습니다.',
        icon: '/assets/logo_icon.png',
        badge: '/assets/logo_icon.png',
        vibrate: [100, 50, 100],
        data: {
            url: data.url || '/'
        }
    };

    event.waitUntil(
        self.registration.showNotification(data.title || '규림한의원', options)
    );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    event.waitUntil(
        clients.openWindow(event.notification.data.url)
    );
});
