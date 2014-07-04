/*===========================================================*/
/*	mobile_nav
/*===========================================================*/
String.prototype.repeat = function( num ) {
	return new Array( num + 1 ).join( this );
}
jQuery(document).ready(function() {

	$('<select id="menu-mobile" />').appendTo( $('#menu') );
		/* Option */
	$('<option />', {
	   "selected": "selected",
	   "value"   : "",
	   "text"    : 'Go to...'
	}).appendTo('#menu-mobile');
		/* Populate dropdown */
	$("#menu a").each(function() {
		var el = $(this);
		var option = $("<option />", {
			"value"   : el.attr("href"),
			"text"    : ('-'.repeat(el.parents("ul.children, ul.sub-menu").length)  + ' ' + el.text())
		}).appendTo('#menu-mobile');
		if (el.parent().hasClass('current_menu_item') || el.parent().hasClass('active')) option.attr('selected','selected');
	});
});    
/**/


/*===========================================================*/
/*	SCROLL TO 
/*===========================================================*/
jQuery(document).ready(function() {
		/* scroll to target */
	$(window).load(function(){
		$('.onepage #menu li a,.logo a').on('click',function(e){
			var href = $(this).attr('href');
			var hash;
			if (href) hash = href.split('#')[1];
			if(hash){
				if ( $('#'+hash).length > 0 ) {
					e.preventDefault();
					var header_height = $('#navigation').outerHeight();
					var offset_top = $('#'+hash).offset().top - header_height + 1;
					$('html,body').animate({ scrollTop: offset_top}, 1000, 'easeInOutExpo');
				}
			} // if hash
		});	// onepage menu li a click
		
		$('#menu-mobile').on('change',function(e){
			var href = $(this).val();
			var hash; if (href) hash = href.split('#')[1];
			if(hash && $('body').hasClass('onepage') ){
				if ( $('#'+hash).length > 0 ) {
					e.preventDefault();
					var header_height = $('#navigation').outerHeight();
					var offset_top = $('#'+hash).offset().top - header_height + 1;
					$('html,body').animate({ scrollTop: offset_top}, 1000, 'easeInOutExpo');
				}
			} else if ( href.length > 0 ) {
				self.location = href;
				}
		}); // on mobile menu change
		
	});	// window load
	
		/* change active class when click */
	$(".onepage #menu li").click(function () {
		$(".onepage #menu li").removeClass("current");
		$(this).addClass("current")
	});
	
		/* change active class when scroll */
	var lastid,	scroll_items = $(".onepage #menu").find('a').map(function () {
			var href = $(this).attr("href");
			var hash = href.split('#')[1];
			if(hash){
				if ( $('#' + hash).length > 0 ) return $('#' + hash);
			}
		});
	$(window).scroll(function () {
		var from_top = $(this).scrollTop() + $(".onepage #menu").outerHeight() + 100;
		var cur = scroll_items.map(function () {
			if ($(this).offset().top < from_top ) return this
		});
		cur = cur[cur.length - 1];
		var id = ( cur && cur.length ) ? cur[0].id : '';
		if (lastid !== id) {
			lastid = id;			
			
			$('.onepage #menu li a').each(function(){
				var hash = $(this).attr('href').split('#')[1];
				if ( hash == id ) {
					$(this).parent().addClass("current");
				} else {
					$(this).parent().removeClass("current");
				}
			});	// each wi mainnav li a
			
			$('#menu-mobile option').each(function(){
				var hash = $(this).attr('value').split('#')[1];
				if ( hash == id ) {
					$(this).attr('selected','selected');
				} else {
					$(this).removeAttr('selected');
				}	 
			});
		}	// if lastid !== id
	});	// scroll
	
});
/**/


/*===========================================================*/
/*	Stick Navigation & Separators
/*===========================================================*/
jQuery(document).ready(function(){
	$("#navigation").sticky({topSpacing:0});
});

jQuery(document).ready(function() {
		
	//.parallax(xPosition, speedFactor, outerHeight) options:
	//xPosition - Horizontal position of the element
	//inertia - speed to move relative to vertical scroll. Example: 0.1 is one tenth the speed of scrolling, 2 is twice the speed of scrolling
	//outerHeight (true/false) - Whether or not jQuery should use it's outerHeight option to determine when a section is in the viewport
	$('.separator1-bg').parallax("50%", 0.3);
	$('.separator2-bg').parallax("50%", 0.2);
	$('.separator3-bg').parallax("40%", 0.1);
	$('.separator4-bg').parallax("80%", 0.05);
	
});
/**/


