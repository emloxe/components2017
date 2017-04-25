(function($){
    $.fn.extend({
        'address': function(cb) {
            this.each(function () {

                var $this = $(this);
                var opts = $.extend({}, defaluts);
                var dataAll = getAll();
                var hotCity = getHotCity();
                var district = getDistrict();

                $this.html(firstHtml());

                renderHotCity($this.find('.ads-hot-city'), hotCity);

                renderProvince($this.find('.ads-to-choice'), dataAll);

                // 点击显示content
                $this.find('.ads-search-box').click(function () {

                    if (opts.contentIsShow === false) {
                        $('.ads-content').show();
                        opts.contentIsShow = true;
                    }

                });


                // input中如果存在数据点击就不会隐藏input
                $this.find('input').click(function(e){
                    if(e.stopPropagation){
                        e.stopPropagation();
                    }else{
                        e.cancelBubble = true;
                    }

                    if($(this).val() === ''){
                        if (opts.contentIsShow === false) {
                            $('.ads-content').show();
                            opts.contentIsShow = true;
                        }
                    }else{

                    }
                });

                // 移动到其他区域隐藏
                $('.ads-content').mouseleave(function (e) {
                    $('.ads-content').hide();
                    opts.contentIsShow = false;
                    /*if($(this)){
                     if(opts.contentIsShow === true){
                     $this.find('.ads-content').hide();
                     opts.contentIsShow = false;
                     }
                     }*/

                });


                // todo 点击其他区域隐藏content
                /*$(document).click(function(e){

                    if(e.target != $this.find('.ads-content')[0] && e.target != $this.find('input')[0] && e.target != $this.find('.ads-search-box')[0] && opts.contentIsShow === true){
                        console.log(e.target);
                        console.log($this.find('.ads-search-box')[0]);
                        $this.find('.ads-content').hide();
                        opts.contentIsShow = false;
                    }
                });*/

                // 监听热门城市的点击事件
                $this.find('.ads-hot-city').on('click', 'a', function () {
                    opts.level = 2;

                    // 如果当前条件一致就不需要重新调用一次
                    var id = $(this).data('id');
                    var pid = $(this).data('pid');
                    if (opts.gid == pid && opts.pid == id) {
                        return
                    }

                    opts.gid = $(this).data('pid');
                    opts.pid = $(this).data('id');

                    // 如果当时还是输入框在显示，就切换成div框
                    if ($this.find('input').is(':visible')) {
                        $this.find('input').hide();
                        $this.find('.ads-search-item').show();
                    }

                    // 将所需a元素中填入数据
                    $('.choiced-city').html($(this).text() + '<i class="icon-close"></i>');
                    var index = dataAll.findIndex(function (v) {
                        return v.id == pid;
                    });
                    $('.choiced-province').html(dataAll[index].name + '<i class="icon-close"></i>');

                    // 控制显示几a个元素
                    var dom = $this.find('.ads-search-item a');
                    dom.hide();
                    for (var i = 0, len = 2; i < len; i++) {
                        dom[i].style.display = 'inline-block';
                    }

                    renderDistrict($this.find('.ads-to-choice'), district, id);

                });


                // 监听主区域的点击事件
                $this.find('.ads-to-choice').on('click', 'a', function () {

                    var id = $(this).data('id');
                    var dom = $this.find('.ads-search-item a');
                    dom.hide();

                    // 如果当时还是输入框在显示，就切换成div框
                    if ($this.find('input').is(':visible')) {
                        $this.find('input').hide();
                        $this.find('.ads-search-item').show();
                    }


                    if (opts.level == 2) {

                        dom[0].style.display = 'inline-block';
                        dom[1].style.display = 'inline-block';
                        dom[2].style.display = 'inline-block';
                        dom[2].innerHTML = $(this).text() + '<i class="icon-close"></i>';

                        $this.find('.ads-content').hide();

                        opts.level = 3;
                        opts.id = id;
                        opts.contentIsShow = false;
                        // $this.after('<input type="hidden" name="address" value="' + opts.id + '">');
                    } else if (opts.level == 1) {

                        dom[0].style.display = 'inline-block';
                        dom[1].style.display = 'inline-block';
                        dom[1].innerHTML = $(this).text() + '<i class="icon-close"></i>';

                        renderDistrict($this.find('.ads-to-choice'), district, id);

                        opts.level = 2;
                        opts.pid = id;
                    } else if (opts.level == 3) {

                        dom[0].style.display = 'inline-block';
                        dom[1].style.display = 'inline-block';
                        dom[2].style.display = 'inline-block';
                        dom[2].innerHTML = $(this).text() + '<i class="icon-close"></i>';

                        $(this).parent().children().removeClass('active');

                        $this.find('.ads-content').hide();
                        // $this.after('<input type="hidden" name="address" value="' + opts.id + '">');
                        opts.contentIsShow = false
                    } else if (opts.level == 0) {


                        dom[0].style.display = 'inline-block';
                        dom[0].innerHTML = $(this).text() + '<i class="icon-close"></i>';

                        renderCity($this.find('.ads-to-choice'), dataAll, id);

                        opts.level = 1;
                        opts.gid = id;

                    }

                    $(this).addClass('active');
                });


                // 监听ads-search-item a点击
                $this.find('.ads-search-item').on('click', 'a', function () {
                    if (opts.contentIsShow === false) {
                        $this.find('.ads-content').show();
                        opts.contentIsShow = true;
                    }

                    switch ($(this).attr('class')) {
                        case 'choiced-province':
                            renderProvince($this.find('.ads-to-choice'), dataAll, opts.gid);
                            opts.level = 0;
                            break;
                        case 'choiced-city':
                            renderCity($this.find('.ads-to-choice'), dataAll, opts.gid, opts.pid);
                            opts.level = 1;
                            break;
                        case  'choiced-district':
                            renderDistrict($this.find('.ads-to-choice'), district, opts.pid, opts.id);
                            opts.level = 2;
                            break;
                        default :
                            console.log();
                    }

                });


                // 监听ads-search-item 点击
                $this.find('.ads-search-item').on('click', 'i', function (e) {
                    if(e.stopPropagation){
                        e.stopPropagation();
                    }else{
                        e.cancelBubble = true;
                    }

                    var dom = $this.find('.ads-search-item a');

                    if (opts.contentIsShow === false) {
                        $this.find('.ads-content').show();
                        opts.contentIsShow = true;
                    }

                    switch ($(this).parent().attr('class')) {
                        case 'choiced-province':
                            renderProvince($this.find('.ads-to-choice'), dataAll);
                            $this.find('input').show();
                            $this.find('.ads-search-item').hide();
                            dom[0].style.display = 'none';
                            dom[1].style.display = 'none';
                            dom[2].style.display = 'none';
                            opts.level = 0;
                            opts.gid = 0;
                            opts.pid = 0;
                            opts.id = 0;
                            break;
                        case 'choiced-city':
                            renderCity($this.find('.ads-to-choice'), dataAll, opts.gid);
                            dom[0].style.display = 'inline-block';
                            dom[1].style.display = 'none';
                            dom[2].style.display = 'none';
                            opts.level = 1;
                            opts.pid = 0;
                            opts.id = 0;
                            break;
                        case  'choiced-district':
                            renderDistrict($this.find('.ads-to-choice'), district, opts.pid);
                            dom[0].style.display = 'inline-block';
                            dom[1].style.display = 'inline-block';
                            dom[2].style.display = 'none';
                            opts.level = 2;
                            opts.id = 0;
                            break;
                        default :
                            console.log();
                    }

                });




            })


        }
    });





    var defaluts = {
        contentIsShow: false,
        level: 0,
        gid: 0,
        pid: 0,
        id: 0

    };

    function firstHtml(){
        return `<div class="address">
        <div class="ads-search-box">
        <input type="text"/>
        <div class="ads-search-item">
        <a  class="choiced-province" href="javascript:void(0)">省 <i class="icon-close"></i></a>
        <a class="choiced-city" href="javascript:void(0)">市 <i class="icon-close"></i></a>
        <a  class="choiced-district" href="javascript:void(0)">县 <i class="icon-close"></i></a>
        </div>
        </div>
        <div class="ads-content">
        <div class="ads-c-top">
        <h5>热门城市</h5>
        <div class="ads-hot-city">
        <a href="javascript:void(0)">北京市</a>
        <a href="javascript:void(0)">天津市</a>
        <a href="javascript:void(0)">武汉市</a>
        <a href="javascript:void(0)">北京市</a>
        <a href="javascript:void(0)">天津市</a>
        <a href="javascript:void(0)"  data-id="001">武汉市</a>
        </div>
        </div>
        <div class="ads-c-bottom">
        <div class="ads-to-choice" >
        <a href="javascript:void(0)">北京市</a>
        <a href="javascript:void(0)">天津市</a>
        <a href="javascript:void(0)">河北省</a>
        <a href="javascript:void(0)">湖北省</a>
        </div>
        <div class="ads-city" style="display:none">
        <a href="javascript:void(0)">武汉市</a>
        <a href="javascript:void(0)">黄冈市</a>
        <a href="javascript:void(0)">襄阳市</a>
        </div>
        <div class="ads-district" style="display:none">
        <a href="javascript:void(0)">武昌区</a>
        <a href="javascript:void(0)">江夏区</a>
        <a href="javascript:void(0)">汉口区</a>
        <a href="javascript:void(0)">汉阳区</a>
        <a href="javascript:void(0)">洪山区</a>
        <a href="javascript:void(0)">东西湖区</a>
        <a href="javascript:void(0)">武昌区</a>
        <a href="javascript:void(0)">江夏区</a>
        <a href="javascript:void(0)">汉口区</a>
        <a href="javascript:void(0)">汉阳区</a>
        <a href="javascript:void(0)">洪山区</a>
        <a href="javascript:void(0)">东西湖区</a>
        </div>
        </div>
        </div>
        </div>`
    }


    function renderHotCity(dom,data){
        var html = '';
        for(var i = 0, len = data.length; i < len; i++){
            html += '<a data-id="'+ data[i].id +'" data-pid="'+ data[i].pid +'" href="javascript:void(0)" title="'+ data[i].name +'" >'+ data[i].name +'</a>';
        }

        dom.html(html);
    }

    function getHotCity(){
        return hotCity;
    }

    function renderProvince(dom,data, id){

        var html = '';
        for(var i = 0, len = data.length; i < len; i++){
            if(id && data[i].id == id){
                html += '<a class="active" data-id="'+ data[i].id +'" href="javascript:void(0)" title="'+ data[i].name +'" >'+ data[i].name +'</a>';
            }else{
                html += '<a data-id="'+ data[i].id +'" href="javascript:void(0)" title="'+ data[i].name +'" >'+ data[i].name +'</a>';
            }

        }

        dom.html(html);
    }

    function getAll(){
        return province;
    }

    function renderCity(dom, data, pid, id){
        var index = data.findIndex(function(v){
            return v.id == pid;
        });

        rdata = data[index].city;


        var html = '';
        for(var i = 0, len = rdata.length; i < len; i++){

            if(id && rdata[i].id == id){
                html += '<a class="active" data-id="'+ rdata[i].id +'" href="javascript:void(0)" title="'+ rdata[i].name +'" >'+ rdata[i].name +'</a>';
            }else{
                html += '<a data-id="'+ rdata[i].id +'" href="javascript:void(0)" title="'+ rdata[i].name +'" >'+ rdata[i].name +'</a>';
            }

        }

        dom.html(html);


    }

    function renderDistrict(dom, data, pid, id){

        var html = '';
        for(var i = 0, len = data.length; i < len; i++){
            if(data[i].pid == pid){
                if(id && data[i].id == id){
                    html += '<a class="active" data-id="'+ data[i].id +'" href="javascript:void(0)" title="'+ data[i].name +'" >'+ data[i].name +'</a>';
                }else{
                    html += '<a data-id="'+ data[i].id +'" href="javascript:void(0)" title="'+ data[i].name +'" >'+ data[i].name +'</a>';
                }
            }
        }

        dom.html(html);
    }

    function getDistrict(){
        return district;
    }



})(window.jQuery);