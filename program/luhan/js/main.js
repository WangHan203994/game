/**
 * Created by wh on 2014/8/25.
 */
(function( window , $ ){
    FastClick.attach(document.body);

    var map = { 0 : 2 , 3 : 3 , 6 : 4 , 9 : 5 }; //key : mod
    var getWidth = function(){
        var winHeight = $(window).height();
        var winWidth = $(window).width();
        var rate = winHeight / winWidth;
        if( rate < 1.0 ){
            return Math.min( winWidth , winHeight ) * 0.75;
        }else{
            return Math.min( winWidth , winHeight )  * 0.9;
        }
    };
    var totalWidth = getWidth();

    var gameArea = $('#gameArea').css( {'width' : totalWidth } );

    var app = {
        ruleMap : map,
        mod : map['0'] ,
        normalImg : 'skin/images/1.png',
        targetImg : 'skin/images/2.png',
        wrongImg : 'skin/images/3.png',
        rightImg : 'skin/images/4.png',
        tds : null,
        tempRecord : null ,
        totalWidth : totalWidth,
        rightClass : 'right',
        container : gameArea,
        showBox :  $('#showBox'),
        counter : 0,
        counterBox : $('#count'),
        timelimit : 60,
        showTime : 500,
        timelimitBox : $('#time'),
        status : true ,
        init : function(){

            if( !window.name ){
                window.name = JSON.stringify({
                    current : 0,
                    best : 0,
                    gift : 0
                });
            }

            this.initGift();
            this.initEvent();
            this.drawTable( this.mod );
            this.initTimer();
            this.initShowBox();
        },
        initGift : function(){
            this.tempRecord = JSON.parse(window.name);
            if( this.tempRecord.gift ){
                this.timelimit += this.tempRecord.gift;
                this.tempRecord.gift = 0;
                window.name = JSON.stringify(this.tempRecord);
                this.timelimitBox.addClass('red');
            }
        },
        initTimer : function(){
            var me = this;
            var timer = setInterval(function(){
                me.timelimitBox.html( --me.timelimit );
                if( !me.timelimit ){
                    clearInterval( timer );
                    me.status = false;
                    me.record();
                }
            },1000);
        },
        initEvent : function(){
            var me = this;
            this.container.delegate( 'td' , 'click' , function(){

                if(gameArea.data('disable')){
                    return ;
                }

                if( $(this).hasClass('right') ){
                    me.counterBox.html(++me.counter);
                    gameArea.data('disable',true);
                    me.showBox.show();

                    var showTimer = setTimeout(function(){
                        me.timelimit ++ ;
                        gameArea.data('disable',false);

                        if( !me.status ){
                            me.container.undelegate('td','click');
                            me.record();
                        }else{
                            var counter = me.counter;

                            if( me.ruleMap[ counter ] ){
                                me.mod = me.ruleMap[ counter ] ;
                                me.drawTable( me.mod );
                            }else{
                                me.drawTable( me.mod , true );
                            }
                        }
                        me.showBox.hide();
                        clearTimeout(showTimer);
                        showTimer = null;
                    } , me.showTime );
                }else{
                    $(this).addClass('wrong').find('img').attr( 'src' , me.wrongImg );
                }
            });
        },
        drawTable : function( mod , switchOn ){
            var random = Math.floor( Math.random() * mod * mod );
            var length = Math.ceil( this.totalWidth / mod );
            if( !switchOn ){
                var tdTmpl = '<td><img width="'+length+'" height="'+length+'" src="'+this.normalImg+'"></td>';
                var tdRightTmpl = '<td class="right"><img width="'+length+'" height="'+length+'" src="'+this.targetImg+'"></td>';
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
                this.initShowBox();
            }else{
                this.tds.filter('.right , .wrong').html('<img width="'+length+'" height="'+length+'" src="'+this.normalImg+'">').removeClass('right');
                this.tds.eq(random).html('<img width="'+length+'" height="'+length+'" src="'+this.targetImg+'">').addClass('right');

            }
        },
        record : function(){
            var tempObj = this.tempRecord;
            if( tempObj.best < this.counter  ){
                tempObj.best = this.counter;
            }
            tempObj.current = this.counter;

            window.name = JSON.stringify(tempObj);
            window.location.href = 'end.html';
        },
        initShowBox : function(){
            var showBox = this.showBox;
            var offset = this.container.offset();
            showBox.css({ top : offset.top , left : offset.left });
            showBox.css({ width : this.container.width() , height : this.container.height() });
        }
    };

    app.init();
})( window , $ );