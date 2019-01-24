/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

workbox.skipWaiting();
workbox.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "favicon-16x16.png",
    "revision": "260fc3855eae98d0130e98c6192b1419"
  },
  {
    "url": "favicon-32x32.png",
    "revision": "0002c1b2f5b4fcf99da92a6625a21a9a"
  },
  {
    "url": "font/ZCOOLKuaiLe-Regular.ttf",
    "revision": "ba97bf8f8d5aa619e2c2d37bca87ab34"
  },
  {
    "url": "gulpfile.js",
    "revision": "1ba7fd4f1bc73d759831b69c0b05e325"
  },
  {
    "url": "img/Baech_pong01.svg",
    "revision": "bf05f3ea0730be7816540020c75f64b4"
  },
  {
    "url": "img/Baech_pong02.svg",
    "revision": "2654d3f19634275f31533d655a3fc779"
  },
  {
    "url": "img/baneMedPaddles.svg",
    "revision": "1e3d86640afac094513782bffe6a47f2"
  },
  {
    "url": "img/bg.svg",
    "revision": "e86a4d4cb78394a674ade51fc04c2d2a"
  },
  {
    "url": "img/Coconutball.svg",
    "revision": "036c74457ff90cbf4171df250d6d72ec"
  },
  {
    "url": "img/paddle_left.svg",
    "revision": "3b2fc154a7ba57f17757d395be31808c"
  },
  {
    "url": "img/paddle_right.svg",
    "revision": "518521253c67e6a6eef921c2a4d184c3"
  },
  {
    "url": "img/win.svg",
    "revision": "acbb1e87b522391f99addd2e05ac43ed"
  },
  {
    "url": "img/win001.svg",
    "revision": "89806f3c0aaba1ae4e288236c7ea0e92"
  },
  {
    "url": "img/win01.svg",
    "revision": "12ab74fa50ec81fab82ee4c7e1292f72"
  },
  {
    "url": "index.html",
    "revision": "0b4c60051e330e7eba8253a6c3306b81"
  },
  {
    "url": "mstile-150x150.png",
    "revision": "653806cf861186c5ca1e1ec2239f207c"
  },
  {
    "url": "resources/audio/basketBall.mp3",
    "revision": "1f44fa4d3c41ae1ca713558cf9b7485d"
  },
  {
    "url": "resources/audio/basketBall2.mp3",
    "revision": "c61d55f3e997c9a8f3b513bf031ad44a"
  },
  {
    "url": "resources/audio/bg-music.mp3",
    "revision": "893fa27defc254c6e375e2badcdb9a58"
  },
  {
    "url": "resources/audio/boing.mp3",
    "revision": "ae8ea763671fa8d104b840c2ef1506c9"
  },
  {
    "url": "resources/audio/god-fuck.mp3",
    "revision": "de5f7b86d7682b8c542f39ae6cb3a1c8"
  },
  {
    "url": "resources/audio/goe.mp3",
    "revision": "98ab1f67622ee8241d9ab7e60e1c2341"
  },
  {
    "url": "resources/audio/pingPongBall.mp3",
    "revision": "d62f19256400bfdb84fd6c9e7ba54b0c"
  },
  {
    "url": "resources/audio/pop.mp3",
    "revision": "9cd1cf4a35b87250c7820fc7a32adfa2"
  },
  {
    "url": "resources/audio/winnerMusic.mp3",
    "revision": "a3f8cebf99648e9c14455fc7474b6753"
  },
  {
    "url": "resources/css/main.css",
    "revision": "073f0a671bb800ffb3d7a856f1646823"
  },
  {
    "url": "resources/css/style.css",
    "revision": "2c97d6e612c4624a7fa5a260840c721f"
  },
  {
    "url": "resources/css/win.css",
    "revision": "9b8ed03c6454fa03aaf9f8f064ef4a59"
  },
  {
    "url": "resources/font/Raleway-Regular.ttf",
    "revision": "580d0778ad254335be45bf58bb449f43"
  },
  {
    "url": "resources/font/Raleway-Regular.woff2",
    "revision": "2075794c8e9e7e48e5fbf1b2313e7adf"
  },
  {
    "url": "resources/font/ZCOOLKuaiLe-Regular.ttf",
    "revision": "ba97bf8f8d5aa619e2c2d37bca87ab34"
  },
  {
    "url": "resources/img/Baech_pong.png",
    "revision": "3bdc3e8761a78941572f08286ca764cd"
  },
  {
    "url": "resources/img/Baech_pong.svg",
    "revision": "684224d1d6105d970cab59a2130d7a46"
  },
  {
    "url": "resources/img/Baech_pong01.svg",
    "revision": "74c58a2950806a480deb5a58887991a1"
  },
  {
    "url": "resources/img/Baech_pong02.svg",
    "revision": "d5615dcce247d4d994fc8a82c3abd7bd"
  },
  {
    "url": "resources/img/bane_orang.svg",
    "revision": "4f90cb72361f68b1b6d8d73c3b529896"
  },
  {
    "url": "resources/img/bg.svg",
    "revision": "1903167be82ba8d0f726eda8bce65eaa"
  },
  {
    "url": "resources/img/Coconutball.svg",
    "revision": "b5076da06f23a879308c593a4efc38b6"
  },
  {
    "url": "resources/img/paddle_left.svg",
    "revision": "817f6a0694f364ce1771f64c0c85f3b7"
  },
  {
    "url": "resources/img/paddle_right.svg",
    "revision": "659dee9153e7f49520c459c9c791a55c"
  },
  {
    "url": "resources/img/win01.svg",
    "revision": "cce3336dcd6d0a1149c028ce45ae1c34"
  },
  {
    "url": "resources/js/app.js",
    "revision": "0f9ac736dde124fdef2babd8e11944d5"
  },
  {
    "url": "resources/js/ballPhysics.js",
    "revision": "2ff0267048a31799df084a1295dc7cc3"
  },
  {
    "url": "resources/js/paddle-mk-snavs.js",
    "revision": "b2b85729ef74fa82be1e27e2137c2e7f"
  },
  {
    "url": "resources/js/paddles.js",
    "revision": "56a61c2420923bb864fb2025c32a6855"
  },
  {
    "url": "resources/js/pointlogic.js",
    "revision": "b834424c167caa17294203f7097ca3ad"
  },
  {
    "url": "resources/js/vendor/TweenMax.min.js",
    "revision": "a45cae99e26730eb693b5acdf7bd4538"
  },
  {
    "url": "resources/js/winani.js",
    "revision": "85fbeb015cf20d1d141e912e19b88d0a"
  },
  {
    "url": "safari-pinned-tab.svg",
    "revision": "f46a0ce75ac0a7306571e81929cffb9f"
  },
  {
    "url": "sw-register.js",
    "revision": "2805af5dc5383274f9ce09445991e005"
  },
  {
    "url": "sw.org.js",
    "revision": "69949f5bc0d2a5356f6095e1506ccc24"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
