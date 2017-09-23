/**
 * Created by Z on 2017/6/21.
 */
(function(){
    var setSize = function(){
        var _width = window.innerWidth;
        _width = _width > 375 ? 375 :_width
        var size = (_width/640)*100;
        // if(size<50){size=50;}
        // if(size>58.5){size=100;}
        document.documentElement.style.fontSize = size + 'px';
    };
    setSize();
    window.onresize = function(){
       setSize();
    };
})();