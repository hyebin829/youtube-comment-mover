const toggleButton = document.getElementById('toggle-button');

chrome.storage.local.get('isEnabled', (data) => {
  let isEnabled = data.isEnabled ?? true;
  toggleButton.textContent = isEnabled ? 'Off' : 'On';
});

toggleButton.addEventListener('click', () => {
  chrome.storage.local.get('isEnabled', (data) => {
    let isEnabled = !data.isEnabled;
    chrome.storage.local.set({ isEnabled });
    chrome.runtime.sendMessage({ type: 'toggle', isEnabled });
    toggleButton.textContent = isEnabled ? 'Off' : 'On';
  });
});

document.getElementById('refresh-button').addEventListener('click', function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.reload(tabs[0].id);
  });
});
