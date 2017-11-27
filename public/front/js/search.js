/**
 * Created by wangxf on 2017/11/25.
 */
$(function(){

    // localStorage.setItem('lt_search_history','["阿迪达斯","1","2"]');
    function getHistory(){
        var history = localStorage.getItem('lt_search_history') || '[]';
        var arr = JSON.parse(history);
        return arr;
    }
    
    function render() {
        var arr = getHistory();
        $('.lt-history').html( template( 'tpl', {list:arr} ) );
    }

    render();

    $('.lt-history').on('click','.btn_empty',function(){
        localStorage.removeItem('lt_search_history');
        render();
    });
    $(".lt-history").on('click','.btn_delete',function(){
        var index = $(this).data('index');
        var arr = getHistory();
        arr.splice(index,1);
        //别忘记把删除后的数组，重新设置回本地
        localStorage.setItem('lt_search_history',JSON.stringify(arr));
        render();
    });
    //4. 添加搜索列表
    //4.1 注册点击事件
    //4.2 获取到输入的关键字
    //4.3 获取到历史记录，得到数组
    //4.4 把关键字添加到数组最前面
    //4.5 重新设置到缓存里面
    //4.6 重新渲染
    $('.search-btn').on('click',function(){
        var key = $('.search-input').val().trim();
        if(key === ''){
            mui.toast('请输入需要搜索的商品名称');
            return false;
        }
        var arr = getHistory();
        if(arr.indexOf(key) != -1){
            arr.splice(arr.indexOf(key),1);
        }
        if( arr.length >= 10 ){
            arr.pop();
        }

        arr.unshift(key);
        localStorage.setItem('lt_search_history',JSON.stringify(arr));
        render();

    //    最后跳转到商品搜索列表页面
        location.href = "searchList.html?key="+key;
    })



})