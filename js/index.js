(function (a) {
    "function" === typeof define && define.amd ? define(["exports"], function (b) {
        window.Orienter = a(b)
    }) : "undefined" !== typeof exports ? a(exports) : window.Orienter = a({})
})(function (a) {
    a = function () {
        this.initialize.apply(this, arguments)
    };
    a.prototype = {
        lon: 0,
        lat: 0,
        direction: 0,
        fix: 0,
        os: "",
        initialize: function (a) {
            a = a || {};
            this.onOrient = a.onOrient || function () {
                };
            this.onChange = a.onChange || function () {
                };
            this._orient = this._orient.bind(this);
            this._change = this._change.bind(this);
            this.lat = this.lon = 0;
            this.direction = window.orientation || 0;
            switch (this.direction) {
                case 0:
                    this.fix = 0;
                    break;
                case 90:
                    this.fix = -270;
                    break;
                case -90:
                    this.fix = -90
            }
            navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) ? this.os = "ios" : this.os = -1 < navigator.userAgent.indexOf("Android") || navigator.userAgent.indexOf("Linux") ? "android" : ""
        },
        init: function () {
            window.addEventListener("deviceorientation", this._orient, !1);
            window.addEventListener("orientationchange", this._change, !1)
        },
        destroy: function () {
            window.removeEventListener("deviceorientation", this._orient, !1);
            window.removeEventListener("orientationchange", this._change, !1)
        },
        _change: function (a) {
            this.direction = window.orientation;
            this.onChange(this.direction)
        },
        changeDirectionTo: function (a) {
            this.direction = a
        },
        _orient: function (a) {
            switch (this.os) {
                case "ios":
                    switch (this.direction) {
                        case 0:
                            this.lon = a.alpha + a.gamma;
                            0 < a.beta && (this.lat = a.beta - 90);
                            break;
                        case 90:
                            this.lon = 0 > a.gamma ? a.alpha - 90 : a.alpha - 270;
                            this.lat = 0 < a.gamma ? 90 - a.gamma : -90 - a.gamma;
                            break;
                        case -90:
                            this.lon = 0 > a.gamma ? a.alpha - 90 : a.alpha - 270, this.lat = 0 > a.gamma ? 90 + a.gamma : -90 + a.gamma
                    }
                    break;
                case "android":
                    switch (this.direction) {
                        case 0:
                            this.lon = a.alpha + a.gamma + 30;
                            this.lat = 90 < a.gamma ? 90 - a.beta : a.beta - 90;
                            break;
                        case 90:
                            this.lon = a.alpha - 230;
                            this.lat = 0 < a.gamma ? 270 - a.gamma : -90 - a.gamma;
                            break;
                        case -90:
                            this.lon = a.alpha - 180, this.lat = -90 + a.gamma
                    }
            }
            this.lon += this.fix;
            this.lon %= 360;
            0 > this.lon && (this.lon += 360);
            this.lon = Math.round(this.lon);
            this.lat = Math.round(this.lat);
            this.onOrient({
                a: Math.round(a.alpha),
                b: Math.round(a.beta),
                g: Math.round(a.gamma),
                lon: this.lon,
                lat: this.lat,
                dir: this.direction
            })
        }
    };
    return a
});
var onJQAnimationEndHandle = function( option ){
    switch( option.type ){
        case "fadeIn":
            this.removeClass("opacity "+option.ani);
            break;
        case "fadeOut":
            this.hide().removeClass(option.ani);
            break;
    }
    if(option.callback){
        option.callback.call(this);
    };
    this.off("webkitAnimationEnd").css({
        animationDuration:""
    });
};
$.fn.extend({
    fi:function(option){
        var _this = this;
        var options = {
            ani:"ani-fadeIn",
            duration:"500",
            callback:undefined,
            type:"fadeIn"
        };
        if(option){
            jQuery.extend(options,option);
        }
        this.on("webkitAnimationEnd", function( e ){
            e.stopPropagation();
            onJQAnimationEndHandle.call(_this,options)
        }).css({
            animationDuration:options.duration+"ms",
        }).addClass("opacity " + options.ani).show();
        return this;
    },
    fo:function(option){
        var _this = this;
        var options = {
            ani:"ani-fadeOut",
            duration:"500",
            callback:undefined,
            type:"fadeOut"
        };
        if(option){
            jQuery.extend(options,option);
        }
        this.on("webkitAnimationEnd",function( e ){
            e.stopPropagation();
            onJQAnimationEndHandle.call(_this,options)
        }).css({
            animationDuration:options.duration+"ms",
        }).addClass(options.ani);
        return this;
    }
});
if ( Object.assign === undefined ) {

    // Missing in IE
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign

    ( function () {

        Object.assign = function ( target ) {

            'use strict';

            if ( target === undefined || target === null ) {

                throw new TypeError( 'Cannot convert undefined or null to object' );

            }

            var output = Object( target );

            for ( var index = 1; index < arguments.length; index ++ ) {

                var source = arguments[ index ];

                if ( source !== undefined && source !== null ) {

                    for ( var nextKey in source ) {

                        if ( Object.prototype.hasOwnProperty.call( source, nextKey ) ) {

                            output[ nextKey ] = source[ nextKey ];

                        }

                    }

                }

            }

            return output;

        };

    } )();

}
var Utils = new function(){
    this.ImageLoader = function ImageLoader(){
        this.total = 0;
        this.haveload = 0;
        this.percent = 0;
        this.complete = false;
        // this.version = "?v1";
        this.version = "";
    };
    this.lazyLoad = function(){
        var a = $(".lazy");
        var len = a.length;
        var imgObj;
        var Load = function(){
            for(var i=0;i<len;i++){
                imgObj = a.eq(i);
                imgObj.attr("src",imgObj.attr("data-src"));
            }
        };
        Load();
    };//将页面中带有.lazy类的图片进行加载
    this.browser = function(t){
        var u = navigator.userAgent;
        var u2 = navigator.userAgent.toLowerCase();
        var p = navigator.platform;
        var browserInfo = {
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
            iosv: u.substr(u.indexOf('iPhone OS') + 9, 3),
            weixin: u2.match(/MicroMessenger/i) == "micromessenger",
            taobao: u.indexOf('AliApp(TB') > -1,
            win: p.indexOf("Win") == 0,
            mac: p.indexOf("Mac") == 0,
            xll: (p == "X11") || (p.indexOf("Linux") == 0),
            ipad: (navigator.userAgent.match(/iPad/i) != null) ? true : false
        };
        return browserInfo[t];
    };//获取浏览器信息
    this.g=function(id){
        return document.getElementById(id);
    };
    this.limitNum=function(obj){//限制11位手机号
        var value = $(obj).val();
        var length = value.length;
        //假设长度限制为10
        if(length>11){
            //截取前10个字符
            value = value.substring(0,11);
            $(obj).val(value);
        }
    };
};
Object.assign( Utils.ImageLoader.prototype,{

    load: function( urls, onEveryLoad, onComplete){
        var result = {
            0:[]
        };

        this.total = urls.length;

        var _this = this;

        start();

        function onLoad( e ){

            if( Object.prototype.hasOwnProperty.call( urls[_this.haveload], "group" ) ){
                var group = urls[_this.haveload].group;
                if(result[group] instanceof Array == false){
                    result[group] = [];
                }
                result[group].push(this)
            }else{
                result[0].push( this );
            }

            _this.haveload++;
            _this.percent = Math.floor(_this.haveload/_this.total*100);
            onEveryLoad(_this.percent);
            this.onload = null;

            if(_this.percent == 100){
                _this.complete = true;
                onComplete(result)
                return;
            }
            var img = new Image();
            img.onload = onLoad;
            img.src = urls[_this.haveload].url+_this.version;

            if( urls[_this.haveload].name ){
                img["name"] = urls[_this.haveload].name
            }
            if( urls[_this.haveload].direction ){
                img["direction"] = urls[_this.haveload].direction
            }

        }

        function start(){
            var img = new Image();
            img.onload = onLoad;
            img.src = urls[_this.haveload].url+_this.version;
            if( urls[_this.haveload].name ){
                img["name"] = urls[_this.haveload].name
            }
            if( urls[_this.haveload].direction ){
                img["dir"] = urls[_this.haveload].direction
            }
        }

    }

});
var Media = new function(){
    this.mutedEnd = false;
    this.WxMediaInit=function(){

        var _self = this;
        if(!Utils.browser("weixin")){
            this.mutedEnd = true;
            return;
        }
        if(!Utils.browser("iPhone")){
            _self.mutedEnd = true;
            return;
        }
        document.addEventListener("WeixinJSBridgeReady",function(){
            var $media = $(".iosPreload");
            $.each($media,function(index,value){
                _self.MutedPlay(value["id"]);
                if(index+1==$media.length){
                    _self.mutedEnd = true;
                }
            });
        },false)
    };
    this.MutedPlay=function(string){
        var str = string.split(",");//id数组
        var f = function(id){
            var media = Utils.g(id);
            media.volume = 0;
            media.play();
            // setTimeout(function(){
            media.pause();
            media.volume = 1;
            media.currentTime = 0;
            // },100)
        };
        if(!(str.length-1)){
            f(str[0]);
            return 0;
        }
        str.forEach(function(value,index){
            f(value);
        })
    };
    this.playMedia=function(id){
        var _self = this;
        var clock = setInterval(function(){
            if(_self.mutedEnd){
                Utils.g(id).play()
                clearInterval(clock);
            }
        },20)
    };
};
Media.WxMediaInit();

var options = {
    el:"#iCreative",
    data:{
        server_data:{
            is_end : !!parseInt($("#is_end").val()),//活动是否结束
            have_guanzhu : !!parseInt($("#have_guanzhu").val()),//是否关注了公众号
            isVip : !!parseInt($("#is_vip").val()),//是否注册过
            goRegist : !!parseInt($("#goRegist").val()),//出去注册了一下
            haveFill : !!parseInt($("#haveFill").val()),//是否填写过中奖信息
            prizeType:parseInt($("#prizeType").val()),//奖品类型
            province:[
                // {province:"江西省"},
                // {province:"浙江省"},
                // {province:"江苏省"}
            ],
            city:[
                // {city:"杭州市"},
                // {city:"嘉兴市"},
                // {city:"温州市"}
            ],
            address:[
                // {id:"1",name:"门店名称"},
                // {id:"2",name:"门店名称"},
                // {id:"3",name:"门店名称"}
            ],
            name:'',
            tel:'',

            select_province:'',//视图上选中省份String,该字段即时更新
            select_city:'',
            select_address:'',
            shop_id:0,
            myInfo:{
                province:"",
                city:"",
                shop:"",
            },
        },
        ios:Utils.browser("ios"),
        /*页面切换控制*/
        top:{
            visible:false,
        },
        p1:{
            visible:false,
        },
        p2:{
            visible:false,
        },
        pwebgl:{
            visible:false,
        },
        presult:{
            visible:false,
        },
        pboard:{
            visible:false,
        },
        pshare:{
            visible:false,
        },
        prule:{
            visible:false,
        },

        palert:{
            visible:false,
            type:"",
            choice:{
                fill:"fill",
                normal:"normal",
                reg:"reg",
            },
            fontSize:"",
            content:"",//主文字
            title:"",//标题
            txt: {
                fill:"你还未填写领奖信息，<br>赶快去填写吧",
                reg:"为了确保星球领奖者的真实性,<br>系统需要进行实名认证,<br>请填写个人真实信息领取奖品!"
            }
        },

        hpwarn:{
            visible:false,
        },
        pwait:{
            visible:false,
        },
        /*页面切换控制*/

        userData : {
            sex:0,//0代表女玩家
            chose:[],//岔路口选择
            time:0,//总时间
        }
    },
    methods:{
        /*顶部*/
        top_btn_reason:function(){
            this.pboard.visible = true;
        },
        top_btn_music:function(){
            console.log("音乐")
        },
        top_btn_rule:function(){
            console.log("活动规则")
        },

        /*p1*/
        btn_pressDown:function(event){
            console.log( event )
            $( event.target ).addClass("pressDown")
        },
        p1_btn_start:function(){
            this.p1.visible = false;
            this.p2.visible = true;
        },
        p1BtnChoseSex:function( sex, event ){
            $( event.target ).removeClass("pressDown")

            this.userData.sex = sex;
            this.top.visible = false;
            this.p2.visible = false;

            $(".tip-mask").show();
            this.pwebgl.visible = true;

        },
        onBeforeP1Enter:function(){
            this.top.visible = true;
            main.startRender();
        },

        /*webgl*/
        pwebgl_btn_closeTip:function(){
            $(".tip-mask").fo();
            webgl.initBall();
        },
        webgl_btn_chose:function( dir ){
            $(".arrow-box").fo()
            var _vm = this;
            var _this = webgl;

            if( dir == "left" ){
                _vm.userData.chose.push( 0 )
                _this.curveType = "left";
                _this.updateCurvesData( 49, _this.mapData.curveR );//生成下一个stage岔路口的曲线数据

                //得到下一个stage
                _this.updateNextMapInfo();
                _this.mapData[ _this.mapData.stage ].roadFBXGroup = _this.cacheData[ _this.mapData.stage ][ dir ]
                //下一个stage的道路模型生成
                // _this.createNextRoadWithFBX()

                _this.putRoadOnRightPosition()

                _this.gravity.allow = false;
                _this.gameState = _this.state["runCurve"]
                _this.runCurve( function(){
                    console.log("弯道结束")
                    // _this.gameState = _this.state["waitChose"]
                    three.camera.rotation.y = 0;
                    three.camera.rotation.x = 0
                    var stage = _this.mapData.stage
                    _this.gameState = _this.state[ stage ]

                    var obj = _this.ballOptions;
                    TweenMax.to(obj,1,{speedZ:obj.startSpeedZ,onComplete:function(){
                        _this.gravity.allow = true;
                        var preRoad = _this.mapData[_this.mapData.preStage].roadFBXGroup
                        three.scene.remove( preRoad )
                    }})
                } );
            }else if( dir == "right"){
                _vm.userData.chose.push( 1 )
                _this.curveType = "right";
                _this.updateCurvesData( 49, _this.mapData.curveR );//生成下一个stage岔路口的曲线数据

                //得到下一个stage
                _this.updateNextMapInfo();
                _this.mapData[ _this.mapData.stage ].roadFBXGroup = _this.cacheData[ _this.mapData.stage ][ dir ]
                //下一个stage的道路模型生成
                // _this.createNextRoadWithFBX()
                _this.putRoadOnRightPosition()

                _this.gravity.allow = false;
                _this.gameState = _this.state["runCurve"]
                webgl.runCurve( function(){
                    console.log("弯道结束")
                    three.camera.rotation.y = 0;
                    three.camera.rotation.x = 0
                    // _this.gameState = _this.state["waitChose"]
                    var stage = _this.mapData.stage
                    _this.gameState = _this.state[ stage ]

                    var obj = _this.ballOptions;
                    TweenMax.to(obj,1,{speedZ:obj.startSpeedZ,onComplete:function(){
                        _this.gravity.allow = true;
                        var preRoad = _this.mapData[_this.mapData.preStage].roadFBXGroup
                        three.scene.remove( preRoad )
                    }})
                } );
            }
        },
        /*活动规则*/
        // top_btn_rule:function(){
        //     this.prule.visible = true;
        //     if(!main.scroll){
        //         main.scroll = new Scroll({
        //             container:".scroll-area",
        //             scrollObj:".scroller"
        //         })
        //     }
        // },
        prule_btn_xx:function(){
            this.prule.visible = false;
        },
        after_leave_rule:function(){
            main.scroll.set( 0 );
        },
        after_enter_rule:function(){
            main.scroll.update();
        },

        /*presult*/
        presult_btn_again:function(){
            console.log("不服来战")
        },
        presult_btn_share:function(){
            this.pshare.visible = true
        },

        /*焦虑原因*/
        pboard_btn_close:function(){
            this.pboard.visible = false;
        },
        /*中奖查询页*/
        pquery_btn_paddress:function(){
            this.paddress.visible = true;
        },
        pquery_btn_share:function(){
            this.pshare.visible = true;
        },
        pquery_btn_xx:function(){
            this.pquery.visible = false;
        },

        /*提交信息页*/
        pfill_btn_submit:function(){
            var number = this.server_data.tel;
            var name = this.server_data.name;
            var patt = /^1(3|4|5|7|8)\d{9}$/;

            if(name == ""){
                this.palert.type = this.palert.choice.normal;
                this.palert.content = "请输入姓名";
                this.palert.visible = true;
                return;
            };
            if(!(patt.test(number))){
                this.palert.type = this.palert.choice.normal;
                this.palert.content = "请输入正确的手机号";
                this.palert.visible = true;
                return;
            };
            if(this.server_data.select_province == ""){
                this.palert.type = this.palert.choice.normal;
                this.palert.content = "请选择省份";
                this.palert.visible = true;
                return;
            }
            if(this.server_data.select_city == ""){
                this.palert.type = this.palert.choice.normal;
                this.palert.content = "请选择城市";
                this.palert.visible = true;
                return;
            }
            if(this.server_data.select_address == ""){
                this.palert.type = this.palert.choice.normal;
                this.palert.content = "请选择门店";
                this.palert.visible = true;
                return;
            }

            var callback = function( result ){
                if(result.status){
                    location.href = "index.php";
                }else{
                    console.log(result)
                }
            }
            _uploadData.addInfo( callback );

        },
        onPfillProvinceChangeHandle:function(e){
            var _vm = this;
            _getData.getCity(function(data){
                _vm.server_data.city = data.data
            })
        },
        onPfillCityChangeHandle:function(e){
            var _vm = this;
            _getData.getShop(function(data){
                _vm.server_data.address = data.data
            })
        },
        onPfillAddressChangeHandle:function(e){
            this.server_data.shop_id = e.target.selectedOptions[0].getAttribute("shopid");
        },

        /*查询可使用门店页*/
        onPaddress_btn_xx:function(){
            this.paddress.visible = false;
        },
        onPaddressProvinceChangeHandle:function(e){
            var _vm = this;
            _getData.getCity(function(data){
                _vm.server_data.city = data.data
            })
        },
        onPaddressCityChangeHandle:function(e){
            var _vm = this;
            _getData.getShop(function(data){
                _vm.server_data.address = data.data
            })
        },
        onPaddressAddressChangeHandle:function(e){

        },


        /*后退*/
        back:function(){
            var len = this.router.length;
            if(len>0){
                var page = this.router[len-1];
                this[page].visible = true;
                this.router.splice(len-1,1)
            }
        },

        /*alert页面*/
        palert_btn_gofill:function(){
            this.pfill.visible = true;
            this.closeAlert();
        },
        palert_btn_goregist:function(){
            var back_url = "http://epshow.i-creative.cn/summer/index.php?is_reg=1";
            location.href = "http://o2o.elegant-prosper.com/EPWXSiteNew/VIP/CreateVIP?sid=cfe404ea-fe5b-4a85-87f0-b2701929462c&redirect_uri="+encodeURIComponent(back_url);
        },
        onPshareEnter:function(){
            // main.initLX({
            //     container:$(".P_share"),
            //     delay:1000
            // })
        },
        openAlert:function(type,content,fontSize){
            var fontSize = fontSize?fontSize:"";
            this.palert.type = type;
            this.palert.content = content;
            this.palert.visible = true;
            this.palert.fontSize = fontSize;
        },
        closeAlert:function(){
            this.palert.visible = false;
            this.palert.type = "";
            this.palert.content = "";
            this.palert.fontSize = "";
        },
    },
    computed:{

    },
    delimiters: ['$[', ']']
}
var vm = new Vue(options);

