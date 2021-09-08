(function () {
	var viewportTag = null;
	var metaTags = document.getElementsByTagName("meta");
	for (var i = 0; i < metaTags.length; i++) {
		if (metaTags[i].getAttribute("name") === "viewport") {
			viewportTag = metaTags[i];
			break;
		}
	}
	if (!viewportTag) {
		viewportTag = document.createElement("meta");
		viewportTag.setAttribute("name", "viewport");
	}

	var viewportTagContent =
		"width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=0";

	// Detect if iOS device
	if (/(iPhone|iPod|iPad)/i.test(window.navigator.userAgent)) {
		// Get iOS major version
		var iosVersion = parseInt(
			window.navigator.userAgent.match(
				/OS (\d+)_(\d+)_?(\d+)? like Mac OS X/i
			)[1]
		);
		// Detect if device is running >iOS 11
		// iOS 11's UIWebView and WKWebView changes the viewport behaviour to render viewport without the status bar. Need to override with "viewport-fit: cover" to include the status bar.
		if (iosVersion >= 11) {
			viewportTagContent += ", viewport-fit=cover";
		}
	}

	// Update viewport tag attribute
	viewportTag.setAttribute("content", viewportTagContent);
})();
