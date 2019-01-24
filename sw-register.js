//This is the service worker with the Cache-first network

//Add this below content to your HTML page, or add the js file to your page at the very top to register service worker
// if (navigator.serviceWorker.controller) {
//     console.log('[PWA Builder] active service worker found, no need to register')
// } else {

//     //Register the ServiceWorker
//     navigator.serviceWorker.register('sw.js', {
//         scope: './'
//     }).then(function (reg) {
//         console.log('Service worker has been registered for scope:' + reg.scope);
//     });
// }
function handleNetworkChange(event) {
    if (navigator.onLine) {
        document.body.classList.remove("offline");
    } else {
        document.body.classList.add("offline");
    }
}

window.addEventListener("load", () => {
    
    handleNetworkChange();
    window.addEventListener("online", handleNetworkChange);
    window.addEventListener("offline", handleNetworkChange);

    if ('serviceWorker' in navigator) {
        //Add this below content to your HTML page, or add the js file to your page at the very top to register service worker
        if (navigator.serviceWorker.controller) {
            // console.log('[PWA Builder] active service worker found, no need to register')
        } else {

            //Register the ServiceWorker
            navigator.serviceWorker.register('sw.js', {
                scope: './'
            }).then(function (reg) {
                // console.log('Service worker has been registered for scope:' + reg.scope);
            });
        }
    }
});

// if (navigator.onLine) {
//     document.body.classList.remove("offline");
// } else {
//     document.body.classList.add("offline");
// }
