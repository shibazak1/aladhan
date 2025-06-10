


// service worker file

const cacheName =  'latest-prayer-time-v1';

self.addEventListener('install', (event) => {
    console.log('Service Worker installed');
    event.waitUntil(
	caches.open(cacheName).then(function (cache){
	    cache.addAll([
		'/offline.html',
		'/anime_144x144.png',
	    ]);
	})
    );
});


self.addEventListener("message", (event) => {
    if (event.data.action === "SHOW_NOTIFICATION") {
	console.log("notification come");
	self.registration.showNotification("Adhan Alert!!", {
	    body: event.data.body,
	    icon: "/anime_144x144.png", // Make sure this icon is cached
	});
    }
});



self.addEventListener('fetch', (event) => {
    console.log('Fetching:', event.request.url);
    cacheFirstWithRefresh(event.request);

});



/*
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
		return caches.match('offline');
	    }

	});
    
}

*/

async function cacheFirstWithRefresh(request) {
  // Try to get from cache first
  const cachedResponse = await caches.match(request);
  
  // If we have a cached version, return it immediately
  if (cachedResponse) {
    // But also update cache in background
    updateCache(request);
    return cachedResponse;
  }
  
  // Otherwise try network
  try {
    const networkResponse = await fetch(request);
    
    // Cache the response if valid
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      await cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    // If offline and HTML request, return offline page
    if (request.headers.get('accept').includes('text/html')) {
      return caches.match('offline');
    }
    throw error;
  }
}

// Helper function to update cache in background
async function updateCache(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      await cache.put(request, networkResponse.clone());
    }
  } catch (error) {
    // Silent fail - we're offline
  }
}
