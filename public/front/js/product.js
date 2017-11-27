/**
 * Created by wangxf on 2017/11/26.
 */
$(function(){
    var id = tools.getSearch('id');
    // console.log(id);
    $.ajax({
        type:'get',
        url:'/product/queryProductDetail',
        data:{
            id:id
        },
        success:function(data){
            console.log(data);
            $('.mui-scroll').html( template('tpl',data) );

            mui('.mui-slider').slider({
                interval:1000
            });
            //初始化数字框
            mui('.mui-numbox').numbox().getValue();

            $('.size').on('click',function(){
                $(this).addClass('now').siblings().removeClass('now');
            });
        }
    });

//    点击购物车
    $('.btn_cart').on('click',function(e){
        var num = $('.pro_num').val();
        var size = $('.size.now').text();
        if(!size){
            mui.toast("请选择尺码");
            return false;
        }

        $.ajax({
            type:'post',
            url:'/cart/addCart',
            data:{
                productId:id,
                num:num,
                size:size
            },
            success:function(data){
                console.log(data);
                if(data.error === 400){
                    location.href = 'login.html?retUrl='+location.href;
                }
                if(data.success){
                    mui.confirm("添加成功","温馨提示",["去购物车","继续浏览"],function(e){
                        // console.log(e);
                        //当e.index为0的时候，就是要跳转到其他页面，否则继续浏览
                        if(e.index == 0){
                            location.href = 'cart.html';
                        }
                    })
                }
            }
        });
    });

})