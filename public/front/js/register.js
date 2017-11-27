/**
 * Created by wangxf on 2017/11/27.
 */
$(function(){
//    获取验证码功能
    $('.btn_vcode').on('click',function(){
        //只要按钮被点击了，就需要禁用按钮
        var $this = $(this);
        $this.prop('disabled',true).addClass('disabled').text('发送中...');

        $.ajax({
            type:'get',
            url:'/user/vCode',
            success:function(data){
                console.log(data);

            //    获取到验证码以后，开启定时器，开始计时
                var count = 10;
                var timerId = setInterval(function(){
                    count--;
                    $this.text(count+'秒后再次发送');
                    if( count <= 0){
                        //不能忘记清除定时器
                        clearInterval(timerId);
                        $this.prop('disabled',false).removeClass('disabled').text('再次发送');
                    }
                },1000)

            }
        })
    });


//    验证表单数据
    $('.btn_register').on('click',function(e){

        e.preventDefault();

        var username = $('[name="username"]').val().trim();
        var password = $('[name="password"]').val().trim();
        var repassword = $('[name="repassword"]').val().trim();
        var mobile = $('[name="mobile"]').val().trim();
        var vCode = $('[name="vCode"]').val().trim();
        if(!username){
            mui.toast('用户名不能为空');
            return false;
        }
        if(!password){
            mui.toast('密码不能为空');
            return false;
        }
        if(repassword !== password){
            mui.toast('前后输入的密码不一致');
            return false;
        }
        if(!mobile){
            mui.toast('手机号码不能为空');
            return false;
        }
        if(!/^1[34578]\d{9}$/.test(mobile)){
            mui.toast('手机号码输入不规范');
            return false;
        }
        if(!vCode){
            mui.toast('验证码不能空');
            return false;
        }
        $.ajax({
            type:'post',
            url:'/user/register',
            data:$('form').serialize(),
            success:function(data){
                console.log(data);

                if(data.error === 403){
                    mui.toast(data.message);
                    return false;
                }
                if(data.error === 401){
                    mui.toast(data.message);
                    return false;
                }
                if(data.success){
                    mui.toast('恭喜你已经注册成功了！1秒后将会跳转到登录页');
                    setTimeout(function(){
                        location.href = 'user.html';
                    },1000);
                }
            }
        })

    });



})