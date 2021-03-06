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

//用法:可配置
$().fi()
$().fi({
    duration:3000,
    ani:"ani-fadeIn",
    callback:function(){
        //this指向jQuery实例
        //this.fadeIn()
    }
});
//最简单的用法
$().fo();
$().fo();