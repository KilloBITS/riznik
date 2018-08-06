'use strict';

var shops = new Object(); //переменная параметров
shops.openCall = 0;
shops.openMobMenu = false;
//объект корзины
var tovar = [];


var loadtTovar = () => {
    $.post('/tovar', function (data) {
        console.log(JSON.parse(data));
        for (let i = 0; i < JSON.parse(data).length; i++) {

        }
    });
};

var basketSum = () =>{
    let BLength = $('.basket-item').size();
    let summa = 0;
    for(let i = 0; i < BLength; i++){
        let price = $('.basket-price:eq('+i+')').html().replace(/[^-0-9^.]/g,'');
        let sum = price * $('.lengthItems:eq('+i+')').val();
        summa += sum;
    }
    $('.basket-sum').html('Загальна вартість: ' + summa + " грн")
};

var updateCart = function (name, id, price, img) {
    var cartS = new Object();
    cartS.nameTovar = name;
    cartS.id = parseInt(id);
    cartS.v = 1;
    cartS.price = price;
    cartS.img = img;
    tovar.push(cartS);
    localStorage.setItem("cart", JSON.stringify(tovar));
};

var getCart = function () {
    var cart = localStorage.getItem("cart");
    if ((JSON.parse(cart)) && JSON.parse(cart).length > 0) {
        tovar = JSON.parse(cart);
        $('.basket div').html(JSON.parse(cart).length);
    }
};


