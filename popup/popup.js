const toggleButton = document.getElementById('toggle-button');
let isEnabled = chrome.storage.local.get('isEnabled', (data) => {
  data.isEnabled || true;
});

toggleButton.addEventListener('click', () => {
  let label = toggleButton.textContent;
  label = isEnabled ? 'On' : 'Off';
  toggleButton.textContent = label;

  chrome.storage.local.get('isEnabled', (data) => {
    console.log(data);
    isEnabled = !data.isEnabled;
    chrome.storage.local.set({ isEnabled });
    chrome.runtime.sendMessage({ type: 'toggle', isEnabled });
  });
});

document.getElementById('refresh-button').addEventListener('click', function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.reload(tabs[0].id);
  });
});
