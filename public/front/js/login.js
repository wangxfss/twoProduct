/**
 * Created by wangxf on 2017/11/27.
 */
$(function(){
    $('.btn_login').on('click',function(){
        var username = $('[name="username"]').val().trim();
        var password = $('[name="password"]').val().trim();
        if(password === ''){
            mui.toast('用户名不能为空');
            return false;
        }
        if( username === ''){
            mui.toast('密码不能为空');
            return false;
        }
        $.ajax({
            type:'post',
            url:'/user/login',
            data:{
                username:username,
                password:password
            },
            success:function(data){
                console.log(data);
                if(data.error === 403){
                    mui.toast(data.message);
                }
                if(data.success){
                    var search = location.search;
                    if(search.indexOf('retUrl') != -1){
                        search = search.replace('?retUrl=','');
                        location.href = search;
                    }else{
                        location.href = 'user.html';
                    }
                }
            }
        })
    })
})