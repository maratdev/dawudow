$(function() {
    $("html").niceScroll();

    //Header во весь экран
    function heightDetect(){
        $(".maxheight").css("height", $(window).height());
        $(".wrapper-home_center").css("height", $(window).height());
        $(".it1").css("height", $(window).height());
        $(".parallax").css("height", $(window).height());
        $("#scene").css("height", $(window).height());
    }

    heightDetect();
    $(window).resize(function() {
        heightDetect();
    });


    //меню
    $(".toggle_mnu").click(function() {
        $(".sandwich").toggleClass("active");
    });

    $(".top_mnu ul a").click(function() {
        $(".top_mnu").fadeOut(600);
        $(".sandwich").toggleClass("active");
    }).append("<span>");

    $(".toggle_mnu").click(function() {
        if ($(".top_mnu").is(":visible")){
            $(".top_text").removeClass("h_opacity");
            $(".top_mnu").fadeOut(600);
            $(".top_mnu li a").removeClass("fadeInUp animated");
        }
        else{
            $(".top_text").addClass("h_opacity");
            $(".top_mnu").fadeIn(600);
            $(".top_mnu li a").addClass("fadeInUp animated");
        }
    });


    //Каруселька Slider
    var sync1 = $(".sync1");
    var sync2 = $(".sync2");

    sync1.owlCarousel({
        animateOut: 'slideOutDown',
        animateIn: 'flipInX',
        singleItem : true,
        navigation: false,
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


    $('.popup-with-zoom-anim').magnificPopup({
        type: 'inline',

        fixedContentPos: false,
        fixedBgPos: true,

        overflowY: 'auto',

        closeBtnInside: true,
        preloader: false,

        midClick: true,
        removalDelay: 300,
        mainClass: 'my-mfp-zoom-in'
    });

    $('.popup-with-move-anim').magnificPopup({
        type: 'inline',

        fixedContentPos: false,
        fixedBgPos: true,

        overflowY: 'auto',

        closeBtnInside: true,
        preloader: false,

        midClick: true,
        removalDelay: 300,
        mainClass: 'my-mfp-slide-bottom'
    });

    $('.scene').parallax();

    //$(".loader").fadeOut();
    //$(".loader_inner").delay(800).fadeOut("slow");



});