/*===========================================================*/
/*	BACK TO TOP 
/*===========================================================*/
jQuery(document).ready(function(){
	$(window).scroll(function(){
		if($(window).scrollTop() > 200){
			$("#back-to-top").fadeIn(200);
		} else{
			$("#back-to-top").fadeOut(200);
		}
	});
	
	$('#back-to-top, .back-to-top').click(function() {
		  $('html, body').animate({ scrollTop:0 }, '800');
		  return false;
	});
});
/**/

	
/*===========================================================*/
/*	ISOTOP
/*===========================================================*/
jQuery(window).load(function() {
		
	var $container = $('#portfolio-items'),
		filters = {};

	$container.isotope({
	  itemSelector : '.box',
	});

	// filter buttons
	$('.filter a').click(function(){
	  var $this = $(this);
	  // don't proceed if already selected
	  if ( $this.hasClass('selected') ) {
		return;
	  }
	  
	  var $optionSet = $this.parents('.option-set');
	  // change selected class
	  $optionSet.find('.selected').removeClass('selected');
	  $this.addClass('selected');
	  
	  // store filter value in object
	  // i.e. filters.color = 'red'
	  var group = $optionSet.attr('data-filter-group');
	  filters[ group ] = $this.attr('data-filter-value');
	  // convert object into array
	  var isoFilters = [];
	  for ( var prop in filters ) {
		isoFilters.push( filters[ prop ] )
	  }
	  var selector = isoFilters.join('');
	  $container.isotope({ filter: selector });

	  return false;
	});
  });
/**/


/*===========================================================*/
/*	Full screen slider
/*===========================================================*/	

 $(function(){
	$('#maximage').maximage({
		cycleOptions: {
			fx: 'fade',
			speed: 1000, // Has to match the speed for CSS transitions in jQuery.maximage.css (lines 30 - 33)
			timeout: 4000,
			prev: '#arrow_left',
			next: '#arrow_right',
			pause: 1,
			
		},
		onFirstImageLoaded: function(){
			jQuery('#cycle-loader').hide();
			jQuery('#maximage').fadeIn('slow');
		}
		
	});

	// Helper function to Fill and Center the HTML5 Video
	jQuery('video,object').maximage('maxcover');

	// To show it is dynamic html text
	jQuery('.in-slide-content').delay(1200).fadeIn();
});	
/**/


/*===========================================================*/
/*	FLEX SLIDER
/*===========================================================*/
jQuery(window).load(function() {
	$('.flexslider').flexslider({
		animation: "fade"
	});
});
/**/


/*===========================================================*/
/*	PORTFOLIO FULL WIDTH
/*===========================================================*/
function portfolioCol() { 
		var width = $(window).width(),
			column = 1;           
		
		if (width > 1500) {
			column = 5;
		} else if (width > 1000) {
			column = 4;
		} else if (width > 768) {
			column = 3;
		} else if (width > 480) {
			column = 2;	
		} else if (width > 0) {
			column = 1;
		}

		return column;
	}       
	
	function setCol() { 
		if (!$('.portfolio-items').length) return false

		var width = $(window).width(), 
			column = portfolioCol(), 
			divWidth = Math.floor(width/column);
		
		$('.portfolio-items .box').each(function () { 
			$(this).css( { 
				width : divWidth + 'px' 
			});
		});
	}   
			
	function sizeThumb() {
		var h_thumb = jQuery(".thumbnail-caption").height();
		var w_thumb = jQuery(".thumbnail-caption").width();
		jQuery(".thumbnail-caption span").css({'height' : h_thumb + 'px' , 'width' : w_thumb + 'px'});       
	}
	setCol();
	sizeThumb();
	jQuery(document).ready(function() {
		setCol();
		sizeThumb();
	});
	jQuery(window).load(function() {
		sizeThumb();
	});
	jQuery(window).resize(function() {
		setCol();
		sizeThumb();
	});
	jQuery(window).bind('resize', function () { 
		setCol();
		sizeThumb();
		$('.portfolio-items').isotope('reLayout');    
	});