var three = new function(){
    this.container;
    this.scene;
    this.camera;
    this.renderer;
    this.width;
    this.height;

    this.raycaster;//射线实例
};
three.init = function(){
    this.container = $("#WebGL");
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45,this.width/this.height,0.1,1500);
    this.camera.position.set( 0,20,0 )
    // this.camera.rotateX( -Math.PI / 18 )

    this.ocamera = new THREE.OrthographicCamera(-this.width/2,this.width/2,this.height/2,-this.height/2,1,200);
    this.ocamera.position.y = 50;
    this.ocamera.position.z = 15;
    this.scene2 = new THREE.Scene();


    this.renderer = new THREE.WebGLRenderer({antialias:true,alpha:true,precision:"highp"});
    this.renderer.setPixelRatio(window.devicePixelRatio);//移动端为了性能，关闭此功能
    this.renderer.setSize(this.width,this.height);
    // this.renderer.setClearColor(0x000000,1);
    this.renderer.autoClear = false;
    this.container.append(this.renderer.domElement);

    this.raycaster = new THREE.Raycaster();

    this.ddsloader = new THREE.DDSLoader();
    THREE.Loader.Handlers.add(/\.dds$/i,this.ddsloader);


};

three.loadOBJ = function(config){
    config = config ? config : {};
    config.modelName = config.modelName ? config.modelName : (function(){console.error("加载obj文件，modelName不能为空");return;}())
    config.objFile = config.objFile ? config.objFile :(function(){console.error("加载obj文件，fileName不能为空");return;}())
    config.material = config.material ? config.material : undefined;
    config.needTouch = typeof config.needTouch =="boolean" ? config.needTouch : true;//是否可以点击，如果可以，加入到touch搜索列表
    config.callback = config.callback ? config.callback : undefined;
    var objloader = new THREE.OBJLoader();

    if(config.material){
        objloader.setMaterials(config.material);
        console.log(config.material)
    }

    objloader.load(config.objFile,function(group){//加载路径,成功回调，参数可以是整个模型对象Group也可以是单个object(mesh)
        config.callback && config.callback(group)

        group.name = config.modelName;//给物体一个名字
        group.position.x = webgl.OBJData[config.modelName].position.x;
        group.position.y = webgl.OBJData[config.modelName].position.y;
        group.position.z = webgl.OBJData[config.modelName].position.z;

        group.rotation.x = webgl.OBJData[config.modelName].rotation.x;
        group.rotation.y = webgl.OBJData[config.modelName].rotation.y;
        group.rotation.z = webgl.OBJData[config.modelName].rotation.z;

        group.scale.x = webgl.OBJData[config.modelName].scale.x;
        group.scale.y = webgl.OBJData[config.modelName].scale.y;
        group.scale.z = webgl.OBJData[config.modelName].scale.z;


        webgl.OBJData[config.modelName].obj = group;//存入到全局OBJ数据中


        if(webgl.OBJData[config.modelName].needTouch){//根据需要加入touch搜索列表
            webgl.touchObjects.push(object);
        }

        main.loader.haveLoad++;
        var completePercent = Math.round(main.loader.haveLoad/main.loader.total*100);
        $(".num").html(100-completePercent)
        if(main.loader.haveLoad == main.loader.total ){
            main.loadCallBack();
        }
    },function(progress){
        // console.log(progress)
    },function(error){
        console.log("加载obj出错")
    })
};

three.loadMTL = function(config){
    config = config ? config : {};
    config.modelName = config.modelName ? config.modelName : (function(){console.error("加载mtl文件，modelName不能为空");return;}());
    config.mtlFile = config.mtlFile ? config.mtlFile :(function(){console.error("加载mtl文件，文件名不能为空");return;}());

    var mtlloader = new THREE.MTLLoader();
    if(config.baseUrl){
        mtlloader.setPath(config.baseUrl);
    }

    mtlloader.load(config.mtlFile,function(materials){//加载mtl文件
        materials.preload();
        if(config.objFile){
            three.loadOBJ({
                modelName:config.modelName,
                objFile:config.objFile,
                material:materials,
            })
        }

    },function(res){
        // console.log(res)
    },function(res){
        console.log("加载mtl出错")
    })
};
three.loadCollada = function(config){
    config = config ? config : {};
    config.url = config.url;

    config.successCallback = typeof config.successCallback =="function" ? config.successCallback : function(collada){console.log(collada)};
    config.progressCallback = config.progressCallback ? config.progressCallback : function(progress){console.log(progress)};
    config.failCallback = config.failCallback ? config.failCallback : function(fail){console.log(fail)};
    var loader = new THREE.ColladaLoader();
    loader.load(config.url,config.successCallback,config.progressCallback,config.failCallback)
};
three.loadTexture = function(config){
    config = config ? config : {};
    config.url = config.url ? config.url : "";
    config.name = config.name ? config.name : "";
    config.wrapS = typeof config.wrapS == "boolean" ? config.wrapS :false;
    config.wrapT = typeof config.wrapT == "boolean" ? config.wrapT :false;
    config.SuccessCallback = typeof config.SuccessCallback == "function" ? config.SuccessCallback :function(){};

    var textureLoader = new THREE.TextureLoader();
    textureLoader.setCrossOrigin("");
    var texture = textureLoader.load(config.url,function(texture){config.SuccessCallback(texture)},undefined,function(){});
    if(config.wrapS){
        texture.wrapS = THREE.RepeatWrapping;
    }
    if(config.wrapT){
        texture.wrapT = THREE.RepeatWrapping;
    }
    texture.name = config.name;
    return texture;

};
three.loadAudio = function(config){
    var audioLoader = new THREE.AudioLoader()
}

three.getSpotLight = function(config){
    config = config ? config : {};
    config.color = config.color ? config.color : 0xffffff;//灯光颜色
    config.intensity = config.intensity ? config.intensity : 1;//灯光强度
    config.distance = config.distance ? config.distance : 100;//灯光的照射长度
    config.angle = config.angle ? config.angle : Math.PI/3;//灯光角度，默认60度对应的弧度
    config.exponent = config.exponent ? config.exponent : 10;//灯光衰减速度，默认是10

    var light = new THREE.SpotLight(config.color,config.intensity,config.distance,config.angle,config.exponent);
    light.position.x = 100;
    light.position.y = 100;
    light.position.z = 0;
    return light;
};//聚光灯
three.getPointLightHelper = function(spotLight){
    if(spotLight instanceof THREE.Light){
        return new THREE.SpotLightHelper(spotLight);
    }
};//增加聚光灯辅助工具,便与调试,return一个helper实例
three.getDirectionalLight = function(config){
    config = config ? config : {};
    config.color = config.color ? config.color : 0xffffff;//颜色
    config.intensity = config.intensity ? config.intensity : 1;//光线强度

    var light = new THREE.DirectionalLight(config.color,config.intensity);

    if(config.position){
        light.position.set(config.position.x,config.position.y,config.position.z);
    }
    return light;
};//平行方向光,return光线实例
three.getAmbientLight = function(config){
    config = config ? config : {};
    config.color = config.color ? config.color : 0xffffff;//颜色
    config.intensity = config.intensity ? config.intensity : 1;
    var light = new THREE.AmbientLight( config.color, config.intensity );

    return light;
};//环境光,return光线实例

three.getSkyByCubeGeo = function(config){
    var path = "assets/texture/"
    config = config ? config : {};
    config.size = config.size ? config.size : 1024;
    config.format = config.format ? config.format : ".jpg";
    config.urls = config.urls ? config.urls : [
        path+"right"+config.format,
        path+"left"+config.format,
        path+"up"+config.format,
        path+"down"+config.format,
        path+"front"+config.format,
        path+"back"+config.format,
    ];

    var materials = [];
    for(var i = 0;i<config.urls.length;i++){
        materials.push(new THREE.MeshLambertMaterial({
            map:this.loadTexture({url:config.urls[i]}),
            side:THREE.BackSide
        }))
    }

    var mesh = new THREE.Mesh(new THREE.CubeGeometry(config.size,config.size,config.size),new THREE.MeshFaceMaterial(materials));//天空盒Mesh已经生成
    return mesh;
};//六面立方体CubeGeometry+多面材质组合MeshFaceMaterial,return mesh
three.getSkyBySphere = function(config){
    config = config ? config : {};
    config.R = config.R ? config.R : 50;//球体半径,说明:在2:1的长图素材中，r取值为short/PI
    config.Ws = config.Ws ? config.Ws :8;//分段数
    config.Hs = config.Hs ? config.Hs :6;//分段数
    config.phiStart = config.phiStart ? config.phiStart : 0;//0-2PI,x轴起点
    config.phiLength = config.phiLength ? config.phiLength : 2*Math.PI;//0-2PI,2PI代表画整个球
    config.thetaStart = config.thetaStart ? config.thetaStart : 0;//0-PI,y轴起点
    config.thetaLength = config.thetaLength ? config.thetaLength : Math.PI;//0-PI,0.5PI代表上半个球
    config.texture = config.texture ? config.texture : new THREE.Texture();

    var geometry = new THREE.SphereGeometry(config.R,config.Ws,config.Hs,config.phiStart,config.phiLength,config.thetaStart,config.thetaLength);
    var material = new THREE.MeshBasicMaterial({
        map:config.texture,
        side:THREE.DoubleSide
    })
    var mesh = new THREE.Mesh(geometry,material);
    return mesh;
};

three.getCurveLineGeo = function(curve, segments, closed){
    var g = new THREE.Geometry();

    //插值产生segments个点，返回的是THREE.Vector3组成的数组
    g.vertices = curve.getPoints(segments);

    //返回0.5位置的THREE.Vector3类型的值
    console.log( curve.getPointAt(0.5) )


    // console.log( curve.getPoint(0.5) )

    return g;
};
three.getCubeGeometry = function(config){
    //默认创建一个长宽高100的立方体，分段数为1
    config = config ? config : {};
    config.sizeX = config.sizeX ? config.sizeX : 100;//X方向大小
    config.sizeY = config.sizeY ? config.sizeY :100;//Y方向大小
    config.sizeZ = config.sizeZ ? config.sizeZ :100;//Z方向大小
    config.Xs = config.Xs ? config.Xs : 1;
    config.Ys = config.Ys ? config.Ys : 1;
    config.Zs = config.Zs ? config.Zs : 1;

    var geometry = new THREE.CubeGeometry(config.sizeX,config.sizeY,config.sizeZ,config.Xs,config.Ys,config.Zs);
    return geometry;
};//return geometry
three.getPlaneGeo = function(config){
    config = config ? config : {};
    config.width = config.width ? config.width : 50;//平面默认宽50
    config.height = config.height ? config.height : 50;//平面默认高50
    config.Ws = config.Ws ? config.Ws : 1;//平面默认X方向段数为1
    config.Hs = config.Hs ? config.Hs : 1;//平面默认Y方向段数为1

    var planeGeo = new THREE.PlaneGeometry(config.width,config.height,config.Ws,config.Hs);
    return planeGeo;
};//return geometry
three.getSphereGeometry = function(config){
    config = config ? config : {};
    config.R = config.R ? config.R : 50;//球体半径,说明:在2:1的长图素材中，r取值为short/PI
    config.Ws = config.Ws ? config.Ws :8;//分段数
    config.Hs = config.Hs ? config.Hs :6;//分段数
    config.phiStart = config.phiStart ? config.phiStart : 0;//0-2PI,x轴起点
    config.phiLength = config.phiLength ? config.phiLength : 2*Math.PI;//0-2PI,2PI代表画整个球
    config.thetaStart = config.thetaStart ? config.thetaStart : 0;//0-PI,y轴起点
    config.thetaLength = config.thetaLength ? config.thetaLength : Math.PI;//0-PI,0.5PI代表上半个球

    var geometry = new THREE.SphereGeometry(config.R,config.Ws,config.Hs,config.phiStart,config.phiLength,config.thetaStart,config.thetaLength);
    return geometry;
};//return geometry
three.getPointMaterial = function(config){
    config = config ? config : {};
    config.size = config.size ? config.size : 4;
    config.map = config.map ? config.map : undefined;
    config.blending = config.blending ? config.blending : THREE.AdditiveBlending;

};


