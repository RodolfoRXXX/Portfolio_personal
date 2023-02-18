jQuery(document).ready(function($) {   
    
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
      
  });