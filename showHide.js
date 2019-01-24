/**
 *  Funktion til at skifte den viste side
 * @param {integer} jumpTo
 */
function changePage(jumpTo) {

    // Få siderne der skal skiftes imellem, som array (HTMLCollection)
    let frames = document.querySelectorAll('.frame')

    // Få transisionstiden fra en af siderne (de er ens).
    // Den returneres som sekunder men skal bruges som millisekunder
    // så derfor ganges der med 1000.
    let transitionTime = parseFloat(getComputedStyle(frames[0])['transitionDuration']) * 1000;

    // Her gemmes index for den viste side, i array
    let currentShow = 0;

    // Her gemmes den side som allerede vises, som objekt.
    let currentFrame = null;

    // Gemmer den ønskede side, som objekt.
    let showPage = frames[jumpTo];

    // Looper igennem arrayet af sider
    for (let i = 0; i < frames.length; i++) {

        // Tjekker om et af ellementerne bliver vist
        if (frames[i].classList.contains('show')) {

            // Gem index'et den viste side har.
            currentShow = i;

            // Gemmer den viste side, som objekt.
            currentFrame = frames[i];

            // Bryder ud af loopet (Der burde ikke være mere end 1)
            break;
        }
    }

    // Sørg for at menuen altid er lukket når der skiftes side.
    showMenu('disable');

    // Fjern størrelses begrænsninger på den viste side når menuen lukkes.
    restrictSize('disable');

    // Bryd ud af funtionen hvis den viste side er den samme som den ønskede side
    if (currentShow == jumpTo) {
        return;
    }

    if(currentFrame.querySelector('video')) {
        currentFrame.querySelectorAll('video').forEach(video => {
            video.pause();
        });
    }

    // Vis den ønskede side med ".show" klassen
    showPage.classList.add('show');

    // Sørg for den ønskede side altid ligger øverst med ".stack-top" klassen.
    showPage.classList.add('stack-top');

    if (showPage.querySelector('.fade-to-white')) {
        menuIcons.forEach(icon => {
            icon.classList.add('icon-header--white')
        });
    } else {
        menuIcons.forEach(icon => {
            icon.classList.remove('icon-header--white')
        });
    }

    // Vent den tid det tager at skifte side (transitionTime)
    setTimeout(function () {
        // Fjern den viste side
        currentFrame.classList.remove('show');

        // Fjern ".stack-top" når den gamle side er væk.
        // showPage.classList.remove('stack-top');

        // Brug den transisionstid vi fik fra css klassen.
    }, transitionTime);

    // Vent den tid det tager at skifte side (transitionTime)
    setTimeout(function () {
        // Fjern den viste side
        // currentFrame.classList.remove('show');

        // Fjern ".stack-top" når den gamle side er væk.
        showPage.classList.remove('stack-top');

        // Brug den transisionstid vi fik fra css klassen.
    }, transitionTime * 2);
}


function showMenu(remove) {
    let menu = document.querySelector('.menu');

    if (remove === 'disable') {
        menu.classList.remove('show-menu');
    } else {
        menu.classList.toggle('show-menu');
    }

    // console.log(menuBtns);
    restrictSize();
}

function restrictSize(remove) {
    let currentShow = document.querySelector('.show');
    if (remove === 'disable') {
        currentShow.classList.remove('restrict-size')
    } else {
        currentShow.classList.toggle('restrict-size')
    }
}

var headers = document.querySelectorAll('.frame header');
var headerHeight = headers[0].offsetHeight;
var frameContainer = document.querySelector('.frame-container');

// let headerContent = document.querySelectorAll('.frame header *');
// let contentTop = parseFloat(getComputedStyle(headerContent[0])['top']);

// let scale =

