/**
 * Created by wh on 2014/8/31.
 */
(function( window , $){
    if( window.name ){
        var obj = JSON.parse( window.name );
        var app = {
            maxGift : 31,
            adConfig : {
                href : 'http://tv.sohu.com',
                imgUrl : 'skin/images/ad.jpg',
                goToTime : 1000 //多少秒后进行跳转
            },
            init : function(){
                this.initRecord();
                this.initShare();
                this.initLevel();
                this.initAD();
            },
            initRecord : function(){
                var result = obj.current;
                var best = obj.best;
                document.getElementById('result').innerHTML = result;
                document.getElementById('iValue').innerHTML = result;
                document.getElementById('best').innerHTML = best;
            },
            initLevel : function(){

                document.getElementById('rate').innerHTML = 90;
                document.getElementById('title').innerHTML = '鹿晗的小背心';
            },
            initAD : function(){
                var me = this;
                var ad = $('a.ad');
                ad.find('img').attr( 'src' , me.adConfig.imgUrl );
                $('a.ad').click(function(){
                    var gift = Math.ceil( Math.random() * me.maxGift );
                    if(gift < 5){
                        gift = 5;
                    }
                    obj.gift = gift;
                    window.name = JSON.stringify(obj);

                    setTimeout( function(){
                        window.location.href = me.adConfig.href;
                    } , 1000);
                    return false;
                });
            },
            initShare : function(){
                var text = document.getElementById('share').innerText;
                console.log( text );
            }
        };

        app.init();
    }
})( window , $ );