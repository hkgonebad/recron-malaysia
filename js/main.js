AOS.init({
    easing: 'ease-out-back',
    duration: 1500,
    disable: 'mobile',
    offset: 10
});

// var Scrollbar = window.Scrollbar;

// Scrollbar.init(document.querySelector('body'));

//Header
var headerFixed = function () {
    if ($("header").hasClass("header-fixed")) {
      var nav = $(".mainHeader");

      if (nav.length) {
        var offsetTop = nav.offset().top,
          headerHeight = nav.height(),
          injectSpace = $("<div>", {
            height: headerHeight,
          });
        injectSpace.hide();

        if ($("header").hasClass("style-absolute")) {
          injectSpace.hide();
        } else {
          injectSpace.insertAfter(nav);
        }

        $(window).on("load scroll", function () {
          if ($(window).scrollTop() > offsetTop + headerHeight) {
            nav.addClass("is-fixed");
            injectSpace.show();
          } else {
            nav.removeClass("is-fixed");
            injectSpace.hide();
          }

          if ($(window).scrollTop() > 100) {
            nav.addClass("is-small");
          } else {
            nav.removeClass("is-small");
          }
        });
      }
    }
  };

// progress
var gotop = function() {
    if ($('div').hasClass('progress-wrap')) {
    var progressPath = document.querySelector('.progress-wrap path');
    var pathLength = progressPath.getTotalLength();
    progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
    progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
    progressPath.style.strokeDashoffset = pathLength;
    progressPath.getBoundingClientRect();
    progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
    var updateprogress = function() {
        var scroll = $(window).scrollTop();
        var height = $(document).height() - $(window).height();
        var progress = pathLength - (scroll * pathLength / height);
        progressPath.style.strokeDashoffset = progress;
    }
    updateprogress();
    $(window).scroll(updateprogress);
    var offset = 150;
    var duration = 550;
    $(window).on('scroll', function() {
        if ($(this).scrollTop() > offset) {
            $('.progress-wrap').addClass('active-progress');
        } else {
            $('.progress-wrap').removeClass('active-progress');
        }
    });
    $('.progress-wrap').on('click', function(event) {
        event.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, duration);
        return false;
    })
}}

// Cursor
const cursor = function () {
    // Cache the cursor elements
    const myCursor = $(".awz-mouse");
    if (myCursor.length) {
        // If the cursor elements exist and the body element exists
        if ($("body")) {
            // Get the cursor inner and outer elements
            const e = document.querySelector(".awz-mouse-inner"),
                t = document.querySelector(".awz-mouse-outer");
            
            let n, i = 0, o = false;
            
            // Track mouse movement
            window.onmousemove = function (s) {
                if (!o) {
                    t.style.transform = "translate(" + s.clientX + "px, " + s.clientY + "px)";
                }
                
                e.style.transform = "translate(" + s.clientX + "px, " + s.clientY + "px)";
                
                n = s.clientY;
                i = s.clientX;
            };
            
            // Add mouse hover classes on certain elements
            const hoverElements = [
                "a",
                ".link-text",
                ".progress-wrap",
                ".btn",
                ".accordion-button",
                ".nav-link",
                ".testiBox"
            ];
            
            $("body").on("mouseenter", hoverElements.join(), function () {
                e.classList.add("mouse-hover");
                t.classList.add("mouse-hover");
            });
            
            $("body").on("mouseleave", hoverElements.join(), function () {
                if ($(this).is("a") && $(this).closest(".canvas").length) {
                    return;
                }
                e.classList.remove("mouse-hover");
                t.classList.remove("mouse-hover");
            });
            
            // Make the cursor elements visible
            e.style.visibility = "visible";
            t.style.visibility = "visible";
        }
    }
};


