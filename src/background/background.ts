import { SHOW_PAGEACTION, HIDE_PAGEACTION } from "../common/messageTypes";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.type) {
    case SHOW_PAGEACTION:
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.pageAction.show(tabs[0].id);
      });
      break;
    case HIDE_PAGEACTION:
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.pageAction.hide(tabs[0].id);
      });
      break;
  }
});
