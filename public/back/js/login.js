$(function(){
//提交之前的验证信息
    var $form = $("form");
    $form.bootstrapValidator({
        feedbackIcons:{
            valid:"glyphicon glyphicon-ok",
            invalid:"glyphicon glyphicon-remove",
            validating:"glyphicon glyphicon-refresh"
        },
        //用来指定校验的字段
        fields:{
            //校验的用户名
            username:{
                validators:{
                    //不能为空
                    notEmpty:{
                        message:"用户名不能为空"
                    },
                    callback:{
                        message:"用户名不存在"
                    }
                }
            },
            password:{
                validators:{
                    notEmpty:{
                        message:"密码不能为空"
                    },
                    stringLength:{
                        min:6,
                        max:12,
                        message:"用户名长度为6-12位"
                    },
                    callback:{
                        message:"密码错误"
                    }
                }
            }
        }
    });

//表单检验的成功事件
    $form.on('success.form.bv', function (e) {
        //阻止submit的默认提交,用到的是事件对象
        e.preventDefault();
        // console.log(222);
        $.ajax({
            type:"post",
            url:"/employee/employeeLogin",
            data:$form.serialize(),
            success:function(data){
                // console.log(data);

                if(data.success){
                    location.href = "index.html";
                }

                if(data.error === 1000) {
                    $form.data('bootstrapValidator').updateStatus("username", "INVALID", "callback");
                }
                if(data.error === 1001){
                    $form.data('bootstrapValidator').updateStatus("password","INVALID","callback");
                }
            }
        })

    });

//    表单重置
    $form.on("click",function(){
        $form.data("bootstrapValidator").resetForm();
    })


})
