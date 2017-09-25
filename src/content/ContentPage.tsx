import React, { Component } from "react";
import { MessageType, Message, sendMessage } from "../common/Message";
import Popup from "./Popup";

interface IState {
  showPopup: boolean;
  url: string;
}

export default class ContentPage extends Component<any, IState> {
  constructor() {
    super();

    this.state = {
      showPopup: false,
      url: null,
    };
  }

  componentDidMount() {
    this.togglePageActionHideShowState();
    this.addChromeRuntimeMessageListeners();
    this.getURL();
  }

  render() {
    return (
      <div>
        {this.state.showPopup ? <Popup pageURL={this.state.url} /> : null}
      </div>
    );
  }

  private togglePageActionHideShowState = () => {
    if (this.isShoppingSite()) {
      console.log("IS SHOPPING SITE");
      sendMessage(MessageType.ShowPageAction);
    } else {
      console.log("IS NOT SHOPPING SITE");
      sendMessage(MessageType.HidePageAction);
    }
  }

  private addChromeRuntimeMessageListeners = () => {
    chrome.runtime.onMessage.addListener((request: Message, sender, sendResponse) => {
      console.log("received message", JSON.stringify(request));
      switch (request.type) {
        case MessageType.PageActionClicked:
          this.setState({ showPopup: true });
          break;
      }
    });
  }

  private isShoppingSite = (): boolean => {
    try {
      const metaTags = Array.from(document.getElementsByTagName("META"));
      return this.shopStringExistsInMetadata(metaTags);
    } catch (err) {
      console.log(err);
    }
  }

  private shopStringExistsInMetadata = (metaTags: Element[]) => {
    const shopStringExists = (value: Element, index: number, array: Element[]) => {
      const str = (value as HTMLMetaElement).content;
      const strMatches = str.match(/\b(shop|buy|delivery|fashion|clothes|bags|shoes)/i);
      return strMatches !== null;
    };

    return metaTags.some(shopStringExists);
  }

  private getURL = () => {
    sendMessage(MessageType.GetPageURL, null, (response) => {
      this.setState({ url: response });
    });
  }
}
