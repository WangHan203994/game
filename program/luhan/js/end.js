/**
 * Created by wh on 2014/8/31.
 */
(function( window , $){
    if( window.name ){
        var obj = JSON.parse( window.name );

        var app = {
            maxGift : 31,
            baseUrl : 'http://yiqi.pub/game/luhan',
            adConfig : {
                href : 'http://tv.sohu.com',
                imgUrl : 'skin/images/ad.jpg',
                goToTime : 1000 //多少秒后进行跳转
            },
            titleRule : {
                t1 : '鹿晗的炸鸡', // 0 - 5
                t2 : '鹿晗的火锅粉儿',// 6 - 10
                t3 : '鹿晗的小苹果' , // 11 - 15
                t4 : '鹿晗的香波' , // 16 - 20
                t5 : '迷惑鹿晗的小妖精',// 21 - 25
                t6 : '鹿晗的润唇膏',// 26 - 30,
                t7 : '鹿晗的小肥皂', // 31 - 35,
                t8 : '鹿晗的润滑油', // 36 - 40,
                t9 : '鹿晗的女王大人' // >40
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
                var record = obj.current;
                var me = this;
                var rate , title;

                if( !record ){
                    rate = 0;
                    title = me.titleRule.t1;
                }else if( record == 1){
                    rate = 0.02;
                    title = me.titleRule.t1;
                }else if(record > 40){
                    rate = 1;
                    title = me.titleRule.t9;
                }else{
                    rate = 0.308 * Math.log(record) - 0.14;
                    if( record > 0 && record <= 5 ){
                        title = me.titleRule.t1;
                    }else if( record > 5 && record <= 10 ){
                        title = me.titleRule.t2;
                    }else if( record > 10 && record <= 15 ){
                        title = me.titleRule.t3;
                    }else if( record > 15 && record <= 20 ){
                        title = me.titleRule.t4;
                    }else if( record > 20 && record <= 25 ){
                        title = me.titleRule.t5;
                    }else if( record > 25 && record <= 30 ){
                        title = me.titleRule.t6;
                    }else if( record > 30 && record <= 35 ){
                        title = me.titleRule.t7;
                    }else if( record > 35 && record <= 40 ){
                        title = me.titleRule.t8;
                    }
                }

                document.getElementById('rate').innerHTML = (rate * 100).toFixed(1);
                document.getElementById('title').innerHTML = title;
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
                    $('#giftTime').html('恭喜你！下次游戏开始时你获得了 <span class="red">'+ gift +'s </span>的额外时间哟~');
//                    setTimeout( function(){
//                        window.location.href = me.adConfig.href;
//                    } , 1000);
//                    return false;
                });
            },
            initShare : function(){
                if(window.myWeixinApp){
                    window.myWeixinApp.initShare(
                        this.baseUrl + '/skin/images/4.png',
                        this.baseUrl + '/index.html',
                        document.getElementById('share').innerText,
                        '亲亲鹿晗'
                    );
                }
            }
        };

        app.init();
    }
})( window , $ );