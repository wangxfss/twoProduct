/**
 * Created by wangxf on 2017/11/22.
 */

$(function(){
    var currnetPage = 1;
    var pageSize = 5;
    function render(){
        $.ajax({
            type:"get",
            url:"/category/querySecondCategoryPaging",
            data:{
                page:currnetPage,
                pageSize:pageSize
            },
            success:function(data){
                // console.log(data);
                $('tbody').html(template('teble-tpl',data));

                //    分页操作
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:data.page,
                    totalPages:Math.ceil(data.total/pageSize),
                    onPageClicked:function(a,b,c,page){
                        currnetPage = page;
                        render();
                    }
                })
            }
        })
    }

    render();

    //模态框显示
    $('.second_add_btn').on('click',function(){
        $('#second_addModal').modal('show');
    });

    //点击下拉框出现
    $('.first_btn').on('click',function(){
        $.ajax({
            type:'get',
            url:'/category/queryTopCategoryPaging',
            data:{
                page:1,
                pageSize:100
            },
            success:function(data){
                // console.log(data);
                $('.dropdown-menu').html(template('first-tpl',data));
            }
        })
    });
    //点击一级目录子菜单，让其显示
    $('.dropdown-menu').on('click','a',function(){

        $('.first_btn .first_text').text($(this).text());
        $('[name="categoryId"]').val($(this).data('id'));

    //    让当前判断的样式时打钩的形式
        $form.data('bootstrapValidator').updateStatus('categoryId','VALID');
    });


    //初始化图片上传
    $("#fileupload").fileupload({
        dataType:"json",//指定响应的格式
        done:function (e, data) {//图片上传成功之后的回调函数
            //通过data.result.picAddr可以获取到图片上传后的路径
            console.log(data);
            console.log(data.result.picAddr);

            //设置给img_box中img的src属性
            $(".img_box img").attr("src", data.result.picAddr);
            $('[name="brandLogo"]').val(data.result.picAddr);
            //选择图片后，让校验是成功的显示
            $form.data('bootstrapValidator').updateStatus('brandLogo','VALID');
        }
    });


    var $form = $('#form');
    $form.bootstrapValidator({
        //因为变淡校验时，会有不校验的表单，所以需要让默认的不校验为空
        excluded : [],
        feedbackIcons:{
            valid: 'glyphicon glyphicon-ok',
            invalid:'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
            categoryId:{
                validators:{
                    notEmpty:{
                        message:"请选择一级分类名称"
                    }
                }
            },
            brandName:{
                validators:{
                    notEmpty:{
                        message:"请输入二级分类名称"
                    }
                }
            },
            brandLogo:{
                validators:{
                    notEmpty:{
                        message:"请选择上传的图片"
                    }
                }
            }
        }

    });
    $form.on('success.form.bv',function(e) {
        e.preventDefault();
        $.ajax({
            type:'post',
            url:'/category/addSecondCategory',
            data:$form.serialize(),
            success:function(data){
                // console.log(data);
                if(data.success){
                    $("#second_addModal").modal('hide');
                    page = currnetPage;
                    render();

                    //    重置表单所有数据
                    //    dom元素有一个方法  reset ，可以重置表单元素的内容
                    $form[0].reset();
                    $form.data('bootstrapValidator').resetForm();

                    //    不是表单元素的内容需要重置
                    $('.first_btn .first_text').text('请选择一级分类');
                    $('[name="categoryId"]').val('');
                    $('.img_box img').attr('src','images/none.png');
                    $('[name="brandLogo"]').val('');
                }
            }
        })
    })

})