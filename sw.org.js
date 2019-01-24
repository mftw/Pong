self.addEventListener('install', function (event) {
    console.log('SW Installed');
    event.waitUntil(
    caches.open('static')
        .then(function (cache) {
           //cache.add('/');
           //cache.add('/index.html');
           //cache.add('/src/js/app.js');
            cache.addAll([
                '/',
                './index.html',
                './resources/js/vendor/TweenMax.min.js',
                './resources/js/app.js',
                './resources/js/ballPhysics.js',
                './resources/js/paddles.js',
                './resources/js/pointlogic.js',
                './resources/js/winani.js',
                './resources/css/main.css',
                './resources/css/style.css',
                './resources/css/win.css',
            ]);
        })
    );
});

self.addEventListener('activate', event => {
    console.log('SW Activated');
});