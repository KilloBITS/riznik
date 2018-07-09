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
}

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