// let contentHeight = headerContent[0].offsetHeight;
var scrollPos = frameContainer.scrollTop;
var fadePos = headerHeight - (headerHeight / 2) + 10;
var fadeOffset = 0;
var menuIcons = document.querySelectorAll('.icon-header');
// var logoSVG = document.getElementById('logo-svgID');
// var menuSVG = document.getElementById('menu-header-svgID');
// console.log(menuSVG);
// var showedHeader = null;
frameContainer.onscroll = function () {
    // let dir = '';
    // if (scrollPos < frameContainer.scrollTop) {
    //     dir = 'down';
    // } else {
    //     dir = 'up';
    // }
    // console.log(dir);

    scrollPos = frameContainer.scrollTop;
    var showedFrame = document.querySelector('.frame.show')
    // var showedHeader = document.querySelector('.frame.show .moving-header');
    var showedHeader = showedFrame.querySelector('.moving-header');
    // showedHeaderHeight = showedHeader.offsetHeight;

    // console.log(showedHeader);
    // if (showedHeader.classList.contains('show')) {

    // }

    if (scrollPos > (headerHeight / 2)) {
        showedHeader.style.height = headerHeight / 2 + 'px';

    } else {
        showedHeader.style.height = headerHeight - (scrollPos) + 'px';
        // content.style.top = contentTop - (scrollPos / 2.5) + 'px';

    }

    if (showedFrame.querySelector('.fade-to-white')) {
        if (scrollPos > (headerHeight / 2) + 20) {
            // if (showedHeader.classList.contains('fade-to-white')){

            // }
            // showedFrame.querySelector('.fade-to-white').style.background = 'rgba(255,255,255,1)'
            showedFrame.querySelector('.fade-to-white').classList.add('active');
            // menuSVG.classList.remove('icon-header-menu--white');
            // logoSVG.classList.remove('logo-svg--white');
            menuIcons.forEach(icon => {
                icon.classList.remove('icon-header--white')
            });
        } else {
            showedFrame.querySelector('.fade-to-white').classList.remove('active');
            // menuSVG.classList.add('icon-header-menu--white');
            // logoSVG.classList.add('logo-svg--white');
            menuIcons.forEach(icon => {
                icon.classList.add('icon-header--white')
            });
        }
    }
}

var currentFrame = document.querySelector('.show');

if (currentFrame.querySelector('.fade-to-white')) {
    // menuSVG.classList.add('icon-header-menu--white');
    menuIcons.forEach(icon => {
        icon.classList.add('icon-header--white')
    });
} else {
    // menuSVG.classList.remove('icon-header-menu--white')
    menuIcons.forEach(icon => {
        icon.classList.remove('icon-header--white')
    });
}

if(currentFrame.querySelector('.logo__loading')) {
    var loadingLogo = currentFrame.querySelector('.logo__loading');
    var loadTime = 3000;
    setTimeout(function(){
        changePage('0');
    }, loadTime);
    
    setTimeout(function(){
        loadingLogo.classList.remove('logo-svg--loading')
        // loadingLogo.classList.remove('svg-loader')
        // changePage(1);
    }, loadTime + 500);
}

setTimeout(function() {
    var f = document.querySelectorAll('iframe');
    f.forEach(mf => { 
        mf.src = src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d133.15687824613994!2d10.597102303863783!3d57.724779762671!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x464f44de156a155d%3A0x9daec7ccbf7473c0!2sSkagens+Museum!5e0!3m2!1sda!2sdk!4v1539551028377";
    });
    // console.log('mapm loaded after 2s');
}, 4000);
// console.log('Started');

// var navLinks = document.querySelectorAll('.navbar a');
// navLinks.forEach(link => {
//     link.onclick =
// });

// var frames = document.querySelectorAll('.frame');

// for (let i = 0; frames.length; i++) {
//     if(frames[i].classList.contains('show')) {
//         break;
//     }
//     if(i = frames.length && frames[i].classList.contains('show') != true) {
//         frames[0].classList.add('show');
//     }
// }


// console.log(document.querySelectorAll('.frame header *'));
// console.log(test);
// console.log('asdfasdfasdfasdf');
