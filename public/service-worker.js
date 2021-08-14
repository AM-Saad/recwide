if (workbox) {
    console.log(`Workbox is loaded`);
    workbox.core.setCacheNameDetails({ prefix: "lite-bdfi-app" });
  
    self.addEventListener('message', (event) => {
  
      if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
      }
    });
  
    self.__precacheManifest = [].concat(self.__precacheManifest || []);
    workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
  
  
  }
  else {
    console.log(`Workbox didn't load`);
  }
  
  // const filesToCache = [
  //   '/',
  //   'src/assets/css/classes.css',
  //   './index.html',
  
  // ];
  
  // const staticCacheName = 'pages-cache-v1';
  
  // self.addEventListener('install', event => {
  //   console.log('Attempting to install service worker and cache static assets');
  //   event.waitUntil(
  //     caches.open(staticCacheName)
  //       .then(cache => {
  //         return cache.addAll(filesToCache);
  //       })
  //   );
  // });