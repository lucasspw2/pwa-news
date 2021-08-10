var CACHE_NAME = 'pwa-blog'; //nome do cache
var urlsToCache = [  //urls p/cache - (css, js)
    '/',
    '/index.html'
];

self.addEventListener('install', event => { //quando for instalado a pwa (quando abrir o site)
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache){
            console.log('Opened cache');
            return cache.addAll(urlsToCache)
        })
     
    )
})


self.addEventListener('active', event => {  //valida cache
    var cacheWhiteList = ['pwa-task-manager']
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if(cacheWhiteList.indexOf(cacheName) === -1 ){
                        return caches.delete(cacheName)
                    }
                })
            )
        })
    )
})

self.addEventListener('fetch', function(event){ // func escuta fetch, verifica se existe response no cache 1
    console.log('fetch', event);

    event.respondWith(
        caches.open(CACHE_NAME).then(function(cache){
            return cache.match(event.request).then(function(response){
                return response || fetch(event.request).then(function(response){
                    cache.put(event.request, response.clone());
                    return response;
                })
            })
        })
    )
});

