'use strict';
var shops = new Object(); //переменная параметров
shops.openCall = 0;
shops.openMobMenu = false;
shops.regUs = false;
shops.buytype = 0;
var idOtmeni = 0;
//объект корзины
var tovar = [];

var updateSum = function(ind, sum){
    tovar[ind].lenTov = sum;   
    localStorage.setItem("cart", JSON.stringify(tovar));
};
var modal = function(text){
    var mod = document.createElement('div');
    mod.className = 'message-modal';
    mod.innerHTML = text;
    mod.style.bottom = (45 * $('.message-modal').size()) + 20 + "px";
    $('body').append(mod);
    $('.message-modal').fadeIn(300);
    setTimeout(() => {
        $(mod).remove();            
    },3000);
};
var basketDelete = (a) => {
    var index = $(".basket-item-delete").index(a);
    $(".basket-item:eq("+ index +")").remove();
    var removed = tovar.splice(index, 1);
    $('.basket div').html(parseInt(tovar.length));
    localStorage.setItem("cart", JSON.stringify(tovar));
};

var loadtTovar = (data, filter) => {
    $(".content-preload:eq(1)").show();
    $('.tovarDB').hide();
    if(data.length > 10){$(".pages").show();}else{$(".pages").hide();}
    if(data.length >= 1){$(".notTovars").hide();}else{$(".notTovars").show();}   
    
    for(let i = 0; i < shops.tovLengthData; i++){ 
        if((data.find(item => item.id === $('.tovarDB:eq('+i+') .tovarID').html())) !== undefined){
            if(filter === '1' && i < 0){
                $('.tovarDB:eq('+i+')').hide();
            }else{
                $('.tovarDB:eq('+i+')').show();
            }          
        }         
    }  
    $(".content-preload:eq(1)").fadeOut(300);
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

var updateCart = function (name, id, price, img, l) {
    var cartS = new Object();
    cartS.nameTovar = name;
    cartS.id = parseInt(id);
    cartS.v = 1;
    cartS.price = price;
    cartS.img = img;
    cartS.lenTov = l;
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

var filters = (filter) => {
    $.post('/filters',{fil: filter}, function(data){
        console.log(data);
        loadtTovar(data, filter);
    });
};

let oplataMOdal = (id, sum) => {
    $("#oplata").fadeIn(300);
    $("#sumOplata").html('Ваше замовлення на суму: '+sum+ 'грн очікує оплати');
    idOtmeni = id;
    $('.basket-WIN').removeAttr( "style" ).removeClass('oformlenie');
    $('.basket-list').removeAttr( "style" );
    shops.basket = false;
    $('.basket-applyData').hide();
    $('.content').css({'filter':'blur(0px)'});
    $('.close-BASKET-min').hide();
    setTimeout(() => {
    //  location.reload();
    }, 1500);
};
var design = function () {
    var prewList, nextList;

    $('.page').click(function () {
        $('.page').removeClass('pageActive');
        var index = $('.page').index(this);
        $('.page:eq(' + index + ')').addClass('pageActive');

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
        console.log('Используем фильтр: ' + index);
        switch(index){
            case 0: filters('1');break;
            case 1: filters('Ковбаса');break;
            case 2: filters('Соус');break;
            case 3: filters('Вино');break;
            case 4: filters('Набір');break;
        }
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
                    var ssd = '<div class="basket-item"><div class="basket-icon" style="background-image:' + tovar[i].img + '"></div><div class="basket-string">' + tovar[i].nameTovar + '</div><div class="basket-price">' + tovar[i].price + '</div><div class="basket-item-length">Кількість: <input type="number" class="lengthItems" value="1" min="1"></div><div class="basket-item-delete" onclick="basketDelete(this)"></div></div>';
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
            "background-image": "url(../../../content/tovarImage/" + $(".tovarID:eq("+index+")").html() + ".jpg",
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
            updateCart($('.tovar-title:eq(' + index + ')').html(), $('.tovarID:eq(' + index + ')').html(), $('.price:eq(' + index + ')').html(), 'url(../../../content/tovarImage/' + $(".tovarID:eq("+index+")").html() + '.jpg)', 1);
            modal('Додано в кошик!');
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
        if(!$(".basket-WIN").hasClass('oformlenie')){
            if(tovar.length >= 1){
                $('.basket-WIN').css({
                    "left": "50%",
                    "top": "50%",
                    "transform": "translate(-50%, -50%)",
                    "width": "800px",
                    "height": "700px"
                }).addClass('oformlenie');

                $('.basket-list').css({
                    "width": "50%",
                    "margin-left": "10px"
                });

                $('.basket-applyData').css({"display":"block"});
                $('.content').css({'filter':'blur(3px)'});
                $('.close-BASKET-min').fadeIn(350);   
                $('.basket-check').html('Оплата');                
            }else{            
                modal('Ваш кошик пустий');
            }
        }else{
            if($("#clientName").val().length >= 3){ //проверка имени
                if($("#clientPriz").val().length >= 3){ //проверка фамилии
                    if($("#clientPNum").val().length >= 10){ //проверка номера телефона
                        if($("#typeOfDostavka").val()!== 0){ //проверка типа доставки
                            
                            if($("#typeOfDostavka").val() === "1"){
                                var umovi = $('#samShop').val();
                            } else if($("#typeOfDostavka").val() === "2"){
                                var umovi = [];
                                for(let i = 0; i < $('.kur').size(); i++){
                                    umovi.push($('.kur:eq('+i+') input').val());
                                }
                            } else if($("#typeOfDostavka").val() === "3"){
                                var umovi = [];
                                for(let i = 0; i < $('.np').size(); i++){
                                    umovi.push($('.np:eq('+i+') input').val());
                                }
                            }
            
                            var newBuy = new Object({
                                clientName: $("#clientName").val(),
                                clientPriz: $("#clientPriz").val(),
                                clientPNum: $("#clientPNum").val(),
                                clientEmail: $("#clientEmail").val(),
                                typeOfDostavka: $("#typeOfDostavka").val(),
                                tov: tovar,
                                umovi: umovi,
                                price: $('.basket-sum').html(),
                                oplata: $("#clientEmail").val() 
                            });                                
                     
                            $.post("/sendBuyTovar",{data:newBuy},(data) => {
                                console.log(data);
                                if(data.code === 500){
                                    modal(data.message);
                                    $('.basket-WIN').removeAttr( "style" );
                                    $('.basket-list').removeAttr( "style" );
                                    shops.basket = false;
                                    $('.basket-applyData').hide();
                                    $('.content').css({'filter':'blur(0px)'});
                                    $('.close-BASKET-min').hide();
                                    $('.basket-check').html('Замовити');
                                    tovar = [];
                                    localStorage.setItem("cart", JSON.stringify(tovar));     
                                    $(".basket div").html(0);
                                    $(".basket-item").remove();
                                    setTimeout(() => {                        
                                        oplataMOdal(data.oplata, data.sum)
                                    }, 500);
                                }else{
                                    modal(data.message);
                                }               
                            });            
                        }else{
                            $("#typeOfDostavka").addClass('nonCorrectData');
                        }
                        $("#typeOfDostavka").removeClass('nonCorrectData');
                    }else{
                        $("#clientPNum").addClass('nonCorrectData');
                    }
                    $("#clientPriz").removeClass('nonCorrectData');
                }else{
                    $("#clientPriz").addClass('nonCorrectData');
                }
                $("#clientName").removeClass('nonCorrectData');
            }else{
                $("#clientName").addClass('nonCorrectData');
            }      
        }        
    });
    
    $(".users-btn").click(function(){
        var ind = $(".users-btn").index(this);
        $(".users-btn").removeClass('uba');
        $(".users-btn:eq("+ind+")").addClass('uba');
        switch(ind){
            case 0: 
                shops.regUs = false ;     
                $(".auth").click();
                break;
            case 1: 
                shops.regUs = true ;                
                break;
        }
    });
    
    $('.close-BASKET-min').click(function () {
        $('.basket-WIN').removeAttr( "style" ).removeClass('oformlenie');
        $('.basket-list').removeAttr( "style" );
        shops.basket = false;
        $('.basket-applyData').hide();
        $('.basket-check').html('Замовити');
        $('.content').css({'filter':'blur(0px)'});
        $('.close-BASKET-min').hide();
        
    });
    
    $('#typeOfDostavka').change(function(){
        let sam = () => {
            $('#samShop').fadeIn(400);
            $('.kur').fadeOut(300);
            $('#mapa').fadeIn(300);
            $(".np").fadeOut(300);
        };
        let kur = () => {
            $('#samShop').fadeOut(300);
            $('.kur').fadeIn(400);
            $('#mapa').fadeOut(300);
            $(".np").fadeOut(300);
        };
        let np = () => {
            $('#samShop').fadeOut(300);
            $('.kur').fadeOut(300);
            $('#mapa').fadeOut(300);            
            $(".np").fadeIn(300);
            
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
    
    $('.filtersOpen').click(function(){
        $('.filters').toggleClass('minOpened');
        if( $('.filters').hasClass('minOpened')){
            setTimeout(function(){
                $(".filters").css({"overflow":"inherit"});
            },300);
        }else{
            $(".filters").css({"overflow":"hidden"});
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
        var ind =  $(".lengthItems").index(this);
        updateSum(ind, $(".lengthItems:eq("+ind+")").val());
    });
    /*Mobile nav*/
    $('.mobile-menu').click(function () {
        if (shops.openMobMenu) {
            $('.mobile-menu').removeClass('openMobMenu');
            $('.mobile-menu-block').fadeOut(300);
            
            shops.openMobMenu = false;
        } else {
            $('.mobile-menu').addClass('openMobMenu');
            $('.mobile-menu-block').fadeIn(300);
           
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
        $('.mobile-menu').removeClass('openMobMenu');
        $('.mobile-menu-block').fadeOut(300);
        shops.openMobMenu = false;
    });
    
    $(".auth").click(() => {
        if($(".auth-block").hasClass('openauth')){
            $(".auth-block").removeClass('openauth');
        }else{
            $(".auth-block").addClass('openauth')
        }
    });
    
    $(".typeOplati").click(function(){
        var ind = $(".typeOplati").index(this);
        shops.buytype = ind;
        $(".typeOplati").removeClass('typeOplatiAct');
        $(".typeOplati:eq("+ind+")").addClass('typeOplatiAct');
        $(".tabs-oplata").hide();
        $(".tabs-oplata:eq("+ind+")").show();
    });   
    
    $(".sendPayment").click(function(){
        switch(shops.buytype){
            case 0: var t = 'Оплата курєру';break;
            case 1: var t = 'Оплата картою';break;
            case 2: var t = 'Оплата квитанцією';break;
        }
        $.post("/sendPayment",{id:idOtmeni, type: t}, function(data){
            modal(data.message);
            $("#oplata").fadeOut(300);
            idOtmeni = null; 
            setTimeout(function(){
                location.reload();
            },2000);
        });
    });
    
    $(".removePayment").click(function(){
        $.post("/cancelPayTovar",{id:idOtmeni}, function(data){
            modal(data.message);
            $("#oplata").fadeOut(300);
        });
    });
    
    $("#authSend").click(function(){
        $.post("/auth",{l:$("#authNumber").val() ,p:$("#authPassword").val() },function(data){
            console.log(data);
        })
    });
};

var loadMainPage = function () {
    $('.content:eq(0)').show();
    $('.content-preload:eq(0)').fadeOut(400);
    $('.btnMenu:eq(0)').addClass('btnActive');
};

var loadPricePage = function () {
//    loadtTovar();
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
    loadMainPage();
    design();
    getCart();
});


