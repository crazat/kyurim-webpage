// Service Worker for 규림한의원 청주점
// Bump CACHE_NAME whenever the precached payload should be invalidated.
const CACHE_NAME = 'kyurim-v20260516i';
const OFFLINE_URL = '/offline.html';

// Static assets to cache on install. HTML is handled with a network-first
// strategy so content updates are not trapped behind an old service worker.
const PRECACHE_ASSETS = [
    '/summer-luxe.css?v=20260516i',
    '/style.min.css?v=20260425c',
    '/spring.min.css?v=20260425c',
    '/summer-luxe-events.css?v=20260504h',
    '/summer-luxe-enhance.css?v=20260516h',
    '/summer-luxe-enhance.js?v=20260516h',
    '/script.min.js?v=20260506b',
    '/offline.html'
];

// Keep query params in cache keys so HTML `?v=` cache-busting actually works.
function cacheKeyFor(request) {
    return request;
}

function shouldCacheResponse(response) {
    return response && response.status === 200 && response.type === 'basic';
}

async function putInCache(request, response) {
    if (!shouldCacheResponse(response)) return;

    const cache = await caches.open(CACHE_NAME);
    await cache.put(cacheKeyFor(request), response.clone());
}

async function cacheFirst(request) {
    const matchKey = cacheKeyFor(request);
    const cachedResponse = await caches.match(matchKey);
    if (cachedResponse) return cachedResponse;

    try {
        const response = await fetch(request);
        await putInCache(request, response);
        return response;
    } catch (error) {
        return Response.error();
    }
}

async function networkFirst(request) {
    const matchKey = cacheKeyFor(request);

    try {
        const response = await fetch(request);
        await putInCache(request, response);
        return response;
    } catch (error) {
        const cachedResponse = await caches.match(matchKey);
        if (cachedResponse) return cachedResponse;

        if (request.mode === 'navigate') {
            const offlineResponse = await caches.match(OFFLINE_URL);
            if (offlineResponse) return offlineResponse;
        }

        return Response.error();
    }
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

// Fetch event - network-first for pages, cache-first for static assets.
self.addEventListener('fetch', (event) => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') return;

    // Skip external requests
    if (!event.request.url.startsWith(self.location.origin)) return;

    const acceptHeader = event.request.headers.get('accept') || '';
    const acceptsHtml = acceptHeader.includes('text/html');
    if (event.request.mode === 'navigate' || acceptsHtml) {
        event.respondWith(networkFirst(event.request));
        return;
    }

    event.respondWith(cacheFirst(event.request));
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