/**/


/*===========================================================*/
/*	HOVER PORTFOLIO
/*===========================================================*/
$(function() {		
	$(' #portfolio-items .box ').each( function() { $(this).hoverdir(); } );
});
/**/


/*===========================================================*/
/*	prettyPhoto
/*===========================================================*/
jQuery(document).ready(function(){
	$("area[data-rel^='prettyPhoto']").prettyPhoto();
	
	$(".portfolio-items a[data-rel^='prettyPhoto']").prettyPhoto({animation_speed:'normal',slideshow:4000, autoplay_slideshow: false});
});
/**/	


/*===========================================================*/
/*	contact form
/*===========================================================*/
jQuery(document).ready(function(){
	$("#ajax-contact-form").submit(function() {
		var str = $(this).serialize();		
		$.ajax({
			type: "POST",
			url: "contact_form/contact_process.php",
			data: str,
			success: function(msg) {
				// Message Sent - Show the 'Thank You' message and hide the form
				if(msg == 'OK') {
					result = '<div class="notification_ok">Your message has been sent. Thank you!</div>';
					$("#fields").hide();
				} else {
					result = msg;
				}
				$('#note').html(result);
			}
		});
		return false;
	});
	// Input and Textarea Focus
	$('input[type=text]').focus(function() {
		if($(this).attr('readonly') || $(this).attr('readonly') == 'readonly') return false;
		if ($(this).val() === $(this).attr('title')) {
				$(this).val('');
		}   
		}).blur(function() {
		if($(this).attr('readonly') || $(this).attr('readonly') == 'readonly') return false;
		if ($(this).val().length === 0) {
			$(this).val($(this).attr('title'));
		}                        
	});	
	$('textarea').focus(function() {
		if ($(this).text() === $(this).attr('title')) {
				$(this).text('');
			}        
		}).blur(function() {
		if ($(this).text().length === 0) {
			$(this).text($(this).attr('title'));
		}                        
	});
});
/**/


/*===========================================================*/
/*	TIMER 
/*===========================================================*/
jQuery(document).ready(function() {
	$('.numbers-block').appear(function() {
		$(".stat .stat-count").each(function() {
		var counter = $(this).html();
		$(this).countTo({
			from: 0,
			to: counter,
			speed: 3500,
			refreshInterval: 20,
			});
		});
	});
});


/*===========================================================*/
/*	jquery.tweet.js
/*===========================================================*/
// jquery.tweet.js - See http://tweet.seaofclouds.com/ or https://github.com/seaofclouds/tweet for more info
// Copyright (c) 2008-2012 Todd Matthews & Steve Purcell
// Modified by Stan Scates for https://github.com/StanScates/Tweet.js-Mod

