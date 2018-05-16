'use strict';
let page = {
    menu:false,
    typeScroll: 0
};

$(function() {   
    var hi = new Vivus('hi-there', {  // плавная загрузка логотипа
        type: 'delayed',
        duration: 200,
        animTimingFunction: Vivus.EASE_IN
    }, function(){
        console.log(logoSize())
        $('.preload').css({"background":"rgba(0, 0, 0, 0)"}).width('0').height('0');        
        $('#loadingImage svg').width(logoSize(40)[0]).height(logoSize(40)[1]);
        $('.container-menu').fadeIn(1000);       
    });    
    
    let logoSize = (procent) => {  //размер логотипа
        let WinWidth = $('.section:eq(0)').width();
        let WinHeight = $('.section:eq(0)').height();
        let ImgWidth = WinWidth - (WinWidth / 100) * procent;
        let ImgHeight = WinHeight - (WinHeight / 100) * procent;
        
        return [ImgWidth, ImgHeight]
    };
    
    let minimLogo = (proc) => { //функция изменения размера при открітии меню или скролле
        if(proc){
            $('#loadingImage svg').width(logoSize(91)[0]).height(logoSize(83)[1]);
            $('.preload').css({"top": "10px","left": "10px"});
            $('#loadingImage').css({"transform":"translate(0,0)"})
        }else{
            $('#loadingImage svg').width(logoSize(35)[0]).height(logoSize(35)[1]);
            $('.preload').css({"top": "50%","left": "50%"});
            $('#loadingImage').css({"transform":"translate(-50%,-50%)"})
        }
    };
    
    $('.container-menu').click(function(){
        if(page.menu){
            $('#page-menu').fadeOut(400);
            $.fn.fullpage.setAllowScrolling(true, 'down');
            page.menu = false;
        }else{
            $('#page-menu').fadeIn(400); 
            $.fn.fullpage.setAllowScrolling(false, 'down');
            page.menu = true;
        }
    });
   
    $('.noneSVG').fadeIn(5000);

    $('#fullpage').fullpage({
            //Navigation
            menu: '#myMenu',
            lockAnchors: false,
            anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'lastPage'],
            navigation: false,
            navigationPosition: 'right',
            navigationTooltips: ['firstSlide', 'secondSlide'],
            showActiveTooltip: true,
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
            normalScrollElements: '#element1, .element2',
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
            sectionsColor : ['black', '#fff', 'black', '#fff'],
            fixedElements: '#header, .footer',
            responsiveWidth: 0,
            responsiveHeight: 0,
            responsiveSlides: false,
            parallax: true,
            parallaxOptions: {type: 'cover', percentage: 62, property: 'translate'},

            //Custom selectors
            sectionSelector: '.section',
            slideSelector: '.slide',
            lazyLoading: true,

            //events
            onLeave: function(index, nextIndex, direction){
//                console.log('onLeave'+index);
//                if(index === 1){
//                    minimLogo(true);
//                }else if (index === 2 && page.typeScroll !== 'down'){
//                    setTimeout(function(){
//                        minimLogo(false);
//                    },600);
//                }
            },
            afterLoad: function(anchorLink, index){
//                $('#fullpage').bind('mousewheel', function(event) {  
//                    if(event.originalEvent.wheelDelta /120 > 0) {
//                        page.typeScroll = 'up';
//                    }else{
//                        page.typeScroll = 'down';
//                    }               
//                });
//                
//                $( "#loadingImage" ).on( "swipe", function(){
//                    console.log(11);
//                    $.fn.fullpage.moveSectionDown();
//                } );
                
            },
            afterRender: function(){
                
            },
            afterResize: function(){
                
            },
            afterResponsive: function(isResponsive){
                console.log('afterResponsive'+isResponsive);
            },
            afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex){
                console.log('afterSlideLoad'+index);
            },
            onSlideLeave: function(anchorLink, index, slideIndex, direction, nextSlideIndex){
                console.log('onSlideLeave'+index);
                
            }
    });    
//    $.fn.fullpage.setAllowScrolling(false, 'down');
});