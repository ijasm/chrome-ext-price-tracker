import React from "react";
import ReactDOM from "react-dom";
import ContentPage from "./ContentPage";

const reactElementID = "react";
const reactElement = document.createElement("div");
reactElement.id = reactElementID;
// TODO: change this implementation as it is messing up with some pages
document.body.insertBefore(reactElement, document.body.childNodes[0]);
ReactDOM.render(<ContentPage />, document.getElementById(reactElementID));
