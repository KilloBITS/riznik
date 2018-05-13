'use strict';
let site = new Object();
let top1 = $("#about").offset().top;
let top2 = $("#news").offset().top;


function writeCSS(css) {
  var head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');

  style.type = 'text/css';
  if(style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  head.appendChild(style);
}

let openModal = (numModal,index) => {
    $('.md-effect-10').fadeIn(300);
    if(site.modal){
        closeModal();
    }else{
        if(numModal === 'modal-10'){
            site.modal = numModal;
            let position = $('.md-trigger:eq('+index+')').offset().left + ($('.md-trigger:eq('+index+')').width() / 2);
//            writeCSS('.md-effect-10 .md-content:after{ left:'+position+'px}');
            $('.content').css({"overflow": "hidden"});
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
            $('.content').css({"overflow": "auto"});
            delete site.modal;
            break;
    }
};

let goodAuth = (data, url) => {
    $('.cabinet-btn').hide();
    $('.auth-block').removeClass('show');
    let b = document.createElement('div');
    b.className = 'logout';
    b.onclick = function(){
        $.post('/logout');
        var cookies = document.cookie.split(";");

        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
        location.reload();
    };
    $('.head-menu').append(b);
    
    let a = document.createElement('div');
    a.className = 'toPanel';
    a.onclick = function(){
        window.open(url, '_blank');
    };
    
    a.innerHTML = '<span>'+data.user+'</span>';
    $('.head-menu').append(a);
    
    
};

let init = () => {
    $.post('/init', function (data) {
        var d = JSON.parse(data);
        if (d.code === '500') {            
            goodAuth(d,JSON.parse(data).url);
        }
        
    });    
};

let auth = () => {
    $.post('/auth',{log: $('#login').val(), pass: $('#pass').val()},function(data){            
        var d = JSON.parse(data);
        if(d.code === '500'){
            goodAuth(d, d.url);
        }
    });
};

 function initMap(i) {
//     49.826827,
        var uluru = [{lat: 49.832343, lng: 24.0341354},{lat: 49.8339874, lng: 24.0082176}];
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 18,
          center: uluru[i]
        });
        var marker = new google.maps.Marker({
          position: uluru[i],
          map: map
        });
      }

    
let design = () => {
    
    
    $('.md-trigger').click(function(){
        openModal($(this).attr('data-modal'),$(this).index(this));
    });
    
    
    $('.scroll-to-start-icon').click(function(){       
        $('.content').animate({scrollTop: top2}, 1500);
    }); 
     
    $('#toAbout').click(function(){       
        $('.content').animate({scrollTop: top1}, 1500);
    });   
    
    $('#toNews').click(function(){
        $('.content').animate({scrollTop: top2}, 1500);
    });
    
    let clickerFull = true;
    $('.btn-fullLegend').click(function(){
        if(clickerFull){
            $('.legend-text').css({
                "max-height": "fit-content",
                "box-shadow": "none"
            });//.css({
            clickerFull = false;
            $('.btn-fullLegend').html('Приховати');
        }else{
            $('.legend-text').css({
                "max-height": "400px",
                "box-shadow": "inset 0px -20px 20px -12px black"
            });//.css({
            clickerFull = true;
            $('.btn-fullLegend').html('Показати повністю');
        }
        
        
    });
    
    
      
        
    $('.toMap').click(function(){
        var index = $('.toMap').index(this);
        
        $("#modal-6").addClass('md-show');
        setTimeout(initMap(index), 1000)
    });
    
    $('.modal-6-close').click(function(){
        $('#modal-6').removeClass('md-show');
    });  
    
    $('.cabinet-btn').click(function(){
        $('.auth-block').toggleClass('show');
    });
    
    $('#logIn').click(function(){
        auth();
    });
    
    $('#toTop').click(function(){
        $('.content').animate({scrollTop: 0}, 1500);
    });
   
    $(".content").scroll(function(){
        console.log($(".content").scrollTop());
        if($(".content").scrollTop() > 950){
            $('#toTop').show(250);
        }else{
            $('#toTop').hide(250);
        }                
       
        if($(".content").scrollTop() >= $(document).height()){
            $('.head-menu').css({"background":"rgb(0, 0, 0)"});
        }else{
            $('.head-menu').css({"background":"rgba(0, 0, 0, 0.4)"});
        }
        
        if($(".content").scrollTop() >= 180){ //первый текст
            $('.nb-text:eq(0)').css({"opacity": "1"});  
        }         
        
        if($(".content").scrollTop() >= 285){
            setTimeout(function(){
                $('.naws-container:eq(0)').css({"opacity": "1"});
            },250);
            setTimeout(function(){
                $('.naws-container:eq(1)').css({"opacity": "1"});
            },450);
            setTimeout(function(){
                $('.naws-container:eq(2)').css({"opacity": "1"});
            },650);
        } 
        
        if($(".content").scrollTop() >= 555){
            $('.popular-text:eq(0)').css({"transform": "translate(0%,0)"});
        }
       
        if($(".content").scrollTop() >= 660){
            $('.legend').css({"opacity":"1"});
        }
        
        
        if($(".content").scrollTop() >= 1170){
            $('.nb-text:eq(1)').css({"opacity": "1"});
        }
        
        if($(".content").scrollTop() >= 1120){
            $('.SHOPS-BLOCK').css({"opacity": "1"});
        }      
    });
    var swiper = new Swiper(".swiper-container", swiperOptions);
    
    setTimeout(function(){
        $("#slog1").css({'transform':'translate(0%, 0)'});
    },500);
    setTimeout(function(){
        $("#slog2").css({'transform':'translate(0%, 0)'});
    },1500);
    
    
    $('.content').removeClass('blur');
    $('#document-preload').fadeOut(250);
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





$(document).ready(() => {
    init();
    design();
AOS.init({
  duration: 1200,
})

});
