'use strict';
let page = {
    menu: false,
    typeScroll: 0
};

$(function () {

    let loadGallery = () => {
        $.post('/main', function (data) {
            page.gallery = data;
            console.log(data);
            for (let i = 0; i < data.length - 1; i++) {
                let a = document.createElement('div');
                a.className = 'img';
                a.onclick = function () {
                    var index = $('.img').index(this);
                    if ($(document).width() < 864) {
                        var W = 320;
                        var H = 400;
                    } else {
                        var W = page.gallery[index].images.standard_resolution.width;
                        var H = page.gallery[index].images.standard_resolution.height;
                    }
                    $('#imaaages').width(W).height(H).css({"background-image": "url(" + page.gallery[index].images.standard_resolution.url + ")"});
                    $('.openImage').fadeIn(350);
                };
                $('.imageList').append(a);
                $('.img:eq(' + i + ')').css({"background-image": "url(" + page.gallery[i].images.standard_resolution.url + ")"});
            }
        });
        $("#closeImage").click(function () {
            $('.openImage').fadeOut(350);
        });
        $('.arrows').click(function () {
            $.fn.fullpage.moveSectionDown();
        });
    };

    let minimLogo = (proc) => { //функция изменения размера при открітии меню или скролле
        if (proc) {
            $('#loadingImage svg').width(logoSize(91)[0]).height(logoSize(83)[1]);
            $('.preload').css({"top": "10px", "left": "10px"});
            $('#loadingImage').css({"transform": "translate(0,0)"});

            $('.menu-btn').fadeIn(300);
            setTimeout(function () {
                $('#dinamic-logo svg').width(logoSize(91)[0]).height(logoSize(83)[1]);
                $('#dinamic-logo').show();
                $('#loadingImage svg').hide(150);
                $('.top-slong').addClass('shows');                
                $.fn.fullpage.setAllowScrolling(true, 'down');                
            }, 500);

        } else {
            $('#loadingImage svg').show();
            $('#loadingImage svg').width(logoSize(40)[0]).height(logoSize(40)[1]);
            $('#dinamic-logo').hide();
            $('.preload').css({"top": "50%", "left": "50%"});
            $('#loadingImage').css({"transform": "translate(-50%,-50%)"});
            $('.top-slong').removeClass('shows');
            $('.menu-btn').fadeOut(300);
            $.fn.fullpage.setAllowScrolling(false, 'down');
        }
    };

    var scrolling = function () {
        let DWidth = $(document).width();
        let DHeight = $(document).height();
        console.log(DWidth);
        console.log(DHeight);
        $('#topPage,.preload').bind('mousewheel', function (e) {
            if (e.originalEvent.wheelDelta / 120 > 0) { //up
                minimLogo(false);
            } else {//down
                minimLogo(true);
            }
        });


    };

    var hi = new Vivus('hi-there', {// плавная загрузка логотипа
        type: 'delayed',
        duration: 200,
        animTimingFunction: Vivus.EASE_IN
    }, function () {
        $('.preload').css({"background": "rgba(0, 0, 0, 0)"}).width('0').height('0');
        $('#loadingImage svg').width(logoSize(40)[0]).height(logoSize(40)[1]);
        $('.container-menu').fadeIn(1000);
        scrolling();
        
        if($(document).width() <= 864){
            minimLogo(true);
        }
    });
    loadGallery();

    let logoSize = (procent) => {  //размер логотипа
        let WinWidth = $('.section:eq(0)').width();
        let WinHeight = $('.section:eq(0)').height();
        let ImgWidth = WinWidth - (WinWidth / 100) * procent;
        let ImgHeight = WinHeight - (WinHeight / 100) * procent;

        return [ImgWidth, ImgHeight]
    };

    $('.container-menu').click(function () {
        if (page.menu) {
            $('#page-menu').fadeOut(400);
            $.fn.fullpage.setAllowScrolling(true, 'down');
            page.menu = false;
        } else {
            $('#page-menu').fadeIn(400);
            $.fn.fullpage.setAllowScrolling(false, 'down');
            page.menu = true;
        }
    });
    
    $('#button-blue').click(function(){
        $('.loadMSG').show();
        $.post('/sendMessage',{name:$('#name').val() , email:$('#email').val() ,msgText:$('#comment').val()}, function(data){
            if(data){
                console.log(true)
                $('.loadMSG').css({
                    "background":"rgba(255, 255, 255, 0.74)",
                    "color":"black"
                }).html('Повідомлення відправлено :)');
                setTimeout(function(){
                    $('.loadMSG').fadeOut(300);
                },2000);
            }else{
                console.log(false);
                $('.loadMSG').css({
                    "background":"rgba(255, 255, 255, 0.74)",
                    "color":"red"
                }).html('Повідомлення не відправлено :(');
                setTimeout(function(){
                    $('.loadMSG').fadeOut(300);
                },2000);
            }
        });
    });

    $('.noneSVG').fadeIn(5000);

    $('#fullpage').fullpage({
        //Navigation
        menu: '#myMenu',
        lockAnchors: true,
        anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'lastPage'],
        navigation: true,
        navigationPosition: 'right',
        navigationTooltips: ['Різник', 'Про нас', 'Фотогалерея'],
        navigationColor: "#000",
        showActiveTooltip: false,
        slidesNavigation: true,
        slidesNavPosition: 'bottom',

        //Scrolling
        css3: true,
        scrollingSpeed: 1500,
        autoScrolling: true,
        fitToSection: true,
        fitToSectionDelay: 1000,
        scrollBar: false,
        easing: 'easeInOutCubic',
        easingcss3: 'ease',
        loopBottom: false,
        loopTop: false,
        loopHorizontal: true,
        continuousVertical: false,
        continuousHorizontal: false,
        scrollHorizontally: false,
        interlockedSlides: false,
        dragAndMove: false,
        offsetSections: false,
        resetSliders: true,
        fadingEffect: false,
        normalScrollElements: '.imageList',
        scrollOverflow: false,
        scrollOverflowReset: true,
        scrollOverflowOptions: null,
        touchSensitivity: 15,
        normalScrollElementTouchThreshold: 5,
        bigSectionsDestination: null,

        //Accessibility
        keyboardScrolling: true,
        animateAnchor: true,
        recordHistory: true,

        //Design
        controlArrows: true,
        verticalCentered: true,
        dragAndMove: true,
        sectionsColor: ['black', '#fff', 'black', '#fff'],
        fixedElements: '#header, .footer',
        responsiveWidth: 0,
        responsiveHeight: 0,
        responsiveSlides: false,
        parallax: true,
        parallaxOptions: {type: 'cover', percentage: 62, property: 'translate'},

        //Custom selectors
        sectionSelector: '.section',
        slideSelector: '.slide',
        lazyLoading: false,

        //events
        onLeave: function (index, nextIndex, direction) {
            var vid = document.getElementById("video-background");
            vid.play();
        },
        afterLoad: function (anchorLink, index) {},
        afterRender: function () {
            var vid = document.getElementById("video-background");
            vid.play();
        },
        afterResize: function () {},
        afterResponsive: function (isResponsive) {},
        afterSlideLoad: function (anchorLink, index, slideAnchor, slideIndex) {},
        onSlideLeave: function (anchorLink, index, slideIndex, direction, nextSlideIndex) {}
    });
    $.fn.fullpage.setAllowScrolling(false, 'down');

    var vid = document.getElementById("video-background");
    vid.play();
});