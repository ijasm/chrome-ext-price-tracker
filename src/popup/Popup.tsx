import React, { Component } from "react";
import ReactDOM from "react-dom";

import "./popup.scss";

interface PopupState {
  isTracked: boolean;
}

class Popup extends Component<any, PopupState> {
  constructor(props) {
    super(props);

    this.state = {
      isTracked: false,
    };
  }

  renderTrackedBtn = () => {
    return <div onClick={this.trackBtnTapped}>Track product price</div>;
  }

  renderUntrackedBtn = () => {
    return <div onClick={this.trackBtnTapped}>Stop tracking!</div>;
  }

  trackBtnTapped = () => {
    this.setState({
      isTracked: !this.state.isTracked,
    });

    if (this.state.isTracked) {
      chrome.browserAction.setIcon({ path: "images/icon_unchecked_128.png" });
    } else {
      chrome.browserAction.setIcon({ path: "images/icon_checked_128.png" });
    }
  }

  render() {
    return (
      <div className="container">
        {this.state.isTracked ? this.renderUntrackedBtn() : this.renderTrackedBtn()}
      </div>
    );
  }
}

ReactDOM.render(<Popup />, document.querySelector("#popup"));
