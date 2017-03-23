/*-------------------------------------------------------------------------------------------------------------------------------*/
/*This is main JS file that contains custom style rules used in this template*/
/*-------------------------------------------------------------------------------------------------------------------------------*/
/* Template Name: NRGevent*/
/* Version: 1.0 Initial Release*/
/* Build Date: 22-09-2015*/
/* Author: Unbranded*/
/* Website: http://moonart.net.ua/site/ 
/* Copyright: (C) 2015 */
/*-------------------------------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------------*/
/* TABLE OF CONTENTS: */
/*--------------------------------------------------------*/
/* 01 - VARIABLES */
/* 02 - PAGE CALCULATIONS */
/* 03 - FUNCTION ON DOCUMENT READY */
/* 04 - FUNCTION ON PAGE LOAD */
/* 05 - FUNCTION ON PAGE RESIZE */
/* 06 - FUNCTION ON PAGE SCROLL */
/* 07 - SWIPER SLIDERS */
/* 08 - BUTTONS, CLICKS, HOVERS */
/* 09 - TIMES, TABS */
/* 10 - LIGHT-BOX */
/* 11 - STYLE BAR */
/* 12 - GOOGLE MAP */
/* 13 - AJAX CONTACT FORM */

/*-------------------------------------------------------------------------------------------------------------------------------*/