three.getOrbitControls = function(config){
    config = config ? config : {};
    return new THREE.OrbitControls(this.camera,this.renderer.domElement);
};
three.addPerspectiveCameraHelper = function(camera){
    camera = camera ? camera : this.camera;
    var helper = new THREE.CameraHelper(camera);
    this.scene.add(helper);
    return helper;
};

three.getFps = function(){
    var s = new Stats();
    return s;
};//return Stats实例
three.getObjectByName = function(config){
    config = config ? config : {};
    config.name = config.name ? config.name : (function(){console.error("getObjectByName时缺少name");}())
    config.scene = config.scene ? config.scene : this.scene;

    return config.scene.getObjectByName(config.name)
};//return scene.children
three.raycasterResult = function(config){//返回点到的第一个
    config = config ? config :{};
    config.coords = config.coords ? config.coords : new THREE.Vector2();
    config.searchFrom = config.searchFrom ? config.searchFrom : this.scene;
    config.recursive = config.recursive ? config.recursive : false;//是否需要递归查找到子对象
    config.needGroup = config.needGroup ? config.needGroup : false;//是否需要返回整个模型group

    config.coords.x = (config.coords.x/this.width)*2-1;
    config.coords.y = 2 * -(config.coords.y / this.height) + 1;

    this.raycaster.setFromCamera(config.coords,this.camera);
    var result;
    result = this.raycaster.intersectObjects(config.searchFrom,config.recursive);
    if(result.length>0){//有点到东西
        if(config.needGroup){//需要返回整个模型Group
            if(result[0].object.parent && result[0].object.parent instanceof THREE.Group){
                result = result[0].object.parent;
            }
        }
        else{
            result = result[0];
        }
    }
    else{
        result = undefined;
    }
    return result;
};
three.getTime = function(){
    return new Date().getTime();
};//return 时间戳1213432534213123
three.getTouchCoords = function(event){
    return {x:event.offsetX,y:event.offsetY};
};//传入touch回调参数,return{x:0,y:0}

three.render = function(){
    this.renderer.clear()
    this.renderer.render(this.scene,this.camera);
    this.renderer.clearDepth();
    this.renderer.render(this.scene2,this.ocamera);
};
three.onresize = function(){
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.camera.aspect = this.width/this.height;
    this.camera.updateProjectionMatrix();

    this.ocamera.left = -this.width/2;
    this.ocamera.right = this.width/2;
    this.ocamera.top = this.height/2;
    this.ocamera.bottom = -this.height/2;
    this.ocamera.updateProjectionMatrix();

    this.renderer.setSize(this.width,this.height);
};

