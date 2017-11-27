/**
 * Created by wangxf on 2017/11/27.
 */
$(function(){

    mui.init({
        pullRefresh : {
            container:".lt-main",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down : {
                style:'circle',//必选，下拉刷新样式，目前支持原生5+ ‘circle’ 样式
                auto: true,//可选,默认false.首次加载自动上拉刷新一次
                callback :function(){
                    $.ajax({
                        type:'get',
                        url:'/cart/queryCart',
                        success:function(data){
                            console.log(data);
                            setTimeout(function(){
                                if(data.error === 400){
                                    location.href = 'login.html?retUrl='+location.href;
                                }
                                $('.mui-table-view').html( template( 'tpl' , {list:data} ) );
                                mui('.lt-main').pullRefresh().endPulldownToRefresh();
                            },1000);
                        }
                    });
                }
            }
        }
    });

//    删除购物车的功能
    $('.lt-main').on('tap','.btn_delete',function(){
        var id = $(this).data('id');
        mui.confirm('你是否要删除此商品','温馨提示',['是','否'],function(e){
            if(e.index === 0){
                $.ajax({
                    type:'get',
                    url:'/cart/deleteCart',
                    data:{id:id},
                    success:function(data){
                        // console.log(data);
                        if(data.success){
                            mui('.lt-main').pullRefresh().pulldownLoading();
                        }
                    }
                })
            }
        })
    });

//    修改购物车功能
    $('.lt-main').on('tap','.btn_edit',function(){
        var data = this.dataset;
        console.log(data);
        var html = template('tpl2',data);
        html = html.replace(/\n/g , '');
        mui.confirm(html,'编辑商品',['确定','取消'],function(e){
            if(e.index === 0){
                var id = data.id;
                var size = $('.tpl2_pro_size span.now').text();
                var num = $('.tpl2_num').val();
                $.ajax({
                    type:'post',
                    url:'/cart/updateCart',
                    data:{
                        id:id,
                        size:size,
                        num:num
                    },
                    success:function(info){
                        console.log(info);
                        if(info.success){
                            mui('.lt-main').pullRefresh().pulldownLoading();
                        }
                    }
                })
            }
        })

        //    给尺码注册点击事件
        $('.tpl2_pro_size span').on('tap',function(){
            $(this).addClass('now').siblings().removeClass('now');
        });

//    数字选框也要重新初始化
        mui('.mui-numbox').numbox();

    })

//    计算价格
//    找到页面中所有的checkbox，注册事件，点击事件现在不起作用，想要获取被选中的，可以使用change，当input状态变化时，获取被选中的
    $('body').on('change','.pro_check',function(){
        var sumPrice = 0;
    //    获取每一个商品的价格 和 双数
        $(':checked').each(function(){
            var price = $(this).data('price');
            var num = $(this).data('num');
            console.log(price,num);
            sumPrice += price*num;
        });
        $('.lt_total .allPrice').text(sumPrice.toFixed(2));
    })



})