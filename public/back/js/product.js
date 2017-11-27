/**
 * Created by wangxf on 2017/11/24.
 */
$(function(){
    var currentPage = 1;
    var pageSize = 2;
    //定义图片数组，用来存放，添加的图片路径
    var imgs = [];

    function render(){
        $.ajax({
            type:'get',
            url:'/product/queryProductDetailList',
            data:{
                page:currentPage,
                pageSize: pageSize
            },
            success:function(data){
                // console.log(data);
                $('tbody').html(template('teble-tpl',data));

            //    分页
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:data.page,
                    totalPages:Math.ceil(data.total/pageSize),
                    onPageClicked:function(a,b,c,page){
                        currentPage = page;
                        render();
                    }
                });

            }
        })
    }
    render();

//    模态框显示
    $('.product_add_btn').on('click',function(){
        $('#productModal').modal('show');

        //请求二级分类名称数据
        $.ajax({
            type:'get',
            url:'/category/querySecondCategoryPaging',
            data:{
                page:1,
                pageSize:100
            },
            success:function(data){
                $('.dropdown-menu').html(template('second-tpl',data));
            }
        })
    });

//    点击二级菜单让其选中
    $('.dropdown-menu').on('click','a',function(){
        $('.second_text').text($(this).text());
        $('[name="brandId"]').val($(this).data('id'));
        console.log($('[name="brandId"]').val());
        $form.data('bootstrapValidator').updateStatus('brandId','VALID');
    });

//    初始化图片,里面有图片上传成功的回调函数，可以获得到图片的路径
    $('#fileupload').fileupload({
        dataType:'json',
        done:function(e,data){
            // console.log(data);

            if(imgs.length >=3){
                return;
            }

            $('.img_box').append('<img src='+data.result.picAddr+' width="100" height="100">');
            imgs.push(data.result);

            if(imgs.length >= 3){
                $form.data('bootstrapValidator').updateStatus('brandLogo','VALID');
            }else{
                $form.data('bootstrapValidator').updateStatus('brandLogo','INVALID');
            }
        }
    })


   // 表单校验
    var $form = $('#form');
    $form.bootstrapValidator({
        excluded:[],
        feedbackIcons: {
            //校验成功的图标
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
            brandId:{
                validators:{
                    notEmpty:{
                        message:'请选择二级分类名称'
                    }
                }
            },
            proDesc:{
                validators:{
                    notEmpty:{
                        message:'请输入产品描述'
                    }
                }
            },
            num:{
                validators:{
                    notEmpty:{
                        message:'请输入产品描述'
                    },
                    regexp:{
                        regexp:/^[1-9]\d*$/,
                        message:'请输入合法的库存'
                    }
                }
            },
            price:{
                validators:{
                    notEmpty:{
                        message:'请输入产品价格'
                    }
                }
            },
            oldPrice:{
                validators:{
                    notEmpty:{
                        message:'请输入产品价格'
                    }
                }
            },
            size:{
                validators:{
                    notEmpty:{
                        message:'请输入产品尺码'
                    },
                    regexp:{
                        regexp:/^\d{2}-\d{2}$/,
                        message:'请输入正确的尺码'
                    }
                }
            },
            brandLogo: {
                validators: {
                    notEmpty: {
                        message: '请上传商品图片'
                    }
                }
            }
        }
    });

//    注册表单校验成功的事件
    $form.on('success.form.bv',function(e){

        e.preventDefault();
        var listData = $form.serialize();
        listData += "&picName1=" + imgs[0].picName + '&picAddr1=' + imgs[0].picAddr;
        listData += "&picName2=" + imgs[1].picName + '&picAddr2=' + imgs[1].picAddr;
        listData += "&picName3=" + imgs[2].picName + '&picAddr3=' + imgs[2].picAddr;

        $.ajax({
            type:'post',
            url:'/product/addProduct',
            data:listData,
            success:function(data){
                // console.log(data);
                if(data.success){
                    currentPage = 1;
                    render();
                //    模态框隐藏
                    $('#productModal').modal('hide');

                //    重置表单
                    $form.data('bootstrapValidator').resetForm();
                    $form[0].reset();
                    $('.second_text').text('请选择二级分类名称');
                    $('[name="brandId"]').val('');
                    $('.img_box img').remove();
                    imgs = [];
                }
            }
        })
    })


})