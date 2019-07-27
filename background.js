chrome.runtime.onInstalled.addListener(function() {
	chrome.storage.sync.set({color: '#3aa757'}, function() {
		console.log("The color is green.");
	});
	
	/*chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
		chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
			pageUrl: {hostEquals: 'developer.chrome.com'},
        })],
			actions: [new chrome.declarativeContent.ShowPageAction()]
		}]);
    });*/
});
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	var xmlRequest = new XMLHttpRequest();
	xmlRequest.onreadystatechange = function(){
		if (xmlRequest.readyState == 4 && xmlRequest.status == 200){
			sendResponse({source: xmlRequest.responseText});
		}
	}
	xmlRequest.open("GET", request.query, true);
	xmlRequest.send();
	return true;
});