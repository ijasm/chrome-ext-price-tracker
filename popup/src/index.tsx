import React from "react";
import ReactDOM from "react-dom";

import "./styles/styles";

const App = () => {
    return (
        <div className="container">
            hello, world!
        </div>
    );
};

ReactDOM.render(<App />, document.querySelector(".app"));
