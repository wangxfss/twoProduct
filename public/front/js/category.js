/**
 * Created by wangxf on 2017/11/24.
 */
$(function(){

    $.ajax({
        type:'get',
        url:'/category/queryTopCategory',
        success:function(data){
            console.log(data);
            $('.content').html(template('tpl_l',data));
            render(data.rows[0].id);
        }
    });

//    二级分类ajax的请求
    function render(id){
        $.ajax({
            type:'get',
            url:'/category/querySecondCategory',
            data:{
                id:id
            },
            success:function(data){
                console.log(data);
                $('.right_img').html(template('tpl_r',data));
            }
        })
    }

    $('.content').on('click','li',function(){

        // console.log($(this).data('id'));
        render($(this).data('id'));
        $(this).addClass('now').siblings().removeClass('now');
        mui('.mui-scroll-wrapper').scroll()[1].scrollTo(0,0,500);
    })

})