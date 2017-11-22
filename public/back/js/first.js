/**
 * Created by wangxf on 2017/11/22.
 */
$(function(){
    var currentPage = 1;
    var pageSize = 5;

    function render(){
    //    发送ajax请求数据，渲染页面
        $.ajax({
            type:'get',
            url:'/category/queryTopCategoryPaging',
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            success:function(data){
                // console.log(data);

                $("tbody").html(template('tpl',data));

                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:data.page,
                    totalPages:Math.ceil(data.total/pageSize),
                    onPageClicked:function(a,b,c,page){
                        currentPage = page;
                        render();
                    }

                })
            }
        });
    }
    render();

//    模态框显示
    $('.first_add_btn').on('click',function(){
        $('#first-addModal').modal('show');
    })

   // 表单校验 ， 表单校验不应该写在点击事件里面
    var $form = $("#form");
    $form.bootstrapValidator({
        feedbackIcons:{
            valid: 'glyphicon glyphicon-ok',
            invalid:'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
            categoryName:{

                validators:{
                    notEmpty:{
                        message:"请输入一级分类的名称"
                    }
                }

            }
        }
    });

    $form.on("success.form.bv",function(){
        $.ajax({
            type:'post',
            url:'/category/addTopCategory',
            data:$form.serialize(),
            success:function(data){
                // console.log(data);
                if(data.success){
                    $("#first-addModal").modal('hide');
                    currentPage = 1;
                    render();
                    $form.data("bootstrapValidator").resetForm();
                    $('.form-control').val('');
                }
            }
        })
    })

})