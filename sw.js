/* Service worker：cache-first，讓 App 離線也能玩
 * 改版時把 CACHE_VERSION +1，舊快取會自動清掉 */
const CACHE_VERSION = 'knj-v6';

const ASSETS = [
  './',
  './index.html',
  './css/style.css',
  './js/data.js',
  './js/art.js',
  './js/speech.js',
  './js/recognition.js',
  './js/app.js',
  './manifest.webmanifest',
  './icons/icon-180.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
];

self.addEventListener('install', e => {
  // cache: 'reload' → 繞過瀏覽器 HTTP 快取，確保存進來的一定是伺服器上的最新版
  e.waitUntil(
    caches.open(CACHE_VERSION)
      .then(c => c.addAll(ASSETS.map(u => new Request(u, { cache: 'reload' }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        // 順手把新抓到的同源檔案放進快取
        if (res.ok && new URL(e.request.url).origin === location.origin) {
          const copy = res.clone();
          caches.open(CACHE_VERSION).then(c => c.put(e.request, copy));
        }
        return res;
      }).catch(() => {
        // 離線時導頁請求退回主頁
        if (e.request.mode === 'navigate') return caches.match('./index.html');
      });
    })
  );
});
