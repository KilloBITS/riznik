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
    
    $('.callTitle').click(function(){
        if($('.callBtn').hasClass('openCall')){
            $('.callBtn').removeClass('openCall');
        }else{
            $('.callBtn').addClass('openCall');
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
    
};

var loadOtherPage = function(){
    $('.content:eq(2)').show();
    
};

var mainLoad = function(){
    $('.btnMenu:eq(0)').addClass('btnActive');    
    loadMainPage();    
};

$(document).ready(function(){
    mainLoad();
    design();
});