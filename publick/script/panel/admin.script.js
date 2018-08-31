var selectItem;

function newTovar() {
    var ooo = new Object();

    ooo.name = $("#newName").val();
    ooo.price = $("#newPrice").val();
    ooo.categories = $("#newCategories").val();
    ooo.text = $("#newText").val();
    ooo.length = $("#newLength").val();
    return ooo;
}
;

var refresh = function () {
    $.post('/getTovar', function (tovar) {
        $('.listItems').remove();
        for (let t = 0; t < tovar.length; t++) {
            var shab = '<div class="listItems" style="background-image: none;"><div class="listID">' + tovar[t].id + '</div><div class="listNAME">' + tovar[t].name + '</div></div>';
            $('.listbox').append(shab);
        }
        listItemClick();
    });
};

var listItemClick = function () {
    $('.listItems').click(function () {
        $('.dataTovar').removeClass('disabled');
        var index = $('.listItems').index(this);

        $('.listItems').css({"background-image": "none"});
        $('.listItems:eq(' + index + ')').css({"background-image": "url(../../../image/icons/32.png)"});
        var idTovaru = $('.listItems:eq(' + index + ') .listID').html();

        $.post('/tovarData', {id: idTovaru}, function (data) {
            selectItem = data[0].id;
            $('.section50 .lineData:eq(1) input').val(data[0].id);
            $('.section50 .lineData:eq(2) input').val(data[0].name);
            $('.section50 .lineData:eq(3) input').val(data[0].price);
            $('.section50 .lineData:eq(4) input').val(data[0].type);
            $('.section50 .lineData:eq(5) textarea').val(data[0].text);
            $('.betaImage').css({"background-image": "url(../../../content/tovarImage/" + data[0].id + ".jpg)"});
        });
    });
};

var payClick = function(){
    var ind = $('.pays').index(this);
    $(".pays:eq("+ind+") input[type='radio']").prop("checked", true);
};

var updateListPays = function () {
    $(".paysList .pays").remove();
    $.post("/stonewalling", function (data) {
        for (var i = 0; i < data.length; i++) {
            let a = document.createElement("div");
            a.className = 'pays';
            a.onclick = payClick;
            if (parseInt(data[i].statusOplati) === 0) {
                var op = "<span>"+data[i].oplata+"</span><span>Не оплачено</span>"
            }
            
            switch(data[i].status){
                case "NEW": var lc = "gold";break; 
                case "OB": var lc = "yellow";break; 
                case "OTP": var lc = "#009000";break; 
            }
            
            var payDatas = '<div class="tn0 payLines"><input type="radio" name="tovPay" value="' + data[i].id + '"></div><div class="tn1 payLines">' + data[i].id + '</div><div class="tn3 payLines">' + data[i].name + '</div><div class="tn4 payLines">' + data[i].price + '</div><div class="tn5 payLines">' + data[i].status + '</div><div class="tn6 payLines">' + op + '</div><div class="tn7 payLines">' + data[i].number + '</div>';
            a.style.backgroundColor = lc;
            a.innerHTML = payDatas;
            $(".paysList").prepend(a);
        }
    });
};

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

        if (index === 3) {
            updateListPays()
        };
    });
    
    $('.refreshPays').click(function () {
        updateListPays();
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
        if ($(this).val() !== FocusData) {
            var dataObj = new Object();
            dataObj.id = $('.section50 .lineData:eq(1) input').val();
            dataObj.name = $('.section50 .lineData:eq(2) input').val();
            dataObj.price = $('.section50 .lineData:eq(3) input').val();
            dataObj.text = $('.section50 .lineData:eq(5) textarea').val();
            dataObj.type = $('.section50 .lineData:eq(4) input').val();
            $.post('/UpdateDataTovar', {data: dataObj}, function (data) {
                console.log(data)
            });
        } else {
            console.log('good data')
        }
    });

    $(".lineData input, .lineData textarea").focus(function () {
        FocusData = $(this).val();
    });

    $('#listSearch').on('input keyup', function (e) {
        var result;
        var data = $("#listSearch").val();
        if (data.length >= 1) {
            for (var i = 0; i < $('.listItems').length; i++) {
                if (($('.listItems:eq(' + i + ') .listNAME').html().toLowerCase().indexOf(data.toLowerCase()) !== -1) || ($('.listItems:eq(' + i + ') .listID').html().toLowerCase().indexOf(data.toLowerCase()) !== -1)) {
                    result = i;
                    $('.listItems:eq(' + i + ')').show();
                } else {
                    $('.listItems:eq(' + i + ')').hide();
                }
            }
        } else {
            $('.listItems').show();
        }
    });
    
    $('#saveNewsTovar').click(function () {
        $.post("/AddNewsTovar", {data: newTovar()}, function (result) {
            $('.panel').css({"filter": "blur(0px)"});
            $('.addNewTovar').fadeOut(300);
            refresh();

        });
    });

    $('#deleteTovar').click(function () {
        $.post("/deleteTovar", {id: selectItem}, function (result) {
            refresh();
        });
    });
    
    $(".statusZakaz").click(function(){
        console.log(this.id)
        switch(this.id){
            case "dd1": var type = "DEL";break;
            case "dd2": var type = "CAN";break;
            case "dd3": var type = "OP";break;
            case "dd4": var type = "OTP";break;
        }
        $.post("/ZakazStatus",{type:type,id:$('input[name=tovPay]:checked').val()},function(data){
            console.log(data)
        });
    });
    
   

    listItemClick();
};

let listBoxItemsClick = () => {

};

let initLegend = () => {
    $.post('/legend', {typePost: 0}, function (data) {
        $('#leg').html(data);
    });

    $.post('/getUsersLength', function (data) {
        $('.kilUse b').html(data)
    })
};

$(document).ready(function () {
    design();
    initLegend();
    $(".statusZakaz").removeClass("disabled");
    $('.bluBTN:eq(0)').click();
});