$(function() {

	"use strict";

	/*================*/
	/* 01 - VARIABLES */
	/*================*/
	var swipers = [], winW, winH, winScr, _isresponsive, xsPoint = 480, smPoint = 768, mdPoint = 992, lgPoint = 1200, addPoint = 1600, _ismobile = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i);

	/*========================*/
	/* 02 - PAGE CALCULATIONS */
	/*========================*/
	function pageCalculations(){
		winW = $(window).width();
		winH = $(window).height();
		if($('.cmn-toggle-switch').is(':visible')) _isresponsive = true;
		else _isresponsive = false;
	}

	/*=================================*/
	/* 03 - FUNCTION ON DOCUMENT READY */
	/*=================================*/
	pageCalculations();
	//center all images inside containers
	$('.center-image').each(function(){
		var bgSrc = $(this).attr('src');
		$(this).parent().addClass('background-block').css({'background-image':'url('+bgSrc+')'});
		$(this).hide();
	});	

	/*============================*/
	/* 04 - FUNCTION ON PAGE LOAD */
	/*============================*/
	$(window).load(function(){
		$('#loading').fadeOut();
		if($('#map-canvas').length==1){
		  initialize('map-canvas');}

		initSwiper();
		$('.isotope-container').isotope({itemSelector: '.item', masonry:{gutter:0,columnWidth:'.grid-sizer'}});
		if($(window).scrollTop()>0){
			$('.header').addClass('scrolled');
		} else {
			$('.header').removeClass('scrolled');
		}		
	});

	/*==============================*/
	/* 05 - FUNCTION ON PAGE RESIZE */
	/*==============================*/
	function resizeCall(){
		pageCalculations();

		$('.swiper-container.initialized[data-slides-per-view="responsive"]').each(function(){
			var thisSwiper = swipers['swiper-'+$(this).attr('id')], $t = $(this), slidesPerViewVar = updateSlidesPerView($t);
			thisSwiper.params.slidesPerView = slidesPerViewVar;
			thisSwiper.reInit();
			var paginationSpan = $t.find('.pagination span');
			var paginationSlice = paginationSpan.hide().slice(0,(paginationSpan.length+1-slidesPerViewVar));
			if(paginationSlice.length<=1 || slidesPerViewVar>=$t.find('.swiper-slide').length) $t.addClass('pagination-hidden');
			else $t.removeClass('pagination-hidden');
			paginationSlice.show();
		});
	}
	if(!_ismobile){
		$(window).resize(function(){
			resizeCall();
		});
	} else{
		window.addEventListener("orientationchange", function() {
			resizeCall();
		}, false);
	}

	/*==============================*/
	/* 06 - FUNCTION ON PAGE SCROLL */
	/*==============================*/
	$(window).scroll(function(){
		if($(window).scrollTop()>0){
			$('.header').addClass('scrolled');
		} else {
			$('.header').removeClass('scrolled');
		}
	});		

	/*=====================*/
	/* 07 - SWIPER SLIDERS */
	/*=====================*/
	function initSwiper(){
		var initIterator = 0;
		$('.swiper-container').each(function(){								  
			var $t = $(this);								  

			var index = 'swiper-unique-id-'+initIterator;

			$t.addClass('swiper-'+index + ' initialized').attr('id', index);
			$t.find('.pagination').addClass('pagination-'+index);

			var autoPlayVar = parseInt($t.attr('data-autoplay'),10);
			var centerVar = parseInt($t.attr('data-center'),10);
			var simVar = ($t.closest('.circle-description-slide-box').length)?false:true;

			var slidesPerViewVar = $t.attr('data-slides-per-view');
			if(slidesPerViewVar == 'responsive'){
				slidesPerViewVar = updateSlidesPerView($t);
			}
			else if(slidesPerViewVar!='auto') slidesPerViewVar = parseInt(slidesPerViewVar, 10);

			var loopVar = parseInt($t.attr('data-loop'),10);
			var speedVar = parseInt($t.attr('data-speed'),10);
			var initialSlideVar = parseInt($t.attr('data-initial-slide'),10);
			if(!initialSlideVar){initialSlideVar=0;}

			swipers['swiper-'+index] = new Swiper('.swiper-'+index,{
				speed: speedVar,
				pagination: '.pagination-'+index,
				loop: loopVar,
				paginationClickable: true,
				autoplay: autoPlayVar,
				slidesPerView: slidesPerViewVar,
				keyboardControl: true,
				calculateHeight: true,
				initialSlide: initialSlideVar,
				simulateTouch: simVar,
				centeredSlides: centerVar,
				roundLengths: true,
				onSlideChangeEnd: function(swiper){
					var activeIndex = (loopVar===true)?swiper.activeIndex:swiper.activeLoopIndex;
					var qVal = $t.find('.swiper-slide-active').attr('data-val');
					$t.find('.swiper-slide[data-val="'+qVal+'"]').addClass('active');
				},
				onSlideChangeStart: function(swiper){
					$t.find('.swiper-slide.active').removeClass('active');
					if($t.hasClass('thumbnails-preview')){
						var activeIndex = (loopVar===1)?swiper.activeLoopIndex:swiper.activeIndex;
						swipers['swiper-'+$t.next().attr('id')].swipeTo(activeIndex);
						$t.next().find('.current').removeClass('current');
						$t.next().find('.swiper-slide[data-val="'+activeIndex+'"]').addClass('current');
					}					
				},
				onSlideClick: function(swiper){
					if($t.hasClass('thumbnails')) {
						swipers['swiper-'+$t.prev().attr('id')].swipeTo(swiper.clickedSlideIndex);
					}
				}			
			});
			swipers['swiper-'+index].reInit();
			if($t.attr('data-slides-per-view')=='responsive'){
				var paginationSpan = $t.find('.pagination span');
				var paginationSlice = paginationSpan.hide().slice(0,(paginationSpan.length+1-slidesPerViewVar));
				if(paginationSlice.length<=1 || slidesPerViewVar>=$t.find('.swiper-slide').length) $t.addClass('pagination-hidden');
				else $t.removeClass('pagination-hidden');
				paginationSlice.show();
			}
			initIterator++;
		});

	}

	function updateSlidesPerView(swiperContainer){
		if(winW>=addPoint) return parseInt(swiperContainer.attr('data-add-slides'),10);
		else if(winW>=lgPoint) return parseInt(swiperContainer.attr('data-lg-slides'),10);
		else if(winW>=mdPoint) return parseInt(swiperContainer.attr('data-md-slides'),10);
		else if(winW>=smPoint) return parseInt(swiperContainer.attr('data-sm-slides'),10);
		else if(winW>=xsPoint) return parseInt(swiperContainer.attr('data-xs-slides'),10);
		else return parseInt(swiperContainer.attr('data-mob-slides'),10);
	}

	//swiper arrows
	$('.swiper-arrow-left').on("click", function(){
		swipers['swiper-'+$(this).parent().attr('id')].swipePrev();
	});

	$('.swiper-arrow-right').on("click", function(){
		swipers['swiper-'+$(this).parent().attr('id')].swipeNext();
	});

	/*==============================*/
	/* 08 - BUTTONS, CLICKS, HOVERS */
	/*==============================*/
	// top menu
	$(".cmn-toggle-switch").on("click", function(){
		$(this).toggleClass("active");
		$('.header').toggleClass("active");
		$('.main-nav').slideToggle();
		return false;
	});

	//video-play
	$('.play-btn').on("click", function(){
		var video = $(this).data('video');			
		$(this).siblings('.movie').show();
		$(this).siblings('.movie').find('iframe').attr('src',video);
		return false;
	});
	$('.movie .close-button').on("click", function(){
		$(this).parent('.movie').hide();
		$(this).siblings('iframe').attr('src','about:blank');
		return false;
	});

	//video-play
	$('.video-bg').on("click", function(){
		var video = $(this).data('video');			
		$(this).parents('.fullheight').find('iframe').attr('src',video).show();
		$(this).addClass('.active');		
		return false;
	});	

	//popup
	// $(document).on("click", '.register-link', function(){
	// 	$('.register-popup').show('slow');
	// 	return false;
	// });
    // 
	$('.search-link').on("click", function(){
		$(this).siblings('.search-popup').show('slow');
		return false;
	});	
	$('.popup-close').on("click", function(){
		$(this).parents('.custom-popup').hide('slow');
		return false;
	});				

	//hover animation on conference
	$(".conf-item").on({
	    mouseenter: function () {
	    	$(this).find('.conf-autors').stop().slideToggle('slow');
	    },
	    mouseleave: function () {
	    	$(this).find('.conf-autors').stop().slideToggle('slow');
	    }
	});

	//change image on speaker
	$(document).on({
	    mouseenter: function () {
	    	var img = $(this).data("image");
	    	var $img_block = $(this).parents('.swiper-slide').find('.speaker-img');
	    	$img_block.css({'background-image':'url('+img+')'});
	    },
	    mouseleave: function () {
	    	var $img_block = $(this).parents('.swiper-slide').find('.speaker-img');
	    	var img_orig = $img_block.find('img').attr('src');
	    	$img_block.css({'background-image':'url('+img_orig+')'});
	    }
	}, ".speaker-change img");

	//hover animation on conference
	$(".shedule-entry, .shedule-user").on({
	    mouseenter: function () {
	    	$(this).parent('.shedule-block').addClass('active');
	    },
	    mouseleave: function () {
	    	$(this).parent('.shedule-block').removeClass('active');
	    }
	});		

	/*==================================================*/
	/* 09 - TIMES, TABS */
	/*==================================================*/
	//timer
  	function format(number){
    	if(number===0){
      		return '00';
    	}else if (number < 10) {
          	return '0' + number;
      	} else{
          	return ''+number;
      	}
    }	
	function setTimer(final_date){         
		var today = new Date();
		var finalTime = new Date(final_date);
		var interval = finalTime - today;
		if(interval<0) interval = 0;
		var days = parseInt(interval/(1000*60*60*24),10);
		var daysLeft = interval%(1000*60*60*24);
		var hours = parseInt(daysLeft/(1000*60*60),10);
		var hoursLeft = daysLeft%(1000*60*60);
		var minutes = parseInt(hoursLeft/(1000*60),10);
		var minutesLeft = hoursLeft%(1000*60);
		var seconds = parseInt(minutesLeft/(1000),10);
		$('.days').text(format(days));
		$('.hours').text(format(hours));
		$('.minutes').text(format(minutes));
		$('.seconds').text(format(seconds));
	}
	if($('.counters-block').length){
	 	var final_date  = $('.counters-block').data('finaldate');
		setTimer(final_date);
		setInterval(function(){setTimer(final_date);}, 1000);	 	
	}

	//countdown
	if($('.ClassyCountdown').length){
		var style  = $('#countdown').data('style');
		if (style=="yellow"){
			var styleVar = "#f3dd02";
		} else if(style=="green"){
			var styleVar = "#4cae51";
		} else if(style=="red"){
			var styleVar = "#f34135";				
		} else if(style=="dark"){
			var styleVar = "#9d656d";
		} else if(style=="blue"){
			var styleVar = "#206ab0";				
		} else if(style=="orange"){
			var styleVar = "#f60";
		} else if(style=="purple"){
			var styleVar = "#636";
		} else if(style=="pink"){
			var styleVar = "#ec659c";
		} else if(style=="green-light"){
			var styleVar = "#2bbab0";
		} else if(style=="red-dark"){
			var styleVar = "#861f49";
		} else if(style=="blue-light"){
			var styleVar = "#861f49";
		} else if(style=="orchid"){
			var styleVar = "#B565A7";
		} else if(style=="pink-light"){
			var styleVar = "#9933cc";
		} else if(style=="princeton"){
			var styleVar = "#ff9966";
		} else if(style=="sandy"){
			var styleVar = "#ff6666";
		} else if(style=="rhodamine"){
			var styleVar = "#cc0099";
		} else{
			var styleVar = "#f3dd02";
		}
		$('#countdown').ClassyCountdown({
			theme: "white",
			end: $.now() + 645600,
			color: "#0bbf47",
			style: {
			  element: '',
			  labels: false,
			  days: {gauge: {thickness: 0.05,bgColor:"rgba(255,255,255,0)",fgColor: styleVar}},
			  hours: {gauge: {thickness: 0.05,bgColor:"rgba(255,255,255,0)",fgColor: styleVar}},
			  minutes: {gauge: {thickness: 0.05,bgColor:"rgba(255,255,255,0)",fgColor: styleVar}},
			  seconds: {gauge: {thickness: 0.05,bgColor:"rgba(255,255,255,0)",fgColor: styleVar}}
			}		
		});
	}	

    //Tabs
	var tabFinish = 0;
	$(document).on('click', '.nav-tab-item', function(){
	    var $t = $(this);
	    if(tabFinish || $t.hasClass('active')) return false;
	    tabFinish = 1;
	    $t.closest('.nav-tab').find('.nav-tab-item').removeClass('active');
	    $t.addClass('active');
	    var index = $t.parent().parent().find('.nav-tab-item').index(this);
	    $t.closest('.tab-wrapper').find('.tab-info:visible').fadeOut(500, function(){
	        $t.closest('.tab-wrapper').find('.tab-info').eq(index).fadeIn(500, function() {
	            tabFinish = 0;
	            resizeCall();	            
	        });
	    });
	});

	/*=====================*/
	/* 10 - LIGHT-BOX */
	/*=====================*/
	
	/*activity indicator functions*/
	var activityIndicatorOn = function(){
		$( '<div id="imagelightbox-loading"><div></div></div>' ).appendTo( 'body' );
	};
	var activityIndicatorOff = function(){
		$( '#imagelightbox-loading' ).remove();
	};
	
	/*close button functions*/
	var closeButtonOn = function(instance){
		$('<button type="button" id="imagelightbox-close" title="Close"></button>').appendTo('body').on('click touchend', function(){ $(this).remove(); instance.quitImageLightbox(); return false; });
	};
	var closeButtonOff = function(){
		$('#imagelightbox-close').remove();
	};
	
	/*overlay*/
	var overlayOn = function(){$('<div id="imagelightbox-overlay"></div>').appendTo('body');};
	var overlayOff = function(){$('#imagelightbox-overlay').remove();};	
	
	/*caption*/
	var captionOff = function(){$('#imagelightbox-caption').remove();};
	var captionOn = function(){
		var description = $('a[href="' + $('#imagelightbox').attr('src') + '"] img').attr('alt');
		if(description.length > 0)
			$('<div id="imagelightbox-caption">' + description +'</div>').appendTo('body');
	};

	/*arrows*/
	var arrowsOn = function( instance, selector ){
		var $arrows = $( '<button type="button" class="imagelightbox-arrow imagelightbox-arrow-left"><i class="fa fa-chevron-left"></i></button><button type="button" class="imagelightbox-arrow imagelightbox-arrow-right"><i class="fa fa-chevron-right"></i></button>' );
		$arrows.appendTo('body');
		$arrows.on('click touchend', function(e)
		{
			e.preventDefault();
			var $this	= $(this),
				$target	= $(selector + '[href="' + $('#imagelightbox').attr('src') + '"]' ),
				index	= $target.index(selector);
			if( $this.hasClass('imagelightbox-arrow-left') )
			{
				index = index - 1;
				if( !$(selector).eq(index).length )
					index = $(selector).length;
			}
			else
			{
				index = index + 1;
				if( !$(selector).eq(index).length )
					index = 0;
			}
			instance.switchImageLightbox(index);
			return false;
		});
	};
	var arrowsOff = function(){$('.imagelightbox-arrow').remove();};	
			
	var selectorG = '.lightbox';		
	var instanceG =$(selectorG).imageLightbox({
		quitOnDocClick:	false,
		onStart:		function() {arrowsOn( instanceG, selectorG );overlayOn(); closeButtonOn(instanceG); },
		onEnd:			function() {arrowsOff();captionOff(); overlayOff(); closeButtonOff(); activityIndicatorOff(); },
		onLoadStart: 	function() {captionOff(); activityIndicatorOn(); },
		onLoadEnd:	 	function() {$('.imagelightbox-arrow').css('display', 'block');captionOn(); activityIndicatorOff(); }
	});

	/*==================================================*/
	/* 11 - STYLE BAR */
	/*==================================================*/
	$('.conf-button').on('click', function(){
		if ($('.style-page').hasClass('slide-right')){
		    $('.style-page').removeClass('slide-right'); 
			$('.conf-button span').removeClass('act');
		}else{
		    $('.style-page').addClass('slide-right');
			$('.conf-button span').addClass('act');
		}return false;			 
    });

	$('.entry').on('click', function(){
		var prevTheme = $('body').attr('data-color');
		var newTheme = $(this).attr('data-color');
		if($(this).hasClass('active')) return false;
		$(this).parent().find('.active').removeClass('active');
		$(this).addClass('active');
		$('body').attr('data-color', newTheme);
		$('img').each(function() {
		   $(this).attr("src", $(this).attr("src").replace('_'+prevTheme, '_'+newTheme));
		});
		$('#map-canvas').attr('data-marker', $('#map-canvas').attr('data-marker').replace('_'+prevTheme, '_'+newTheme));

	  	$('.c-btn.'+prevTheme).removeClass(prevTheme).addClass(newTheme);
	  	$('.c-btn.'+prevTheme+'-2').removeClass(prevTheme+'-2').addClass(newTheme+'-2');
	  	$('.c-btn.hv-'+prevTheme).removeClass('hv-'+prevTheme).addClass('hv-'+newTheme);
	  	$('.c-btn.hv-'+prevTheme+'-t').removeClass('hv-'+prevTheme+'-t').addClass('hv-'+newTheme+'-t');	
	  
		if(newTheme=="dark"){
		  	$('.price.style-2.center .c-btn').attr('class', 'register-link c-btn b-50 hv-dark-o red dark');		  	
		}
		if(prevTheme=="dark"){
		  	$('.c-btn.black').removeClass('black').addClass(newTheme);
		  	$('.c-btn.black-2').removeClass('black-2').addClass(newTheme+'-2');
		  	$('.custom-popup .c-btn').attr('class', 'c-btn b-50 black hv-yellow-o');	
		}

		$('.message-line .c-btn').attr('class', 'register-link c-btn b-50 black hv-black-o');			  		  
	    localStorage.setItem("color", newTheme);
	 });

	/*==================================================*/
	/* 12 - GOOGLE MAP */
	/*==================================================*/
	function initialize(obj) {
		var stylesArray = {
		'style-1' : {
			'style': [{"featureType":"landscape","stylers":[{"hue":"#FFBB00"},{"saturation":43.400000000000006},{"lightness":37.599999999999994},{"gamma":1}]},{"featureType":"road.highway","stylers":[{"hue":"#FFC200"},{"saturation":-61.8},{"lightness":45.599999999999994},{"gamma":1}]},{"featureType":"road.arterial","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":51.19999999999999},{"gamma":1}]},{"featureType":"road.local","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":52},{"gamma":1}]},{"featureType":"water","stylers":[{"hue":"#0078FF"},{"saturation":-13.200000000000003},{"lightness":2.4000000000000057},{"gamma":1}]},{"featureType":"poi","stylers":[{"hue":"#00FF6A"},{"saturation":-1.0989010989011234},{"lightness":11.200000000000017},{"gamma":1}]}]
		}
		};

		var lat = $('#'+obj).attr("data-lat");
	    var lng = $('#'+obj).attr("data-lng");
		var contentString = $('#'+obj).attr("data-string");
		var myLatlng = new google.maps.LatLng(lat,lng);
		var map, marker, infowindow;
		var image = $('#'+obj).attr("data-marker");
		var zoomLevel = parseInt($('#'+obj).attr("data-zoom"),10);
		var styles = stylesArray[$('#map-canvas').attr("data-style")]['style'];
		var styledMap = new google.maps.StyledMapType(styles,{name: "Styled Map"});
	    
		var mapOptions = {
			zoom: zoomLevel,
			disableDefaultUI: true,
			center: myLatlng,
	        scrollwheel: false,
			mapTypeControlOptions: {
	        mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
			}
		};
		
		map = new google.maps.Map(document.getElementById(obj), mapOptions);

		map.mapTypes.set('map_style', styledMap);
		map.setMapTypeId('map_style');

		infowindow = new google.maps.InfoWindow({
			content: contentString
		});
	  
	    
	    marker = new google.maps.Marker({
			position: myLatlng,
			map: map,
			icon: image
		});

		google.maps.event.addListener(marker, 'click', function() {
			infowindow.open(map,marker);
		});

	}

	/*==================================================*/
	/* 13 - AJAX CONTACT FORM */
	/*==================================================*/	 
	$('.js-contact-form').submit(function(e){

        $('.ajax-loader').show();

        var url = 'mail.php',
            form = this;

        $(form).find('[name="fields[code]"]').remove();

        function result(class_key, data){
          setTimeout(function(){
            $('.ajax-loader').hide();
            $('.ajax-result').find(class_key).show().text(data);
          },500);
        }

        $.ajax({
          type: "POST",
          url: url,
          data: $(form).serialize(),
        })
        .done(function(data) {
          result('.success', data);          

        }).error(function(data){
          result('.error', data);
        })

        e.preventDefault(); 

      });
    				
});