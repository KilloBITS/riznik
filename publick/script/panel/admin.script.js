let design = () => {
    /** buttons **/
    $('#submitLeg').click(function () {
        $.post('/legend', {typePost: 1, text: $('#leg').val()}, function (data) {
            alert(data);
        });
    });

    $('.bluBTN').click(function () {
        let index = $('.bluBTN').index(this);
        $('.panelBlock').hide();
        $('.panelBlock:eq(' + index + ')').show();
    });

    $('.listItems').click(function () {
        
        $('.dataTovar').removeClass('disabled');
        var index = $('.listItems').index(this);
        $('.listItems').css({"background-image": "none"});
        $('.listItems:eq(' + index + ')').css({"background-image": "url(../../../image/icons/32.png)"});
        var idTovaru = $('.listItems:eq(' + index + ') .listID').html();

        $.post('/tovarData', {id: idTovaru}, function (data) {
            console.log(data);

            $('.section50 .lineData:eq(1) input').val(data[0].id);
            $('.section50 .lineData:eq(2) input').val(data[0].name);
            $('.section50 .lineData:eq(3) input').val(data[0].price);
            $('.section50 .lineData:eq(4) input').val(data[0].type);
            $('.section50 .lineData:eq(5) textarea').val(data[0].text);
            $('.betaImage').css({"background-image": "url(../../../content/tovarImage/" + data[0].id + ".jpg)"});
        });
    });

    $('#newTovar').click(function () {
        $('.panel').css({"filter": "blur(5px)"})
        $('.addNewTovar').fadeIn(300);
    });

    $('.closeNewTovar').click(function () {
        $('.panel').css({"filter": "blur(0px)"});
        $('.addNewTovar').fadeOut(300);
    });
    
    var FocusData;

    $('.lineData input, .lineData textarea').focusout(function () {
        if($(this).val() !== FocusData){
            var dataObj = new Object();
            dataObj.id = $('.section50 .lineData:eq(1) input').val();
            dataObj.name = $('.section50 .lineData:eq(2) input').val();
            dataObj.price = $('.section50 .lineData:eq(3) input').val();
            dataObj.text = $('.section50 .lineData:eq(5) textarea').val();
            dataObj.type = $('.section50 .lineData:eq(4) input').val();
            $.post('/UpdateDataTovar',{data: dataObj},function(data){
                console.log(data)
            });
        }else{
            console.log('good data')
        }
    });

    $(".lineData input, .lineData textarea").focus(function () {
        FocusData = $(this).val();
//        console.log(FocusData)
    });
    
    
       
    $('#listSearch').on('input keyup', function (e) {
        
        var result;
        var data = $("#listSearch").val();
        console.log(data);
        if (data.length >= 1) {
            for (var i = 0; i < $('.listItems').length; i++) {
                if (($('.listItems:eq('+i+') .listNAME').html().toLowerCase().indexOf(data.toLowerCase()) !== -1) || ($('.listItems:eq('+i+') .listID').html().toLowerCase().indexOf(data.toLowerCase()) !== -1)) {
                    result = i;
                    $('.listItems:eq('+i+')').show();
                } else {
                    $('.listItems:eq('+i+')').hide();
                }
            }
        } else {
            $('.listItems').show();
        }
    });
};

let listBoxItemsClick = () => {

};

let initLegend = () => {
    $.post('/legend', {typePost: 0}, function (data) {
        $('#leg').html(data);
    });
};

$(document).ready(function () {
    design();
    initLegend();
    $('.bluBTN:eq(0)').click();
});