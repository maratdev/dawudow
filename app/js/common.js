$(function() {

    //Header во весь экран
    function heightDetect(){

        $(".revslider-initialised").css("height", $(window).height());

    }

    heightDetect();
    $(window).resize(function() {
        heightDetect();
    });


    var tpj=jQuery;

    var revapi285;
    tpj(document).ready(function() {
        if(tpj("#rev_slider_285_1").revolution == undefined){
            revslider_showDoubleJqueryError("#rev_slider_285_1");
        }else{
            revapi285 = tpj("#rev_slider_285_1").show().revolution({
                sliderType:"standard",
                jsFileLocation:"../libs/revslider/js/",
                sliderLayout:"fullscreen",
                dottedOverlay:"none",
                delay:9000,
                navigation: {
                    onHoverStop:"off",
                },
                responsiveLevels:[1240,1024,778,480],
                visibilityLevels:[1240,1024,778,480],
                gridwidth:[1400,1024,778,480],
                gridheight:[800,700,600,500],
                lazyType:"none",
                shadow:0,
                spinner:"off",
                stopLoop:"on",
                stopAfterLoops:0,
                stopAtSlide:1,
                shuffle:"off",
                autoHeight:"off",
                disableProgressBar:"on",
                hideThumbsOnMobile:"off",
                hideSliderAtLimit:0,
                hideCaptionAtLimit:0,
                hideAllCaptionAtLilmit:0,
                debugMode:false,
                fallbacks: {
                    simplifyAll:"off",
                    nextSlideOnWindowFocus:"off",
                    disableFocusListener:false,
                }
            });
        }
    }); /*ready*/





});
