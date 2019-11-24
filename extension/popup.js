function getCurrentTabUrl(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
    var url = tab.url;

    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url);
  });
}

function renderSuccess(url) {
	$('#success').append(`Short URL copied to clipboard:<br/><a href="${url}" target="_blank">${url}</a>`);
	$('#success').show();
}

function renderFailure(message) {
	$('#failure').append(
`Could not find Item ID.<br/>If you believe this is an error, please report the full URL using the \
<a href="${getExtensionHomepage()}" target="_blank">Extension Support Page</a>`);
	$('#failure').show();
}

function getExtensionHomepage() {
	return 'https://chrome.google.com/webstore/detail/' + chrome.runtime.id;
}

function parseTheUrl(url) {
	var urlPattern = /ebay\.(com|de|co\.uk|com\.au|at|be|ca|fr|ie|it|com\.hk|com\.my|com\.sg|nl|ph|pl|es|ch)\/itm/
	if(urlPattern.test(url)) {
		var idExt = /\/\d+\?/.exec(url)[0];
		var id = /\d+/.exec(idExt)[0];
		return 'http://www.' + urlPattern.exec(url)[0] + '/' + id;
	}
	else
		return '';
}

function copyToClipboard(url) {
	var sandbox = $('#sandbox').val(url).select();
	document.execCommand('copy');
	sandbox.val('');
}

document.addEventListener('DOMContentLoaded', function() {
  getCurrentTabUrl(function(url) {
	var shortUrl = parseTheUrl(url);
	if(shortUrl.length > 0) {
		copyToClipboard(shortUrl);
		renderSuccess(shortUrl);
	} else {
		renderFailure();
	}
  });
});
