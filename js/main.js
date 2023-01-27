
(function ($) {
	"use strict";
	var nav = $('nav');
  	var navHeight = nav.outerHeight();
	let _array = [];
  
  $('.navbar-toggler').on('click', function() {
    if( ! $('#mainNav').hasClass('navbar-reduce')) {
      $('#mainNav').addClass('navbar-reduce');
    }
  })

  // Preloader
  $(window).on('load', function () {
	$(".blog-title-dinamic div").hide();
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

	//FUNCION QUE MUESTRA LOS CARD DE ARTICULOS EN LA PAGINA PRINCIPAL
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

	//FUNCION QUE CARGA LOS DATOS
	function load_blog(_array, _page, _quantity){
	$("#noteBox").empty();
	$(".blog-footer ul").empty();
	if(_quantity < 10){
		$(".blog-footer").hide();
	} else{
		var pages = Math.ceil(_quantity/10);
		$(".blog-footer ul").append(`<li><span class="" title="Anterior"><<</span></li>`)
		for (let i = 0; i < pages; i++) {
			$(".blog-footer ul").append(`<li><span class="${(_page == i)?"active":""}" title="Anterior">${i + 1}</span></li>`)
		}
		$(".blog-footer ul").append(`<li><span class="" title="Anterior">>></span></li>`)
	}
	_array.forEach(element => {
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

	//FUNCION QUE FILTRA EL ARRAY PARA PAGINADOR
	function paginador(_array, _page){
		load_blog(_array.filter( (element, index) => (index >= (_page - 1)*10)&&(index < (((_page - 1)*10) + 10))), _page, _array.length);
    }

	//FUNCION QUE ORDENA EL ARRAY DE LAS ENTRADAS DEL BLOG
	function order_blog(_order = null){
		if(!_array.length){
			_array = article;
		}
		if(_order){
			switch (_order) {
				case "newest":
					_array = _array.sort((a, b) => b.date - a.date);//mayor a menor
					paginador(_array, 0);
					break;
				case "oldest":
					_array = _array.sort((a, b) => a.date - b.date);//menor a mayor
					paginador(_array, 0);
					break;
				default:
					_array = _array.sort((a, b) => b.date - a.date);//mayor a menor
					paginador(_array, 0);
					break;
			}
		}
	}

	//FUNCION QUE EJECUTA LOS FILTROS SOLICITADOS DE LAS ENTRADAS DEL BLOG
	function filter_blog(_page = null, _tag = null, _text = null){
		//Realizo los procedimientos de filtrado sobre el array "article" y los paso a uno nuevo y ese nuevo array es el que paso a load_blog()
		if(_page){
			var actual_page = 0;
			for (let j = 0; j < $(".blog-footer ul li").length; j++) {
				if($(".blog-footer ul li span.active")[j]){
					actual_page = $(".blog-footer ul li span.active")[j].innerText;
				}
			}
			console.log(actual_page)
			switch (_page) {
				case "<<":
					console.log("Anterior")
					paginador(_array, actual_page);
					break;
				case ">>":
					console.log("Siguiente")
					paginador(_array, actual_page);
					break;
				default:
					console.log(_page)
					paginador(_array, _page);
					break;
			}
		}
		if(_tag){
			_array = article.filter(element => element.tag == _tag);
			paginador(_array, 0);
		}
		if(_text){
			console.log(_text)
			_array = article.filter(element => element.title.toLowerCase().includes(_text.toLowerCase()));
			paginador(_array, 0);
		}
	}

	//FUNCION QUE TOMA LA URL Y MUESTRA EL EL ARTICULO O EL LISTADO DE ARTICULOS
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
				$("#blog .blog-title").hide();
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
				order_blog("newest");
			}
		}
	})

	//FUNCION QUE MUESTRA LOS TAGS EN LA PAGINA BLOG 
	$(document).ready(function(){
	var hash = {}
	var list = article.filter(function(current){
		var exists = !hash[current.tag];
		hash[current.tag] = true;
		return exists;
	});
	list.forEach(element => {
		$("#tag-filter").append(
			`<li>
				<span>${element.tag}</span>
			</li>`
		)
	});
	})

	//FUNCION QUE TOMA EL CAMBIO DEL SELECT PARA ORDENAR LAS ENTRADAS DEL BLOG
	$("#order-blog").on("change", function(){
		order_blog(this.value);
	})

	//FUNCION QUE TOMA EL EVENTO CLICK SOBRE LOS TAGS Y MANDA LA ORDEN PARA SU FILTRADO
	$('#tag-filter').on('click','li',function(e) {
		filter_blog(null, e.target.innerText, null);
		$("#filter-value").text(e.target.innerText);
		$(".blog-title-dinamic div").show();
	});

	//FUNCION QUE TOMA EL EVENTO ENTER DEL INPUT SEARCH
	$("#search-input").keypress(function(e){
		if(e.which == 13) {
			e.preventDefault();
			if(this.value != ""){
				filter_blog(null, null, this.value);
				$("#filter-value").text(this.value);
				$(".blog-title-dinamic div").show();
			}
		  }
	});

	//FUNCION QUE TOMA EL EVENTO CLICK DE SEARCH BUTTON
	$("#search-btn").click(function(e){
		if($("#search-input").val()){
			filter_blog(null, null, $("#search-input").val());
			$("#filter-value").text($("#search-input").val());
			$(".blog-title-dinamic div").show();
		}
	});

	//FUNCION QUE TOMA EL EVENTO DE CLICK SOBRE EL PAGINADOR
	$('.blog-footer ul').on('click','li',function(e) {
		filter_blog(e.target.innerText, null, null)
	});


})(jQuery);
