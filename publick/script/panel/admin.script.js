let design = () => {
    /** buttons **/
    $('#submitLeg').click(function () {
        $.post('/legend', {typePost: 1, text: $('#leg').val()}, function (data) {
            alert(data);
        });
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
});