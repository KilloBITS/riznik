'use strict';
$(function() {
    var hi = new Vivus('hi-there', {
        type: 'delayed',
        duration: 200,
        animTimingFunction: Vivus.EASE_IN
    }, function(){
        $('.preload').css({"background":"rgba(0, 0, 0, 0)"});        
        $('#loadingImage svg').width(400).height(600);
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
            scrollOverflowReset: false,
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
            sectionsColor : ['black', '#fff','black','#fff'],
            fixedElements: '#header, .footer',
            responsiveWidth: 0,
            responsiveHeight: 0,
            responsiveSlides: false,
            parallax: false,
            parallaxOptions: {type: 'reveal', percentage: 62, property: 'translate'},

            //Custom selectors
            sectionSelector: '.section',
            slideSelector: '.slide',
            lazyLoading: true,

            //events
            onLeave: function(index, nextIndex, direction){
                console.log('onLeave'+index+'/'+direction);
            },
            afterLoad: function(anchorLink, index){
//                let iWH = 0;
//                $('#topPage, .preload').on('mousewheel', function(event) {
//                    if(iWH <= 50){
//                        $('.preload').css({"transform":"translate(0,0)","left":"0","top":"74%"});
//                        
//                        
//                        
//                        $('.preload').height('0');
//                        $('.preload').width('0');
//                        $('#loadingImage svg').css({"width":"220px","height":"260px"});
//                        $('#loadingImage').css({"transform":"translate(0,0)"})
//                        iWH++
//                        console.log(iWH);
//                    }                    
//                });
            },
            afterRender: function(){},
            afterResize: function(){},
            afterResponsive: function(isResponsive){},
            afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex){
                
            },
            onSlideLeave: function(anchorLink, index, slideIndex, direction, nextSlideIndex){}
    });
//     $.fn.fullpage.setAllowScrolling(false, 'down');
    
});