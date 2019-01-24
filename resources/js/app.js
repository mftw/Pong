/**
 * Installer service worker hvis nødvendigt
 * Du skal referere til denne fil fra dit sites footer
 * Bemærk at din service worker fil skal ligge på roden af dit site (Linie 8)
 */

// if('serviceWorker' in navigator) {
//     window.addEventListener("load", () => {
//         navigator.serviceWorker.register('./sw.js')
//             .then(registration => {
//                 console.log("Service Worker Registred!");
//             })
//             .catch(error => {
//                 console.error("Registration failed!");
//             })
//     })
// }

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
      .then(function () {
            console.log('SW registered');
        })
    }