///////////////////////////////////
$(function() {

    //Ukiyo
    new Ukiyo(".ukiyo");

    // Header
    const headerUrl = "header.html";
    $("#header").load(headerUrl, function() {

        // Active
        const currentUrl = window.location.href;
        $(".navbar-nav .nav-link, .navbar-nav .dropdown-item").each(function () {
            if (this.href === currentUrl) {
                $(this).addClass("active");
            }
        });

        headerFixed();
    })

    // Work Together CTA
    const wtCtaUrl = "work-together.html";
    $("#workTogether").load(wtCtaUrl, function() {
        
    });
    $("#workTogether2").load(wtCtaUrl, function() {
        
    });

    // Footer
    const footerUrl = "footer.html";
    
    $("#footer").load(footerUrl, function() {
        cursor();
        gotop();
    });

    // Counter
    $('.counter').each(function() {
        var $this = $(this),
            countTo = $this.attr('data-count');
        
        $({ countNum: $this.text()}).animate({
          countNum: countTo
        },
      
        {
      
          duration: 8000,
          easing:'linear',
          step: function() {
            $this.text(Math.floor(this.countNum));
          },
          complete: function() {
            $this.text(this.countNum);
            //alert('finished');
          }
      
        });
    });

    // Main Slider
    if ($('.mainSlider').length > 0) {

        $('.mainSlider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            autoplay: true,
            autoplayDuration: 3000,
            arrows: true,
            prevArrow: $('.prevMs'),
            nextArrow: $('.nextMs'),
        });
    }


    // Industry Slider
    if ($('.testiSlider').length > 0) {

        $('.testiSlider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            arrows: false,
            autoplay: true,
            autoplayDuration: 3000,
        });
    }

    // Mobile - Clients Slider
    if ($('.caSlide1').length > 0) {

        $('.caSlide1').slick({
            slidesToShow: 5,
            slidesToScroll: 1,
            infinite: true,
            dots: false,
            autoplay: true,
            autoplayDuration: 3000,

            responsive: [{
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                }}
            ]
        });
    }

    // Mobile - Clients Slider
    if ($('.caSlide2').length > 0) {

        $('.caSlide2').slick({
            slidesToShow: 5,
            slidesToScroll: 1,
            infinite: true,
            dots: false,
            autoplay: true,
            autoplayDuration: 2500,

            responsive: [{
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                }}
            ]
        });
    }

    // Services Slide
    if ($('.servicesSlide').length > 0) {

        $('.servicesSlide').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            dots: true,
            arrows: true,
            autoplay: true,
            autoplayDuration: 2500,

            responsive: [{
                breakpoint: 1000,
                settings: {
                    slidesToShow: 3,
                }},
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                }},
            {
                breakpoint: 320,
                settings: {
                    slidesToShow: 1,
                }}
            ]
        });
    }

    // Solutions
    // Get all the solutionBox elements
    const solutionBoxes = $(".solutionBox");

    // Loop through each solutionBox
    solutionBoxes.each(function () {
        const image = $(this).find("img");
        const originalSrc = image.attr("src");
        const newSrc = originalSrc.replace("-orange.svg", "-black.svg");

        // On hover, change the image source to the black version
        $(this).hover(
            function () {
                image.attr("src", newSrc);
            },
            function () {
                image.attr("src", originalSrc);
            }
        );
    });


    // Portfolio
    ///////////////////////////////////////////

    // Isotope
    // if ($('.grid').length > 0) {

    //     // init Isotope
    //     var $grid = $('.grid').isotope({
    //         // options...
    //         itemSelector: '.grid-item',
    //         percentPosition: true,
    //         masonry: {
    //             // use element for option
    //             columnWidth: '.grid-sizer'
    //         }
    //     });
    //     // layout Isotope after each image loads
    //     $grid.imagesLoaded().progress( function() {
    //         $grid.isotope('layout');
    //     });

    // }

    // Fancybox
    if ($('[data-fancybox]').length > 0) {
        Fancybox.bind("[data-fancybox]", {
            // Your custom options
        });
    }

})