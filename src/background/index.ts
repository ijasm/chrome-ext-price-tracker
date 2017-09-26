import { MessageType, Message, sendMessageToTab } from "../common/Message";
import { isProductInStorage } from "../common/Storage";

chrome.storage.sync.set({ products: [] });

chrome.runtime.onMessage.addListener((request: Message, sender, sendResponse) => {
  console.log("background receive message: ", JSON.stringify(request));
  switch (request.type) {
    case MessageType.ShowPageAction:
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.pageAction.show(tabs[0].id);

        isProductInStorage(tabs[0].url, (response) => {
          if (response) {
            changePageActionIcon(tabs[0].id);
          }
        });
      });
      break;
    case MessageType.HidePageAction:
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.pageAction.hide(tabs[0].id);
      });
      break;
    case MessageType.GetPageURL:
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        sendResponse(tabs[0].url);
      });
      return true;
    case MessageType.ProductTracked:
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        changePageActionIcon(tabs[0].id);
      });
      break;
  }
});

const changePageActionIcon = (tabId: number) => {
  chrome.pageAction.setIcon({
    tabId, path: "images/icon_checked_128.png",
  });
};

chrome.pageAction.onClicked.addListener((tab) => {
  console.log("page action clicked, tab id: ", tab.id);
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    sendMessageToTab(tabs[0].id, MessageType.PageActionClicked);
  });
});

chrome.storage.onChanged.addListener((changes, areaName) => {
  console.log("storage changes detected: ", changes);
});

// chrome.tabs.onActivated.addListener((activeInfo) => {
  // chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  //   sendMessageToTab(tabs[0].id, MessageType.CheckEnablePageAction, null, (response) => {
  //     if (response === true) {
  //       chrome.pageAction.show(tabs[0].id);
  //     } else {
  //       chrome.pageAction.hide(tabs[0].id);
  //     }
  //   });
  // });
// });
