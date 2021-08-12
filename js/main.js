
(function ($) {
    "use strict";
    
    // loader
    var loader = function () {
        setTimeout(function () {
            if ($('#loader').length > 0) {
                $('#loader').removeClass('show');
            }
        }, 1);
    };
    loader();
    
    
    // Initiate the wowjs
    new WOW().init();
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });
    
    
    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $('.navbar').addClass('nav-sticky');
        } else {
            $('.navbar').removeClass('nav-sticky');
        }
    });
    
    
    // Smooth scrolling on the navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 45
            }, 1500, 'easeInOutExpo');
            
            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });
    
    
    // Typed Initiate
    if ($('.hero .hero-text h2').length == 1) {
        var typed_strings = $('.hero .hero-text .typed-text').text();
        var typed = new Typed('.hero .hero-text h2', {
            strings: typed_strings.split(', '),
            typeSpeed: 100,
            backSpeed: 20,
            smartBackspace: false,
            loop: true
        });
    }
    
    
    // Skills
    $('.skills').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});


    // Testimonials carousel
    $(".testimonials-carousel").owlCarousel({
        center: true,
        autoplay: true,
        dots: true,
        loop: true,
        responsive: {
            0:{
                items:1
            }
        }
    });
    
    
    
    // Portfolio filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });

    $('#portfolio-filter li').on('click', function () {
        $("#portfolio-filter li").removeClass('filter-active');
        $(this).addClass('filter-active');
        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });
    
})(jQuery);

$.validator.addMethod("alpha", function(value, element) {
    return this.optional(element) || value == value.match(/^[a-zA-Z\s]+$/);
    // --                                    or leave a space here ^^
});

jQuery.validator.addMethod("noSpace", function(value, element) { 
    return value == '' || value.trim(' ').length >=4;  
  }, "At leest four charecters");

//email
$.validator.addMethod("isEmail", function(value, element) {
    return this.optional(element) || value == value.match(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/i);
   
});

$("document").ready(function(){
    $("#navbarCollapse a").click(function(){
        $("#navbarCollapse").collapse("hide")
    })
    $("#form").validate({
        rules:{
            name:{
                
                required:true,
                minlength:4,
                alpha: true,
                noSpace: true
            },
            email:{
                required:true,
                isEmail:true
            },
            message:{
        required:true,
                minlength:10
            },
            mobile:{
        required:true,
                minlength:10,
                maxlength:10,
                number: true
            },
            
            
        },
        messages:{
            name:{
                alpha:"Please enter letters only"
            },
            email:{
                isEmail:"Email not valid"
            },
            mobile:{
                number:"Please enter a valued mobile number",
                minlength:"Please enter a valued mobile number",
                maxlength:"Please enter a valued mobile number",
                
            },
            

            
            
        }, 
        submitHandler:function(){
            $.ajax({
            url:"https://script.google.com/macros/s/AKfycbxGlsilJZQFzsOwUyU6thgnu-GewwiNgCFLmeH5kGZVHoejA9InHsbzAiW-a9tadTVCEA/exec ",
             data:$("#form").serialize(),
            method:"post",
            success:function (response){
            alert("Form submitted successfully")
            window.location.reload()
            //window.location.href="https://google.com"
        },
        error:function (err){
            alert("Something Error")

        }       
    })
        }
    })
    
})
