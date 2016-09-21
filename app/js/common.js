$(function() {

    //Header во весь экран
    function heightDetect(){
        $("header").css("height", $(window).height());
        $(".wrapper-home_center").css("height", $(window).height());
    }

    heightDetect();
    $(window).resize(function() {
        heightDetect();
    });


    //Каруселька Slider
    var sync1 = $(".sync1");
    var sync2 = $(".sync2");

    sync1.owlCarousel({
        responsive: true,
        singleItem : true,
        navigation: false,
        pagination:false,
        afterAction : syncPosition,
        responsiveRefreshRate : 200,
        beforeMove : function(el){
        }
    });

    sync2.owlCarousel({
        items : 4,
        mouseDrag: false,
        touchDrag: false,
        pullDrag: false,
        autoWidth: true,
        pagination:false,
        responsiveRefreshRate : 100,
        afterInit : function(el){
            el.find(".active").eq(0).addClass("synced");
        }
    });

    function syncPosition(el){
        var current = this.currentItem;
        $(".sync2")
            .find(".active")
            .removeClass("synced")
            .eq(current)
            .addClass("synced")
        if($(".sync2").data("owlCarousel") !== undefined){
            center(current)
        }
    }

    $(".sync2").on("mouseenter", ".owl-item", function(e){
        e.preventDefault();
        var number = $(this).data("owlItem");
        sync1.trigger("owl.goTo",number);
    });



    function fix_size() {
        var images = $('.item img');
        images.each(setsize);

        function setsize() {
            var img = $(this),
                img_dom = img.get(0),
                container = img.parents('.item');
            if (img_dom.complete) {
                resize();
            } else img.one('load', resize);

            function resize() {
                if ((container.width() / container.height()) > (img_dom.width / img_dom.height)) {
                    img.width('100%');
                    img.height('auto');
                } else {
                    img.height('100%');
                    img.width('auto');
                }
                var marginx=(img.width()-container.width())/-2,
                    marginy=(img.height()-container.height())/-2;
                console.log(marginx);
                img.css({'margin-left': marginx, 'margin-top': marginy});

            }
        }
    }
    $(window).on('resize', fix_size);
    fix_size();

    //$(".loader").fadeOut();
    //$(".loader_inner").delay(800).fadeOut("slow");
    //$("html").niceScroll();

});

