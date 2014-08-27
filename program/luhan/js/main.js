/**
 * Created by wh on 2014/8/25.
 */
(function( window , $ ){

    var app = {
        mod : 2,
        tds : null,
        tableHeigth : Math.floor($(window).height() * 0.65),
        rightClass : 'right',
        container : $('#gameArea'),
        counter : 0,
        counterBox : $('#count'),
        timelimit : 60,
        timelimitBox : $('#time'),
        status : true ,
        init : function(){
            var me = this;
            me.initEvent();
            me.drawTable( this.mod );
            var timer = setInterval(function(){
                me.timelimitBox.html( --me.timelimit );
                if( !me.timelimit ){
                    clearInterval( timer );
                    me.status = false;
                    window.name = me.counter;
                }
            },1000);
        },
        initEvent : function(){
            var me = this;
            this.container.delegate( 'td' , 'click' , function(){
                if( $(this).hasClass('right') ){
                    me.counterBox.html(++me.counter);
                    if( !me.status ){
                        //跳转？
                    }else{
                        var counter = me.counter;
                        if( counter == 8 ){
                            me.mod = 10;
                            me.drawTable( me.mod );
                        }else if( counter == 6 ){
                            me.mod = 8;
                            me.drawTable( me.mod );
                        }else if( counter == 4 ){
                            me.mod = 6;
                            me.drawTable( me.mod );
                        }else if(counter == 2){
                            me.mod = 4;
                            me.drawTable( me.mod );
                        }else{
                            me.drawTable( me.mod , true );
                        }
                    }
                }
            });
        },
        drawTable : function( mod , switchOn){
            var random = Math.floor( Math.random() * mod * mod );
            var length = Math.floor( this.tableHeigth / mod );
            if( !switchOn ){
                var tdTmpl = '<td><img width="'+length+'" height="'+length+'" src="skin/images/1.jpg"></td>';
                var tdRightTmpl = '<td class="right"><img width="'+length+'" height="'+length+'" src="skin/images/2.jpg"></td>';
                var temp = '', counter = 0 ,
                    i , j ;
                for( i = 0 ; i < mod ; i ++ ){
                    temp += '<tr>';
                    for( j = 0 ; j < mod ; j ++){
                        if( counter == random ){
                            temp += tdRightTmpl;
                        }else{
                            temp += tdTmpl;
                        }
                        counter ++;
                    }
                    temp += '</tr>';
                }
                this.container.html( temp );
                this.tds = this.container.find('td');
            }else{
                this.tds.filter('.right').html('<img width="'+length+'" height="'+length+'" src="skin/images/1.jpg">').removeClass('right');
                this.tds.eq(random).html('<img width="'+length+'" height="'+length+'" src="skin/images/2.jpg">').addClass('right');

            }
        }
    };

    app.init();
})( window , $ );