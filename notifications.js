


// Request permission when the user clicks a button (best practice)
document.addEventListener("click", () => {
  if ("Notification" in window) {
    Notification.requestPermission().then(permission => {
	if (permission === "granted") {
	    
	    if (navigator.serviceWorker.controller) {
		console.log("notification go");
		
		navigator.serviceWorker.controller.postMessage({
		    action: "SHOW_NOTIFICATION",
		    body:`Thank You For Accepting Our Notifications`,
		});
	    }
	    
            console.log("Notification permission granted!");
	}
    });
  }
});


/*
setTimeout(() => {
    if (navigator.serviceWorker.controller) {
	console.log("notification go");
	
	navigator.serviceWorker.controller.postMessage({
	    action: "SHOW_NOTIFICATION"
	});
    }
}, 5000); // Show after 5 seconds (even offline)
*/
