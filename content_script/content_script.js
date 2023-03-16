chrome.storage.local.get('isEnabled', (data) => {
  isEnabled = data.isEnabled || true;
});

chrome.storage.onChanged.addListener((changes) => {
  if (changes.isEnabled) {
    isEnabled = changes.isEnabled.newValue;
    moveComments(isEnabled);
  }
});

const moveComments = (isEnabled) => {
  if (isEnabled) {
    console.log('isEnabled???', isEnabled);
    let link = document.createElement('link');
    link.href = chrome.runtime.getURL('style/style.css');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    document.documentElement.appendChild(link);

    const commentsParent = document.querySelector('#comments');
    if (commentsParent) {
      const recommendVideo = document.querySelector('#secondary');
      if (recommendVideo) {
        recommendVideo.appendChild(commentsParent);
      }
    }
    const primary = document.querySelector('#primary');
    const recommendVideo = document.querySelector('#secondary-inner');

    if (primary) {
      primary.appendChild(recommendVideo);
    }
  } else {
    recover();
  }
};

const recover = () => {
  const recommendVideoOuter = document.querySelector('#secondary');
  const recommendVideo = document.querySelector('#secondary-inner');
  if (recommendVideoOuter) {
    recommendVideoOuter.appendChild(recommendVideo);
  }

  const comments = document.querySelector('#comments');
  const below = document.querySelector('#below');

  if (below) {
    below.appendChild(comments);
  }
};

window.addEventListener('load', moveComments);
