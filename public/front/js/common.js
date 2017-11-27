/**
 * Created by wangxf on 2017/11/24.
 */
$(function(){
    mui('.mui-scroll-wrapper').scroll({
        indicators: false, //是否显示滚动条
    });
    mui('.mui-slider').slider({
        interval:1000
    })
})

//封装用于获取地址栏数据的方法

var tools = {
    getSearchObj:function (){
        var str = location.search;
        str = decodeURI(str);
        str = str.slice(1);
        var arr = str.split('&');
        var obj = {};
        var key;
        var value;
        arr.forEach(function(v){
            key = v.split('=')[0];
            value = v.split('=')[1];
            obj[key] = value;
        });
        return obj;
        console.log(obj);
    },
    getSearch:function (key){
        return this.getSearchObj()[key];
    }
}

