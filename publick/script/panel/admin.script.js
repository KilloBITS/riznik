let design = () => {
     /** buttons **/     
    $('#sendLegend').click(function(){
        $.post('/legend',{typePost: 1, text: $('#legend').val()},function(data){
            alert(data);
        });
    });
}; 

let initLegend = () => {
    $.post('/legend',{typePost: 0},function(data){
        $('#legend').html(data);
    });
};



$(document).ready(function(){
    design();
    initLegend();
});