/**
 * Created by wangxf on 2017/11/21.
 */

$(function () {
    //侧边栏的分类管理的展开事件
    $(".child").prev().on("click",function(){
        // console.log('哈哈');
        $(this).next().slideToggle();
    })

    //侧边栏和头部的缩放
    $(".topbar-left").on('click',function(){
        $(".lt-slide").toggleClass("move");
        $(".lt-main").toggleClass("move");
    })

    //退出功能实现
    $(".topbar-right").on("click",function(){
        //注意模态框的使用
        $("#myModal").modal('show');

        $(".btn-loginout").off().on('click',function(){
            $.ajax({
                type:'get',
                url:'/employee/employeeLogout',
                success:function(data){
                    if(data.success){
                        location.href = "login.html";
                    }
                }
            })
        })
    })


    //禁用进度条
    NProgress.configure({ showSpinner: false });


    $(document).ajaxStart(function(){
        //开启进度条
        NProgress.start();
    });
    $(document).ajaxStop(function(){
        setTimeout(function(){
            NProgress.done();
        },500)
    })


    //解决 退出后 其他页面登录情况
    if(location.href.indexOf("login.html") == -1){
        $.ajax({
            type:"get",
            url:"/employee/checkRootLogin",
            success:function(data){
                // console.log(data);
                if(data.error === 400){
                    location.href = "login.html";
                }
            }
        })


    }



})






