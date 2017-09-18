import React from "react";
import ReactDOM from "react-dom";

const renderElementID = "render";

const createElementInBody = (elementID) => {
  const div = document.createElement("div");
  div.id = elementID;
  document.body.insertBefore(div, document.body.firstChild);
};

const render = () => {
  ReactDOM.render(<div>HELLOOOOOOOOO</div>, document.getElementById(renderElementID));
};
