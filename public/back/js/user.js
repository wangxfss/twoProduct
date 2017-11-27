$(function(){

    var currentPage = 1;
    var pageSize = 5;
    function render(){
        $.ajax({
            type:"get",
            url:"/user/queryUser",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            success:function(data){
                console.log(data);
                //动态渲染表格
                $('tbody').html(template('tpl',data));
                //动态设置分页操作
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:currentPage,
                    //这里总页数，现在先写死，这里是需要根据后台数据条数动态设置的
                    totalPages:Math.ceil(data.total/pageSize),
                    onPageClicked:function(a,b,c,page){//点击页码的时候会触发             没点击一次页面，就需要重新渲染一次，并且让他显示当前页的信息
                        currentPage = page;
                        render();
                    }
                })
            }
        });
    }
    render();

    $("tbody").on('click','.btn',function(){
        // console.log('哈哈');
        var id = $(this).parent().data("id");
        var isDelete = $(this).hasClass("btn-danger") ? 0:1;

        //让模态框显示
        $("#userModal").modal("show");

        //给模态框中的确定按钮注册点击事件，发送ajax请求
        $(".btn-userout").off().on('click',function(){

            $.ajax({
                type:"post",
                url:"/user/updateUser",
                data:{
                    id:id,
                    isDelete:isDelete
                },
                success:function(data){
                    console.log(data);
                    if(data.success){
                        $("#userModal").modal("hide");
                        render();
                    }
                }
            })
        });



    })



})
