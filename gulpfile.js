
var gulp = require('gulp');
var workbox = require('workbox-build');

gulp.task('generate-service-worker', () => {
    return workbox.generateSW({
    //   globDirectory: dist,
      globDirectory: './',
      globPatterns: [
        '**/*.{html,js,css,img,svg,png,mp3,ttf,woff2}'
      ],
      maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
    //   swDest: `${dist}/sw.js`,
    //   swDest: `${'.'}/sw.js`,
      swDest: `./sw.js`,
      clientsClaim: true,
      skipWaiting: true
    }).then(({warnings}) => {
      // In case there are any warnings from workbox-build, log them.
      for (const warning of warnings) {
        console.warn(warning);
      }
      console.info('Service worker generation completed.');
    }).catch((error) => {
      console.warn('Service worker generation failed:', error);
    });
});

