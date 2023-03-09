
(function ($) {
	"use strict";
	var nav = $('nav');
  	var navHeight = nav.outerHeight();
	let index_actual = 0;
	const URL_comments = "../js/comments.json";
	const URL_articles = "../js/articles.json";
	let articles = [];
	let _array_filtrado = [];
	let comment = {};
  
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

	/*																*/
	/*						BLOG-SINGLE.HTML						*/
	/*																*/

	//FUNCION QUE TOMA LA URL Y MUESTRA EL EL ARTICULO O EL LISTADO DE ARTICULOS
	$(document).ready(function(){
		var Url = $(location). attr('href');
		request_articles(Url[Url.search("id")+3]);
		request_comments(Url[Url.search("id")+3]);
	})

	//FUNCION QUE RECUPERA EL ARCHIVO JSON DE LOS ARTICULOS DEL BLOG
	function request_articles(_id_article = null) {
		const request = new XMLHttpRequest();
			request.open('GET', URL_articles);
			request.responseType = 'json';
			request.send();

			request.onload = function() {
				articles = request.response;
				(_id_article)?load_articles(_id_article, articles):load_cards(articles);
			}
	}

	//FUNCION QUE CARGA EL/LOS ARTICULOS DEL BLOG
	function load_articles(_id_article, articles) {
		load_tags(articles);
		if(_id_article >= 0){
			articles.forEach(element => {
				if(element.id == _id_article){
					$("#blog .blog-title").hide();
					$("#blog .blog-footer").hide();
					$(".breadcrumb-item.active").text(element.title);
					$("#noteBox").append(
						`<div class="post-box">
							<div class="post-thumb">
								<img src="${element.mainImage}" class="img-fluid" alt="${element.title}">
							</div>
							<div class="post-meta">
								<h1 class="article-title">${element.title}</h1>
								<ul>
								<li>
									<span class="ion-ios-person"></span>
									<a>${element.author}</a>
								</li>
								<li>
									<span class="ion-pricetag"></span>
									<a>${element.tag}</a>
								</li>
								<li>
									<span class="ion-ios-book"></span>
									<a>${element.readTime} min</a>
								</li>
								</ul>
							</div>
							<div class="article-content">
								<p>
									${element.section1.pg1}
								</p>
								<p>
									${element.section1.pg2}
								</p>
								<p>
									${element.section1.pg3}
								</p>
								<div class="post-thumb">
									<img src="${element.section1.picture1}" class="img-fluid" alt="${element.title}">
									<div>
										<h6>
											${element.section1.footerPicture}
										</h6>
									</div>
								</div>
								<p>
										${element.section1.pg4}
								</p>
								<blockquote class="blockquote">
								<p class="mb-0">${element.section2.quote}</p>
								</blockquote>
								<p>
									${element.section3.pg1}
								</p>
								<p>
									${element.section3.pg2}
								</p>
								<p>
									${element.section3.pg3}
								</p>
							</div>
							<div class="article-footer">
								<div class="article-date">
									<span class="ion-calendar"></span> ${new Date(element.date).toLocaleDateString('es')}
								</div>
							</div>
						</div>`
					);
					$("#box-comments").show();
					$('#input_id_article').val(_id_article);
					$('#input_author_comment').val("");
				}
			});
		} else{
			$(".breadcrumb-item.active").text("Listado");
			//mostrar listado de artículos
			order_blog("newest", articles);
			$("#box-comments").hide();
		}
	}

	//FUNCION QUE RECUPERA EL ARCHIVO JSON DE LOS COMENTARIOS
	function request_comments(_id_article) {
		const request = new XMLHttpRequest();
			request.open('GET', URL_comments);
			request.responseType = 'json';
			request.send();

			request.onload = function() {
				const comments = request.response;
				load_comments(_id_article, comments);
			}
	}

	//FUNCION QUE CARGA LOS COMENTARIOS DEL BLOG CARGADO
	function load_comments(_id_article, comments) {
		var empty = true;
		if(comments.length){
			comments.forEach(element => {
				if(element.id_article == _id_article) {
					empty = false;
					$(".list-comments").append(
						`<li>
							<div class="comment-avatar">
								<img src="img/user.png" alt="">
							</div>
							<div class="comment-details">
								<h4 class="comment-author">${element.author}</h4>
								<span>${element.date}</span>
								<p>
									${element.comment}
								</p>
								<button type="button" class="btn btn-light btn_replies" name="${element.author}">Responder</button>
							</div>
						  </li>`
					);
					if(element.replies.length){
						element.replies.forEach(data => {
							$(".list-comments").append(
								`<li class="comment-children">
									<div class="comment-avatar">
										<img src="img/user.png" alt="">
									</div>
									<div class="comment-details">
										<h4 class="comment-author">${data.author}</h4>
										<span>${data.date}</span>
										<p>
											${data.comment}
										</p>
									</div>
								  </li>`
							);
						})
					}
				}
			})
			if(empty) {
				$(".list-comments").append(
					`<li>
						<p class="ml-3">No hay comentarios. Sé el primero en comentar!</p>
					  </li>`
				)
			}
		} else{
			$(".list-comments").append(
				`<li>
					<p>No hay comentarios. Sé el primero en comentar!</p>
			  	</li>`
			)
		}
	}

	//FUNCION QUE CARGA EL LISTADO DE ENTRADAS DEL BLOG
	function load_index_blog(_array_filtrado, _page, _quantity){
		$(".breadcrumb-item.active").text("Listado");
		$("#blog .blog-title").show();
		$("#noteBox").empty();
		$(".blog-footer ul").empty();
		if(_quantity < 10){
			$(".blog-footer").hide();
		} else{
			var pages = Math.ceil(_quantity/10);
			$(".blog-footer ul").append(`<li><span class="" title="Anterior"><<</span></li>`)
			for (let i = 0; i < pages; i++) {
				$(".blog-footer ul").append(`<li><span class="${(_page == i)?"active":""}" title="Página ${i + 1}">${i + 1}</span></li>`)
			}
			$(".blog-footer ul").append(`<li><span class="" title="Siguiente">>></span></li>`)
			$(".blog-footer").show();
		}
		_array_filtrado.forEach(element => {
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
								<span class="ion-calendar"></span> ${new Date(element.date).toLocaleDateString('es')}
							</div>
						</div>
					</div>
				</a>`
			)
		});
	}

	//FUNCION QUE MUESTRA LOS TAGS EN LA PAGINA BLOG 
	function load_tags(_articles){
		var hash = {}
		var list = _articles.filter(function(current){
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
	}

	//FUNCION PAGINADOR DEL BLOG
	function paginador(_array_filtrado, _page){
		load_index_blog(_array_filtrado.filter( (element, index) => (index >= _page*10)&&(index < ((_page*10) + 10))), _page, _array_filtrado.length);
    }

	//FUNCION QUE ORDENA EL ARRAY DE LAS ENTRADAS DEL BLOG
	function order_blog(_order = null, _articles){
		if(!_array_filtrado.length){
			_array_filtrado = _articles;
		}
		if(_order){
			switch (_order) {
				case "newest":
					_array_filtrado = _array_filtrado.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());//mayor a menor
					paginador(_array_filtrado, 0);
					break;
				case "oldest":
					_array_filtrado = _array_filtrado.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());//menor a mayor
					paginador(_array_filtrado, 0);
					break;
				default:
					_array_filtrado = _array_filtrado.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());//mayor a menor
					paginador(_array_filtrado, 0);
					break;
			}
		}
	}

	//FUNCION QUE OBTIENE EL ESTADO ACTUAL DEL PAGINADOR
	function actual_page(){
			for (let j = 0; j < $(".blog-footer ul li").length; j++) {
				if($(".blog-footer ul li span.active")[j]){
					return $(".blog-footer ul li span.active")[j].innerText;
				}
			}
	}

	//FUNCION QUE EJECUTA LOS FILTROS SOLICITADOS DE LAS ENTRADAS DEL BLOG
	function filter_blog(_page = null, _tag = null, _text = null){
		//Realizo los procedimientos de filtrado sobre el array "article" y los paso a uno nuevo y ese nuevo array es el que paso a load_blog()
		if(_page){
			switch (_page) {
				case "<<":
					paginador(_array_filtrado, actual_page() - 2);
					break;
				case ">>":
					paginador(_array_filtrado, actual_page());
					break;
				default:
					paginador(_array_filtrado, _page - 1);
					break;
			}
		}
		if(_tag){
			_array_filtrado = articles.filter(element => element.tag == _tag);
			paginador(_array_filtrado, 0);
		}
		if(_text){
			_array_filtrado = articles.filter(element => element.title.toLowerCase().includes(_text.toLowerCase()));
			paginador(_array_filtrado, 0);
		}
	}

	//FUNCION QUE TOMA EL CAMBIO DEL SELECT PARA ORDENAR LAS ENTRADAS DEL BLOG
	$("#order-blog").on("change", function(){
		order_blog(this.value, articles);
	})

	//FUNCION QUE TOMA EL EVENTO CLICK SOBRE LOS TAGS Y MANDA LA ORDEN PARA SU FILTRADO
	$('#tag-filter').on('click','li',function(e) {
		history.pushState(null, "", "blog-single.html?id=-1");
		$("#box-comments").hide();
		filter_blog(null, e.target.innerText, null);
		$("#filter-value").text(e.target.innerText);
		$(".blog-title-dinamic div").show();
	});

	//FUNCION QUE ELIMINA FILTROS
	$('.blog-title-dinamic div').on('click',function(e) {
		_array_filtrado = articles;
		paginador(_array_filtrado, 0);
		$("#filter-value").text("");
		$(".blog-title-dinamic div").hide();
	});

	//FUNCION QUE TOMA EL EVENTO ENTER DEL INPUT SEARCH
	$("#search-input").keypress(function(e){
		if(e.which == 13) {
			e.preventDefault();
			if(this.value != ""){
				history.pushState(null, "", "blog-single.html?id=-1");
				$("#box-comments").hide();
				filter_blog(null, null, this.value);
				$("#filter-value").text(this.value);
				$(".blog-title-dinamic div").show();
				$("#search-input").val("");
			}
		  }
	});

	//FUNCION QUE TOMA EL EVENTO CLICK DE SEARCH BUTTON
	$("#search-btn").click(function(e){
		if($("#search-input").val()){
			history.pushState(null, "", "blog-single.html?id=-1");
			$("#box-comments").hide();
			filter_blog(null, null, $("#search-input").val());
			$("#filter-value").text($("#search-input").val());
			$(".blog-title-dinamic div").show();
			$("#search-input").val("");
		}
	});

	//FUNCION QUE TOMA EL EVENTO DE CLICK SOBRE EL PAGINADOR
	$('.blog-footer ul').on('click','li',function(e){
		var actual = actual_page();
		switch (e.target.innerText) {
			case "<<":
				if(actual != "1"){
					paginador(_array_filtrado, actual*1 - 2);
				}
				break;
			case ">>":
				if(actual*1 < Math.ceil(_array_filtrado.length/10)){
					paginador(_array_filtrado, actual*1);
				}
				break;
			default:
				paginador(_array_filtrado, e.target.innerText - 1);
				break;
		}
	});

	//FUNCION QUE LLEVA A RESPONDER A UN COMENTARIO
	$(document).on("click", ".btn_replies",function(){
		$('#box_title_comment').text(`Responder a "${$(this)[0].name}"`);
		$('.button-b').show();
		$('#input_author_comment').val($(this)[0].name);
		$("html,body").animate({scrollTop: $('#form-comments').offset().top}, 1500, "easeInOutExpo");
	});

	//FUNCION QUE ELIMINA LA INTENCION DE RESPUESTA A UN COMENTARIO
	$(document).on('click', ".button-b", function(){
		$('#box_title_comment').text('Escribí un comentario');
		$('.button-b').hide();
		$('#input_author_comment').val("");
		$("#form_comment input[type=text], #form_comment input[type=email], #form_comment textarea").each(function() { this.value = '' });
	})
	
	//FUNCION QUE ENVIA EL COMENTARIO O LA REPLICA Y LA ALMACENA
	$('#form_comment').submit(function() {
		var f = $(this).find('.form-group'),
		  ferror = false,
		  emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;
	
		f.children('input').each(function() { // run all inputs
	
		  var i = $(this); // current input
		  var rule = i.attr('data-rule');
	
		  if (rule !== undefined) {
			var ierror = false; // error flag for current input
			var pos = rule.indexOf(':', 0);
			if (pos >= 0) {
			  var exp = rule.substr(pos + 1, rule.length);
			  rule = rule.substr(0, pos);
			} else {
			  rule = rule.substr(pos + 1, rule.length);
			}
	
			switch (rule) {
			  case 'required':
				if (i.val() === '') {
				  ferror = ierror = true;
				}
				break;
	
			  case 'minlen':
				if (i.val().length < parseInt(exp)) {
				  ferror = ierror = true;
				}
				break;
	
			  case 'email':
				if (!emailExp.test(i.val())) {
				  ferror = ierror = true;
				}
				break;
	
			  case 'checked':
				if (! i.is(':checked')) {
				  ferror = ierror = true;
				}
				break;
	
			  case 'regexp':
				exp = new RegExp(exp);
				if (!exp.test(i.val())) {
				  ferror = ierror = true;
				}
				break;
			}
			i.next('.validation_comment').html((ierror ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
		  }
		});
		f.children('textarea').each(function() { // run all inputs
	
		  var i = $(this); // current input
		  var rule = i.attr('data-rule');
	
		  if (rule !== undefined) {
			var ierror = false; // error flag for current input
			var pos = rule.indexOf(':', 0);
			if (pos >= 0) {
			  var exp = rule.substr(pos + 1, rule.length);
			  rule = rule.substr(0, pos);
			} else {
			  rule = rule.substr(pos + 1, rule.length);
			}
	
			switch (rule) {
			  case 'required':
				if (i.val() === '') {
				  ferror = ierror = true;
				}
				break;
	
			  case 'minlen':
				if (i.val().length < parseInt(exp)) {
				  ferror = ierror = true;
				}
				break;
			}
			i.next('.validation_comment').html((ierror ? (i.attr('data-msg') != undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
		  }
		});
		if (ferror){
		  return false;
		} else{
		  $("#submit_comment").prop('disabled', true);
		  var str = $('#form_comment').serializeArray();
		  str.forEach(element => {
			switch (element.name) {
				case 'id_article':
					comment.id_article = element.value;
					break;
				case 'name':
					comment.author = element.value;
					break;
				case 'email':
					comment.email = element.value;
					break;
				case 'comment':
					comment.comment = element.value;
					break;
				default:
					break;
			}
		  })
		  const date = new Date();
		  comment.date = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
		  comment.replies = [];
			console.log(comment);
			let data = JSON.stringify(comment);
			/*
			const petition = new XMLHttpRequest();
			petition.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
			petition.open('POST', URL_comments, true);
			petition.onreadystatechange = function() {
				if(petition.readyState == 4 && petition.status == 200) { 
				   //aqui obtienes la respuesta de tu peticion
				   console.log(petition.responseText);
				}
			}
			petition.send(JSON.stringify(comment));
			*/

			//var data = { email : $('#email').val(), password : $('#pass').val() };
        	$.ajax({
                url : '../php/send_comment.php',
				data: data,
                method : 'post', //en este caso
                dataType : 'json',
                success : function(response){
                       //codigo de exito
					   console.log('Ok')
                },
                error: function(error){
                       //codigo error
					   console.warn('No anduvo')
                }
        });


		  return false;
		}
	});



	/*																*/
	/*							INDEX.HTML							*/
	/*																*/

	//FUNCION QUE INICIALIZA LA CARGA DE LOS CARDS DEL BLOG
	$(document).ready(function(){
		request_articles();
	});

	//FUNCION QUE MUESTRA LOS CARDS DEL BLOG COMO MUESTRA
	function load_cards(_articles) {
		var muestra = _articles.sort((a, b) => b.date - a.date).filter( (element, index) => (index < 6))
		muestra.forEach(element => {
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
	}

	//FUNCION QUE ABRE EL MODAL DE MODELOS PARA MARKET
	$('#btn_models').on('click', function() {
		model_iframe(modelos[index_actual].id, modelos[index_actual].value);
		$('#models').modal('show');
	})

	//FUNCION QUE CIERRA EL MODAL DE MODELOS PARA MARKET
	$('.btn-close').on('click', function() {
		$('#models').modal('hide');
		index_actual = 0;
	})

	//FUNCION QUE VALORIZA EL IFRAME DE MODELOS CON UN SRC
	function model_iframe(number, src){
		$('.model_number').text(number);
		$('.model_src').attr('src', src);
	} 

	//FUNCION QUE RETROCEDE UNA POSICION DE CADA MODELO
	$('#btn-prev').on('click', function() {
		if($('.model_number').text() == 1){
			index_actual = (modelos.length - 1);
		} else{
			index_actual--;
		}
		model_iframe(modelos[index_actual].id, modelos[index_actual].value);
	})

	//FUNCION QUE ADELANTA UNA POSICION DE CADA MODELO
	$('#btn-next').on('click', function() {
		if($('.model_number').text() == modelos.length){
			index_actual = 0;
		} else{
			index_actual++;
		}
		model_iframe(modelos[index_actual].id, modelos[index_actual].value);
	})


})(jQuery);
