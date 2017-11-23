/**
 * Created by wangxf on 2017/11/23.
 */
$(function(){

//    1.发送ajax请求，获取数据，渲染页面
    var currentPage = 1;
    var pageSize = 5;

    function render(){
        $.ajax({
            type:'get',
            url:'/category/querySecondCategoryPaging',
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            success:function(data){
                //渲染到表格中
                $('tbody').html(template('teble-tpl',data));

            //    分页操作
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:data.page,
                    totalPages:Math.ceil(data.total/pageSize),
                    onPageClicked:function(a,b,c,page){
                        currentPage = page;
                        render();
                    }
                })
            }
        })
    }
    render();

//    让模态框显示
    $('.second_add_btn').on('click',function(){
        $('#second_addModal').modal('show');
    });

//    让一级分类下拉框显示
    $('.first_btn').on('click',function(){})
    $.ajax({
        type:'get',
        url:'/category/queryTopCategoryPaging',
        data:{
            page:1,
            pageSize:100
        },
        success:function(data){

            $('.dropdown-menu').html(template('first-tpl',data));

        }
    });
//    点击一级菜单内容时，让其显示在上面
    $('.dropdown-menu').on('click','a',function(){
        $('.first_btn .first_text').text($(this).text());
        $('[name="categoryId"]').val($(this).data('id'));

    //    当选择了内容以后，需要让校验 正确显示
        $form.data('bootstrapValidator').updateStatus('categoryId','VALID');
    });


//    初始化图片
    $('#fileupload').fileupload({
        dataType:'json',
        done:function(e,data){
            // console.log(data);

            $('.img_box img').attr('src',data.result.picAddr);
            $('[name="brandLogo"]').val(data.result.picAddr);

        //    选择图片以后，让校验正常显示
            $form.data('bootstrapValidator').updateStatus('brandLogo','VALID');
        }
    });

//    表单校验
    var $form = $('#form');
    $form.bootstrapValidator({
        excluded:[],
        feedbackIcons:{
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            categoryId: {
                validators: {
                    notEmpty: {
                        message: "请选择一级分类"
                    }
                }
            },
            brandName: {
                validators: {
                    notEmpty: {
                        message: "请输入二级分类的名称"
                    }
                }
            },
            brandLogo: {
                validators: {
                    notEmpty: {
                        message: "请上传品牌图片"
                    }
                }
            }
        }
    });

//    表单校验成功的函数
    $form.on('success.form.bv',function(e){
        e.preventDefault();

    //    发送ajax请求
        $.ajax({
            type:'post',
            url:'/category/addSecondCategory',
            data:$form.serialize(),
            success:function(data){
                if(data.success){
                    $('#second_addModal').modal('hide');
                    currentPage = 1;
                    render();

                //    重置表单
                    $form.data('bootstrapValidator').resetForm();
                    $form[0].reset();

                //    重置不是表单的内容
                    $('.first_btn .first_text').text('请选择一级分类名称');
                    $('[name="categoryId"]').val('');
                    $('.img_box img').attr('src','images/none.png');
                    $('[name="brandLogo"]').val('');
                }

            }
        })

    })

})