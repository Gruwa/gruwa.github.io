self.addEventListener('install', function (e) {
    console.log('Install SW ...', e);
});

self.addEventListener('activate', function (e) {
    console.log('Activate SW ...', e);
    return self.clients.claim();
});

self.addEventListener('fetch', function (e) {
    console.log('Fetch event', e);
    e.respondWith(fetch(e.request));
});
