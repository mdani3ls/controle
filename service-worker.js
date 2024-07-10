self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('app-cache').then((cache) => {
        return cache.addAll([
          '/',
          '/index.html',
          '/styles.css',
          '/script.js',
          '/manifest.json',
          // Adicione aqui todos os arquivos que precisam ser cacheados
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  });
  