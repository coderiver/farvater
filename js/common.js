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
	      el_date = $('.js-select-date');
	  el.find('.select__head').on('click', function(){      
	    if ($(this).parent().hasClass('is-open')) {
	      $(this).parent().removeClass('is-open');
	      $(this).next().hide();
	    }
	    else {
	      el.removeClass('is-open');
	      el_date.removeClass('is-open');
	      el.find('.select__list').hide();
	      el_date.find('.select__date').hide();
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
	      el.find('.select__list').hide();
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
	  $(document).click(function() {
	    el.find('.select__list').hide();
	    el_date.find('.select__date').hide();
	    el.removeClass('is-open');
	    el_date.removeClass('is-open');
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
				  breakpoint: 1020,
				  settings: {
				    slidesToShow: 4,
				    arrows: true
				  }
				},
				{
				  breakpoint: 764,
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
				  breakpoint: 1020,
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
				  breakpoint: 1020,
				  settings: {
				    slidesToShow: 3,
				    arrows: true
				  }
				},
				{
				  breakpoint: 764,
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
				  breakpoint: 764,
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
				  breakpoint: 1020,
				  settings: {
				    slidesToShow: 3,
				    infinite: false,
				    arrows: true
				  }
				},
				{
				  breakpoint: 764,
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
				  breakpoint: 1020,
				  settings: {
				    slidesToShow: 5,
				    infinite: false,
				    arrows: true
				  }
				},
				{
				  breakpoint: 764,
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
				  breakpoint: 1020,
				  settings: {
				    slidesToShow: 3,
				    infinite: false,
				    arrows: true
				  }
				},
				{
				  breakpoint: 764,
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
	}
	var el_toggle = $('.js-toggle');
	el_toggle.find('.toggle__link .pseudo-link').on('click', function(){
		var text = $(this).parent().prev();
				text_height = text.data('height');
				text_height = text_height + 'px';
				console.log(text_height);
		if (!$(this).hasClass('is-active')) {
			$(this).addClass('is-active');
			text.animateAuto('height', 300); 
		}
		else {
			$(this).removeClass('is-active');
			text.animate({height: text_height}, 300); 
		}
		return false;
	});

});









































