head.ready(function() {

	//agent
	var agent = navigator.userAgent,
	event = (agent.match(/iPad/i)) ? "touchstart" : "click";

	//popups
	$(document).bind(event, function(e){
		$(".js-popup").hide();
	});

	//raty
		//search
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

	//select
	function select() {
	  var el = $('.js-select');
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
	    var val = $(this).text();
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
	
});









































