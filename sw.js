// Service Worker for 규림한의원 청주점
// Bump CACHE_NAME whenever the precached payload should be invalidated.
const CACHE_NAME = 'kyurim-v20260425c';
const OFFLINE_URL = '/offline.html';

// Assets to cache on install. Listed without the `?v=` query so the
// fetch handler can match versioned and unversioned requests alike.
const PRECACHE_ASSETS = [
    '/',
    '/index.html',
    '/style.min.css',
    '/spring.min.css',
    '/script.min.js',
    '/offline.html'
];

// HTML cache-busts assets via `?v=...`. Strip that param when matching the
// cache so the precached `/style.min.css` answers `/style.min.css?v=xxx`.
function cacheKeyFor(request) {
    const url = new URL(request.url);
    if (!url.searchParams.has('v')) return request;
    url.searchParams.delete('v');
    return new Request(url.href, { method: request.method, headers: request.headers });
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
