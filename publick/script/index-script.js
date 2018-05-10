'use strict';
let site = new Object();
let openModal = (numModal) => {
    $('.md-effect-10').fadeIn(300);
    if(site.modal){
        closeModal();
    }else{
        if(numModal === 'modal-10'){
            site.modal = numModal;
            //.css({"z-index": "5"});
            $('.head-menu').addClass('darkHeadMenu');
            $('#modal-10').addClass('md-show');
        }  
    }
    
};

let closeModal = () => {
    switch(site.modal){
        case 'modal-10': 
            $('.head-menu').removeClass('darkHeadMenu');
            $('#modal-10').removeClass('md-show');
            setTimeout(() => {
                $('.md-effect-10').hide();//.css({"z-index": "0"});
            }, 300);
            delete site.modal;
            break;
    }
};

let design = () => {
    $('.content').removeClass('blur');
    $('#document-preload').fadeOut(250);
    
    $('.md-trigger').click(function(){
        openModal($(this).attr('data-modal'));
    });
    var swiper = new Swiper(".swiper-container", swiperOptions);
    
    setTimeout(function(){
        $("#slog1").css({'transform':'translate(0%, 0)'});
    },500);
    setTimeout(function(){
        $("#slog2").css({'transform':'translate(0%, 0)'});
    },1500);
};

var interleaveOffset = 0.5;

var swiperOptions = {
  loop: true,
  speed: 1000,
  grabCursor: true,
  watchSlidesProgress: true,
  mousewheelControl: true,
  keyboardControl: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },
  on: {
    progress: function() {
      var swiper = this;
      for (var i = 0; i < swiper.slides.length; i++) {
        var slideProgress = swiper.slides[i].progress;
        var innerOffset = swiper.width * interleaveOffset;
        var innerTranslate = slideProgress * innerOffset;
        swiper.slides[i].querySelector(".slide-inner").style.transform =
          "translate3d(" + innerTranslate + "px, 0, 0)";
      }
    },
    touchStart: function() {
      var swiper = this;
      for (var i = 0; i < swiper.slides.length; i++) {
        swiper.slides[i].style.transition = "";
      }
    },
    setTransition: function(speed) {
      var swiper = this;
      for (var i = 0; i < swiper.slides.length; i++) {
        swiper.slides[i].style.transition = speed + "ms";
        swiper.slides[i].querySelector(".slide-inner").style.transition =
          speed + "ms";
      }
    }
  },
  autoplay: {
    delay: 5500,
    stopOnLastSlide: false
  }
};

function updateTime () {
  var now = new Date();

  document.getElementById("hour-hand").style.webkitTransform = "rotate(" + (now.getHours() * 30 + now.getMinutes() / 2) + "deg)";
  
  document.getElementById("min-hand").style.webkitTransform = "rotate(" + (now.getMinutes() * 6 + now.getSeconds() / 10) + "deg)";
  
  document.getElementById("sec-hand").style.webkitTransform = "rotate(" + now.getSeconds() * 6 + "deg)";

  setTimeout(function () {
      updateTime();
  }, 1000);
}




$(document).ready(() => {
    design();
    updateTime();
});
