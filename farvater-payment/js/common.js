head.ready(function() {

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
	  $(document).click(function() {
	    el.find('.select__list').hide();
	    el.removeClass('is-open');
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
    		$(this).parent().addClass('is-selected');
		});
	};
	native_select();

});









































