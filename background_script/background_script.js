chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'toggle') {
    let isEnabled = message.isEnabled;
    console.log(isEnabled);
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url && tab.url.startsWith('https://www.youtube.com/watch*')) {
    chrome.tabs.executeScript(tabId, { file: 'content_script/content_script.js' });
  }
});