var curveTool = (function(){

    //曲线上的点
    var vector1 = new THREE.Vector3();

    //曲线上点的切线
    var vector2 = new THREE.Vector3();

    //常量
    var PI = Math.PI
    var PI2 = 2 * PI;

    //周期
    var range = [ 0, PI2 ]


    return {

        //分4段，每段0,1，

        //t为进度,范围0到1
        //quadrant为象限,取值0,1,2,3
        //R为半径
        //Clockwise为顺时针
        //offset为偏移
        getPointAt: function ( t, quadrant, R, Clockwise, offset ) {

            offset = offset || new THREE.Vector3()

            //起始边界
            range[ 0 ] = 0 + quadrant * ( PI / 2 )
            //结束边界
            range[ 1 ] = range[ 0 ] + PI / 2

            Clockwise = Clockwise || false

            if( Clockwise ){
                t = range[ 1 ] - t * PI / 2
            }else{
                t = range[ 0 ] + t * PI / 2
            }


            var x = R * Math.cos( t )
            var z = -R * Math.sin( t )
            vector1.set( x, 0, z ).add( offset )
            return vector1;
        },

        getTangentAt: function ( t, quadrant, R, Clockwise ) {

            var delta = 0.00001;
            var tPre = Math.max( 0, t - delta );
            var tNxt = Math.min( 1, t + delta );

            Clockwise = Clockwise || false

            vector2.copy( this.getPointAt( tNxt, quadrant, 1, Clockwise ) ).sub( this.getPointAt( tPre, quadrant, 1, Clockwise ) ).normalize();
            return vector2;

        }

    }
})()
/***********************webgl***********************/
var webgl = new function(){
    /*debug模式
     * 增加fps工具:webgl.fps = three.addFps()
     *
     *
     * */
    this.debug = true;

    this.fps = undefined;//左上角fps
    this.orbit = undefined;//键盘+鼠标控制器
    this.gravity = undefined;//重力控制器

    //加载计数器
    this.loader = {
        haveLoad:0,
        total:0,
        complete:false,
    };

    // this.assetsUrl = "http://epshow.img.i-creative.cn/planet/assets/";
    this.assetsUrl = "assets/";

    this.picUrl = this.assetsUrl+"images/";//图片路径
    this.texturePath = this.assetsUrl+"images/"; //纹理路径
    this.modelsUrl = this.assetsUrl+"models/";//模型基础路径

    //可被touch到的物体,this.touchObjects.indexOf(testObj) !=-1
    this.touchObjects = [];

    //一般为带纹理的整个模型,配置信息
    this.OBJData = {
        scene:{
            name:"scene",
            baseUrl:this.assetsUrl,
            mtlFile:this.assetsUrl+"models/scene/scene.mtl",
            objFile:this.assetsUrl+"models/scene/scene.obj",
            // texture:"assets/models/scene/scene.png",

            position:{x:0,y:0,z:0},
            rotation:{x:0,y:0,z:0},
            scale:{x:0.07,y:0.07,z:0.07},

            needTouch:false,
            liusu_center:undefined,
            liusu_up:undefined,
        }
    };

    this.FBXData = {
        bridge:{
            depth:81,
            name:"bridge",
            url:this.modelsUrl+"bridge3.fbx",
            position:new THREE.Vector3(),
            obj:undefined,
        },
        curve:{
            name:"curve",
            url:this.modelsUrl+"curve3.fbx",
            position:new THREE.Vector3(),
            obj:{},
        },
        branch:{
            name:"branch",
            url:this.modelsUrl+"branch2.fbx",
            position:new THREE.Vector3(),
            obj:undefined,
        }
    }

    //待加载的纹理--配置信息
    this.TextureData={

    };

    const SQ3 = Math.sqrt(3);
    const SQ2 = Math.sqrt(2);

    //背景天空
    this.skyBox = undefined;

    //纹理序列
    this.earthChangeTexture = [];
    //切换到第几张纹理
    this.textureIndex = 0;

    this.ogroup = new THREE.Group();

    //时钟
    this.clock = new THREE.Clock();
    //road
    this.road = undefined;
    this.roadOptions = {
        depth:1000,
        segments:100,
        width:40
    };
    this.ballOptions = {
        ballRadius:4,
        speedX:0,
        speedZ:0,
        startSpeedZ:-1.5,
        maxZ:-0.5,
        minZ:-1.5,
        maxX:1,
        minX:-1,
        ax:0,
        az:0,
        pause:false,
        startPosition:new THREE.Vector3( 0, 4, 0 ),
        viewSpeedZ:0,
        texture:{},
        energy:1,
    };

    //gameState
    this.state = {
        init:"init",
        enter:"enter",
        wait:"wait",
        slowDown:"slowDown",
        startFrom0:"startFrom0",
        stage0:"stage0",
        stage1:"stage1",
        stage2:"stage2",
        stage3:"stage3",
        stage4:"stage4",
        stage5:"stage5",
        waitChose:"waitChose",
        runCurve:"runCurve",
        end:"end",
        bump:"bump"
    };

    //mapInfo
    this.mapData = {
        stage0:{
            index:0,
            depth:405,
            segments:5,
            width:40,
            offset:new THREE.Vector3(),//起点的全局偏移
            start:new THREE.Vector3( 0, 0, 0 ),//内部起点
            end:new THREE.Vector3( 0, 0, -405 ),//内部终点
            g_end:new THREE.Vector3(0, 0, -405),//全局end
            distance:new THREE.Vector3( 0, 0, -200 ),//内部distance
            g_distance:new THREE.Vector3( 0, 0, -200 ),//全局减速点
            dir:undefined,
            roadFBXGroup:undefined,
        },
        stage1:{
            index:1,
            depth:810,
            segments:10,
            width:40,
            offset:new THREE.Vector3(),//起点的全局偏移
            start:new THREE.Vector3( 0, 0, 0 ),//内部起点
            end:new THREE.Vector3(0,0,-810),//内部终点
            g_end:new THREE.Vector3(),//全局end
            distance:new THREE.Vector3(0, 0, -600),
            g_distance:new THREE.Vector3(0,0,0),
            dir:undefined,
            roadFBXGroup:undefined,
            left:{//左岔路
                stone:{
                    name:"",
                    position:new THREE.Vector3(10,0,-300),
                    g_position:new THREE.Vector3(),
                    scale:new THREE.Vector3(268,207,1),
                    width:20,
                    halfWidth:10
                },
                left_grass:{
                    name:"1",
                    position:new THREE.Vector3(-40,3,-100),
                    scale:new THREE.Vector3(532,309,1),
                    multiply:0.1,
                    texture:undefined,
                },
                left_build1:{
                    name:"3",
                    position:new THREE.Vector3(-40,15,-150),
                    scale:new THREE.Vector3(276,400,1),
                    texture:undefined
                },
                left_build2:{
                    name:"5",
                    position:new THREE.Vector3(-40, 15,-200),
                    scale:new THREE.Vector3(240,425,1),
                    texture:undefined
                },
                left_build3:{
                    name:"7",
                    position:new THREE.Vector3(-40,15,-250),
                    scale:new THREE.Vector3(255,227,1),
                    texture:undefined
                },
                left_build4:{
                    name:"8",
                    position:new THREE.Vector3(-40,15,-300),
                    scale:new THREE.Vector3(137,421,1),
                    texture:undefined
                },

                right_grass:{
                    name:"2",
                    position:new THREE.Vector3(50, 3,-350),
                    scale:new THREE.Vector3(598,378,1),
                    multiply:0.1,
                    texture:undefined
                },
                right_build1:{
                    name:"6",
                    position:new THREE.Vector3(40, 15,-400),
                    scale:new THREE.Vector3(205,423,1),
                    texture:undefined
                },
                right_build2:{
                    name:"4",
                    position:new THREE.Vector3(70,15,-400),
                    scale:new THREE.Vector3(391,322,1),
                    texture:undefined
                },

            },
            right:{//右岔路
                stone:{
                    name:"",
                    position:new THREE.Vector3(10,0,-450),
                    g_position:new THREE.Vector3(),
                    scale:new THREE.Vector3(268,207,1),
                    width:20,
                    halfWidth:10
                },
                left_grass:{
                    name:"9",
                    position:new THREE.Vector3(0,-10,-100),
                    scale:new THREE.Vector3(1136,220,1),
                    texture:undefined,
                },
                left_build1:{
                    name:"1",
                    position:new THREE.Vector3(-50,10,-250),
                    scale:new THREE.Vector3(411,287,1),
                    texture:undefined
                },
                left_build2:{
                    name:"3",
                    position:new THREE.Vector3(-75, 10,-350),
                    scale:new THREE.Vector3(449,325,1),
                    texture:undefined
                },
                left_cow:{
                    name:"5",
                    position:new THREE.Vector3(-50, 10,-320),
                    scale:new THREE.Vector3(182,152,1),
                    texture:undefined
                },
                left_tree1:{
                    name:"2",
                    position:new THREE.Vector3(-50, 10,-380),
                    scale:new THREE.Vector3(298,353,1),
                    texture:undefined
                },
                left_build3:{
                    name:"4",
                    position:new THREE.Vector3(-50,10,-450),
                    scale:new THREE.Vector3(449,325,1),
                    texture:undefined
                },

                right_build1:{
                    name:"6",
                    position:new THREE.Vector3(75, 10,-300),
                    scale:new THREE.Vector3(505,417,1),
                    texture:undefined
                },
                right_build2:{
                    name:"8",
                    position:new THREE.Vector3(50,10,-300),
                    scale:new THREE.Vector3(338,256,1),
                    texture:undefined
                },
                right_tree1:{
                    name:"7",
                    position:new THREE.Vector3(100,10,-200),
                    scale:new THREE.Vector3(825,612,1),
                    texture:undefined
                },

            }
        },
        stage2:{
            index:2,
            depth:810,
            segments:10,
            width:40,
            offset:new THREE.Vector3(),//起点的全局偏移
            start:new THREE.Vector3(0,0,0),//起点
            end:new THREE.Vector3(0,0,-810),//内部终点
            g_end:new THREE.Vector3(),//全局end
            distance:new THREE.Vector3(0, 0, -600),
            g_distance:new THREE.Vector3(0,0,0),
            dir:undefined,
            roadFBXGroup:undefined,
            left:{
                stone:{
                    name:"",
                    position:new THREE.Vector3(10,0,-450),
                    g_position:new THREE.Vector3(),
                    scale:new THREE.Vector3(268,207,1),
                    width:20,
                    halfWidth:10
                },
                left_grass:{
                    name:"1",
                    position:new THREE.Vector3(-60,10,-100),
                    scale:new THREE.Vector3(465,249,1),
                    texture:undefined,
                },
                left_stone:{
                    name:"11",
                    position:new THREE.Vector3(-60,10,-102),
                    scale:new THREE.Vector3(462,248,1),
                    texture:undefined,
                },
                left_people:{
                    name:"3",
                    position:new THREE.Vector3(-60,10,-100),
                    scale:new THREE.Vector3(118,242,1),
                    texture:undefined,
                },
                left_build1:{
                    name:"4",
                    position:new THREE.Vector3(-50,10,-250),
                    scale:new THREE.Vector3(486,453,1),
                    texture:undefined
                },
                left_build2:{
                    name:"5",
                    position:new THREE.Vector3(-50, 10,-350),
                    scale:new THREE.Vector3(213,284,1),
                    texture:undefined
                },

                right_grass:{
                    name:"2",
                    position:new THREE.Vector3(50, 10,-100),
                    scale:new THREE.Vector3(239,232,1),
                    texture:undefined
                },
                right_build1:{
                    name:"6",
                    position:new THREE.Vector3(50, 10,-300),
                    scale:new THREE.Vector3(389,514,1),
                    texture:undefined
                },
                right_build2:{
                    name:"7",
                    position:new THREE.Vector3(100,10,-300),
                    scale:new THREE.Vector3(556,454,1),
                    texture:undefined
                },
                right_build3:{
                    name:"8",
                    position:new THREE.Vector3(100,10,-300),
                    scale:new THREE.Vector3(441,325,1),
                    texture:undefined
                },
            },//left
            right:{
                stone:{
                    name:"",
                    position:new THREE.Vector3(10,0,-450),
                    g_position:new THREE.Vector3(),
                    scale:new THREE.Vector3(268,207,1),
                    width:20,
                    halfWidth:10
                },
                left_grass:{
                    name:"1",
                    position:new THREE.Vector3(0,-10,-100),
                    scale:new THREE.Vector3(1136,176,1),
                    texture:undefined,
                },
                left_build1:{
                    name:"2",
                    position:new THREE.Vector3(-50,10,-250),
                    scale:new THREE.Vector3(603,654,1),
                    texture:undefined
                },
                left_horse:{
                    name:"5",
                    position:new THREE.Vector3(-50, 10,-320),
                    scale:new THREE.Vector3(742,331,1),
                    texture:undefined
                },

                right_build1:{
                    name:"3",
                    position:new THREE.Vector3(75, 10,-300),
                    scale:new THREE.Vector3(684,752,1),
                    texture:undefined
                },
                right_build2:{
                    name:"6",
                    position:new THREE.Vector3(50,10,-300),
                    scale:new THREE.Vector3(727,304,1),
                    texture:undefined
                },
                right_couple:{
                    name:"4",
                    position:new THREE.Vector3(100,10,-200),
                    scale:new THREE.Vector3(293,335,1),
                    texture:undefined
                },
            }//right
        },
        stage3:{
            index:3,
            depth:810,
            segments:10,
            width:40,
            offset:new THREE.Vector3(),//起点的全局偏移
            start:new THREE.Vector3(),//起点
            end:new THREE.Vector3(0,0,-810),//内部终点
            g_end:new THREE.Vector3(),//全局end
            distance:new THREE.Vector3(0, 0, -600),
            g_distance:new THREE.Vector3(0,0,0),
            dir:undefined,
            roadFBXGroup:undefined,
            left:{
                stone:{
                    name:"",
                    position:new THREE.Vector3(10,0,-450),
                    g_position:new THREE.Vector3(),
                    scale:new THREE.Vector3(268,207,1),
                    width:20,
                    halfWidth:10
                },
                left_grass:{
                    name:"1",
                    position:new THREE.Vector3(-60,10,-100),
                    scale:new THREE.Vector3(395,248,1),
                    texture:undefined,
                },
                left_couple:{
                    name:"4",
                    position:new THREE.Vector3(-60,10,-100),
                    scale:new THREE.Vector3(523,344,1),
                    texture:undefined,
                },
                left_build1:{
                    name:"2",
                    position:new THREE.Vector3(-50,10,-250),
                    scale:new THREE.Vector3(522,572,1),
                    texture:undefined
                },

                right_build1:{
                    name:"3",
                    position:new THREE.Vector3(50, 10,-300),
                    scale:new THREE.Vector3(682,748,1),
                    texture:undefined
                },
                right_horse:{
                    name:"5",
                    position:new THREE.Vector3(100,10,-300),
                    scale:new THREE.Vector3(656,330,1),
                    texture:undefined
                },
            },//left
            right:{
                stone:{
                    name:"",
                    position:new THREE.Vector3(10,0,-450),
                    g_position:new THREE.Vector3(),
                    scale:new THREE.Vector3(268,207,1),
                    width:20,
                    halfWidth:10
                },
                left_people:{
                    name:"1",
                    position:new THREE.Vector3(-60,10,-100),
                    scale:new THREE.Vector3(362,297,1),
                    texture:undefined,
                },
                left_build1:{
                    name:"4",
                    position:new THREE.Vector3(-60,10,-100),
                    scale:new THREE.Vector3(469,371,1),
                    texture:undefined,
                },
                left_build2:{
                    name:"5",
                    position:new THREE.Vector3(-50,10,-250),
                    scale:new THREE.Vector3(535,403,1),
                    texture:undefined
                },

                right_build1:{
                    name:"2",
                    position:new THREE.Vector3(50, 10,-300),
                    scale:new THREE.Vector3(724,508,1),
                    texture:undefined
                },
                right_build2:{
                    name:"3",
                    position:new THREE.Vector3(50, 10,-300),
                    scale:new THREE.Vector3(592,175,1),
                    texture:undefined
                },
                right_build3:{
                    name:"6",
                    position:new THREE.Vector3(50, 10,-300),
                    scale:new THREE.Vector3(568,227,1),
                    texture:undefined
                },

            }//right
        },
        stage4:{
            index:4,
            depth:810,
            segments:10,
            width:40,
            offset:new THREE.Vector3(),//起点的全局偏移
            start:new THREE.Vector3(),//起点
            end:new THREE.Vector3(0,0,-810),//内部终点
            g_end:new THREE.Vector3(),//全局end
            distance:new THREE.Vector3(0, 0, -600),
            g_distance:new THREE.Vector3(0,0,0),
            dir:undefined,
            roadFBXGroup:undefined,
            left:{
                stone:{
                    name:"",
                    position:new THREE.Vector3(10,0,-450),
                    g_position:new THREE.Vector3(),
                    scale:new THREE.Vector3(268,207,1),
                    width:20,
                    halfWidth:10
                },
                left_grass:{
                    name:"1",
                    position:new THREE.Vector3(-60,10,-100),
                    scale:new THREE.Vector3(395,248,1),
                    texture:undefined,
                },
                left_people:{
                    name:"4",
                    position:new THREE.Vector3(-60,10,-100),
                    scale:new THREE.Vector3(523,344,1),
                    texture:undefined,
                },
                left_build1:{
                    name:"2",
                    position:new THREE.Vector3(-50,10,-250),
                    scale:new THREE.Vector3(522,572,1),
                    texture:undefined
                },

                right_pool:{
                    name:"3",
                    position:new THREE.Vector3(50, 10,-300),
                    scale:new THREE.Vector3(682,748,1),
                    texture:undefined
                },
                right_people:{
                    name:"5",
                    position:new THREE.Vector3(100,10,-300),
                    scale:new THREE.Vector3(656,330,1),
                    texture:undefined
                },
                right_tree:{
                    name:"5",
                    position:new THREE.Vector3(100,10,-300),
                    scale:new THREE.Vector3(656,330,1),
                    texture:undefined
                },
                right_stone:{
                    name:"5",
                    position:new THREE.Vector3(100,10,-300),
                    scale:new THREE.Vector3(656,330,1),
                    texture:undefined
                },
            },//left
            right:{
                stone:{
                    name:"",
                    position:new THREE.Vector3(10,0,-450),
                    g_position:new THREE.Vector3(),
                    scale:new THREE.Vector3(268,207,1),
                    width:20,
                    halfWidth:10
                },
                left_tree1:{
                    name:"2",
                    position:new THREE.Vector3(-50,10,-250),
                    scale:new THREE.Vector3(522,572,1),
                    texture:undefined
                },

                right_grass:{
                    name:"1",
                    position:new THREE.Vector3(-60,10,-100),
                    scale:new THREE.Vector3(395,248,1),
                    texture:undefined,
                },
                right_people:{
                    name:"5",
                    position:new THREE.Vector3(100,10,-300),
                    scale:new THREE.Vector3(656,330,1),
                    texture:undefined
                },
            }//right
        },
        preStage:undefined,
        stage:"stage0",
        nextStage:"stage1",
        left:0,
        right:1,
        cross:2,
        curveR:186,
        stoneTexture:undefined,
    }

    //cacheData
    this.cacheData = {
        stage1:{
            left:undefined,
            right:undefined
        },
        stage2:{
            left:undefined,
            right:undefined
        },
        stage3:{
            left:undefined,
            right:undefined
        },
        stage4:{
            left:undefined,
            right:undefined
        }
    }

    //曲线
    this.curvesData = {
        left:undefined,
        right:undefined,
    }
    this.curveType = "";//left或者right
    this.runData = undefined;
    this.cameraT = 0

    this.gameState = this.state['init'];

    //ball
    this.ballMesh = undefined

    //curveLine1
    this.curveLine1 = undefined;
    //curveLine2
    this.curveLine2 = undefined;
    //straightLine
    this.straightLine = undefined

    this.gravity = {
        alpha:0,
        beta:0,
        gamma:0,
        lastGamma:0,
        deltaGamma:0,
        lastBeta:0,
        deltaBeta:0,
        allow:false,
        instance:undefined,
        orient:0,//0代表竖屏,1代表机头向左，-1代表机头向右
        lon:0,//经度，0代表平衡状态
        lastLon:0,
        deltaLon:0,
    }

};
webgl.init = function(){
    this.loader.total = Object.keys(this.OBJData).length;

    var _this = this;
    var t = new THREE.TextureLoader().load( main.picUrl+"pf.jpg" )
    t.wrapT = t.wrapS = THREE.RepeatWrapping
    t.needsUpdate = true
    var material = new THREE.MeshLambertMaterial({
        map:t,
        // wireframe:true
        // depthWrite:false
        // depthTest:false,
    })
    for( var prop in this.FBXData ){
        loadFBX( _this.FBXData[ prop ] )
    }

    function loadFBX( option ){
        var fbxLoader = new THREE.FBXLoader()
        fbxLoader.load( option.url, function( group ){
            switch( option.name ){
                case "bridge":
                    group.scale.multiplyScalar( 16 )
                    group.position.set( -1.5,0,0)
                    option.obj = group;

                    group.traverse( function( object ){
                        if( object instanceof THREE.Mesh ){
                            // object.material.color.setRGB(255,0,0)
                            object.material = material
                        }
                    } )
                    break;
                case "curve":
                    group.traverse( function( object ){
                        if( object instanceof THREE.Mesh ){
                            // object.material.color.setRGB(255,0,0)
                            object.material = material
                        }
                    } )
                    group.scale.multiplyScalar( 16.5 )
                    option.obj[ _this.mapData.left ] = group.clone().rotateY( -Math.PI/2 );
                    option.obj[ _this.mapData.left ].position.add( new THREE.Vector3( 54, 0, -184) )
                    option.obj[ _this.mapData.right ] = group.clone()

                    break;
                case "branch":
                    group.scale.multiplyScalar( 16 )
                    option.obj = group;
                    group.position.y = -5
                    group.children[1].material = material
                    break;
            }

        },function(e){
            // console.log(e)
        },function(e){
            // console.log(e)
        })
    }


    // var t = new THREE.TextureLoader().load( main.modelUrl+"bridge.jpg" )
    // t.needsUpdate = true
    // for( var prop in this.FBXData ){
    //     loadOBJ( _this.FBXData[ prop ] )
    // }
    //
    // function loadOBJ( option ){
    //     var fbxLoader = new THREE.OBJLoader()
    //     fbxLoader.load( option.url, function( group ){
    //         switch( option.name ){
    //             case "bridge":
    //                 group.scale.set( 13, 13, 13 )
    //                 group.position.set( -1.5,-3,-52)
    //                 option.obj = group;
    //
    //                 var m = new THREE.MeshLambertMaterial({
    //                     wireframe:true,
    //                     color:0xff0000,
    //                     map:t
    //                 })
    //                 group.children[0].material = m
    //                 m.needsUpdate = true
    //                 break;
    //             case "curve":
    //                 group.scale.multiplyScalar( 12 )
    //                 group.position.set(120,-2,-130)
    //                 option.obj[ _this.mapData.left ] = group.clone().rotateZ( Math.PI );
    //                 option.obj[ _this.mapData.right ] = group.clone()
    //
    //                 var m = new THREE.MeshLambertMaterial({
    //                     wireframe:true,
    //                     color:0xff0000,
    //                     map:t
    //                 })
    //                 group.children[0].material = m
    //                 m.needsUpdate = true
    //                 break;
    //         }
    //         // group.traverse( function( object ){
    //         //     if( object instanceof THREE.Mesh ){
    //         //         // object.material.color.setRGB(255,0,0)
    //         //         object.material.wireframe = true
    //         //     }
    //         // } )
    //
    //
    //
    //     },function(e){
    //         console.log(e)
    //     },function(e){
    //         console.log(e)
    //     })
    // }

};
webgl.load = function(){
    for(var prop in this.OBJData){
        var config = this.OBJData[prop];
        // three.loadMTL({
        //     modelName:config.name,
        //     mtlFile:config.mtlFile,
        //     objFile:config.objFile,
        //     baseUrl:config.baseUrl,
        // })
        three.loadOBJ({
            modelName:config.name,
            objFile:config.objFile,
            callback:function(group){
                webgl.stone1 = group.children[0];
                webgl.stone2 = group.children[1];
                webgl.liusu_up = group.children[2];
                webgl.liusu_center = group.children[3];
                webgl.planet = group.children[4];

                // object.children[0].material = material;
            }
        })
    }

};
webgl.loadCallback = function(){
    var _this = this;
    var stage = this.mapData.stage
    var stageOption = this.mapData[ stage ]

    initAmbientLight()//环境光
    _this.createNextRoadWithFBX()//道路
    _this.initCacheData();//生成所有地图数据,并隐藏
    initGravity.call( this )//重力


    //main
    function initAmbientLight(){
        var ambientLight = three.getAmbientLight({
            color:0x000000,
            intensity:1,
        });//可被移除的对象
        three.scene.add(ambientLight);
    }
    function initGravity(){
        var scope = this;
        var gravity = this.gravity;
        gravity.instance = new Orienter();
        gravity.instance.onOrient = function ( data ) {

            /*
             * 横屏 机头朝左 window.orientation == 90  手机向右转动beta为正( 机头朝上 )
             *                                         手机向左转动beta为负
             *
             * 横屏 机头朝右 window.orientation == -90 手机向右转动beta为负( 机头朝下 )
             *                                                     手机向左转动beta为正
             *
             *
             * */

            // if( gravity.allow ){
            //     gravity.deltaGamma = data.g - gravity.lastGamma;
            //     if( gravity.deltaGamma < 5 ){
            //         ( data.g /= 45 ) * scope.ballOptions.maxX;
            //         if( data.g > scope.ballOptions.minX){
            //             if( data.g < scope.ballOptions.maxX ){
            //                 scope.ballOptions.speedX = data.g
            //             }else{
            //                 scope.ballOptions.speedX = scope.ballOptions.maxX
            //             }
            //         }else{
            //             scope.ballOptions.speedX = scope.ballOptions.minX
            //         }
            //     }
            //
            //     // var dir = gravity.deltaGamma > 0 ? 1 : -1;
            //     // scope.ballOptions.speedX*=dir
            //
            //     gravity.lastGamma = data.g
            // }

            if( gravity.allow ){
                // gravity.deltaBeta = data.b - gravity.lastBeta;
                // if( gravity.deltaBeta < 5 ){
                //     ( data.g /= 45 ) * scope.ballOptions.maxX;
                //     if( data.g > scope.ballOptions.minX){
                //         if( data.g < scope.ballOptions.maxX ){
                //             scope.ballOptions.speedX = data.g
                //         }else{
                //             scope.ballOptions.speedX = scope.ballOptions.maxX
                //         }
                //     }else{
                //         scope.ballOptions.speedX = scope.ballOptions.minX
                //     }
                // }
                //
                //
                // gravity.lastGamma = data.g
                // webgl.calCollision()
                switch( gravity.orient ){
                    case 0:
                        gravity.lon = data.g;
                        break;
                    default:
                        gravity.lon = data.b * gravity.orient;
                        break;
                }

                gravity.deltaLon = gravity.lon - gravity.lastLon;

                if( gravity.deltaLon < 5 ){
                    var speedX = ( gravity.lon / 45 ) * 2 * scope.ballOptions.maxX;
                    if( speedX > scope.ballOptions.minX){
                        if( speedX < scope.ballOptions.maxX ){
                            scope.ballOptions.speedX = speedX
                        }else{
                            scope.ballOptions.speedX = scope.ballOptions.maxX
                        }
                    }else{
                        scope.ballOptions.speedX = scope.ballOptions.minX
                    }
                }

                webgl.calCollision()
                gravity.lastLon = gravity.lon;


            }



        };
        gravity.instance.init();
    }


    //debug
    if( this.debug ){
        // initOrbit.call( this );//控制器
        initGui.call( this );//调试面板
        initAxisHelper();//坐标轴辅助线
        initFps.call( this );//fps
        CurveTest.call( this )//测试曲线
        createPlaneFloor( stageOption )
    }

    //debug
    function initOrbit(){
        this.orbit = new THREE.OrbitControls( three.camera , $("#gl-touch")[0]);
    }
    function initGui(){
        var _this = this;

        //ball
        var ballOptions = function(){
            this.name = "球";
            this.速度Z = _this.ballOptions.minZ;
            this.速度X = 0;
            this.提升性能 = false
            this.暂停 = false
            this.回到起点 = function() {
                webgl.reset();
            };
            this.出发 = function(){
                webgl.start();
            };
            this.左拐 = function(){
                _this.curveType = "left";
                vm.userData.chose.push( 0 )
                _this.updateCurvesData( 49, _this.mapData.curveR );//生成下一个stage岔路口的曲线数据

                //得到下一个stage
                _this.updateNextMapInfo();

                //下一个stage的道路模型生成
                _this.createNextRoadWithFBX()

                _this.gravity.allow = false;
                _this.gameState = _this.state["runCurve"]
                _this.runCurve( function(){
                    console.log("弯道结束")
                    // _this.gameState = _this.state["waitChose"]
                    three.camera.rotation.y = 0;
                    three.camera.rotation.x = 0
                    var stage = _this.mapData.stage
                    _this.gameState = _this.state[ stage ]

                    var obj = _this.ballOptions;
                    TweenMax.to(obj,1,{speedZ:obj.startSpeedZ,onComplete:function(){
                        _this.gravity.allow = true;
                        var preRoad = _this.mapData[_this.mapData.preStage].roadFBXGroup
                        three.scene.remove( preRoad )
                    }})
                } );

            };
            this.右拐 = function(){
                _this.curveType = "right";
                vm.userData.chose.push( 1 )
                _this.updateCurvesData( 49, _this.mapData.curveR );//生成下一个stage岔路口的曲线数据

                //得到下一个stage
                _this.updateNextMapInfo();

                //下一个stage的道路模型生成
                _this.createNextRoadWithFBX()

                _this.gravity.allow = false;
                _this.gameState = _this.state["runCurve"]
                webgl.runCurve( function(){
                    console.log("弯道结束")
                    three.camera.rotation.y = 0;
                    three.camera.rotation.x = 0
                    // _this.gameState = _this.state["waitChose"]
                    var stage = _this.mapData.stage
                    _this.gameState = _this.state[ stage ]

                    var obj = _this.ballOptions;
                    TweenMax.to(obj,1,{speedZ:obj.startSpeedZ,onComplete:function(){
                        _this.gravity.allow = true;
                        var preRoad = _this.mapData[_this.mapData.preStage].roadFBXGroup
                        three.scene.remove( preRoad )
                    }})
                } );
            }
        };

        //road
        var roadOptions = function(){
            this.name = "路"
            this.看场景1 = function(){
                _this.orbit.target = new THREE.Vector3().copy( _this.mapData.stage1.offset )
            }
            this.看场景2 = function(){
                _this.orbit.target = new THREE.Vector3().copy( _this.mapData.stage2.offset )
            }
            this.看场景3 = function(){
                _this.orbit.target = new THREE.Vector3().copy( _this.mapData.stage3.offset )
            }
            this.看场景4 = function(){
                _this.orbit.target = new THREE.Vector3().copy( _this.mapData.stage4.offset )
            }
            this.看球 = function(){
                _this.orbit.target = new THREE.Vector3().copy( _this.ballMesh.position )
            }
        };

        var gui = new dat.GUI();
        var ballOp = new ballOptions();
        var roadOp = new roadOptions();

        var folderBall = gui.addFolder( ballOp.name );
        folderBall.add(ballOp, '速度Z',this.ballOptions.minZ*10,0).onChange(function( value ){
            webgl.ballOptions.speedZ = value/10;
        });
        folderBall.add(ballOp, '速度X',this.ballOptions.minX*20,this.ballOptions.maxX*20).onChange(function( value ){
            webgl.ballOptions.speedX = value/20;
        });
        folderBall.add(ballOp, '暂停').onChange(function( value ){
            webgl.ballOptions.pause = value;
        });
        folderBall.add(ballOp, '提升性能').onChange(function( value ){
            if( value ){
                three.renderer.setPixelRatio( 1 )
            }else{
                three.renderer.setPixelRatio( window.devicePixelRatio )
            }
        });
        folderBall.add(ballOp, '回到起点').onChange(function(e){console.log("回到起点")});
        folderBall.add(ballOp, '出发').onChange(function(e){console.log("出发")});
        folderBall.add(ballOp, '左拐').onChange(function(e){console.log("左拐")});
        folderBall.add(ballOp, '右拐').onChange(function(e){console.log("右拐")});



        var folderRoad = gui.addFolder(roadOp.name);
        folderRoad.add(roadOp, '看场景1').onChange(function(e){console.log("看场景1")});
        folderRoad.add(roadOp, '看场景2').onChange(function(e){console.log("看场景2")});
        folderRoad.add(roadOp, '看场景3').onChange(function(e){console.log("看场景3")});
        folderRoad.add(roadOp, '看场景4').onChange(function(e){console.log("看场景4")});
        folderRoad.add(roadOp, '看球').onChange(function(e){console.log("看球")});

        // folderBall.open();
        // folderRoad.open();

        $("#gui").append(gui.domElement)
    }
    function initAxisHelper(){
        var helper = new THREE.AxisHelper(1000);
        three.scene.add( helper );
    }
    function initFps(){
        this.fps = three.getFps();
        document.getElementById("FPS").appendChild(this.fps.domElement);
    }
    function CurveTest(){
        //Create a closed wavey loop

        //Create a smooth 3d cubic bezier curve, defined by a start point, endpoint and two control points.
        // var curve = new THREE.CubicBezierCurve3(
        //     new THREE.Vector3( -10, 0, 0 ),
        //     new THREE.Vector3( -5, 15, 0 ),
        //     new THREE.Vector3( 20, 15, 0 ),
        //     new THREE.Vector3( 10, 0, 0 )
        // );

        //Create a smooth 3d spline curve from a series of points using the Catmull-Rom algorithm
        var curve = new THREE.CatmullRomCurve3( [
            new THREE.Vector3( 0, 0, 0 ),
            new THREE.Vector3( -1, 0, -1 ),
            new THREE.Vector3( 0, 0, -2 )
        ] );
        var geo = three.getCurveLineGeo( curve ,50 ,true)
        var material = new THREE.LineBasicMaterial( { color : 0xff0000 } );

        var line = new THREE.Line( geo, material );
        line.position.set(0,5,0)
        three.scene.add( line )
        this.curveLine1 = line;

        var start = new THREE.Vector3(0,0,0)
        var end = new THREE.Vector3(0,0,-200)
        var path = new THREE.CatmullRomCurve3( [start, end] );
        var geo = three.getCurveLineGeo( path ,50 ,true)
        var material = new THREE.LineBasicMaterial( { color : 0xff0000 } );
        var line = new THREE.Line( geo, material );
        line.position.set(0,5,0)
        three.scene.add( line )
        this.straightLine = line;

        var divisions = 49;
        var offset = new THREE.Vector3();
        var points = [];
        points = this.getPointsFromCurve( points, divisions, offset )


        geo = new THREE.Geometry()
        geo.vertices = points
        var material = new THREE.LineBasicMaterial( { color : 0x0000ff } );
        var line = new THREE.Line( geo, material );
        line.position.set( 0, 0, 0 ).add( offset )
        // line.rotation.x = Math.PI / 2
        three.scene.add( line )
        this.line = line

    }
    function createPlaneFloor( option ){

        var t = new THREE.Texture( main.ImageResult['floor'][0] )
        t.needsUpdate = true;
        var material = new THREE.MeshLambertMaterial({
            map:t,
            side:THREE.DoubleSide
        });

        var roadGroup = createRoadGeo( option.depth, option.segments, option.width, material );
        _this.road = roadGroup;
        three.scene.add( roadGroup )

        function createRoadGeo( depth, depthSegments, width, material ){

            var segment_depth = depth / depthSegments;

            var road = new THREE.Group();

            var g,mesh;

            for( var i = 0; i < depthSegments; i ++ ){

                g = three.getPlaneGeo({
                    width:width,
                    height:segment_depth
                });
                mesh = new THREE.Mesh( g, material )
                mesh.rotation.set( -Math.PI / 2, 0, 0 )
                mesh.position.set( 0, 0, -i * segment_depth-segment_depth/2 )
                road.add( mesh )

            }
            road.position.add( webgl.mapData[ webgl.mapData.stage ].offset )
            return road;

        }
    }
};
webgl.initCacheData = function(){
    var _this = this;
    var cache = _this.cacheData;
    for( var i = 1; i < 5; i ++ ){
        var stage = "stage" + i;
        var stageOption = _this.mapData[ stage ];

        cache[ stage ].left = createFBXGroup( stageOption, 'left' )
        cache[ stage ].right = createFBXGroup( stageOption, 'right' )
    }

    function createFBXGroup( option, dir ){
        var group = new THREE.Group();

        //bridge模型数量,生成直线
        var number = option.depth / _this.FBXData['bridge'].depth
        for( var i = 0; i < number; i ++ ){
            var model = _this.FBXData['bridge'].obj.clone();
            model.position.z = -i * _this.FBXData['bridge'].depth
            group.add( model )
        }

        //生成岔路
        if( option.index < 4 ){

            var branchFBX = _this.FBXData['branch'].obj.clone();
            var offset_inner = new THREE.Vector3().addVectors( option.end, new THREE.Vector3(0,0,0.5))
            branchFBX.position.add( offset_inner )
            group.add( branchFBX )

        }

        //加入房子
        if( option.index != 0 ){//0场景不需要加建筑
            var data = stageOption[ dir ]

            //补全道路尾部
            if( dir == "left" ){
                right_fbx = _this.FBXData['curve'].obj[1].clone()
                // right_fbx.rotateZ( -Math.PI )
                right_fbx.rotateY( Math.PI / 2 )
                right_fbx.position.add( new THREE.Vector3(_this.mapData.curveR+4,0,_this.mapData.curveR) )
                group.add( right_fbx )
            }else if( dir == "right" ){
                right_fbx = _this.FBXData['curve'].obj[1].clone()
                right_fbx.rotateZ( Math.PI )
                right_fbx.rotateX( Math.PI )
                right_fbx.position.add( new THREE.Vector3(0,0,0) )
                group.add( right_fbx )
            }

            //生成配置的建筑
            for( var name in data ){
                var t,isStone = false;
                var scale,position
                if( name == "stone" ){
                    t = _this.mapData.stoneTexture
                }else{
                    t = data[ name ].texture;
                }
                // var m = new THREE.SpriteMaterial( { map:t } )
                // var sprite = new THREE.Sprite( m )
                // sprite.scale.copy( data[ name ].scale )
                // group.add( sprite )
                if( name == "stone" ){
                    isStone = true
                    scale = new THREE.Vector3().copy( data[ name ].scale ).multiplyScalar( 0.1 )
                    // data[ name ].scale.multiplyScalar( 0.1 )

                }else{
                    if( data[ name ].multiply ){
                        scale = new THREE.Vector3().copy( data[ name ].scale ).multiplyScalar( data[ name ].multiply )
                    }else{
                        scale = new THREE.Vector3().copy( data[ name ].scale ).multiplyScalar( 0.1 )
                    }

                    // data[ name ].scale.multiplyScalar( 0.2 )
                }

                var g = three.getPlaneGeo({
                    width:scale.x,
                    height:scale.y,

                })
                var m = new THREE.MeshBasicMaterial( {
                    map : t,
                    transparent : true,
                    side : THREE.DoubleSide,
                    // depthWrite:false,
                } )
                var mesh = new THREE.Mesh( g, m )
                mesh.position.copy( data[ name ].position )
                group.add( mesh )
            }
        }

        return group;
    }
}