(function (factory) {
	if (typeof define === 'function' && define.amd)
	define(['jquery'], factory); // AMD support for RequireJS etc.
	else
	factory(jQuery);
}(function ($) {
	$.fn.tweet = function(o){
		var s = $.extend({
			modpath: "twitter",                     // [string]   relative URL to Tweet.js mod (see https://github.com/StanScates/Tweet.js-Mod)
			username: null,                           // [string or array] required unless using the 'query' option; one or more twitter screen names (use 'list' option for multiple names, where possible)
			list_id: null,                            // [integer]  ID of list to fetch when using list functionality
			list: null,                               // [string]   optional slug of list belonging to username
			favorites: false,                         // [boolean]  display the user's favorites instead of his tweets
			query: null,                              // [string]   optional search query (see also: http://search.twitter.com/operators)
			avatar_size: null,                        // [integer]  height and width of avatar if displayed (48px max)
			count: 3,                                 // [integer]  how many tweets to display?
			fetch: null,                              // [integer]  how many tweets to fetch via the API (set this higher than 'count' if using the 'filter' option)
			page: 1,                                  // [integer]  which page of results to fetch (if count != fetch, you'll get unexpected results)
			retweets: true,                           // [boolean]  whether to fetch (official) retweets (not supported in all display modes)
			intro_text: null,                         // [string]   do you want text BEFORE your your tweets?
			outro_text: null,                         // [string]   do you want text AFTER your tweets?
			join_text:  null,                         // [string]   optional text in between date and tweet, try setting to "auto"
			auto_join_text_default: "i said,",        // [string]   auto text for non verb: "i said" bullocks
			auto_join_text_ed: "i",                   // [string]   auto text for past tense: "i" surfed
			auto_join_text_ing: "i am",               // [string]   auto tense for present tense: "i was" surfing
			auto_join_text_reply: "i replied to",     // [string]   auto tense for replies: "i replied to" @someone "with"
			auto_join_text_url: "i was looking at",   // [string]   auto tense for urls: "i was looking at" http:...
			loading_text: null,                       // [string]   optional loading text, displayed while tweets load
			refresh_interval: null ,                  // [integer]  optional number of seconds after which to reload tweets
			twitter_url: "twitter.com",               // [string]   custom twitter url, if any (apigee, etc.)
			twitter_api_url: "api.twitter.com",       // [string]   custom twitter api url, if any (apigee, etc.)
			twitter_search_url: "search.twitter.com", // [string]   custom twitter search url, if any (apigee, etc.)
			template: "{user}{text}{time}{follow_btn}",   // [string or function] template used to construct each tweet <li> - see code for available vars
			comparator: function(tweet1, tweet2) {    // [function] comparator used to sort tweets (see Array.sort)
				return tweet2["tweet_time"] - tweet1["tweet_time"];
			},
			filter: function(tweet) {                 // [function] whether or not to include a particular tweet (be sure to also set 'fetch')
				return true;
			}
		// You can attach callbacks to the following events using jQuery's standard .bind() mechanism:
		//   "loaded" -- triggered when tweets have been fetched and rendered
		}, o);

		// See http://daringfireball.net/2010/07/improved_regex_for_matching_urls
		var url_regexp = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»""'']))/gi;

		// Expand values inside simple string templates with {placeholders}
		function t(template, info) {
			if (typeof template === "string") {
				var result = template;
				for(var key in info) {
					var val = info[key];
					result = result.replace(new RegExp('{'+key+'}','g'), val === null ? '' : val);
				}
				return result;
			} else return template(info);
		}
		// Export the t function for use when passing a function as the 'template' option
		$.extend({tweet: {t: t}});

		function replacer (regex, replacement) {
			return function() {
				var returning = [];
				this.each(function() {
					returning.push(this.replace(regex, replacement));
				});
				return $(returning);
			};
		}

		function escapeHTML(s) {
			return s.replace(/</g,"&lt;").replace(/>/g,"^&gt;");
		}

		$.fn.extend({
			linkUser: replacer(/(^|[\W])@(\w+)/gi, "$1<span class=\"at\">@</span><a href=\"http://"+s.twitter_url+"/$2\">$2</a>"),
			// Support various latin1 (\u00**) and arabic (\u06**) alphanumeric chars
			linkHash: replacer(/(?:^| )[\#]+([\w\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u00ff\u0600-\u06ff]+)/gi,
				' <a href="http://'+s.twitter_search_url+'/search?q=&tag=$1&lang=all'+((s.username && s.username.length == 1 && !s.list) ? '&from='+s.username.join("%2BOR%2B") : '')+'" class="tweet_hashtag">#$1</a>'),
			makeHeart: replacer(/(&lt;)+[3]/gi, "<tt class='heart'>&#x2665;</tt>")
		});

		function linkURLs(text, entities) {
			return text.replace(url_regexp, function(match) {
				var url = (/^[a-z]+:/i).test(match) ? match : "http://"+match;
				var text = match;
				for(var i = 0; i < entities.length; ++i) {
					var entity = entities[i];
					if (entity.url == url && entity.expanded_url) {
						url = entity.expanded_url;
						text = entity.display_url;
						break;
					}
				}
				return "<a href=\""+escapeHTML(url)+"\">"+escapeHTML(text)+"</a>";
			});
		}

		function parse_date(date_str) {
			// The non-search twitter APIs return inconsistently-formatted dates, which Date.parse
			// cannot handle in IE. We therefore perform the following transformation:
			// "Wed Apr 29 08:53:31 +0000 2009" => "Wed, Apr 29 2009 08:53:31 +0000"
			return Date.parse(date_str.replace(/^([a-z]{3})( [a-z]{3} \d\d?)(.*)( \d{4})$/i, '$1,$2$4$3'));
		}

		function relative_time(date) {
			var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
			var delta = parseInt((relative_to.getTime() - date) / 1000, 10);
			var r = '';
			if (delta < 1) {
				r = 'just now';
			} else if (delta < 60) {
				r = delta + ' seconds ago';
			} else if(delta < 120) {
				r = 'about a minute ago';
			} else if(delta < (45*60)) {
				r = 'about ' + (parseInt(delta / 60, 10)).toString() + ' minutes ago';
			} else if(delta < (2*60*60)) {
				r = 'about an hour ago';
			} else if(delta < (24*60*60)) {
				r = 'about ' + (parseInt(delta / 3600, 10)).toString() + ' hours ago';
			} else if(delta < (48*60*60)) {
				r = 'about a day ago';
			} else {
				r = 'about ' + (parseInt(delta / 86400, 10)).toString() + ' days ago';
			}
			return r;
		}

		function build_auto_join_text(text) {
			if (text.match(/^(@([A-Za-z0-9-_]+)) .*/i)) {
				return s.auto_join_text_reply;
			} else if (text.match(url_regexp)) {
				return s.auto_join_text_url;
			} else if (text.match(/^((\w+ed)|just) .*/im)) {
				return s.auto_join_text_ed;
			} else if (text.match(/^(\w*ing) .*/i)) {
				return s.auto_join_text_ing;
			} else {
				return s.auto_join_text_default;
			}
		}

		function build_api_request() {
			var modpath = s.modpath,
				count = (s.fetch === null) ? s.count : s.fetch,
				defaults = {
					include_entities: 1
				};

			if (s.list) {
				return {
					host: s.twitter_api_url,
					url: "/1.1/lists/statuses.json",
					parameters: $.extend({}, defaults, {
						list_id: s.list_id,
						slug: s.list,
						owner_screen_name: s.username,
						page: s.page,
						count: count,
						include_rts: (s.retweets ? 1 : 0)
					})
				};
			} else if (s.favorites) {
				return {
					host: s.twitter_api_url,
					url: "/1.1/favorites/list.json",
					parameters: $.extend({}, defaults, {
						list_id: s.list_id,
						screen_name: s.username,
						page: s.page,
						count: count
					})
				};
			} else if (s.query === null && s.username.length === 1) {
				return {
					host: s.twitter_api_url,
					url: "/1.1/statuses/user_timeline.json",
					parameters: $.extend({}, defaults, {
						screen_name: s.username,
						page: s.page,
						count: count,
						include_rts: (s.retweets ? 1 : 0)
					})
				};
			} else {
				var query = (s.query || 'from:'+s.username.join(' OR from:'));
				return {
					host: s.twitter_search_url,
					url: "/search.json",
					parameters: $.extend({}, defaults, {
						page: s.page,
						q: query,
						rpp: count
					})
				};
			}
		}

		function extract_avatar_url(item, secure) {
			if (secure) {
				return ('user' in item) ?
					item.user.profile_image_url_https :
					extract_avatar_url(item, false).
					replace(/^http:\/\/[a-z0-9]{1,3}\.twimg\.com\//, "https://s3.amazonaws.com/twitter_production/");
			} else {
				return item.profile_image_url || item.user.profile_image_url;
			}
		}

		// Convert twitter API objects into data available for
		// constructing each tweet <li> using a template
		function extract_template_data(item) {
			var o = {};
			o.item = item;
			o.source = item.source;
			// The actual user name is not returned by all Twitter APIs, so please do not file an issue if it is empty.
			o.name = item.from_user_name || item.user.name;
			o.screen_name = item.from_user || item.user.screen_name;
			o.avatar_size = s.avatar_size;
			o.avatar_url = extract_avatar_url(item, (document.location.protocol === 'https:'));
			o.retweet = typeof(item.retweeted_status) != 'undefined';
			o.tweet_time = parse_date(item.created_at);
			o.join_text = s.join_text == "auto" ? build_auto_join_text(item.text) : s.join_text;
			o.tweet_id = item.id_str;
			o.twitter_base = "http://"+s.twitter_url+"/";
			o.user_url = o.twitter_base+o.screen_name;
			o.tweet_url = o.user_url+"/status/"+o.tweet_id;
			o.reply_url = o.twitter_base+"intent/tweet?in_reply_to="+o.tweet_id;
			o.retweet_url = o.twitter_base+"intent/retweet?tweet_id="+o.tweet_id;
			o.favorite_url = o.twitter_base+"intent/favorite?tweet_id="+o.tweet_id;
			o.retweeted_screen_name = o.retweet && item.retweeted_status.user.screen_name;
			o.tweet_relative_time = relative_time(o.tweet_time);
			o.entities = item.entities ? (item.entities.urls || []).concat(item.entities.media || []) : [];
			o.tweet_raw_text = o.retweet ? ('RT @'+o.retweeted_screen_name+' '+item.retweeted_status.text) : item.text; // avoid '...' in long retweets
			o.tweet_text = $([linkURLs(o.tweet_raw_text, o.entities)]).linkUser().linkHash()[0];
			o.tweet_text_fancy = $([o.tweet_text]).makeHeart()[0];

			// Default spans, and pre-formatted blocks for common layouts
			o.user = t('<a class="tweet_user" href="{user_url}">{screen_name}</a>', o);
			o.join = s.join_text ? t(' <span class="tweet_join">{join_text}</span> ', o) : ' ';
			o.avatar = o.avatar_size ?
				t('<a class="tweet_avatar" href="{user_url}"><img src="{avatar_url}" height="{avatar_size}" width="{avatar_size}" alt="{screen_name}\'s avatar" title="{screen_name}\'s avatar" border="0"/></a>', o) : '';
			o.time = t('<span class="tweet_time"><a href="{tweet_url}" title="view tweet on twitter">{tweet_relative_time}</a></span>', o);
			o.text = t('<span class="tweet_text">{tweet_text_fancy}</span>', o);
			o.follow_btn = t('<a class="follow_btn main_btn btn_type1 small_btn" href="{user_url}">Follow Me</a>', o);
			o.reply_action = t('<a class="tweet_action tweet_reply" href="{reply_url}">reply</a>', o);
			o.retweet_action = t('<a class="tweet_action tweet_retweet" href="{retweet_url}">retweet</a>', o);
			o.favorite_action = t('<a class="tweet_action tweet_favorite" href="{favorite_url}">favorite</a>', o);
			return o;
		}

		return this.each(function(i, widget){
			var list = $('<ul class="tweet_list">');
			var intro = '<p class="tweet_intro">'+s.intro_text+'</p>';
			var outro = '<p class="tweet_outro">'+s.outro_text+'</p>';
			var loading = $('<p class="loading">'+s.loading_text+'</p>');

			if(s.username && typeof(s.username) == "string"){
				s.username = [s.username];
			}

			$(widget).unbind("tweet:load").bind("tweet:load", function(){
				if (s.loading_text) $(widget).empty().append(loading);

				$.ajax({
					dataType: "json",
					type: "post",
					async: false,
					url: s.modpath || "/twitter/",
					data: { request: build_api_request() },
					success: function(data, status) {

						if(data.message) {
							console.log(data.message);
						}

						var response = data.response;
						$(widget).empty().append(list);
						if (s.intro_text) list.before(intro);
						list.empty();

						if(response.statuses !== undefined) {
							resp = response.statuses;
						} else if(response.results !== undefined) {
							resp = response.results;
						} else {
							resp = response;
						}

						var tweets = $.map(resp, extract_template_data);
							tweets = $.grep(tweets, s.filter).sort(s.comparator).slice(0, s.count);

						list.append($.map(tweets, function(o) { return "<li>" + t(s.template, o) + "</li>"; }).join('')).
							children('li:first').addClass('tweet_first').end().
							children('li:odd').addClass('tweet_even').end().
							children('li:even').addClass('tweet_odd');

						if (s.outro_text) list.after(outro);
						$(widget).trigger("loaded").trigger((tweets ? "empty" : "full"));
						if (s.refresh_interval) {
							window.setTimeout(function() { $(widget).trigger("tweet:load"); }, 1000 * s.refresh_interval);
						}
					}
				});
			}).trigger("tweet:load");
		});
	};
}));