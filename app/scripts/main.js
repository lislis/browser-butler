

function detectBrowser(paramNavigator) {

		var nav = paramNavigator;
		var cookies = nav.cookieEnabled;
		var language = nav.language;
		var userAgent = nav.userAgent;
		var machine = 'computer';

		var wind = window;
		var sceenWidth = wind.outerWidth;
		var screenHeight = wind.outerHeight;
		var documentWidth = wind.innerWidth;
		var documentHeight = wind.innerHeight;

		var browser = '';
		var version = '';
		var engine = '';
		var platform = '';
		var os = '';
		var osVersion = '';

	/*
	 * Test for browser and version
	 */
		if (/Firefox[\/\s](\d+\.\d+)/.test(userAgent)) {
			browser = 'Firefox';
			version = new Number(RegExp.$1);
		} else if (/MSIE (\d+\.\d+);/.test(userAgent)) {
			browser = 'Internet Explorer';
			version = new Number(RegExp.$1);
		} else if (/Chrome[\/\s](\d+\.\d+)/.test(userAgent)) {
			browser = 'Chrome';
			version = new Number(RegExp.$1);
		} else if (/Opera[\/\s](\d+\.\d+)/.test(userAgent)) {
			browser = 'Opera';
			version = new Number(RegExp.$1) 
		} else if (/Safari[\/\s](\d+\.\d+)/.test(userAgent)) {
			browser = 'Safari';
			version = new Number(RegExp.$1);
		} else {
			browser = 'unknown';
			version = '';
		}

	/*
	 * Test for renderengine
	 */
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

	/*
	 * Test for os and version
	 */

		osRegex = [
			/(Windows 95)|(Win95)|(Windows_95)/,
			/(Windows 98)|(Win98)/,
			/(Windows NT 5.0)|(Windows 2000)/,
			/(Windows NT 5.1)|(Windows XP)/,
			/(Windows NT 5.2)/, // windows server
			/(Windows NT 6.0)/, // vista
			/(Windows NT 6.1)/, // 7
			/(Windows NT 6.2)/, // 8
			/OpenBSD/,
			/SunOS/,
			/(Linux)|(X11)/,
			/(Mac_PowerPC)|(Macintosh)/
		];
		osNames = [
			'Windows 95',
			'windows 98',
			'Windows 2000',
			'Windows XP',
			'Windows 200 Server', // windows server
			'Windows Vista', // vista
			'Windows 7', // 7
			'Windows 8', // 8
			'OpenBSD',
			'SunOS',
			'Linux',
			'Mac OS'
		];

		// Check for major Desktop Platforms
		$.each(osRegex, function(index, value) {
			if(value.test(userAgent)) {
				platform = osNames[index];
			}
		});

		var parts = userAgent.split(/\s*[;)(]\s*/);
		//console.log(parts);

		// Windows
		if(platform.match('Windows')) {
			os = '';
		}

		// Lunix distros
		// @todo: version numbers
		if (platform == 'Linux' && !userAgent.match('Mobile')) {
			if (userAgent.match('Ubuntu')) {
				os = 'Ubuntu';
			}
		}

		// Mac
		// @todo: version numbers
		if(platform === 'Mac OS') {

		}

		// mobile Browsers
		// @todo: version numbers
		if(userAgent.match('Mobile')) {
			machine = 'device';

			if(browser == 'Safari' && userAgent.match('Android')) {
				platform = 'Android';
				browser = 'Android Standard Browser';
				version = '';
			} else if(browser == 'Firefox' && !userAgent.match('Android')) {
				platform = 'FirefoxOS';
			} else if(userAgent.match('Android')) {
				platform = 'Android';
			} else {
				platform = 'unknown mobile platform';
			}
		}

	/*
	 * Compose output
	 */
		var output = '';
		output += '<h4>Let\'s see ...</h4>';
		output += '<p>You are using '+ browser + ' version '+ version +'.</p>';
		output += '<p>The render engine is called '+ engine + '.</p>';
		if(os === '') {
			output += '<p>Your '+ machine +' is running '+ platform + '.</p>';
		} else {
			output += '<p>Your computer is a '+ platform + ', '+ os + ' to be more precise.</p>';
		}
		output += '<p class="text-muted">'+ userAgent + '</p>';
		output += '<h4>What else ...</h4>';
		output += '<p>Your language is set to '+ language +'.</p>';
		if(cookies) {
			output += '<p>Cookies are enabled.</p>';
		} else {
			output += '<p>Cookies are disabled.</p>';
		}
		output += '<p>Your browser window is '+ sceenWidth +' x '+ screenHeight +' wide.</p>';
		output += '<p>Your document is '+ documentWidth +' x '+ documentHeight +' wide.</p>';

		$('#js-output').append(output);

		sendFeedback();

		console.log(userAgent);
}

function sendFeedback(event) {

	var text = $('#js-output .text-muted').html();

	var link = "mailto:mail@lisapassing.de"
			 + "?subject=" + escape("Browser Butler feedback mail")
			 + "&body=" + text;

	$('#js-feedback').attr('href', link);
}

function queryServer() {
	console.log('Yes, this is Server');
	var startTime = new Date().getTime();
	var serverOutput = '';

	$.ajax({
		url: "/",
		cache: false
	}).success(function( data, textStatus, jqXHR ) {
		var endTime = new Date().getTime();
		var timePassed = (endTime - startTime) / 1000;
		console.log((endTime - startTime) / 1000);
		console.log(jqXHR.getAllResponseHeaders());

		serverOutput += '<h4>By the way ...</h4>';
		serverOutput += '<p>Your server said hi.</p>';
		serverOutput += '<p>That took '+ timePassed + ' seconds.</p>';
		$('#js-server-output').append(serverOutput);
	});
}


$(document).ready(function() {

	detectBrowser(navigator);
	queryServer();

});