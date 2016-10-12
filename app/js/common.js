$(function() {
    $("html").niceScroll();

    //Header во весь экран
    function heightDetect(){
        $(".maxheight").css("height", $(window).height());
        $(".wrapper-home_center").css("height", $(window).height());
        $(".it1").css("height", $(window).height());
        $(".parallax").css("height", $(window).height());
        $("#scene").css("height", $(window).height());
        $(".full-height").css("height", $(window).height());
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

    var current = {number:0, time:Date.now()};

    sync1.owlCarousel({
        mouseDrag  : false,
        touchDrag  : false,
        singleItem : true,
        navigation : false,
        pagination : false,
        slideSpeed : 10,
        // afterAction : syncPosition,
        responsiveRefreshRate : 200,
        addClassActive : true,
        transitionStyle : "custom",
    });

    console.log(sync1.data('owlCarousel'));

    sync2.owlCarousel({
        items : 8,
        itemsDesktop      : [1199,10],
        itemsDesktopSmall : [979,10],
        itemsTablet       : [768,8],
        itemsMobile       : [479,4],
        pagination        : false,
        responsiveRefreshRate : 100,
        // afterInit : function(el){
        // console.log(el.find(".active").eq(0));
        // el.find(".active").eq(0).addClass("synced");
        // }
    });

    // function syncPosition(el){
    // var current = this.currentItem;
    // $(".sync2 .active").removeClass("synced");
    // $(".sync2 .owl-item").eq(current).addClass("synced");
    // if($(".sync2").data("owlCarousel") !== undefined){
    //     center(current)
    // }
    // }

    $(".sync2").on("mouseenter", ".owl-item", function(e){
        e.preventDefault();
        var owl = sync1.data('owlCarousel');
        var number = $(this).data("owlItem");
        var time = Date.now();
        if (number == current.number) return;
        if (time - current.time < 300) return;
        if (owl.isTransition) {
            $(owl.$owlItems[current.number])
                .toggleClass(owl.inClass, false)
                .toggleClass(owl.outClass, true);
            owl.isTransition = false;
        }
        owl.goTo(number);
        current.number = number;
        current.time = time;
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

