let cacheName = 'rest-rev-static-v1',
    cacheFiles = [
      '/',
      'css/main.css',
      'js/main.js',
      'js/restaurant_info.js',
      'js/dbhelper.js'
    ]

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(cacheFiles)
    })
  )
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((thisCacheName) => {
          return thisCacheName.startsWith('rest-rev-') &&
          thisCacheName != cacheName
        }).map((thisCacheName) => {
          return cache.delete(thisCacheName)
        })
      )
    }).catch((err) => {
      return
    })
  )
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      if (response) return response
      return fetch(e.request)
    })
  )
});
