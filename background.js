function checkForValidUrl(tabId, changeInfo, tab) {
  urlIsValid = false;
  // probably be better to use a regex to make sure
  // the id is present
  if (tab.url.indexOf('/issues/') > -1) {
    urlIsValid = true;
  } else if (tab.url.indexOf('/pull/') > -1) {
    urlIsValid = true;
  } else if (tab.url.indexOf('/commit/') > -1) {
    urlIsValid = true;
  }

  if (urlIsValid == true) {
    chrome.pageAction.show(tabId);
  }
};

function copyToClipboard(tab) {
  re = /(issues|pull|commit)\/([a-f0-9]+)/
  matchData = tab.url.match(re);
  //alert(matchData);
  type = matchData[1];
  reference = matchData[2];
  value = '';
  if (type == "issues" || type == "pull") {
    value = "#" + reference;
  } else if (type == "commit") {
    value = reference.slice(0, 7);
  }
  txt = document.createElement('textarea');
  txt.value = value;
  document.body.appendChild(txt);
  txt.select();
  document.execCommand('Copy');
  document.body.removeChild(txt);
};

// Look for Issue, PR, or commit/sha URLs
chrome.tabs.onUpdated.addListener(checkForValidUrl);

// Copy id or sha when clicked
chrome.pageAction.onClicked.addListener(copyToClipboard);
