var local = function(language){
    if(parseInt(language) === 0){
        console.log('Ukraine language');
        $('.head-btn:eq(0) .label').html('Онлайн магазин');
        $('.head-btn:eq(1) .label').html('Новини');
        $('.head-btn:eq(2) .label').html('Про нас');
        $('#slog1').html('Не знайшовши натуральної ковбаси,');
        $('#slog2').html('МИ ЗРОБИЛИ ЇЇ САМІ!');
        $('.nb-text:eq(0)').html('Новини');        
        $('.popular-text').html('Про нас');        
        $('.nb-text:eq(1)').html('Наші магазини');
        $('#messageBTN').html('Зворотній звязок');
    }
    
    if(parseInt(language) === 1){
        console.log('Russian language');
        $('.head-btn:eq(0) .label').html('Онлайн магазин');
        $('.head-btn:eq(1) .label').html('Новости');
        $('.head-btn:eq(2) .label').html('О нас');
        $('#slog1').html('Не найдя натуральной колбасы,');
        $('#slog2').html('МЫ СДЕЛАЛИ ЕЕ САМИ!');
        $('.nb-text:eq(0)').html('Новости');        
        $('.popular-text').html('О нас');        
        $('.nb-text:eq(1)').html('Нашы магазины');
        $('#messageBTN').html('Обратная связь');
        
    }
};

$(document).ready(function(){
    if(!localStorage.getItem("RiznikLang"))
    {
        let myLocal = 0;
        localStorage.setItem("RiznikLang", myLocal);
    }    
    local(localStorage.getItem("RiznikLang"));
    
    $('#ru').click(function(){
        localStorage.setItem("RiznikLang", 1);
        local(localStorage.getItem("RiznikLang"));
    });
    $('#ua').click(function(){
        localStorage.setItem("RiznikLang", 0);
        local(localStorage.getItem("RiznikLang"));
    });
});

