/**
 * Get the current URL.
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 **/
function getCurrentTabUrl(callback) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
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

function renderStatus(statusText) {
  var linkEl = document.getElementById('status');
  linkEl.innerHTML = statusText;
}

function parseTheUrl(url) {
	var urlPattern = /ebay\.(com|de|co\.uk)\/itm/
	if(urlPattern.test(url)) {
		var idExt = /\/\d+\?/.exec(url)[0];
		var id = /\d+/.exec(idExt)[0];
		return 'http://www.' + urlPattern.exec(url)[0] + '/' + id;
	}
	else
		return '';
}

document.addEventListener('DOMContentLoaded', function() {
  getCurrentTabUrl(function(url) {
	var shortUrl = parseTheUrl(url)
	if(shortUrl.length > 0) {
		renderStatus(shortUrl + '<br/>Copied to clipboard!');
		var sandbox = $('#sandbox').val(shortUrl).select();
		document.execCommand('copy');
		sandbox.val('');
	}
	else
		renderStatus('Could not find eBay Item ID / not on eBay?');
  });
});
