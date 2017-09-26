import React, { Component } from "react";
import { MessageType, Message, sendMessage } from "../common/Message";
import { Product, HTMLDOMInfo } from "../common/Product";
import { addProductToStorage } from "../common/Storage";
import { extractPrice } from "../common/Utilities";

import "./styles/styles";

interface IProp {
  productURL: string;
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
    const { productURL } = this.props;
    const priceString = priceElement.innerText;
    const price = extractPrice(priceString);

    const { parentElement } = priceElement;

    const priceDOMInfo = new HTMLDOMInfo(priceElement.tagName, priceElement.id, priceElement.className, new HTMLDOMInfo(parentElement.tagName, parentElement.id, parentElement.className));

    addProductToStorage(new Product(productURL, price, priceDOMInfo));

    this.setState({ price, error: null });
  }
}
