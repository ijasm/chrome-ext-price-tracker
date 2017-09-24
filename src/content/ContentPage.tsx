import React, { Component } from "react";
import { MessageType, Message, sendMessage } from "../common/Message";
import Popup from "./Popup";

interface IState {
  isSelectProductPriceState: boolean;
}

export default class ContentPage extends Component<any, IState> {
  constructor() {
    super();

    this.state = {
      isSelectProductPriceState: false,
    };
  }

  componentDidMount() {
    this.togglePageActionHideShowState();
    this.addChromeRuntimeMessageListeners();
  }

  render() {
    return (
      <div>
        {this.state.isSelectProductPriceState ? <Popup /> : null}
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
          this.setState({ isSelectProductPriceState: true });
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
      const strMatches = str.match(/\b(shop|buy)/i);
      return strMatches !== null;
    };

    return metaTags.some(shopStringExists);
  }
}
