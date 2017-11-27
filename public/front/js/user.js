/**
 * Created by wangxf on 2017/11/27.
 */
$(function(){
    $.ajax({
        type:'get',
        url:'/user/queryUserMessage',
        success:function(data){
            console.log(data);
            if(data.error === 400){
                location.href = 'login.html';
            }
            $('.userinfo').html( template('tpl',data) );
        }
    });

//    退出功能实现
    $('.user_btn').on('click',function(){
        $.ajax({
            type:'get',
            url:'/user/logout',
            success:function(data){
                if(data.success){
                    location.href = 'login.html';
                }
            }
        })
    })

})