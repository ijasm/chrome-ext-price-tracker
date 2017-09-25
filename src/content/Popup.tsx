import React, { Component } from "react";
import { MessageType, Message, sendMessage } from "../common/Message";

import "./styles/styles";

interface IProp {
  pageURL: string;
}
interface IState {
  price: number;
  error: string;
}

export default class Popup extends Component<IProp, IState> {
  constructor(props) {
    super(props);

    this.state = {
      price: null,
      error: null,
    };
  }

  componentDidMount() {
    this.addClickEventListenerToDOM();
  }

  render() {
    return (
      <div id="container">
        {this.state.error ? <div>{this.state.error}</div> : this.state.price ? <div>Product tracked! Current price at {this.state.price}.</div> : "To monitor product price, please click on the price that you would like to monitor."}
      </div>
    );
  }

  private addClickEventListenerToDOM = () => {
    document.addEventListener("click", (event) => {
      const clickedElement: any = event.target;
      if (this.isLegitProductPrice(clickedElement)) {
        this.trackProduct(clickedElement);
      } else {
        this.setState({ price: null, error: "No product price detected, please click on product price!" });
      }
    });
  }

  private isLegitProductPrice = (clickedElement: HTMLElement): boolean => {
    const priceStr = clickedElement.innerText;
    const priceStrMatches = priceStr.match(/^((([A-z]{2,3}\$?(\s?[$£€¥₩฿])?)|[$£€¥₩฿])\s?)?(\d{1,3}(\.|,|\s)?)*\d{1,3}((\.|,)\d\d?)?(\s?([A-z]{2,3}\$?|[$£€¥₩฿]))?$/);

    return priceStrMatches !== null;
  }

  private trackProduct = (priceElement: HTMLElement) => {
    const priceString = priceElement.innerText;
    const price = this.extractPrice(priceString);
    this.setState({ price, error: null });
  }

  private extractPrice = (priceString: string): number => {
    // match regex to extract digits
    const priceMatches = priceString.match(/(\d{1,3}(\.|,|\s)?)*\d{1,3}((\.|,)\d\d?)?/);

    // TODO: check for null
    let price = priceMatches[0];

    // get rid of white space
    price = price.replace(" ", "");

    const periodMatches = price.match(/\./g);
    const commaMatches = price.match(/,/g);

    // if period and comma exists in price string
    if (commaMatches !== null && periodMatches !== null) {

      // if period appears first
      if (price.indexOf(".") < price.indexOf(",")) {
        // remove period
        price = price.replace(".", "");
        // replace comma with period
        price = price.replace(",", ".");

        // if comma appears first
      } else {
        // remove comma
        price = price.replace(",", "");
      }
      // if period or comma exists in price string
    } else if (commaMatches !== null || periodMatches !== null) {
      let char;
      let matches;
      if (commaMatches !== null) {
        char = ",";
        matches = commaMatches;
      } else {
        char = ".";
        matches = periodMatches;
      }

      // if multiple char occurences
      if (matches.length > 1) {
        // remove char if multiple occurences
        price = price.replace(char, "");
        // if single char occurences
      } else {
        // check how many digits behind
        if (price.substring(price.indexOf(char) + 1).length > 2) {
          // remove char if there are more than 2 digits after char
          price = price.replace(char, "");
        } else {
          // replace char with period if there are 2 digits or less after char
          price = price.replace(char, ".");
        }
      }
    }
    return parseFloat(price);
  }
}