var design = function () {
    var prewList, nextList;

    $('.page').click(function () {
        $('.page').removeClass('pageActive');
        var index = $('.page').index(this);
        $('.page:eq(' + index + ')').addClass('pageActive');

        console.log(10 * parseInt($(this).html()));

        for (let i = 0; i < shops.tovLengthData; i++) {
            if (i < (parseInt($(this).html()) * 10) && i >= ((parseInt($(this).html()) * 10) - 10)) {
                $('.tovarDB:eq(' + i + ')').show();
            } else
            {
                $('.tovarDB:eq(' + i + ')').hide();
            }
        }
        $('.content').animate({scrollTop: 0}, 500);
        return false;
    });

    $('.btnMenu').click(function () {
        $('.BuyTovar').fadeOut(300);
        $('.tovarDB').fadeIn(200);
        $('.btnMenuDemo').hide();
        let index = $('.btnMenu').index(this);
        $('.btnMenu').removeClass('btnActive');
        $('.btnMenu:eq(' + index + ')').addClass('btnActive');
        $('.content').hide();
        switch (index) {
            case 0:
                loadMainPage();
                break;
            case 1:
                loadPricePage();
                break;
            case 2:
                loadOtherPage();
                break;
        }
    });

    $('.filter-btn').click(function () {
        let index = $('.filter-btn').index(this);
        $('.filter-btn').removeClass('btnActive');
        $('.filter-btn:eq(' + index + ')').addClass('btnActive');
    });

    $('.selectArea').click(function () {
        if (!shops.SA) {
            var index = $('.selectArea').index(this);
            $('.sel:eq(' + index + ')').fadeIn(200);
            shops.SA = true;
        } else {
            var index = $('.selectArea').index(this);
            $('.sel:eq(' + index + ')').fadeOut(200);
            shops.SA = false;
        }
    });


    $('.basket').click(function () {
        if (!shops.basket) {
            if ($(document).width() < 800) {
                $('.basket-WIN').css({"left":"0px"}).fadeIn(300);
            } else {
                $('.basket-WIN').css({"left": ($('.basket').offset().left - ($('.basket-WIN').width() - 45)) + "px"}).fadeIn(300);

            }
            if (tovar && tovar.length > 0) {
                $('.basket-item').remove();
                for (let i = 0; i < tovar.length; i++) {
                    var ssd = '<div class="basket-item"><div class="basket-icon" style="background-image:' + tovar[i].img + '"></div><div class="basket-string">' + tovar[i].nameTovar + '</div><div class="basket-price">' + tovar[i].price + '</div><div class="basket-item-length">Кількість: <input type="number" class="lengthItems" value="1" min="1"></div><div class="basket-item-delete"></div></div>';
                    $('.basket-list').append(ssd);
                }
            }
            basketSum();
            shops.basket = true;
        } else {
            $('.basket-WIN').css({"left": ($('.basket').offset().left - ($('.basket-WIN').width() - 45)) + "px"}).fadeOut(300);
            shops.basket = false;
        }
    });

    $('.selOption').click(function () {
        $('.sel').fadeOut(200);
        var index = $('.selOption').index(this);
        $('#sort').html($('.selOption:eq(' + index + ')').html())
        shops.SA = false;
    });

    $('.addCart .button').click(function () {
        var index = $('.addCart .button').index(this);
        var demo = document.createElement('div');
        demo.className = 'demoCart';
        $('body').append(demo);
        $('.demoCart').css({
            "background-image": "url(../../../content/tovarImage/" + (index + 1) + ".jpg",
            "left": $('.tovar-logo:eq(' + index + ')').offset().left + ($('.tovar-logo:eq(' + index + ')').width() / 2) + 'px',
            "top": $('.tovar-logo:eq(' + index + ')').offset().top + ($('.tovar-logo:eq(' + index + ')').height() / 2) + 'px'
        });
        setTimeout(function () {
            $('.demoCart').css({
                "width": "35px",
                "height": "35px",
                "left": $('.basket').offset().left + 'px',
                "top": 5 + 'px'
            });
            $('.basket div').html(parseInt($('.basket div').html()) + 1);
            updateCart($('.tovar-title:eq(' + index + ')').html(), $('.tovarID:eq(' + index + ')').html(), $('.price:eq(' + index + ')').html(), 'url(../../../content/tovarImage/' + (index + 1) + '.jpg');
        }, 500);

        setTimeout(function () {
            $('.demoCart').css({
                "opacity": "0"
            });

        }, 1000);

        setTimeout(function () {
            $('.demoCart').remove();
        }, 1300);
    });

    $('.basket-check').click(function () {
        $('.basket-WIN').css({
            "left": "50%",
            "top": "50%",
            "transform": "translate(-50%, -50%)",
            "width": "800px",
            "height": "700px"
        });

        $('.basket-list').css({
            "width": "50%",
            "margin-left": "10px"
        });
        
        $('.basket-applyData').css({"display":"block"});
        $('.content').css({'filter':'blur(3px)'});
    });
    
    $('#typeOfDostavka').change(function(){
        let sam = () => {
            $('#samShop').fadeIn(400);
            $('.kur').fadeOut(300);
            $('#mapa').fadeIn(300);
        };
        let kur = () => {
            $('#samShop').fadeOut(300);
            $('.kur').fadeIn(400);
            $('#mapa').fadeOut(300);
        };
        let np = () => {
            $('#samShop').fadeOut(300);
            $('.kur').fadeOut(300);
            $('#mapa').fadeOut(300);
        };
        switch(parseInt($('#typeOfDostavka').val())){
            case 1: sam();break;
            case 2: kur();break;
            case 3: np();break;
        }
    });
    
    function initMap(uluru) {
//        var uluru = {lat: -25.363, lng: 131.044};
        var map = new google.maps.Map(document.getElementById('mapa'), {
          zoom: 19,
          mapTypeControl: false,
          zoomControl: false,
          fullscreenControl: false,
          center: uluru
        });
        var marker = new google.maps.Marker({
          position: uluru,
          map: map,
          icon: 'image/marker.gif'
        });
    }
    
    $('#selectShops').change(function(){
      
      let kon = () => {
          initMap(JSON.parse('{"lat": 49.833984, "lng": 24.0082176}'));
      };
      let kos = () => {
          initMap(JSON.parse('{"lat": 49.832343, "lng": 24.0341354}'));
      };
        switch(parseInt($('#selectShops').val())){
            case 1: kon();break;
            case 2: kos();break;
        }
    });

    $('.details').click(function () {
//        document.location.href='/product';
        let ID = $('.' + $('.details:eq(' + $('.details').index(this) + ')').parents()[1].className + ' .tovarID:eq(' + $('.details').index(this) + ')').html();
        $('.content-preload').fadeIn(100);
        $('.BuyTovar').fadeIn(300);
        $('.tovarDB').fadeOut(300);
        $('.btnMenu').removeClass('btnActive');
        $('#tovarname').html('Перегляд товару').addClass('btnActive').fadeIn(300).click();
        $('.BuyTovar iframe').attr("src", "/product/&tovar=" + ID);
        setTimeout(function () {
            $('.content-preload').fadeOut(300);
        }, 1000);
    });

    $('.content').scroll((e) => {
        var scroll = $('.content:eq(1)').scrollTop();
        if (scroll > 400) {
            if (!$('.toTopBtn').is(':visible')) {
                $('.toTopBtn').fadeIn(300);
            }

        } else {
            if ($('.toTopBtn').is(':visible')) {
                $('.toTopBtn').fadeOut(300);
            }
        }
    });

    $('.toTopBtn').click(() => {
        $('.content:eq(1)').animate({
            scrollTop: 0
        }, 700);
    });

    $('.call-btn').click(() => {
        if (shops.openCall == 0) {
            if (!$('.call-btn').hasClass('call-btn-active')) {
                $('.call-btn').addClass('call-btn-active');
                $('.call-btn-data, .call-close').fadeIn(300);
            }
            setTimeout(() => {
                shops.openCall = 1;
            }, 1000);
        }
    });

    $('.call-close').click(() => {
        if (shops.openCall == 1) {
            if ($('.call-btn').hasClass('call-btn-active')) {
                $('.call-btn').removeClass('call-btn-active');
                $('.call-btn-data, .call-close').fadeOut(300);
            }
            setTimeout(() => {
                shops.openCall = 0;
            }, 1000);
        }
    });

    $(document).mouseup(function (e) { // событие клика по веб-документу
        var div = $(".sel"); // тут указываем ID элемента        
        if (!div.is(e.target) // если клик был не по нашему блоку
                && div.has(e.target).length === 0 && !$(".sort").is(e.target)) { // и не по его дочерним элементам
            div.fadeOut(300); // скрываем его
            setTimeout(() => {
                shops.SA = false;
            }, 500);

        }
    });

$(document).on('keyup mouseup keydown change blur', '.lengthItems', function() {
  basketSum();
});
    /*Mobile nav*/
    $('.mobile-menu').click(function () {
        if (shops.openMobMenu) {
            $('.mobile-menu').removeClass('openMobMenu');
            $('.mobile-menu-block').fadeOut(300);
            $('.content').css({
                'filter': 'blur(0px) grayscale(0%)',
                'pointer-events': 'auto'
            });
            shops.openMobMenu = false;
        } else {
            $('.mobile-menu').addClass('openMobMenu');
            $('.mobile-menu-block').fadeIn(300);
            $('.content').css({
                'filter': 'blur(3px) grayscale(100%)',
                'pointer-events': 'none'
            });
            shops.openMobMenu = true;
        }
    });

    $('.MobBtnNavMenu').click(function () {
        $('.BuyTovar').fadeOut(300);
        $('.tovarDB').fadeIn(200);
        $('.btnMenuDemo').hide();
        let index = $('.MobBtnNavMenu').index(this);
        $('.MobBtnNavMenu').removeClass('btnActive');
        $('.MobBtnNavMenu:eq(' + index + ')').addClass('mobBtnActive');
        $('.content').hide();
        switch (index) {
            case 1:
                loadPricePage();
                break;
            case 0:
                loadOtherPage();
                break;
        }
    });
};

var loadMainPage = function () {
    $('.content:eq(0)').show();
    $('.content-preload:eq(0)').fadeOut(400);
};

var loadPricePage = function () {

    loadtTovar();
    $('.content:eq(1)').show();
    $('.content-preload:eq(1)').fadeOut(400);

};

var loadOtherPage = function () {
    $('.content:eq(2)').show();
    $('.content-preload:eq(2)').fadeOut(400);
};

var mainLoad = function () {
    $('.btnMenu:eq(1)').addClass('btnActive');
    $('.content:eq(1)').show();
    loadPricePage();
};

$(document).ready(function () {
    mainLoad();
    design();
    getCart();
});