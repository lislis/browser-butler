
$(document).ready(function() {


	var nav = navigator;
	var cookies = nav.cookieEnabled;
	var language = nav.language;
	var userAgent = nav.userAgent;

	var wind = window;
	var sceenWidth = wind.outerWidth;
	var screenHeight = wind.outerHeight;
	var documentWidth = wind.innerWidth;
	var documentHeight = wind.innerHeight;

	var browser = '';
	var engine = '';
	var os = '';

	if(userAgent.match('Firefox/')) {
		if(!userAgent.match('Seamonkey/')) {
			browser = 'Firefox';
		}
	} else if(userAgent.match('Seamonkey/')) {
		browser = 'Seamonkey';
	} else if (userAgent.match('OPR/') || userAgent.match('Opera/')) {
		browser = 'Opera';
	} else if (userAgent.match('Chrome/')) {
		browser = 'Chrome';
	} else if(userAgent.match('Safari/')) {
		if(!userAgent.match('Chrome/')) {
			browser = 'Safari';
		}
	} else if(userAgent.match('MSIE')) {
		browser = 'Internet Explorer';
	} else {
		browser = 'unknown';
	}

	if(userAgent.match('Gecko/')) {
		engine = 'Gecko';
	} else if(userAgent.match('AppleWebKit/')) {
		engine = 'WebKit';
	} else if (userAgent.match('Opera/')) {
		engine = 'Presto';
	} else if(userAgent.match('Trident/')) {
		engine = 'Trident';
	} else if(userAgent.match('Chrome/')) {
		engine = 'Blink';
	} else {
		engine = 'unknown'
	}


	var output = '';
	output += '<p>You are using '+ browser + ' version .</p>';
	output += '<p>The render engine is called '+ engine + '.</p>';
	output += '<p class="text-muted">'+ userAgent + '</p>';
	output += '<p>Your language is set to '+ language +'.</p>';
	output += '<p>Cookies enabled '+ cookies +'.</p>';
	output += '<p>Your computer runs '+ os + '.</p>';
	output += '<p>The maximum screen size is '+ sceenWidth +' x '+ screenHeight +'.</p>';
	output += '<p>Your browser window is '+ documentWidth +' x '+ documentHeight +'</p>';

	$('#js-output').append(output);


	console.log(userAgent);

});