//初始化用到的方法
webgl.reset = function(){
    this.ballMesh.position.set(0,this.ballOptions.ballRadius,0 )
    this.ballOptions.speedX = 0;
    this.ballOptions.speedZ = 0;

    this.setCameraFollowBall()
    //set gameState
    this.gameState = this.state.wait;
};//重置小球
webgl.start = function(){
    this.gameState = this.state.startFrom0;
    var _this = this;
    var obj = this.ballOptions;
    _this.gravity.allow = true;
    TweenMax.to(obj,1,{speedZ:obj.startSpeedZ,onComplete:function(){
        _this.gameState = _this.state.stage0;
    }})
};//球出发
webgl.slowDown = function( callback ){
    var _this = this;
    var obj = this.ballOptions;
    if( callback == undefined ){
        callback = function(){
            console.log("减速停下")
        }
    }

    TweenMax.to(obj,1,{speedZ:0,speedX:0,onComplete:function(){
        _this.gameState = _this.state.waitChose;
    },onComplete:callback})
}//球减速
webgl.initBall = function(){

    var option = this.ballOptions;

    var g = three.getSphereGeometry({
        R:option.ballRadius,
        Ws:32,
        Hs:16
    });

    var t = option.texture[ vm.userData.sex ]
    var m = new THREE.MeshPhongMaterial({map:t,transparent:true})
    var mesh = new THREE.Mesh( g, m )

    mesh.position.set( option.startPosition.x, option.startPosition.y, option.startPosition.z )

    three.scene.add( mesh )
    this.ballMesh = mesh;


    var _this = this;
    // setTimeout(function(){
    //     var preV = 0;
    //     var v = 0;
    //     var z = mesh.position.z;
    //     var preZ = mesh.position.z;
    //     _this.gameState = _this.state.enter;
    //     TweenMax.to(mesh.position,2,{z:0,onUpdate:function( a ){
    //         z = a.z
    //         var v = z-preZ
    //         preZ = z
    //         webgl.ballOptions.speedZ = v
    //         preV = v
    //     },onUpdateParams:[mesh.position],onComplete:function(){
    //         _this.gameState = _this.state.wait;
    //     }})
    // },1000)

    var destination = new THREE.Vector3().addVectors( _this.ballOptions.startPosition,new THREE.Vector3(0,0,-70))
    _this.gameState = _this.state.enter;
    setTimeout( function () {
        _this.ballScrollTo( destination, 2, function(){
            _this.gameState = _this.state.wait;
            _this.start()
        } )
    }, 1000)


};

