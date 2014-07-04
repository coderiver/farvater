head.ready(function() {

	// agent
	var agent = navigator.userAgent,
	event = (agent.match(/iPad/i)) ? "touchstart" : "click";

	// popups
	$(document).bind(event, function(e){
		$(".js-popup").hide();
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
	  el.find('.select__head').bind('click', function(){      
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
	  el.find('.select__list li').bind('click', function(){
	    var val = $(this).html();
	    $(this).parent().prev().find('.select__current').html(val);
	    $(this).parent().next().val(val);
	    $(this).parent().hide();
	    $(this).parent().parent().removeClass('is-open');
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
	      dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'], 
	      dateFormat: 'dd.mm.yy', 
	      firstDay: 1, 
	      isRTL: false,
	      minDate: '+1d',
	      onSelect: function(date) {
	        el_date.find('.select__current').html(date);
	        el_date.removeClass('is-open');
	        dp.hide();
	      }
	    }; 
	    $.datepicker.setDefaults($.datepicker.regional['ru']); 
	    dp.datepicker();
	  }; 
	  el_date.find('.select__head').bind('click', function(){    
	    if ($(this).parent().hasClass('is-open')) {
	      $(this).parent().removeClass('is-open');
	      $(this).next().hide();
	    }
	    else {
	      el.removeClass('is-open');
	      el.find('.select__list').hide();
	      $(this).parent().addClass('is-open');
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
		  "Турция",
		  "Украина"
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
			slidesToShow: 9,
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

	// mobile menu
	var top_menu = $('.js-topper-menu'),
			mob_menu = $('.js-mob-menu');
	top_menu.on('click', function(){
		mob_menu.slideToggle();
	});

	// filter
	var filter = $('.js-filter'),
			filter_slider = $('.js-filter-slider'),
			filter_slider_el = filter_slider.find('.filter__slider-el'),
			filter_slider_from = filter_slider.find('.filter__slider-from'),
			filter_slider_to = filter_slider.find('.filter__slider-to');
	filter.find('.filter__title').on('click', function(){
		$(this).next().slideToggle();
		$(this).parent().toggleClass('is-active');
	});
	if (filter_slider_el.length) {
		filter_slider_el.slider({
			range: true,
			min: 0,
			max: 50000,
			step: 1000,
			values: [0, 40000],
			slide: function( event, ui ) {
			  filter_slider_from.val(ui.values[0]);
			  filter_slider_to.val(ui.values[1]);
			}
		});
		filter_slider_from.val(filter_slider_el.slider('values', 0));
		filter_slider_to.val(filter_slider_el.slider('values', 1));
	};
	
	// photogallery
	function photogallery () {
		var el = $('.js-photogallery');
		if (el.length > 0) {
			el.each(function(){
				el_next = $(this).find('.next');
				el_prev = $(this).find('.prev');
				el_item = $(this).find('.photogallery__item');
				el_in = $(this).find('.photogallery__list');
				el_in.cycle({
					fx: 'fade',
				  timeout: 0,
				  prev: el_prev,
				  next: el_next,
				  slides: el_item,
				  autoHeight: 'container'
				});
			});
		};	
	}
	photogallery();

});









































