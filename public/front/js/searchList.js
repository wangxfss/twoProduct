/**
 * Created by wangxf on 2017/11/25.
 */
$(function(){

    var key = tools.getSearch('key');
    console.log(typeof  key);
    $('.search-input').val(key);

    render();

    $('.search-btn').on('click',function(){
        $('.nav a').removeClass('now').find('span').removeClass('fa-angle-up').addClass('fa-angle-down');
        render();
    });

    $('a[data-type]').on('click',function(){
       var $this = $(this);
        if($this.hasClass('now')){
            $this.find('span').toggleClass('fa-angle-down').toggleClass('fa-angle-up');
        }else{
            $this.addClass('now').siblings().removeClass('now');
            $this.find('span').toggleClass('fa-angle-down').toggleClass('fa-angle-up');
        }

        render();
    });

    function render(){

        var prama = {};
        prama.page = 1;
        prama.pageSize = 100;
        prama.proName = $('.search-input').val().trim();
        var $sort = $('.nav a.now');
        if($sort.length > 0){
            var type = $sort.data('type');
            var value = $sort.find('span').hasClass('fa-angle-down') ? 2 : 1;
            prama[type] = value;
        }
        $.ajax({
            type:'get',
            url:'/product/queryProduct',
            data:prama,
            success:function(data){
                console.log(data);
                $('.product').html( template('tpl',data) );
            }
        })


    }
})