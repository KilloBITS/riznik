'use strict';

var shops = new Object(); //переменная параметров
 //объект корзины
var tovar = [];


var loadtTovar = () => {
    $.post('/tovar', function(data){
        console.log(JSON.parse(data));
        for(let i = 0; i < JSON.parse(data).length; i++){
            
        }
    });
};


var updateCart = function(name, id, price, img){   
    var cartS = new Object();
    cartS.nameTovar = name;
    cartS.id = parseInt(id);
    cartS.v = 1;
    cartS.price = price;    
    cartS.img = img;
    tovar.push(cartS);   
    localStorage.setItem("cart",JSON.stringify(tovar));    
};

var getCart = function(){
    var cart = localStorage.getItem("cart");    
    if((JSON.parse(cart)) && JSON.parse(cart).length > 0){
        tovar = JSON.parse(cart);
        $('.basket div').html(JSON.parse(cart).length);
    }
};


var design = function(){
    $('.btnMenu').click(function(){
        $('.BuyTovar').fadeOut(300);
        $('.tovar').fadeIn(200);
        $('.btnMenuDemo').hide();
        let index = $('.btnMenu').index(this);
        $('.btnMenu').removeClass('btnActive');
        $('.btnMenu:eq('+index+')').addClass('btnActive');
        $('.content').hide();
        switch(index){
            case 0: loadMainPage();break;
            case 1: loadPricePage();break;
            case 2: loadOtherPage();break;
        }
    });
    
    $('.filter-btn').click(function(){
        let index = $('.filter-btn').index(this);
        $('.filter-btn').removeClass('btnActive');
        $('.filter-btn:eq('+index+')').addClass('btnActive');
    });
    
    $('.selectArea').click(function(){
        if(!shops.SA){
            var index = $('.selectArea').index(this);
            $('.sel:eq('+index+')').fadeIn(200);
            shops.SA = true;
        }else{
            var index = $('.selectArea').index(this);
            $('.sel:eq('+index+')').fadeOut(200);
            shops.SA = false;
        }        
    });
    
    
    $('.basket').click(function(){
         if(!shops.basket){
            $('.basket-WIN').css({"left": ($('.basket').offset().left - ($('.basket-WIN').width()-45)) + "px"}).fadeIn(300);
            if(tovar && tovar.length > 0){
                $('.basket-item').remove();
                for(let i = 0; i < tovar.length; i++){
                    var ssd = '<div class="basket-item"><div class="basket-icon" style="background-image:'+tovar[i].img+'"></div><div class="basket-string">'+tovar[i].nameTovar+'</div><div class="basket-price">'+tovar[i].price+'</div><div class="basket-item-length">Кількість: <input type="number" class="lengthItems" value="1"></div><div class="basket-item-delete"></div></div>';
                    $('.basket-list').append(ssd);
                }
            }            
            shops.basket = true;
        }else{
            $('.basket-WIN').css({"left": ($('.basket').offset().left - ($('.basket-WIN').width()-45)) + "px"}).fadeOut(300);
            shops.basket = false;
        }
    });
    
    $('.selOption').click(function(){
        $('.sel').fadeOut(200);
        var index = $('.selOption').index(this);
        
        $('#sort').html($('.selOption:eq('+index+')').html())
        shops.SA = false;
    }); 
    
    $('.addCart').click(function(){
        var index = $('.addCart').index(this);
        var demo = document.createElement('div');
        demo.className = 'demoCart';
        $('body').append(demo);
        $('.demoCart').css({
            "background-image":"url(../../../content/tovarImage/" + (index + 1) + ".jpg",
            "left": $('.tovar-logo:eq('+index+')').offset().left + ($('.tovar-logo:eq('+index+')').width() / 2) + 'px',
            "top": $('.tovar-logo:eq('+index+')').offset().top + ($('.tovar-logo:eq('+index+')').height() / 2) + 'px'
        });
        setTimeout(function(){
            $('.demoCart').css({
                "width":"35px",
                "height":"35px",
                "left": $('.basket').offset().left  + 'px',
                "top": 5 + 'px'
            });
            $('.basket div').html(parseInt($('.basket div').html()) + 1);
            updateCart($('.tovar-title:eq('+index+')').html(),$('.tovarID:eq('+index+')').html(),$('.price:eq('+index+')').html(), 'url(../../../content/tovarImage/'+(index + 1)+'.jpg');
        },500);
        
        setTimeout(function(){
            $('.demoCart').css({
                "opacity":"0"
            });
            
        },1000);
        
        setTimeout(function(){
            $('.demoCart').remove();
        },1300);
    });
    
    $('.basket-check').click(function(){
        $('.basket-WIN').css({
            "left":"50%",
            "top":"50%",
            "transform":"translate(-50%, -50%)",
            "width":"800px",
            "height":"700px"
        });
        
        $('.basket-list').css({
            "width":"50%",
            "margin-left":"10px"            
        });
    });    
    
    $('.details').click(function(){
//        document.location.href='/product';
        let ID = $('.' + $('.details:eq('+$('.details').index(this)+')').parents()[1].className + ' .tovarID:eq('+$('.details').index(this)+')').html();
        $('.content-preload').fadeIn(100);
        $('.BuyTovar').fadeIn(300);
        $('.tovar').fadeOut(300);
        $('.btnMenu').removeClass('btnActive');
        $('#tovarname').html('Перегляд товару').addClass('btnActive').fadeIn(300).click();
        $('.BuyTovar iframe').attr("src","/product/&tovar="+ID);
        setTimeout(function(){
            $('.content-preload').fadeOut(300);
        },1000);
    });
};

var loadMainPage = function(){
    $('.content:eq(0)').show();
    $('.content-preload:eq(0)').fadeOut(400);
};

var loadPricePage = function(){
    
    loadtTovar();
    $('.content:eq(1)').show();    
    $('.content-preload:eq(1)').fadeOut(400);
    
};

var loadOtherPage = function(){
    $('.content:eq(2)').show();
    $('.content-preload:eq(2)').fadeOut(400);
};

var mainLoad = function(){
    $('.btnMenu:eq(1)').addClass('btnActive');    
    $('.content:eq(1)').show();
    loadPricePage();    
};

$(document).ready(function(){
    mainLoad();
    design();
    getCart();
});