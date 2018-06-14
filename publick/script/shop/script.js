var shops = new Object();

var design = function(){
    $('.btnMenu').click(function(){
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
            shops.basket = true;
        }else{
            $('.basket-WIN').css({"left": ($('.basket').offset().left - ($('.basket-WIN').width()-45)) + "px"}).fadeOut(300);
            shops.basket = false;
        }
    });
    
   
};

var loadMainPage = function(){
    $('.content:eq(0)').show();
    $.post('/MainShop', function(){
        console.log(JSON.parse(data));
    });
};

var loadPricePage = function(){
    $('.content:eq(1)').show();
    
    $('.content-preload:eq(1)').fadeOut(400);
    
};

var loadOtherPage = function(){
    $('.content:eq(2)').show();
    
};

var mainLoad = function(){
    $('.btnMenu:eq(0)').addClass('btnActive');    
    $('.content:eq(0)').show();
    loadMainPage();    
};

$(document).ready(function(){
    mainLoad();
    design();
});