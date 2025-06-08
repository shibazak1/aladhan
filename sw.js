


// service worker file

const cacheName =  'latest-prayer-time-v1';

self.addEventListener('install', (event) => {
    console.log('Service Worker installed');
    event.waitUntil(
	caches.open(cacheName).then(function (cache){
	    cache.addAll([
		'offline.html',
	    ]);
	})
    );
});

self.addEventListener('fetch', (event) => {
    console.log('Fetching:', event.request.url);
    cacheFirstWithRefresh(event.request);

});




function cacheFirstWithRefresh(request){
    
    var  requestTocache = request.clone();
    const fetchPromis = fetch(requestTocache).then((response)=>{
	if(!response || response.status !== 200){
	    return response;
	}
	var responseToCache = response.clone();
	caches.open(cacheName)
	    .then((cache)=>{
		cache.put(requestTocache,responseToCache);
		
	    });

	return response;
	
	
    })
    return caches.match(request)
	.then((cachedResponse)=>{
	    return  cachedResponse || fetchPromis;
	})
	.catch((error)=>{
	    if(request.method == 'GET' && request.headers.get('accept').includes('text/html')){
		return caches.match('ads3/offline');
	    }

	});
    
}