//复用方法
webgl.getPointsFromCurve = function ( points, divisions, offset ) {

    for( var i = 0; i < divisions; i ++ ){
        var point = new THREE.Vector3().copy( curveTool.getPointAt( (i / divisions), 1, 100, true ) )
        point.add( offset )
        points.push( point )
    }

    return points;
}//生成points数组
webgl.getRoadData = function( start ){

};
webgl.createNextRoadWithFBX = function(){
    var _this = this;
    var stage = this.mapData.stage,order = stage.slice( -1 );
    var stageOption = this.mapData[ stage ];

    //弯道数据更新
    if( order != 0 ){
        _this.runData = _this.curvesData[ _this.curveType ]
        // if( this.debug ){
        //     geo = new THREE.Geometry()
        //     geo.vertices = this.runData.points
        //     var material = new THREE.LineBasicMaterial( { color : 0x0000ff } );
        //     var line = new THREE.Line( geo, material );
        //     line.position.set( 0, 0, 0 ).add( this.mapData[ this.mapData.preStage ].g_end )
        //     three.scene.add( line )
        //     this.line = line
        // }
    }

    //弯道视图更新
    var number = stageOption.depth / _this.FBXData['bridge'].depth

    var group = new THREE.Group();

    //直线
    for( var i = 0; i < number; i ++ ){
        var model = _this.FBXData['bridge'].obj.clone();
        model.position.add( new THREE.Vector3( 0, 0, -i * _this.FBXData['bridge'].depth ) )
        group.add( model )
    }

    //左右岔路
    if( order < 4 ){
        // 左岔路
        // var left_fbx = _this.FBXData['curve'].obj[0].clone();
        // var offset_inner = new THREE.Vector3().copy( stageOption.end )
        // offset_inner.add( new THREE.Vector3(-240,0,0))
        // left_fbx.position.add( offset_inner )
        // group.add( left_fbx )

        // 右岔路
        // var right_fbx = _this.FBXData['curve'].obj[1].clone();
        // offset_inner.add( new THREE.Vector3(240,0,0) )
        // right_fbx.position.add( offset_inner )
        // group.add( right_fbx )
        // group.position.add( stageOption.offset )

        var branchFBX = _this.FBXData['branch'].obj.clone();
        var offset_inner = new THREE.Vector3().addVectors( stageOption.end, new THREE.Vector3(0,0,0.5))
        branchFBX.position.add( offset_inner )
        group.add( branchFBX )

    }

    //道路偏移
    group.position.add( stageOption.offset )


    //加入房子
    if( order != 0 ){//0场景不需要加建筑
        var direction = _this.curveType;
        var data = stageOption[ direction ]

        //补全道路尾部
        if( direction == "left" ){
            right_fbx = _this.FBXData['curve'].obj[1].clone()
            // right_fbx.rotateZ( -Math.PI )
            right_fbx.rotateY( Math.PI / 2 )
            right_fbx.position.add( new THREE.Vector3(_this.mapData.curveR+4,0,_this.mapData.curveR) )
            group.add( right_fbx )
        }else if( direction == "right" ){
            right_fbx = _this.FBXData['curve'].obj[1].clone()
            right_fbx.rotateZ( Math.PI )
            right_fbx.rotateX( Math.PI )
            right_fbx.position.add( new THREE.Vector3(0,0,0) )
            group.add( right_fbx )
        }

        //生成配置的建筑
        for( var name in data ){
            var t,isStone = false;
            var scale,position
            if( name == "stone" ){
                t = _this.mapData.stoneTexture
            }else{
                t = data[ name ].texture;
            }
            // var m = new THREE.SpriteMaterial( { map:t } )
            // var sprite = new THREE.Sprite( m )
            // sprite.scale.copy( data[ name ].scale )
            // group.add( sprite )
            if( name == "stone" ){
                isStone = true
                scale = new THREE.Vector3().copy( data[ name ].scale ).multiplyScalar( 0.1 )
                // data[ name ].scale.multiplyScalar( 0.1 )

            }else{
                if( data[ name ].multiply ){
                    scale = new THREE.Vector3().copy( data[ name ].scale ).multiplyScalar( data[ name ].multiply )
                }else{
                    scale = new THREE.Vector3().copy( data[ name ].scale ).multiplyScalar( 0.1 )
                }

                // data[ name ].scale.multiplyScalar( 0.2 )
            }

            var g = three.getPlaneGeo({
                width:scale.x,
                height:scale.y,

            })
            var m = new THREE.MeshBasicMaterial( {
                map : t,
                transparent : true,
                side : THREE.DoubleSide,
                // depthWrite:false,
            } )
            var mesh = new THREE.Mesh( g, m )
            mesh.position.copy( data[ name ].position )
            group.add( mesh )
        }
    }


    stageOption.roadFBXGroup = group;
    three.scene.add( group )

    //根据当前stage生成向左和向右的两条曲线，在用户选择后，确定使用哪一条
    function updateCurvesData( divisions, R ){

        var left_points = [];
        var right_points = [];
        var t,quadrant = 0,Clockwise;


        var offset = new THREE.Vector3();
        var offset1 = new THREE.Vector3().copy ( stageOption.end );

        for( var qn = 4; quadrant < qn; quadrant ++ ){

            switch( quadrant ){
                case 0:
                    offset.set( -R, 0, 0 )
                    Clockwise = false
                    break;
                case 1:
                    offset.set( R, 0, 0 )
                    Clockwise = true
                    break;
                case 2:
                    offset.set( -R, 0, - 2 * R )
                    Clockwise = true
                    break;
                case 3:
                    offset.set( R, 0, - 2 * R )
                    Clockwise = false
                    break;
            }
            offset.add( offset1 )
            for( var i = 0; i <= divisions; i ++ ){
                t = i / divisions;
                var point = new THREE.Vector3().copy( curveTool.getPointAt( t, quadrant, R, Clockwise, offset ) )

                if( quadrant == 0 || quadrant == 2){
                    left_points.push( point )
                }

                if( quadrant == 1 || quadrant == 3){
                    right_points.push( point )
                }

            }

        }

        _this.curvesData.left = new THREE.CatmullRomCurve3( left_points )
        _this.curvesData.right = new THREE.CatmullRomCurve3( right_points )

    }

}
webgl.putRoadOnRightPosition = function(){
    this.runData = this.curvesData[ this.curveType ]
    var stage = this.mapData.stage
    var stageOption = this.mapData[ stage ]

    stageOption.roadFBXGroup.position.add( stageOption.offset )
    three.scene.add( stageOption.roadFBXGroup )
}
webgl.updateCurvesData = function( divisions, R ){

    var _this = this;
    var stage = this.mapData.stage,order = stage.slice( -1 );
    var stageOption = this.mapData[ stage ];

    var left_points = [];
    var right_points = [];
    var t,quadrant = 0,Clockwise;

    //象限内偏移
    var offset = new THREE.Vector3();

    //全局偏移
    var offset1 = new THREE.Vector3().copy ( stageOption.g_end );

    for( var qn = 4; quadrant < qn; quadrant ++ ){

        switch( quadrant ){
            case 0:
                offset.set( -R, 0, 0 )
                Clockwise = false
                break;
            case 1:
                offset.set( R, 0, 0 )
                Clockwise = true
                break;
            case 2:
                offset.set( -R, 0, - 2 * R )
                Clockwise = true
                break;
            case 3:
                offset.set( R, 0, - 2 * R )
                Clockwise = false
                break;
        }
        offset.add( offset1 )
        for( var i = 0; i <= divisions; i ++ ){
            t = i / divisions;
            var point = new THREE.Vector3().copy( curveTool.getPointAt( t, quadrant, R, Clockwise, offset ) )

            if( quadrant == 0 || quadrant == 2){
                left_points.push( point )
            }

            if( quadrant == 1 || quadrant == 3){
                right_points.push( point )
            }

        }

    }

    _this.curvesData.left = new THREE.CatmullRomCurve3( left_points )
    _this.curvesData.right = new THREE.CatmullRomCurve3( right_points )

}
webgl.updateNextMapInfo = function(){

    //更新mapData.stage
    //更新新的stage的全局offset
    //更新新的stage的全局g_distance

    var nowStage = this.mapData.stage;
    var nowN = parseInt( nowStage.slice( -1 ) );
    var nextN = nowN + 1;
    nextStage = "stage" + nextN;

    this.mapData.preStage = nowStage;
    this.mapData.stage = nextStage;

    var type = this.curveType;
    var offsetR;
    if( type == "left" ){
        offsetR = new THREE.Vector3( -2 * this.mapData.curveR, 0, -2 * this.mapData.curveR )
    }else if( type == "right" ){
        offsetR = new THREE.Vector3( 2 * this.mapData.curveR, 0, -2 * this.mapData.curveR )
    }

    //update nextStage.offset
    this.mapData[ nextStage ].offset.addVectors( this.mapData[ nowStage ].g_end, offsetR )
    var global_offset = this.mapData[ nextStage ].offset

    //update nextStage.g_distance
    this.mapData[ nextStage ].g_distance.addVectors( this.mapData[ nextStage ].distance, global_offset )

    //update nextStage.g_end
    this.mapData[ nextStage ].g_end.addVectors( this.mapData[ nextStage ].end, global_offset )

    //update stone.g_position
    this.mapData[ nextStage ][ type ].stone.g_position.addVectors( global_offset, this.mapData[ nextStage ][ type ].stone.position )

};

webgl.ballScrollTo = function( destination, duration, callback ){

    var v = new THREE.Vector3( 0, 0, 0 );

    var position = this.ballMesh.position;
    var prePos = new THREE.Vector3( 0, 0, 0 ).copy( position );

    TweenMax.to(position, duration, { x:destination.x, z:destination.z, onUpdate:function( v3 ){
        v.subVectors( position, prePos )
        webgl.ballOptions.speedX = v.x;
        webgl.ballOptions.speedZ = v.z;
        prePos.copy( position )
    },onUpdateParams:[position],onComplete:callback})

}

webgl.addEarth = function(){
    var group = new THREE.Group();
    group.scale.set(0,0,0);
    group.position.set(0,50,-200)
    group.rotation.y = 2*Math.PI
    var material = new THREE.MeshPhongMaterial({
        map:three.loadTexture({
            url:this.assetsUrl+"models/scene/planet.png",
        }),
        normalMap:three.loadTexture({
            url:this.assetsUrl+"models/scene/normal_planet.png",
        }),
        shininess:20,
        emissive:0x111111,
        emissiveIntensity:0,
    });
    this.planet.material = material;

    group.add(this.planet)

    // var material1 = new THREE.MeshPhongMaterial({
    //                     map:three.loadTexture({
    //                         url:"assets/models/scene/stone1.png",
    //                     }),
    //                     normalMap:three.loadTexture({
    //                         url:"assets/models/scene/normal_stone1.png",
    //                     }),
    //                     shininess:30,

    //                 });
    // this.stone1.material = material1;
    // group.add( this.stone1 );

    // var material2 = new THREE.MeshPhongMaterial({
    //                 map:three.loadTexture({
    //                     url:"assets/models/scene/stone2.png",
    //                 }),
    //                 normalMap:three.loadTexture({
    //                     url:"assets/models/scene/normal_stone2.png",
    //                 }),
    //                 shininess:0,
    //             });
    // this.stone2.material = material2;
    // group.add( this.stone2 );

    var material3 = new THREE.MeshLambertMaterial({
        color:"white",
        map:three.loadTexture({
            url:this.assetsUrl+"models/scene/ls/1.png",
        }),
        side:THREE.DoubleSide,
        depthWrite:false,
        transparent:true,
        opacity:0.8
    });
    this.liusu_up.material = material3;
    this.liusu_up.scale.set(1.01,1.01,1.01)
    this.liusu_up.rotation.set(2,2,2)

    group.add( this.liusu_up )

    var material4 = new THREE.MeshLambertMaterial({
        color:"white",
        map:three.loadTexture({
            url:this.assetsUrl+"models/scene/ls/1.png",
        }),
        side:THREE.DoubleSide,
        depthWrite:false,
        transparent:true,
        opacity:0.8
    });
    this.liusu_center.material = material4;
    this.liusu_center.scale.set(1.01,1.01,1.01)
    this.liusu_center.rotation.set(1.01,1.01,1.01)
    group.add(this.liusu_center);


    // group.add(cloudMesh);
    this.earthGroup = group;
    three.scene.add(group);

    for(point in this.PointData){
        var points = this.PointData;
        var point = points[point];

        point.texture= three.loadTexture({
            url:point.texture
        })

        var RedPoint2 = new THREE.Sprite(new THREE.SpriteMaterial({map:point.texture,depthWrite:false}))

        RedPoint2.position.set( point.position.x, point.position.y, point.position.z )
        RedPoint2.scale.set(point.width*1.3,point.width*1.3,1)
        group.add(RedPoint2);
        RedPoint2.name = point.name;
        point.obj = RedPoint2;
    }
};//加地球
webgl.addStars = function(){
    var texture = three.loadTexture({
        url:this.picUrl+"star2.png"
    })
    var mat = new THREE.SpriteMaterial({
        map:texture,
        transparent:true,
        depthWrite:false,
    });

    this.stars = new THREE.Group();
    for(var i=0;i<200;i++){
        var axis = parseInt(Math.random()*3)
        switch(axis){
            case 0:
                var x = THREE.Math.randFloat( 800,1000 )
                var y = THREE.Math.randFloat( 0,1000 )
                var z = THREE.Math.randFloat( 0,1000 )
                break;
            case 1:
                var x = THREE.Math.randFloat( 0,1000 )
                var y = THREE.Math.randFloat( 800,1000 )
                var z = THREE.Math.randFloat( 0,1000 )
                break;
            case 2:
                var x = THREE.Math.randFloat( 0,1000 )
                var y = THREE.Math.randFloat( 0,1000 )
                var z = THREE.Math.randFloat( 800,1000 )
                break;
        }


        var flag = (Math.random()-0.5)>0?1:-1
        x*=flag;
        flag = (Math.random()-0.5)>0?1:-1
        y*=flag;
        flag = (Math.random()-0.5)>0?1:-1
        z*=flag;



        var sprite = new THREE.Sprite(mat);
        var rand = THREE.Math.randFloat(30,50)
        sprite.scale.set(rand,rand,1);
        sprite.position.set(x,y,z);
        this.stars.add(sprite);
    }
    three.scene.add(this.stars);
};//加星星
webgl.addSky = function(){
    var skyMesh = three.getSkyByCubeGeo({
        size:2048,
    });
    this.sky = skyMesh;

    three.scene.add(skyMesh);

    // var texture = three.loadTexture({
    //     url:main.picUrl+"sky.jpg"
    // })
    // var sky = three.getSkyBySphere({
    //     R:4096,
    //     Ws:8,
    //     Hs:8,
    //     texture:texture
    // })
    // this.sky = sky
    // three.scene.add( sky );

};//加天空
webgl.StraightRoad = function(path,divisions){

   THREE.bufferGeometry.call( this );

   //scope
    var _this = this;

    //nowPoint
    var point = new THREE.Vector3();

    //shape
    var steps = [
        new THREE.Vector3(-6,3,0),
        new THREE.Vector3(-5,2,0),
        new THREE.Vector3(5,2,0),
        new THREE.Vector3(6,3,0),
    ];

    var vertexCount = divisions*steps.length;

    var positions = new THREE.BufferAttribute( new Float32Array( vertexCount * 3 ), 3 );
    var normals = new THREE.BufferAttribute( new Float32Array( vertexCount * 3 ), 3 );
    var uvs = new THREE.BufferAttribute( new Float32Array( vertexCount * 2 ), 2 )


   function createShape( shape, offset ){
        for(var j=0, jl=shape.length; j < jl; j ++ ){

        }
   }
   for(var i=0, il = divisions; i < il; i ++ ){
       point = path.getPointAt( i / il )
       createShape( steps, 0 )
   }

   this.addAttribute('position',positions)
   this.addAttribute('normals',normals)
   this.addAttribute('uvs',uvs)

};//直线道路
webgl.StraightRoad.prototype = Object.create( THREE.BufferGeometry.prototype );
webgl.CurveRoad = function(curve,divisions){
    THREE.BufferGeometry.call( this );

    var vertices = [];
    var normals = [];
    var colors = [];

    //沿着Y轴正方向的单位向量
    var up = new THREE.Vector3( 0, 1, 0 );

    //向前的向量
    var forward = new THREE.Vector3(0,0,-1);

    //向右的向量
    var right = new THREE.Vector3(1,0,0);

    //四元数+变化四元数
    var quaternion = new THREE.Quaternion();
    var prevQuaternion = new THREE.Quaternion();

    var PI2 = Math.PI * 2;

    for(var i =0,il = divisions;i<il;i++){

    }

    this.addAttribute( 'position', new THREE.BufferAttribute( new Float32Array( vertices ), 3 ) );
    this.addAttribute( 'normal', new THREE.BufferAttribute( new Float32Array( normals ), 3 ) );
    this.addAttribute( 'color', new THREE.BufferAttribute( new Float32Array( colors ), 3 ) );
}//弯道

