// public/background.js
const adPatterns = [
    "*://*.doubleclick.net/*",
    "*://*.googlesyndication.com/*",
    "*://*.adsafeprotected.com/*",
    "*://*.adnxs.com/*",
    "*://*.adsrvr.org/*",
    "*://*.advertising.com/*",
    // Add more patterns as needed
  ];
  
  chrome.declarativeNetRequest.updateDynamicRules({
    addRules: adPatterns.map((pattern, id) => ({
      id: id + 1,
      priority: 1,
      action: { type: "block" },
      condition: { urlFilter: pattern }
    })),
    removeRuleIds: adPatterns.map((_, id) => id + 1)
  });
  