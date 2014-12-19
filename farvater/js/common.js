head.ready(function() {

	// agent
	var agent = navigator.userAgent,
	event = (agent.match(/iPad/i)) ? 'touchstart' : 'click';

	// popups
	$(document).bind(event, function(e){
		$('.js-popup').hide();
	});

	// raty
		// read
		var raty_read = $('.js-rating-read');
		if (raty_read.length) {
			raty_read.each(function(){
				var raty_counter = $(this).find('.rating__counter span'),
						raty_stars = $(this).find('.rating__stars');
				raty_stars.raty({
					readOnly: true,
					starOn: 'img/icons/star.png',
					starOff: '',
					target: raty_counter,
					targetKeep: true,
					precision: true,
					halfShow: false,
					width: 'auto',
					score: function() {
					  return $(this).attr('data-score');
					},
					number: function() {
					  return $(this).attr('data-number');
					}
				});
			});
		};
		// search
		var search_adults = $('.search__adults-list'),
				search_kids = $('.search__kids-list'),
				search_babies = $('.search__babies-list');
		if (search_adults.length) {
			search_adults.raty({
			  starOff: 'img/adult.png',
			  starOn: 'img/adult-h.png',
			  target: '#counter-adults',
			  targetType: 'number',
			  targetText: 2,
			  score: 2,
			  width: 90,
			  mouseout: function(score, evt) {
			    $('#counter-adults').html(score);
			  }
			});
		};
		if (search_kids.length) {
			search_kids.raty({
			  starOff: 'img/kid.png',
			  starOn: 'img/kid-h.png',
			  target: '#counter-kids',
			  targetType: 'number',
			  targetText: 1,
			  score: 1,
			  width: 80,
			  mouseout: function(score, evt) {
			    $('#counter-kids').html(score);
			  }
			});
		};
		if (search_babies.length) {
			search_babies.raty({
			  starOff: 'img/baby.png',
			  starOn: 'img/baby-h.png',
			  target: '#counter-babies',
			  targetType: 'number',
			  targetText: 0,
			  score: 0,
			  width: 95,
			  mouseout: function(score, evt) {
			    $('#counter-babies').html(score);
			  }
			});
		};

	// add country 
	var add_country = $('.js-add-country'),
			add_country_template = $('.js-add-country-template').html();

	add_country.on('click', function(){
		add_country.parent().parent().before(add_country_template);
		return false;
	});
	$('.search').on('click', '.js-remove-country', function(){
		$(this).parents('.search__item_new').remove();
		return false;
	});

	// select
	function select() {
	  var el = $('.js-select'),
	      el_date = $('.js-select-date'),
	      el_checkboxes = $('.js-select-checkboxes');
	  el.find('.select__head').on('click', function(){      
	    if ($(this).parent().hasClass('is-open')) {
	      $(this).parent().removeClass('is-open');
	      $(this).next().hide();
	    }
	    else {
	      el.removeClass('is-open');
	      el_date.removeClass('is-open');
	      el_checkboxes.removeClass('is-open');
	      el.find('.select__list').hide();
	      el_date.find('.select__date').hide();
	      el_checkboxes.find('.select__list').hide();
	      $(this).parent().addClass('is-open');
	      $(this).next().slideDown();
	    }
	  });
	  el.find('.select__list li').on('click', function(){
	    var val = $(this).html();
	    $(this).parent().prev().find('.select__current').html(val);
	    $(this).parent().next().val(val);
	    $(this).parent().hide();
	    $(this).parent().parent().removeClass('is-open');
	    $(this).parent().parent().addClass('is-selected');
	  });
	  el.click(function(event){
	    event.stopPropagation();
	  });
	  // datepicker
	  var dp = el_date.find('.select__date');
	  if (dp.length) {
	    $.datepicker.regional['ru'] = { 
	      closeText: 'Закрыть', 
	      prevText: '&#x3c;Пред', 
	      nextText: 'След&#x3e;', 
	      currentText: 'Сегодня', 
	      monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь', 
	      'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'], 
	      monthNamesShort: ['Янв','Фев','Мар','Апр','Май','Июн', 
	      'Июл','Авг','Сен','Окт','Ноя','Дек'], 
	      dayNames: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'], 
	      dayNamesShort: ['Вск','Пнд','Втр','Срд','Чтв','Птн','Сбт'], 
	      dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб']
	    }; 
	    $.datepicker.setDefaults($.datepicker.regional['ru']); 
	  }; 
	  el_date.find('.select__head').on('click', function(){    
	    if ($(this).parent().hasClass('is-open')) {
	      $(this).parent().removeClass('is-open');
	      $(this).next().hide();
	    }
	    else {
	      el.removeClass('is-open');
	      el_checkboxes.removeClass('is-open');
	      el.find('.select__list').hide();
	      el_checkboxes.find('.select__list').hide();
	      el_date.removeClass('is-open');
	      el_date.find('.select__date').hide();
	      $(this).parent().addClass('is-open');
	      $(this).next().datepicker({
	    		dateFormat: 'dd.mm.yy', 
	    		firstDay: 1, 
	    		isRTL: false,
	    		minDate: '+1d',
	    		onSelect: function(date) {
	    		  $(this).parent().find('.select__current').html(date);
	    		  $(this).parent().removeClass('is-open');
	    		  $(this).parent().addClass('is-selected');
	    		  dp.hide();
	    		}
	    	});
	      $(this).next().slideDown();
	    };
	  });
	  el_date.click(function(event){
	    event.stopPropagation();
	  });
	  el_checkboxes.find('.select__head').on('click', function(){      
	    if ($(this).parent().hasClass('is-open')) {
	      $(this).parent().removeClass('is-open');
	      $(this).next().hide();
	    }
	    else {
	      el.removeClass('is-open');
	      el_date.removeClass('is-open');
	      el_checkboxes.removeClass('is-open');
	      el.find('.select__list').hide();
	      el_date.find('.select__date').hide();
	      el_checkboxes.find('.select__list').hide();
	      $(this).parent().addClass('is-open');
	      $(this).next().slideDown();
	    }
	  });
	  var el_checkboxes_input = el_checkboxes.find('.select__list input');
	  el_checkboxes_input.on('change', function(){ 
	  	if ($(this).hasClass('is-all')) {
	  		if ($(this).is(':checked')) {
	  			var value_all = $(this).next().text();
	  			$(this).parent().parent().prev().find('.select__current').text(value_all);
	  			$(this).parent().parent().find('input').each(function(){
	  			   this.checked = true;
	  			});
	  		}
	  		else {
	  			$(this).parent().parent().find('input').each(function(){
	  			   this.checked = false;
	  			});
	  		}
	  	}
	  	else {
	  		if ($(this).parent().parent().find('input.is-all').is(':checked')) {
	  			$(this).parent().parent().find('input').each(function(){
	  			   this.checked = false;
	  			});
	  			this.checked = true;
	  		};
	  		var value = $(this).parent().parent().find('input').map(function () {
	  			if (!$(this).hasClass('is-all')) {
	  				if ($(this).is(':checked')) {
	  					return ' ' + $(this).next().text(); 
	  				};
	  			};
	  		}).get(); 
	  		$(this).parent().parent().prev().find('.select__current').text(value);
	  	}
	  });


	  el_checkboxes.click(function(event){
	    event.stopPropagation();
	  });
	  $(document).click(function() {
	    el.find('.select__list').hide();
	    el_date.find('.select__date').hide();
	    el_checkboxes.find('.select__list').hide();
	    el.removeClass('is-open');
	    el_date.removeClass('is-open');
	    el_checkboxes.removeClass('is-open');
	  });
	}
	select();

	// native select
	function native_select() {
	  var el = $('.js-native-select'),
	  		select = el.find('.native-select__el');
	  select.on('change', function(){
    var option_selected = $(this).find('option:selected'),
    		value_selected = option_selected.text();
    		$(this).prev().find('span').text(value_selected);
		});
	};
	native_select();
		
	// autocomplete
	var autocomplete = $('.js-autocomplete');
	if (autocomplete.length) {
		var autocomplete_variants = [
		  'Турция',
		  'Украина'
		];
		autocomplete.autocomplete({
		  source: autocomplete_variants,
		  open: function(event, ui) {
		  	autocomplete.addClass('is-open');
		  },
		  close: function(event, ui) {
		  	autocomplete.removeClass('is-open');
		  }
		});
	};

	// slick slider
	var pop = $('.js-pop'),
			benefits = $('.js-benefits'),
			similar = $('.js-similar'),
			similar_discounts = $('.js-similar-discounts'),
			watched = $('.js-watched'),
			benefits = $('.js-benefits'),
			hotels = $('.js-hotels'),
			read_more = $('.js-read-more'),
			response_slider = $('.js-response-slider'),
			tours = $('.js-tours'),
			tours_item = tours.find('.tour'),
			tours_item_val = tours_item.length,
			tours_counter = $('.js-tours-counter'),
			tours_counter = $('.js-tours-counter'),
			tours_counter_current = tours_counter.find('.tours__counter-current'),
			tours_counter_all = tours_counter.find('.tours__counter-all');
	if (pop.length) {
		pop.slick({
			slide: '.pop__item',
			slidesToShow: 0,
			infinite: true,
			arrows: false,
			responsive: [
				{
				  breakpoint: 1024,
				  settings: {
				    slidesToShow: 4,
				    arrows: true
				  }
				},
				{
				  breakpoint: 768,
				  settings: {
				    slidesToShow: 1
				  }
				}
			]
		});
	};
	if (benefits.length) {
		benefits.slick({
			slide: '.benefits__item',
			slidesToShow: 0,
			infinite: true,
			arrows: false,
			responsive: [
				{
				  breakpoint: 1024,
				  settings: {
				    slidesToShow: 3,
				    arrows: true
				  }
				}
			]
		});
	};
	if (hotels.length) {
		hotels.slick({
			slide: '.hotels__item',
			slidesToShow: 0,
			infinite: true,
			arrows: false,
			responsive: [
				{
				  breakpoint: 1024,
				  settings: {
				    slidesToShow: 3,
				    arrows: true
				  }
				},
				{
				  breakpoint: 768,
				  settings: {
				    slidesToShow: 1,
				    arrows: true
				  }
				}
			]
		});
	};
	if (tours.length) {
		tours.slick({
			slide: '.tour',
			slidesToShow: 0,
			infinite: true,
			arrows: false,
			responsive: [
				{
				  breakpoint: 768,
				  settings: {
				    slidesToShow: 1,
				    arrows: false,
				    onInit: function() {
				    	tours_counter_all.html(tours_item_val);
				    },
				    onAfterChange: function(){
				    	tours_item_current = tours.find('.tour.slick-active').data('counter'),
				    	tours_counter_current.html(tours_item_current);
				    }
				  }
				}
			]
		});
	};
	if (similar.length) {
		similar.slick({
			slide: '.similar__item',
			slidesToShow: 5,
			infinite: false,
			responsive: [
				{
				  breakpoint: 1024,
				  settings: {
				    slidesToShow: 3,
				    infinite: false,
				    arrows: true
				  }
				},
				{
				  breakpoint: 768,
				  settings: {
				  	infinite: false,
				    slidesToShow: 1
				  }
				}
			]
		});
	};
	if (similar_discounts.length) {
		similar_discounts.slick({
			slide: '.similar__item',
			slidesToShow: 3,
			infinite: false,
			responsive: [
				{
				  breakpoint: 1024,
				  settings: {
				    slidesToShow: 2,
				    infinite: false,
				    arrows: true
				  }
				},
				{
				  breakpoint: 768,
				  settings: {
				  	infinite: false,
				    slidesToShow: 1
				  }
				}
			]
		});
	};
	if (watched.length) {
		watched.slick({
			slide: '.watched__item',
			slidesToShow: 8,
			infinite: false,
			responsive: [
				{
				  breakpoint: 1024,
				  settings: {
				    slidesToShow: 5,
				    infinite: false,
				    arrows: true
				  }
				},
				{
				  breakpoint: 768,
				  settings: {
				  	infinite: false,
				    slidesToShow: 2
				  }
				}
			]
		});
	};
	if (read_more.length) {
		read_more.slick({
			slide: '.read-more__item',
			slidesToShow: 4,
			infinite: false,
			responsive: [
				{
				  breakpoint: 1024,
				  settings: {
				    slidesToShow: 3,
				    infinite: false,
				    arrows: true
				  }
				},
				{
				  breakpoint: 768,
				  settings: {
				  	infinite: false,
				    slidesToShow: 1
				  }
				}
			]
		});
	};
	if (response_slider.length) {
		response_slider.slick({
			slide: '.response__item',
			slidesToShow: 1,
			infinite: false
		});
	};

	

	// mobile menu
	var top_menu = $('.js-topper-menu'),
			mob_menu = $('.js-mob-menu');
	top_menu.on('click', function(){
		mob_menu.slideToggle();
	});

	// filter
	var filter = $('.js-filter'),
			filter_slider = $('.js-filter-slider');
	filter.find('.filter__title').on('click', function(){
		$(this).next().slideToggle();
		$(this).parent().toggleClass('is-active');
	});
	if (filter_slider.length) {
		 filter_slider.each(function(){
		 	var filter_slider_el = $(this).find('.filter__slider-el'),
		 			filter_slider_min = $(this).data('min'),
		 			filter_slider_max = $(this).data('max'),
		 			filter_slider_step = $(this).data('step'),
		 			filter_slider_first_value = $(this).data('first-value'),
		 			filter_slider_last_value = $(this).data('last-value'),
		 			filter_slider_from = $(this).find('.filter__slider-from'),
		 			filter_slider_to = $(this).find('.filter__slider-to');
		 	filter_slider_el.slider({
		 		range: true,
		 		min: filter_slider_min,
		 		max: filter_slider_max,
		 		step: filter_slider_step,
		 		values: [filter_slider_first_value, filter_slider_last_value],
		 		slide: function( event, ui ) {
		 		  filter_slider_from.val(ui.values[0]);
		 		  filter_slider_to.val(ui.values[1]);
		 		}
		 	});
		 	filter_slider_from.val(filter_slider_el.slider('values', 0));
		 	filter_slider_to.val(filter_slider_el.slider('values', 1));
		 })
	};
	$(document).scroll(function () {
		var scroll_top = $(document).scrollTop();
		if (filter.length) {
			var filter_in = filter.find('.filter__in'),
					filter_top = filter.offset().top,
					filter_height = filter_in.outerHeight(),
					window_height = $(window).height(),
					koef = scroll_top + window_height,
					wrapper = $('.wrapper'),
					wrapper_height = wrapper.height(),
					container = $('.container'),
					container_top = container.offset().top,
					container_height = container.height(),
					container_full = container_top + container_height,
					pos_bottom = koef - container_full;
			filter.height(filter_height);
			if (koef >= (filter_top + filter_height)) {
				filter_in.addClass('is-fixed');
			}
			else {
				filter_in.removeClass('is-fixed');
			};
			if (koef >= container_full) {
				filter_in.css('bottom', pos_bottom + 'px');
			}
			else {
				filter_in.css('bottom', 0);
			}
		};
	});
	
	// photogallery
	function photogallery () {
		var el = $('.js-photogallery');
		if (el.length > 0) {
			el.each(function(){
				el_next = $(this).find('.next'),
				el_prev = $(this).find('.prev'),
				el_caption = $(this).find('.photogallery__description'),
				el_caption_template = '{{alt}}',
				el_in = $(this).find('.photogallery__list');
				el_in.cycle({
					fx: 'fade',
				  timeout: 0,
				  prev: el_prev,
				  next: el_next,
				  caption: el_caption,
				  captionTemplate: el_caption_template,
				  autoHeight: 'container'
				});
			});
		};	
	}
	photogallery();


	// blog
	var blogs_el = $('.js-blogs');
	if (blogs_el.length) {
		blogs_el.isotope({
			itemSelector: '.blog__item',
			 // layout mode options
			 masonry: {
			   columnWidth: 225,
			   isFitWidth: true,
			   gutter: 15
			 }
		})
	};

	// popup
	var popup = $('.popup'),
			popup_in = popup.find('.popup__in'),
			popup_trigger = $('.js-popup-trigger'),
			body = $('body');
	popup_trigger.on('click', function(){
		body.addClass('no-scroll');
		var el = $(this).data('popup');
		$('.'+el).fadeIn();
		return false;
	});
	popup.on('click', function(){
		popup.fadeOut();
		body.removeClass('no-scroll');
	});
	popup_in.on('click', function(event){
		event.stopPropagation();
	})

	// add scan
	var add_order_scan = $('.js-add-order-scan');
	add_order_scan.on('click', function(){
		$(this).parent().parent().parent().find('.order__scans').slideToggle();
		return false;
	});
	$('.field__el').on('click', '.js-add-cab-scan', function(){
		$(this).parent().next().slideToggle();
		return false;
	});	

	// add social profile
	var add_social_profile = $('.js-add-cab-social');
	add_social_profile.on('click', function(){
		$(this).parent().next().slideToggle();
		return false;
	});

	// add cabinet visa
	var add_cab_visa = $('.js-add-cab-visa'),
			add_cab_visa_template = $('.js-add-cab-visa-template').html();
	add_cab_visa.on('click', function(){
		$(this).parent().before(add_cab_visa_template);
		select();
		return false;
	});	
	$('.field__el').on('click', '.js-remove-visa', function(){
		$(this).parents('.field__set_new').remove();
		return false;
	});

	// toggle
	jQuery.fn.animateAuto = function(prop, speed, callback){
		var elem, height, width;
		return this.each(function(i, el){
		  el = jQuery(el), elem = el.clone().css({'height':'auto','width':'auto'}).appendTo('body');
		  height = elem.css('height'),
		  width = elem.css('width'),
		  elem.remove();
		  if(prop === 'height')
		    el.animate({'height': height}, speed, callback);
		  else if(prop === 'width')
		    el.animate({'width': width}, speed, callback);  
		  else if(prop === 'both')
		    el.animate({'width': width,'height': height}, speed, callback);
		});  
	};
	var el_toggle = $('.js-toggle');
	el_toggle.find('.toggle__link .pseudo-link').on('click', function(){
		var text = $(this).parent().prev();
				text_height = text.data('height');
				text_height = text_height + 'px';
		if (!$(this).hasClass('is-active')) {
			$(this).addClass('is-active');
			curHeight = text.height(),
      autoHeight = text.css('height', 'auto').height(); //temporarily change to auto and get the height.
      text.height(curHeight).animate({ height: autoHeight }, 600, function() {
        /*Now, change the height to auto when animation finishes. 
        Added to make the container flexible (Optional).*/
        text.css('height', 'auto'); 
      });
		}
		else {
			$(this).removeClass('is-active');
			text.animate({height: text_height}, 300); 
		}
		return false;
	});

	// roaming tariff
	$('.js-roaming-tariff').on('click', function(){
		var text_on = $(this).data('text-on');
		var text_off = $(this).data('text-off');
		if ($(this).hasClass('is-active')) {
			$(this).removeClass('is-active');
			$(this).prev().slideUp();
			$(this).text(text_off);
		}
		else {
			$(this).addClass('is-active');
			$(this).prev().slideDown();
			$(this).text(text_on);
		}
		return false;
	});

	// tour info fixed
	function tour_info() {
		var el = $('.js-tour-info');
		if (el.length) {
			el_top = el.offset().top;
			$(window).scroll(function(){
				var scroll_top = $(document).scrollTop();
				if (scroll_top >= el_top) {
					el.addClass('is-fixed');
				}
				else {
					el.removeClass('is-fixed');
				}
			})
		};
	};
	tour_info();

	// accordeon
	var accordeon = $('.js-accordeon'),
			accordeon_head = accordeon.find('.accordeon__head');
	accordeon_head.on('click', function(){
		$(this).next().slideToggle();
		$(this).parent().toggleClass('is-open');
	});

	// gallery
	var gallery_el = $('.js-gallery');
	gallery_el.each(function(){
		var gallery_slider = $(this).find('.gallery__list'),
				gallery_prev = $(this).find('.prev'),
				gallery_next = $(this).find('.next'),
				gallery_preview = $(this).find('.gallery__preview');
		gallery_slider.cycle({
			fx: 'scrollHorz',
			timeout: 0,
			prev: gallery_prev,
			next: gallery_next,
			slides: '>div',
			pager: gallery_preview,
			pagerTemplate: ''
		});
	});

	// avia information
	$('.js-avia-info').on('click', function(){
		var text_on = $(this).data('text-on');
		var text_off = $(this).data('text-off');
		if ($(this).hasClass('is-active')) {
			$(this).removeClass('is-active');
			$(this).prev().slideUp();
			$(this).text(text_on);
		}
		else {
			$(this).addClass('is-active');
			$(this).prev().slideDown();
			$(this).text(text_off);
		}
		return false;
	});

	// cart info fixed
	function cart_info() {
		var el = $('.js-cart-info'),
				el_fixed_top = 20;
		if (el.length) {
			el_top = el.offset().top;
			el_top = el_top - el_fixed_top;
			$(window).scroll(function(){
				var scroll_top = $(document).scrollTop();
				if (scroll_top >= el_top) {
					el.addClass('is-fixed');
				}
				else {
					el.removeClass('is-fixed');
				}
			})
		};
	};
	cart_info();

	// search to
	var search_to = $('.js-search-to');
	$('body').on('click', '.js-search-to-add', function () {
		var search_to_template = $('.js-search-to-template .search__to-item').clone();
		search_to.find('.search__to-title').slideDown();
		search_to.find('.search__to-in').slideUp();
		search_to_template.hide().appendTo(search_to).slideDown()
		return false;
	});
	$('body').on('click', '.search__to-title', function () {
		search_to.find('.search__to-title').slideDown();
		search_to.find('.search__to-in').slideUp();
		$(this).slideUp();
		$(this).next().slideDown();
	});

	// order add comment
	$('.js-order-add-comment').on('click', function () {
		$(this).prev().slideDown();
		return false;
	});


});









































