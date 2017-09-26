export enum MessageType {
  ShowPageAction,
  HidePageAction,
  PageActionClicked,
  ProductPriceClicked,
  ProductTracked,
  GetPageURL,
}

export class Message {
  constructor(public type: MessageType, public payload?: any) {
  }
}

export const sendMessage = (messageType: MessageType, payload?: any, responseCallback?: (response: any) => void) => {
  chrome.runtime.sendMessage(new Message(messageType, payload), responseCallback);
};

export const sendMessageToTab = (tabId: number, messageType: MessageType, payload?: any, responseCallback?: (response: any) => void) => {
  chrome.tabs.sendMessage(tabId, new Message(messageType, payload), responseCallback);
};
