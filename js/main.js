
(function ($) {
	"use strict";
	var nav = $('nav');
  var navHeight = nav.outerHeight();
  
  $('.navbar-toggler').on('click', function() {
    if( ! $('#mainNav').hasClass('navbar-reduce')) {
      $('#mainNav').addClass('navbar-reduce');
    }
  })

  // Preloader
  $(window).on('load', function () {
    if ($('#preloader').length) {
      $('#preloader').delay(100).fadeOut('slow', function () {
        $(this).remove();
      });
    }
  });

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function(){
    $('html, body').animate({scrollTop : 0},1500, 'easeInOutExpo');
    return false;
  });

	/*--/ Star ScrollTop /--*/
	$('.scrolltop-mf').on("click", function () {
		$('html, body').animate({
			scrollTop: 0
		}, 1000);
	});

	/*--/ Star Counter /--*/
	$('.counter').counterUp({
		delay: 15,
		time: 2000
	});

	/*--/ Star Scrolling nav /--*/
	$('a.js-scroll[href*="#"]:not([href="#"])').on("click", function () {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html, body').animate({
					scrollTop: (target.offset().top - navHeight + 5)
				}, 1000, "easeInOutExpo");
				return false;
			}
		}
	});

	// Closes responsive menu when a scroll trigger link is clicked
	$('.js-scroll').on("click", function () {
		$('.navbar-collapse').collapse('hide');
	});

	// Activate scrollspy to add active class to navbar items on scroll
	$('body').scrollspy({
		target: '#mainNav',
		offset: navHeight
	});
	/*--/ End Scrolling nav /--*/

	/*--/ Navbar Menu Reduce /--*/
	$(window).trigger('scroll');
	$(window).on('scroll', function () {
		var pixels = 50; 
		var top = 1200;
		if ($(window).scrollTop() > pixels) {
			$('.navbar-expand-md').addClass('navbar-reduce');
			$('.navbar-expand-md').removeClass('navbar-trans');
		} else {
			$('.navbar-expand-md').addClass('navbar-trans');
			$('.navbar-expand-md').removeClass('navbar-reduce');
		}
		if ($(window).scrollTop() > top) {
			$('.scrolltop-mf').fadeIn(1000, "easeInOutExpo");
		} else {
			$('.scrolltop-mf').fadeOut(1000, "easeInOutExpo");
		}
	});

	/*--/ Star Typed /--*/
	if ($('.text-slider').length == 1) {
    var typed_strings = $('.text-slider-items').text();
		var typed = new Typed('.text-slider', {
			strings: typed_strings.split(','),
			typeSpeed: 80,
			loop: true,
			backDelay: 1100,
			backSpeed: 30
		});
	}

	/*--/ Testimonials owl /--*/
	$('#testimonial-mf').owlCarousel({
		margin: 20,
		autoplay: true,
		autoplayTimeout: 4000,
		autoplayHoverPause: true,
		responsive: {
			0: {
				items: 1,
			}
		}
	});

	$(document).ready(function(){ 
		article.forEach(element => {
			$("#articleBox").append(
				`<div class="col-md-4">
					<a href="blog-single.html?id=${element.id}#blog">
						<div class="card card-blog">
							<div class="card-img">
								<img src="${element.thumbnail}" alt="${element.title}" class="img-fluid">
							</div>
							<div class="card-body">
								<div class="card-category-box">
									<div class="card-category">
										<h6 class="category">${element.tag}</h6>
									</div>
								</div>
								<h3 class="card-title">${element.title}</h3>
								<p class="card-description">
									${element.description}
								</p>
							</div>
							<div class="card-footer">
								<div class="post-author">
									<img src="${element.authorThumbnail}" alt="" class="avatar rounded-circle">
									<span class="author">${element.author}</span>
								</div>
								<div class="post-date">
									<span class="ion-ios-clock-outline"></span> ${element.readTime} min
								</div>
							</div>
						</div>
					</a>
				</div>`
			);
		});
	 })

	 $(document).ready(function(){
		var Url = $(location). attr('href');
		if(Url.search("id") != -1){
			if(Url[Url.search("id")+3] >= 0){
				console.log(Url[Url.search("id")+3]);
				var note;
				article.forEach(element => {
					if(element.id == Url[Url.search("id")+3]){
						note = element;
					}
				});
				$(".breadcrumb-item.active").text(note.title);
				$("#noteBox").append(
					`<div class="post-box">
						<div class="post-thumb">
							<img src="${note.mainImage}" class="img-fluid" alt="${note.title}">
						</div>
						<div class="post-meta">
							<h1 class="article-title">${note.title}</h1>
							<ul>
							<li>
								<span class="ion-ios-person"></span>
								<a>${note.author}</a>
							</li>
							<li>
								<span class="ion-pricetag"></span>
								<a>${note.tag}</a>
							</li>
							<li>
								<span class="ion-ios-book"></span>
								<a>${note.readTime} min</a>
							</li>
							</ul>
						</div>
						<div class="article-content">
							<p>
								${note.section1.pg1}
							</p>
							<p>
								${note.section1.pg2}
							</p>
							<p>
								${note.section1.pg3}
							</p>
							<div class="post-thumb">
								<img src="${note.section1.picture1}" class="img-fluid" alt="${note.title}">
								<div>
									<h6>
										${note.section1.footerPicture}
									</h6>
								</div>
							</div>
							<p>
									${note.section1.pg4}
							</p>
							<blockquote class="blockquote">
							<p class="mb-0">${note.section2.quote}</p>
							</blockquote>
							<p>
								${note.section3.pg1}
							</p>
							<p>
								${note.section3.pg2}
							</p>
							<p>
								${note.section3.pg3}
							</p>
						</div>
				  	</div>`
				);
			} else{
				$(".breadcrumb-item.active").text("Listado");
				//mostrar listado de artículos
				article.sort((a, b) => b.date - a.date);//mayor a menor
				article.forEach(element => {
					console.log(element.date)
				});
				/*de menor a mayor
				article.sort((a, b) => a.date - b.date);//menor a mayor
				article.forEach(element => {
					console.log(element.date)
				}); */
				$("#noteBox").append(
					`<div class="blog-title">
						<h5 class="sidebar-title">Listado de contenido</h5>
						<div class="sidebar-content">

						</div>
					</div>`
				);
				article.forEach(element => {
					$("#noteBox").append(
						`<a href="blog-single.html?id=${element.id}#blog">
							<div class="blog-list">
								<div class="blog-content">
									<div class="blog-thumb">
										<img src="${element.thumbnail}" class="img-fluid" alt="${element.title}">
									</div>
									<div class="blog-text">
										<h5 class="sidebar-title">${element.title}</h5>
										<div class="sidebar-content">
											<p>
												${element.description}
											</p>
										</div>
									</div>
								</div>
								<div class="sidebar-footer">
									<div class="post-date">
										<span class="ion-ios-clock-outline"></span> ${element.date.toLocaleDateString()}
									</div>
								</div>
							</div>
						</a>`
					)
				});
			}
		}
		
	 })

})(jQuery);
