jQuery(document).ready(function($) {  
  // Owl Carousel                     
  var owl = $('.carousel-default');
  owl.owlCarousel({
    nav: true,
    dots: true,
    items: 1,
    loop: true,
    navText: ["&#xe605","&#xe606"],
    autoplay: true,
    autoplayTimeout: 4000
  });

  // Owl Carousel - Content Blocks  
  var owl = $('.carousel-blocks');
  owl.owlCarousel({
    nav: true,
    dots: false,
    items: 4,
    responsive: {
      0: {
        items: 1
      },
      481: {
        items: 3
      },
      769: {
        items: 4
      }
    },
    loop: true,
    navText: ["&#xe605","&#xe606"],
    autoplay: true,
    autoplayTimeout: 5000
  });
  
  // Owl Carousel - Content 3 Blocks
  var owl = $('.carousel-3-blocks');
  owl.owlCarousel({
    nav: true,
    dots: true,
    items: 3,
    responsive: {
      0: {
        items: 1
      },
      481: {
        items: 3
      },
      769: {
        items: 4
      }
    },
    loop: true,
    navText: ["&#xe605","&#xe606"],
    autoplay: true,
    autoplayTimeout: 5000
  });  
  
  var owl = $('.carousel-fade-transition');
  owl.owlCarousel({
    nav: true,
    dots: true,
    items: 1,
    loop: true,
    navText: ["&#xe605","&#xe606"],
    autoplay: true,
    animateOut: 'fadeOut',
    autoplayTimeout: 4000
  });    
  
  
  // Sticky Nav Bar
  $(window).scroll(function() {
    if ($(this).scrollTop() > 20){  
        $('.sticky').addClass("fixed");
    }
    else{
        $('.sticky').removeClass("fixed");
    }
  });

  /*------------------------------*/
/*  Smooth scroll
/*------------------------------*/


(function($) { "use strict";
$(".scroll a[href^='#']").on('click', function(e) {
   e.preventDefault();
   var hash = this.hash;
   $('html, body').stop().animate({
     scrollTop: $(hash).offset().top}, 2000, 'easeOutExpo');
});
 })(jQuery);

$('.collapse ul li a').click(function(){ 
$('.navbar-toggle:visible').click();
 });	

 /*------------------------------*/
/*  Scroll to top
/*------------------------------*/
	 
$(window).scroll(function(){
  if ($(this).scrollTop() > 100) {
      $('.scrollup').fadeIn();
  } else {
      $('.scrollup').fadeOut();
  }
}); 

$('.scrollup').click(function(){
  $("html, body").animate({ scrollTop: 0 }, 2000);
  return false;
});

 /*------------------------------*/
/*	Page loader
/*------------------------------*/


 	// Preloader
   $(window).on('load', function () {
		if ($('#preloader').length) {
		$('#preloader').delay(100).fadeOut('slow', function () {
			$(this).remove();
		});
		}
	});
  
  
  // Owl Carousel - Content 5 Blocks
  $(".carousel-5-blocks").owlCarousel({
     slideSpeed: 300,
     autoPlay: 5000,
     navigation: true,
     navigationText: ["&#xe605","&#xe606"],
     pagination: false,
     addClassActive: true,
     items: 5,
     itemsDesktop: [768,3],
     itemsDesktopSmall: [480,1]
  });
    
});