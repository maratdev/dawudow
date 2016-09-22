$(function() {

    //Header во весь экран
    function heightDetect(){
        $("header").css("height", $(window).height());
        $(".wrapper-home_center").css("height", $(window).height());
        $(".it1").css("height", $(window).height());
    }

    heightDetect();
    $(window).resize(function() {
        heightDetect();
    });



    //Каруселька Slider
    var sync1 = $(".sync1");
    var sync2 = $(".sync2");

    sync1.owlCarousel({
        animateOut: 'slideOutDown',
        animateIn: 'flipInX',
        singleItem : true,
        navigation: true,
        pagination:false,
        afterAction : syncPosition,
        responsiveRefreshRate : 200,
        beforeMove : function(el){
        }
    });

    sync2.owlCarousel({
        items : 8,
        itemsDesktop      : [1199,10],
        itemsDesktopSmall     : [979,10],
        itemsTablet       : [768,8],
        itemsMobile       : [479,4],
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





    //$(".loader").fadeOut();
    //$(".loader_inner").delay(800).fadeOut("slow");

    $("html").niceScroll();

});

