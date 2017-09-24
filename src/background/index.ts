import { MessageType, Message, sendMessageToTab } from "../common/Message";

chrome.runtime.onMessage.addListener((request: Message, sender, sendResponse) => {
  console.log("background receive message: ", JSON.stringify(request));
  switch (request.type) {
    case MessageType.ShowPageAction:
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.pageAction.show(tabs[0].id);
      });
      break;
    case MessageType.HidePageAction:
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.pageAction.hide(tabs[0].id);
      });
      break;
  }
});

chrome.pageAction.onClicked.addListener((tab) => {
  console.log("page action clicked, tab id: ", tab.id);

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    sendMessageToTab(tabs[0].id, MessageType.PageActionClicked);
  });
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

// listen for current tab to be changed
// chrome.tabs.onUpdated.addListener((tabID, changeInfo, tab) => {
//   // alert("tab updated. tabID: " + JSON.stringify(tabID) + " changeInfo: " + JSON.stringify(changeInfo) + " tab: " + JSON.stringify(tab));
// });
