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

var newsArr;
let initNews = () => {
    $.post('/news',function(data){
        newsArr = data;        
        for(var i = 0; i < data.length; i++){
            var line = document.createElement('div');
            line.className = 'news-line';
            line.onclick = function(){
                var index = $('.news-line').index(this);
                $('#news1').val(newsArr[index].id);
                $('#news2').val(newsArr[index].name);
                $('#news3').val(newsArr[index].text);
                $('#news4').val(newsArr[index].date);
                
            };
            line.innerHTML = data[i].name + ' <small>('+data[i].date.substr(0,10)+')</small>';
            $('#newsList').append(line);
        }
    });
};

$(document).ready(function(){
    design();
    initLegend();
    initNews();
});