var currentCookie="";
var currentUid = "";
$(document).ready(function () {
	$('#go-to-options').click(function() {
		if (chrome.runtime.openOptionsPage) {
		chrome.runtime.openOptionsPage();
		} else {
		window.open(chrome.runtime.getURL('options.html'));
		}
	});
	chrome.storage.sync.get(["active"], function(active) {
		if (!active['active']) {
			user = {"linkID" : [],
					"username": [],
					"password": []};
			link = {
				"linkID": [],
				"url": []
			};

			chrome.storage.sync.set({
		    "list_user": user,
		    "list_link": link
			}, function() {
				console.log("active finish!");
			});
			chrome.storage.sync.set({
		    "active": true
			});
		}
	});
	chrome.storage.sync.get(["list_user", "list_link"], function(result) {
		alert(result['list_link']['linkID']);
	});
});

function loadCurrentCookie() {
    chrome.tabs.getSelected(null, function (tab) { //lấy cửa sổ làm việc hiện tại
		var currentUrl=tab.url;
		//add địa chỉ url đã lọc
		$('#CurrentCookieUrl').val(extractHostname(currentUrl));
		
    });
}
function extractHostname(url) {
	var hostname;
	//lọc url của web
	if (url.indexOf("://") > -1) {
		hostname = url.split('/')[2];
	}
	else {
		hostname = url.split('/')[0];
	}
	//tìm và xóa địa chỉ port
	hostname = hostname.split(':')[0];
	//tìm và xóa "?"
	hostname = hostname.split('?')[0];
	return hostname;
}
//gọi chức năng load loadCurrentCookie()
loadCurrentCookie();