webgl.updateStar = function(){
    var number = this.stars.children.length;
    for(var i=0;i<number;i++){
        var rand = parseInt(10*Math.random());
        TweenMax.fromTo(this.stars.children[i].material,1,{opacity:1},{opacity:0,repeat:-1,yoyo:true})
    }
};

webgl.updateTexture = function(){

    this.liusu_center.material.map = this.earthChangeTexture[this.textureIndex];
    this.liusu_up.material.map = this.earthChangeTexture[this.textureIndex];
    this.liusu_center.material.needsUpdate = true;
    this.liusu_up.material.needsUpdate = true;

    this.liusu_center.rotation.x+=0.001;
    this.liusu_center.rotation.y+=0.001;
    this.liusu_center.rotation.z+=0.001;

    this.liusu_up.rotation.x+=0.001;
    this.liusu_up.rotation.y+=0.001;
    this.liusu_up.rotation.z+=0.001;

    if(this.textureIndex<this.earthChangeTexture.length-1){
        this.textureIndex++;
    }else{
        this.textureIndex = 0;
    }

};
webgl.ballRender = function(){

        //Update ball position
        var speedX  = this.ballOptions.speedX;
        var speedZ  = this.ballOptions.speedZ;

        this.ballMesh.position.z += speedZ;
        this.ballMesh.position.x += speedX;

        // Update ball rotation.
        var tempMat = new THREE.Matrix4();
        tempMat.makeRotationAxis(new THREE.Vector3(0,0,1), -speedX/this.ballOptions.ballRadius);
        tempMat.multiply(this.ballMesh.matrix);
        this.ballMesh.matrix = tempMat;

        tempMat = new THREE.Matrix4();
        tempMat.makeRotationAxis(new THREE.Vector3(1,0,0), speedZ/this.ballOptions.ballRadius);
        tempMat.multiply(this.ballMesh.matrix);
        this.ballMesh.matrix = tempMat;
        this.ballMesh.rotation.setFromRotationMatrix(this.ballMesh.matrix);

};
webgl.getViewSpeed = function(){
    var range = 100
    this.ballOptions.viewSpeedZ =Math.abs( this.ballOptions.speedZ ) / ( this.ballOptions.maxZ - this.ballOptions.minZ ) * range
};
webgl.calCollision = function(){
    var scope = this;
    var left_distance = calEdge( this.ballMesh.position.x );

    //z方向速度范围
    var range = [ this.ballOptions.minZ, this.ballOptions.maxZ ]

    if( left_distance < 5 ){
        this.ballOptions.speedZ = ( left_distance / 5 ) * ( range[0] - range[1] ) + this.ballOptions.maxZ;

        //x方向速度最小为0
        if( calEdge( this.ballMesh.position.x + this.ballOptions.speedX ) < 0 ){
            this.ballOptions.speedX = 0;
        }
    }else{
        this.ballOptions.speedZ = ( range[0] - range[1] ) * this.ballOptions.energy + this.ballOptions.maxZ
    }

    // 球的外边缘 相距 道路两侧 的距离
    function calEdge( x ){
        var distance;
        var roadWidth = scope.roadOptions.width;

        //路宽度 / 2 - 距离中点的绝对值
        distance = ( roadWidth / 2 ) - Math.abs( x - scope.mapData[ scope.mapData.stage ].offset.x )
        distance -= scope.ballOptions.ballRadius;
        return distance
    }
};
webgl.testStone = function(){
    var stage = this.mapData.stage
    var direction = this.curveType
    var stoneOption = this.mapData[ stage ][ direction ].stone

    var stonePos = stoneOption.position

    var testX = false
    var testZ = false
    if( (this.ballMesh.position.z > stoneOption.g_position.z ) && (this.ballMesh.position.z + this.ballOptions.speedZ < stoneOption.g_position.z) ){
        testZ = true
    }
    if( Math.abs(this.ballMesh.position.x - stoneOption.g_position.x) < stoneOption.halfWidth ){
        testX = true
    }

    if( testZ && testX ){
        this.gameState = this.state.bump
        this.ballOptions.energy = 0;
        TweenMax.fromTo( this.ballMesh.material ,0.5,{opacity:0},{ opacity:1,yoyo:true,repeat:6})
        TweenMax.to( this.ballOptions,1,{ energy:1,onComplete:function(){
            webgl.gameState = webgl.state [ webgl.mapData.stage ]
        }})
    }


}
webgl.setCameraFollowBall = function(){
    three.camera.position.x = this.ballMesh.position.x
    three.camera.position.z = this.ballMesh.position.z+70
};
webgl.setCameraPositionOnCurve = function( t ){

    //update position
    var position = this.runData.getPoint( t )
    three.camera.position.x = position.x
    three.camera.position.z = position.z

    //update rotation
    var v = new THREE.Vector3().subVectors( this.ballMesh.position, three.camera.position )

};
webgl.runCurve = function( callback ){
    var _this = this;
    var obj = {
        t:0
    }
    if( callback == undefined ){
        callback = function(){}
    }

    var v = new THREE.Vector3()
    var prePos = new THREE.Vector3().copy( this.ballMesh.position )
    var position = new THREE.Vector3().copy( prePos );

    var T = TweenMax.to( obj,4,{t:1,onUpdate:function( obj ){
        if( obj.t > 0.1 ){
            _this.cameraT = obj.t - 0.1
        }else{
            _this.cameraT = 0
        }
        position.copy( _this.runData.getPoint( obj.t ) )
        v.subVectors( position, prePos )
        _this.ballOptions.speedX = v.x
        _this.ballOptions.speedZ = v.z

        prePos.copy( position )

    },onUpdateParams:[obj],onComplete:callback} )

};

webgl.render = function(){
    var _this = this;
    this.clock.startTime = Date.now();
    if(this.clock.startTime - this.clock.oldTime >50) {
        this.clock.oldTime = this.clock.startTime;
    }

    if( !this.ballOptions.pause ){
        switch( this.gameState ){
            case "init":
                break;
            case "enter":
                this.ballRender();
                this.getViewSpeed();
                break;
            case "wait":
                break;
            case "startFrom0":
                this.ballRender();
                this.getViewSpeed()
                this.setCameraFollowBall()
                break;
            case "stage0":
                this.ballRender();
                this.getViewSpeed()
                this.setCameraFollowBall()
                if( this.ballMesh.position.z <= this.mapData.stage0.g_distance.z ){
                    this.gravity.allow = false
                    this.ballScrollTo(new THREE.Vector3().copy( this.mapData.stage0.g_end ), 3, function(){
                        _this.gameState = _this.state.waitChose;
                        $(".arrow-box1").fi();
                    })
                    this.gameState = this.state.slowDown
                }
                break;
            case "stage1":
                this.ballRender();
                this.getViewSpeed();
                this.setCameraFollowBall();
                if( this.ballMesh.position.z <= this.mapData.stage1.g_distance.z ){
                    this.gravity.allow = false
                    this.ballScrollTo(new THREE.Vector3().copy( this.mapData.stage1.g_end ), 3, function(){
                        _this.gameState = _this.state.waitChose
                        $(".arrow-box2").fi();
                    })
                    this.gameState = this.state.slowDown
                }
                this.testStone()
                break;
            case "slowDown":
                this.ballRender();
                this.getViewSpeed()
                this.setCameraFollowBall()
                break;
            case "stage2":
                this.ballRender();
                this.getViewSpeed();
                this.setCameraFollowBall();
                if( this.ballMesh.position.z <= this.mapData.stage2.g_distance.z ){
                    this.gravity.allow = false
                    this.ballScrollTo(new THREE.Vector3().copy( this.mapData.stage2.g_end ), 3, function(){
                        _this.gameState = _this.state.waitChose
                        $(".arrow-box3").fi();
                    })
                    this.gameState = this.state.slowDown
                }
                this.testStone()
                break;
            case "stage3":
                this.ballRender();
                this.getViewSpeed();
                this.setCameraFollowBall();
                if( this.ballMesh.position.z <= this.mapData.stage3.g_distance.z ){
                    this.gravity.allow = false
                    this.ballScrollTo(new THREE.Vector3().copy( this.mapData.stage3.g_end ), 3, function(){
                        _this.gameState = _this.state.waitChose
                        $(".arrow-box4").fi();
                    })
                    this.gameState = this.state.slowDown
                }
                break;
            case "stage4":
                this.ballRender();
                this.getViewSpeed();
                this.setCameraFollowBall();
                if( this.ballMesh.position.z <= this.mapData.stage4.g_distance.z ){
                    this.gravity.allow = false
                    this.ballScrollTo(new THREE.Vector3().copy( this.mapData.stage4.g_end ), 3, function(){
                        _this.gameState = _this.state.end
                    })
                    this.gameState = this.state.slowDown
                }
                break;
            case "stage5":
                break;
            case "waitChose":
                break;
            case "runCurve":
                this.ballRender();

                // if( three.camera.position.z > _this.mapData[ _this.mapData.stage ].end.z ){
                //     three.camera.position.z-=1
                //     three.camera.lookAt( new THREE.Vector3().addVectors( _this.ballMesh.position, new THREE.Vector3(0,20,0)) )
                // }else{
                //     _this.setCameraPositionOnCurve( _this.cameraT )
                //     three.camera.lookAt( new THREE.Vector3().addVectors( _this.ballMesh.position, new THREE.Vector3(0,20,0)) )
                // }
                _this.setCameraPositionOnCurve( _this.cameraT )
                three.camera.lookAt( new THREE.Vector3().addVectors( _this.ballMesh.position, new THREE.Vector3(0,20,0)) )

                break;
            case "bump":
                this.ballRender();
                this.getViewSpeed()
                this.setCameraFollowBall()
                break;
            case "end":
                main.stopRender()
                main.gameEnd()
                break;
        }
    }



    if(this.fps){
        this.fps.update();
    }
};

