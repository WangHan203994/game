/**
 * Created by wh on 2014/8/25.
 */
(function( window , $ ){
    $('#gameArea').delegate('td','click',function(){
        alert($(this).html());
    });
})( window , $ );