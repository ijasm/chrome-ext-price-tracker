import React, { Component } from "react";
import { MessageType, Message, sendMessage } from "../common/Message";

import "./styles/styles";

interface IState {
  priceElement: any;
  error: string;
}

export default class Popup extends Component<any, IState> {
  constructor(props) {
    super(props);

    this.state = {
      priceElement: null,
      error: null,
    };
  }

  componentDidMount() {
    this.addClickEventListenerToDOM();
  }

  render() {
    return (
      <div id="container">
        {this.state.error ? <div>{this.state.error}</div> : this.state.priceElement ? <div>Product tracked! Current price at {this.state.priceElement.innerText}.</div> : "To monitor product price, please click on the price that you would like to monitor."}
      </div>
    );
  }

  private addClickEventListenerToDOM = () => {
    document.addEventListener("click", (event) => {
      if (this.isLegitProductPrice(event.target as any)) {
        this.setState({ priceElement: event.target, error: null });
      } else {
        this.setState({ priceElement: null, error: "No product price detected, please click on product price!" });
      }
    });
  }

  private isLegitProductPrice = (clickedElement: HTMLElement): boolean => {
    const priceStr = clickedElement.innerText;
    const priceStrMatches = priceStr.match(/^(([A-z]{2,3}\$?|[$£€¥₩฿])\s?)?(\d{1,3}(\.|,|\s)?)*\d{1,3}((\.|,)\d\d?)?(\s?([A-z]{2,3}\$?|[$£€¥₩฿]))?$/i);

    return priceStrMatches !== null;
  }

  private trackProduct = (priceElement: HTMLElement) => {
    const price = this.extractPrice(priceElement);

    // sendMessage(MessageType.TrackProduct);
    // product html element: tagname, classname, id
    // product url
    // product original price
  }

  private extractPrice = (priceElement: HTMLElement): number => {
    // match regex to extract digits
    // get rid of white space
    // if period or comma exists, check if one or multiple
    // if multiple, remove
    // if single, check how many digits behind (2 or less, 3)
    // if period and comma exists, check position
    // if period appears first, remove all periods, then convert comma to period
    // if comma appears first, remove all comma
    return 1000;
  }
}
