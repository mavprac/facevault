const CACHE = 'facevault-v1';
const PRECACHE = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=DM+Mono:wght@300;400&display=swap',
  'https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/dist/face-api.min.js',
  'https://justadudewhohacks.github.io/face-api.js/models/tiny_face_detector_model-weights_manifest.json',
  'https://justadudewhohacks.github.io/face-api.js/models/tiny_face_detector_model-shard1',
  'https://justadudewhohacks.github.io/face-api.js/models/face_landmark_68_tiny_model-weights_manifest.json',
  'https://justadudewhohacks.github.io/face-api.js/models/face_landmark_68_tiny_model-shard1',
  'https://justadudewhohacks.github.io/face-api.js/models/face_recognition_model-weights_manifest.json',
  'https://justadudewhohacks.github.io/face-api.js/models/face_recognition_model-shard1',
  'https://justadudewhohacks.github.io/face-api.js/models/face_recognition_model-shard2'
];

// Install — cache everything needed for offline
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(PRECACHE).catch(err => {
      // Some external resources may fail — that's ok
      console.warn('SW precache partial failure:', err);
    }))
  );
  self.skipWaiting();
});

// Activate — clean old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch — cache-first for models/assets, network-first for everything else
self.addEventListener('fetch', e => {
  const url = e.request.url;

  // Cache-first: AI model files and static assets (they never change)
  if (url.includes('face-api.js') || url.includes('face_') || url.includes('tiny_face') || url.includes('landmark')) {
    e.respondWith(
      caches.match(e.request).then(cached => cached || fetch(e.request).then(res => {
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
        return res;
      }))
    );
    return;
  }

  // Network-first with cache fallback for everything else
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