var main = new function(){

    //程序已经开始
    this.isStart = false
    //查看过结果页
    this.haveGetResult = false
    this.touch ={
        ScrollObj:undefined,
        isScroll:false,
        limitUp:0,
        limitDown:undefined,
        overlimit:false,
        lastX:0,
        lastY:0,
        newX:0,
        newY:0,
        delta_X:0,
        delta_Y:0,
        scrollY:0,
        touchAllow:true,
        fingerNumber:0,
        distance:0,
        angle:0,
        delta_angle:0,
        time:0,
        offsetTime:0,
    };

    this.bgm ={
        obj:document.getElementById("bgm"),
        id:"bgm",
        isPlay:false,
        button:$(".music-btn")
    };
    this.V = {//视频
        id:"video",
        currentTime:0,
        isPlay:false,
        obj:document.getElementById("video")
    };

    this.assetsUrl = "assets/";
    this.picUrl = this.assetsUrl + "images/";//图片路径
    this.modelUrl = this.assetsUrl + "models/"

    this.ImageList1 = [
        //number
        {
            url:this.picUrl+"p1_02.png",
            group:"number"
        },
        {
            url:this.picUrl+"p1_03.png",
            group:"number"
        },
        {
            url:this.picUrl+"p1_04.png",
            group:"number"
        },
        {
            url:this.picUrl+"p1_05.png",
            group:"number"
        },
        {
            url:this.picUrl+"p1_06.png",
            group:"number"
        },
        {
            url:this.picUrl+"p1_07.png",
            group:"number"
        },
        {
            url:this.picUrl+"p1_08.png",
            group:"number"
        },
        {
            url:this.picUrl+"p1_09.png",
            group:"number"
        },
        {
            url:this.picUrl+"p1_10.png",
            group:"number"
        },
        {
            url:this.picUrl+"p1_11.png",
            group:"number"
        },
    ]
    this.ImageResult1 = {};

    this.ImageList2 = [
        // {
        //     url:this.picUrl+"ball.png",
        //     group:"ball"
        // },
        // {
        //     url:this.picUrl+"boy.jpg",
        //     group:"boy"
        // },
        // {
        //     url:this.picUrl+"girl.jpg",
        //     group:"girl"
        // },
        {
            url:this.picUrl+"testBoy.png",
            group:"boy"
        },
        {
            url:this.picUrl+"testGirl.jpg",
            group:"girl"
        },
        {
            url:this.picUrl+"floor.jpg",
            group:"floor"
        },
        {
            url:this.modelUrl+"bridge.jpg",
            group:"bridgeSkin"
        },
        {
            url:this.picUrl+"bg.jpg",
            group:"1"
        },
        {
            url:this.picUrl+"stone.png",
            group:"stone"
        },
        {
            url:this.picUrl+"pf.jpg",
            group:"skin"
        },


        //stage1 left
        {
            url:this.picUrl+"stage1/p2_img_1.png",
            group:"stage1",
            name:"left_grass",
            direction:"left"
        },
        {
            url:this.picUrl+"stage1/p2_img_2.png",
            group:"stage1",
            name:"right_grass",
            direction:"left"
        },
        {
            url:this.picUrl+"stage1/p2_img_3.png",
            group:"stage1",
            name:"left_build1",
            direction:"left"
        },
        {
            url:this.picUrl+"stage1/p2_img_4.png",
            group:"stage1",
            name:"right_build2",
            direction:"left"
        },
        {
            url:this.picUrl+"stage1/p2_img_5.png",
            group:"stage1",
            name:"left_build2",
            direction:"left"
        },
        {
            url:this.picUrl+"stage1/p2_img_6.png",
            group:"stage1",
            name:"right_build1",
            direction:"left"
        },
        {
            url:this.picUrl+"stage1/p2_img_7.png",
            group:"stage1",
            name:"left_build3",
            direction:"left"
        },
        {
            url:this.picUrl+"stage1/p2_img_8.png",
            group:"stage1",
            name:"left_build4",
            direction:"left",
        },
        {
            url:this.picUrl+"stage1/scenebg0.jpg",
            group:"stage1",
        },


        //stage1 right
        {
            url:this.picUrl+"stage1/p3_img_1.png",
            group:"stage1",
            name:"left_build1",
            direction:"right",
        },
        {
            url:this.picUrl+"stage1/p3_img_3.png",
            group:"stage1",
            name:"left_build2",
            direction:"right",
        },
        {
            url:this.picUrl+"stage1/p3_img_4.png",
            group:"stage1",
            name:"left_build3",
            direction:"right",
        },
        {
            url:this.picUrl+"stage1/p3_img_5.png",
            group:"stage1",
            name:"left_cow",
            direction:"right",
        },
        {
            url:this.picUrl+"stage1/p3_img_2.png",
            group:"stage1",
            name:"left_tree1",
            direction:"right",
        },
        {
            url:this.picUrl+"stage1/p3_img_6.png",
            group:"stage1",
            name:"right_build1",
            direction:"right",
        },
        {
            url:this.picUrl+"stage1/p3_img_7.png",
            group:"stage1",
            name:"right_tree1",
            direction:"right",
        },
        {
            url:this.picUrl+"stage1/p3_img_8.png",
            group:"stage1",
            name:"right_build2",
            direction:"right",
        },
        {
            url:this.picUrl+"stage1/p3_img_9.png",
            group:"stage1",
            name:"left_grass",
            direction:"right",
        },
        {
            url:this.picUrl+"stage1/p3_img_bg.jpg",
            group:"stage1",
        },

        //stage2 left
        {
            url:this.picUrl+"stage2/p4_img_1.png",
            group:"stage2",
            name:"left_grass",
            direction:"left",
        },
        {
            url:this.picUrl+"stage2/p4_img_1_1.png",
            group:"stage2",
            name:"left_stone",
            direction:"left",
        },
        {
            url:this.picUrl+"stage2/p4_img_2.png",
            group:"stage2",
            name:"right_grass",
            direction:"left",
        },
        {
            url:this.picUrl+"stage2/p4_img_3.png",
            group:"stage2",
            name:"left_people",
            direction:"left",
        },
        {
            url:this.picUrl+"stage2/p4_img_4.png",
            group:"stage2",
            name:"left_build1",
            direction:"left",
        },
        {
            url:this.picUrl+"stage2/p4_img_5.png",
            group:"stage2",
            name:"left_build2",
            direction:"left",
        },
        {
            url:this.picUrl+"stage2/p4_img_6.png",
            group:"stage2",
            name:"right_build1",
            direction:"left",
        },
        {
            url:this.picUrl+"stage2/p4_img_7.png",
            group:"stage2",
            name:"right_build2",
            direction:"left",
        },
        {
            url:this.picUrl+"stage2/p4_img_8.png",
            group:"stage2",
            name:"right_build3",
            direction:"left",
        },
        {
            url:this.picUrl+"stage2/p4_img_bg.jpg",
            group:"stage2",
        },

        //stage2 right
        {
            url:this.picUrl+"stage2/p5_img_1.png",
            group:"stage2",
            name:"left_grass",
            direction:"right",
        },
        {
            url:this.picUrl+"stage2/p5_img_2.png",
            group:"stage2",
            name:"left_build1",
            direction:"right",
        },
        {
            url:this.picUrl+"stage2/p5_img_3.png",
            group:"stage2",
            name:"right_build1",
            direction:"right",
        },
        {
            url:this.picUrl+"stage2/p5_img_4.png",
            group:"stage2",
            name:"right_couple",
            direction:"right",
        },
        {
            url:this.picUrl+"stage2/p5_img_5.png",
            group:"stage2",
            name:"left_horse",
            direction:"right",
        },
        {
            url:this.picUrl+"stage2/p5_img_6.png",
            group:"stage2",
            name:"right_build2",
            direction:"right",
        },
        {
            url:this.picUrl+"stage2/p5_img_bg.jpg",
            group:"stage2",
        },


        //stage3 left
        {
            url:this.picUrl+"stage3/p6_img_1.png",
            group:"stage3",
            name:"left_grass",
            direction:"left",
        },
        {
            url:this.picUrl+"stage3/p6_img_2.png",
            group:"stage3",
            name:"left_build1",
            direction:"left",
        },
        {
            url:this.picUrl+"stage3/p6_img_3.png",
            group:"stage3",
            name:"right_build1",
            direction:"left",
        },
        {
            url:this.picUrl+"stage3/p6_img_4.png",
            group:"stage3",
            name:"left_couple",
            direction:"left",
        },
        {
            url:this.picUrl+"stage3/p6_img_5.png",
            group:"stage3",
            name:"right_horse",
            direction:"left",
        },

        //stage3 right
        {
            url:this.picUrl+"stage3/p7_img_1.png",
            group:"stage3",
            name:"left_people",
            direction:"right",
        },
        {
            url:this.picUrl+"stage3/p7_img_2.png",
            group:"stage3",
            name:"right_build1",
            direction:"right",
        },
        {
            url:this.picUrl+"stage3/p7_img_3.png",
            group:"stage3",
            name:"right_build2",
            direction:"right",
        },
        {
            url:this.picUrl+"stage3/p7_img_4.png",
            group:"stage3",
            name:"left_build1",
            direction:"right",
        },
        {
            url:this.picUrl+"stage3/p7_img_5.png",
            group:"stage3",
            name:"left_build2",
            direction:"right",
        },
        {
            url:this.picUrl+"stage3/p7_img_6.png",
            group:"stage3",
            name:"right_build3",
            direction:"right",
        },

        //stage4 left
        {
            url:this.picUrl+"stage4/p8_img_1.png",
            group:"stage4",
            name:"left_grass",
            direction:"left",
        },
        {
            url:this.picUrl+"stage4/p8_img_2.png",
            group:"stage4",
            name:"left_people",
            direction:"left",
        },
        {
            url:this.picUrl+"stage4/p8_img_3.png",
            group:"stage4",
            name:"left_build1",
            direction:"left",
        },
        {
            url:this.picUrl+"stage4/p8_img_4.png",
            group:"stage4",
            name:"right_pool",
            direction:"left",
        },
        {
            url:this.picUrl+"stage4/p8_img_5.png",
            group:"stage4",
            name:"right_people",
            direction:"left",
        },
        {
            url:this.picUrl+"stage4/p8_img_6.png",
            group:"stage4",
            name:"right_tree",
            direction:"left",
        },
        {
            url:this.picUrl+"stage4/p8_img_7.png",
            group:"stage4",
            name:"right_stone",
            direction:"left",
        },

        //stage4 right
        {
            url:this.picUrl+"stage4/p9_img_1.png",
            group:"stage4",
            name:"left_tree1",
            direction:"right",
        },
        {
            url:this.picUrl+"stage4/p9_img_2.png",
            group:"stage4",
            name:"right_grass",
            direction:"right",
        },
        {
            url:this.picUrl+"stage4/p9_img_3.png",
            group:"stage4",
            name:"right_people",
            direction:"right",
        },
        {
            url:this.picUrl+"stage4/p9_img_bg.jpg",
            group:"stage4",
        },


        {
            url:this.picUrl+"phone.png",
            group:"1"
        },
        {
            url:this.picUrl+"weile.png",
            group:"1"
        },
    ];
    this.ImageResult = {};

    this.RAF = undefined;

};
/***********************流程***********************/
main.init=function(){
    three.init();
    webgl.init();
};
main.start=function(){

    //真正loader
    var loader = new Utils.ImageLoader();
    var _this = this;

    //预加载数字
    var preloader = new Utils.ImageLoader();
    preloader.load(
        _this.ImageList1,
        function( percent ){
        // console.log( percent )
        },
        function( result ){

            _this.ImageResult1 = result

            var l = result.number.length
            for(var i = 0; i < l; i ++ ){
                var dom = result.number[ i ];
                $( dom ).addClass( "static")
                // if( i == 0 ){
                //     result.number[ i ] = $(".number0")
                // }else{
                //     result.number[ i ] = $( dom ).addClass( "static")
                // }
            }

            var numberBox = $(".number-box")
            var $b = $(".number.b")
                $s = $(".number.s")
                $g = $(".number.g")

            loader.load(
                _this.ImageList2,
                function( percent ){
                    var s = Math.floor( percent / 10 )
                    var g = percent % 10
                    if( s != 10 ){
                        $s.html( result.number[ s ] )
                        if( g == s ){
                            $g.html( $(result.number[ g ]).clone() )
                        }else{
                            $g.html( result.number[ g ] )
                        }
                    }else{
                        $b.html( result.number[ 1 ] )
                        $s.html( result.number[ 0 ] )
                        $g.html( $(result.number[ 0 ]).clone() )
                    }
                },
                function( result ){

                    //黄色球纹理
                    t = new THREE.Texture( result['girl'][0] )
                    t.needsUpdate = true
                    webgl.ballOptions.texture[ 0 ] = t

                    //蓝色球纹理
                    var t;
                    t = new THREE.Texture( result['boy'][0] )
                    t.needsUpdate = true
                    webgl.ballOptions.texture[ 1 ] = t

                    //石头纹理
                    t = new THREE.Texture( result['stone'][0] )
                    t.needsUpdate = true
                    webgl.mapData.stoneTexture = t

                    for(var i = 1; i < 5; i ++ ){
                        var stage = "stage" + i;
                        var imgGroup = result[ stage ]
                        var gl = imgGroup.length
                        for( var g = 0; g < gl; g ++ ){
                            var dir = imgGroup[ g ].direction
                            if( dir ){
                                var name = imgGroup[ g ].name
                                var t = new THREE.Texture( imgGroup[ g ] )
                                t.needsUpdate = true

                                webgl.mapData[ stage ][ dir ][ name ].texture = t
                            }

                        }
                    }

                    _this.ImageResult = result;
                    _this.loadCallBack();
                    webgl.loadCallback();
                }
            );

        })

};
main.loadCallBack = function(){


    // vm.pwebgl.visible = true;

    setTimeout( function(){
        $(".P_loading").fo()
        vm.p1.visible = true;
        window.removeEventListener( "orientationchange", onOrientChange1 )
        window.addEventListener( "orientationchange", onOrientChange2 )
        onOrientChange2();
    }, 1000)


    // $(".P_loading").fo()
    //
    // $(".reason-btn").show()
    // $(".rule-btn").hide()
    // vm.top.visible = true;
    // vm.presult.visible = true


};
main.gameEnd = function(){
    window.removeEventListener( "orientationchange", onOrientChange2 )
    window.addEventListener( "orientationchange", onOrientChange3 )

    $(".reason-btn").show()
    $(".rule-btn").hide()


}
main.prule = function(){
    $(".P_rule").fi();
    main.scrollInit(".rule-txt",0)
};
main.prulelaeve = function(){
    $(".P_rule").fo(function(){
        $(".rule-txt")[0].style.webkitTransform="translate3d(0,0,0)";
    });
};
/***********************流程***********************/

/***********************功能***********************/
main.scrollInit=function(selector){
    this.touch.ScrollObj = $(selector);
    this.touch.container = $(selector).parent();
    this.touch.StartY = 0;
    this.touch.NewY = 0;
    this.touch.addY = 0;
    this.touch.scrollY = 0;
    this.touch.limitDown = this.touch.ScrollObj.height() < this.touch.container.height() ? 0 :(this.touch.container.height()-this.touch.ScrollObj.height());
};
main.limitNum = function(obj){//限制11位手机号
    var value = obj.value;
    var length = value.length;
    //假设长度限制为10
    if(length>11){
        //截取前10个字符
        value = value.substring(0,11);
        obj.value = value;
    }
};//限制手机号长度
main.playbgm=function(){
    Media.playMedia( this.bgm.id );
    this.bgm.button.addClass("ani-bgmRotate");
    this.bgm.isPlay = true;
};
main.pausebgm=function(){
    this.bgm.obj.pause();
    this.bgm.button.removeClass("ani-bgmRotate");
    this.bgm.isPlay = false;
};
main.startRender = function(){
    var loop = function(){
        main.RAF = window.requestAnimationFrame(loop)
        three.render();
        webgl.render();
    };
    loop();
};
main.stopRender = function(){
    window.cancelAnimationFrame( main.RAF );
};
main.addEvent=function(){

    document.body.ontouchmove = function( e ){
        e.preventDefault();
    }

    $(window).resize(function(){
        three.onresize();
        console.log( three.width )
    })

};
/***********************功能***********************/

//要求竖屏进页面
function onOrientChange1 ( e ){

        if( window.orientation == 0 || window.orientation == 180 ) {

            if( !main.isStart ){
                main.addEvent();
                main.init();
                main.start();
                main.isStart = true
            }
            $(".hp").hide()
            vm.hpwarn.visible = false;

        }

        else if(window.orientation == 90 || window.orientation == -90) {

            $(".hp").show()
            vm.hpwarn.visible = true;

        }

}

//要求横屏操作小球
function onOrientChange2 ( e ){

    if( vm.hpwarn.visible == true ){

        $(".hp").show()
        vm.hpwarn.visible = false;

    }

    setTimeout(function(){

        //竖屏
        if( window.orientation == 0 || window.orientation == 180 ){

            $(".sp").show();
            webgl.gravity.orient = 0;

        }

        //横屏
        else if( window.orientation == 90 || window.orientation == -90 ){

            // window.removeEventListener( "orientationchange", onOrientChange2 )
            $(".sp").hide();
            webgl.gravity.orient = window.orientation / 90

        }

    },0)

};

//要求竖屏查看结果
function onOrientChange3(){

    if( window.orientation == 0 || window.orientation == 180 ) {

        if( !main.haveGetResult ){
            vm.pwebgl.visible = false;
            vm.presult.visible = true;
            main.haveGetResult = true
        }
        $(".hp").hide()
        vm.hpwarn.visible = false;

    }

    else if(window.orientation == 90 || window.orientation == -90) {

        $(".hp").show()
        vm.hpwarn.visible = true;

    }
}
$(function(){
    window.addEventListener( "orientationchange", onOrientChange1 );
    if( window.orientation == 0 ){

        main.addEvent();
        main.init();
        main.start();
        main.isStart = true

    }else{
        $(".hp").show()
        vm.hpwarn.visible = true;
    }
})












