// ==UserScript==
// @name           Auto-Open about:blank on Startup
// @description    Closes the default startup page and opens about:blank
// @author         Gemini
// ==/UserScript==

(function() {
  function init() {
    // Wait for the browser window to be ready
    if (window.gBrowser) {
      // Open a new about:blank tab
      let newTab = gBrowser.addTrustedTab("about:blank");
      gBrowser.selectedTab = newTab;

      // Close all other tabs (the default startup tabs)
      let tabs = gBrowser.tabs;
      for (let i = tabs.length - 1; i >= 0; i--) {
        if (tabs[i] !== newTab) {
          gBrowser.removeTab(tabs[i]);
        }
      }
    }
  }

  // Run the script once the window loads
  if (gBrowserInit.delayedStartupFinished) {
    init();
  } else {
    let delayedListener = {
      observe: function(aSubject, aTopic, aData) {
        if (aTopic == "browser-delayed-startup-finished" && aSubject == window) {
          Services.obs.removeObserver(delayedListener, "browser-delayed-startup-finished");
          init();
        }
      }
    };
    Services.obs.addObserver(delayedListener, "browser-delayed-startup-finished");
  }
})();