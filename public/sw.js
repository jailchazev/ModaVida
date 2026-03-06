// ============================================================
// SERVICE WORKER - MODAVIDA PWA
// Cachea recursos estáticos para mejor rendimiento
// ============================================================

const CACHE_NAME = 'modavida-v1';
const STATIC_CACHE = 'modavida-static-v1';

// Recursos a cachear
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
];

// Instalar service worker
self.addEventListener('install', (event) => {
  console.log('[SW] Installing...');
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      console.log('[SW] Caching static assets');
      return cache.addAll(STATIC_ASSETS);
    }).then(() => {
      console.log('[SW] Installed successfully');
      return self.skipWaiting();
    })
  );
});

// Activar service worker
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME && name !== STATIC_CACHE)
          .map((name) => {
            console.log('[SW] Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    }).then(() => {
      console.log('[SW] Activated successfully');
      return self.clients.claim();
    })
  );
});

// Interceptar peticiones
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Solo manejar peticiones del mismo origen
  if (url.origin !== location.origin) {
    return;
  }

  // Estrategia: Network First con fallback a cache
  event.respondWith(
    fetch(request)
      .then((response) => {
        // Si la respuesta es válida, guardar en cache
        if (response && response.status === 200 && response.type === 'basic') {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => {
        // Si falla la red, intentar desde cache
        return caches.match(request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // Si no hay cache, retornar página principal
          if (request.mode === 'navigate') {
            return caches.match('/');
          }
          return new Response('Offline', { status: 503 });
        });
      })
  );
});

// Manejar mensajes
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
