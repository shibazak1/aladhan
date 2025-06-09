


// Request permission when the user clicks a button (best practice)
document.addEventListener("click", () => {
  if ("Notification" in window) {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        console.log("Notification permission granted!");
      }
    });
  }
});



setTimeout(() => {
  if (navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({
      action: "SHOW_NOTIFICATION"
    });
  }
}, 5000); // Show after 5 seconds (even offline)
