// ══════════════════════════════════════════════
//  MAGAZZINO MOLINARO — Service Worker
//  Cambia APP_VERSION ad ogni deploy per forzare
//  l'aggiornamento su tutti i dispositivi.
// ══════════════════════════════════════════════
const APP_VERSION = '1.3.4';
const CACHE_NAME  = 'magazzino-v' + APP_VERSION;

// File da mettere in cache per funzionamento offline
const CORE_ASSETS = [
  './',
  './app.html',
  './index.html',
  './firebase.js',
  './logo-molinaro.png',
  './icon-192.png',
  './icon-512.png',
  './manifest.json',
];

// ── INSTALL: scarica e mette in cache i file core ──
self.addEventListener('install', event => {
  console.log('[SW] Install v' + APP_VERSION);
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(CORE_ASSETS))
  );
});

// ── ACTIVATE: elimina le cache vecchie ──
self.addEventListener('activate', event => {
  console.log('[SW] Activate v' + APP_VERSION);
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key.startsWith('magazzino-v') && key !== CACHE_NAME)
          .map(key => {
            console.log('[SW] Elimino cache vecchia:', key);
            return caches.delete(key);
          })
      )
    ).then(() => self.clients.claim()) // Prende il controllo di tutte le pagine aperte
  );
});

// ── FETCH: Network-first per HTML, Cache-first per asset statici ──
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Ignora richieste a Firebase, CDN esterni, API
  if (!url.origin.includes(self.location.origin)) return;

  // HTML (app.html, index.html): prova la rete prima, cache come fallback
  if (event.request.destination === 'document' || url.pathname.endsWith('.html')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Asset statici (JS, immagini, icone): cache prima, rete come fallback
  event.respondWith(
    caches.match(event.request)
      .then(cached => cached || fetch(event.request).then(response => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return response;
      }))
  );
});

// ── MESSAGE: gestione messaggi dalla pagina ──
self.addEventListener('message', event => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});
