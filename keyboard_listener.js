if (window == top) {
  window.addEventListener('keyup', keyListener, false);
}

function keyListener(e) {
  // Must press ctrl key to validate. Filter the keys if the keyCode is Shift/Ctrl/Alt since we are
  // capturing it via its own modifier.
  if (e.ctrlKey && e.shiftKey && e.keyCode && !e.metaKey && e.keyCode == 67) {
    chrome.extension.sendRequest({
//       code: e.keyCode,
//       alt: e.altKey,
//       shift: e.shiftKey,
      url: window.location.href
    });
  }
}
