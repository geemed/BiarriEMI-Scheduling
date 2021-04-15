import React from "react";
import ReactDOM from "react-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "tui-calendar/dist/tui-calendar.css";

import App from "./app";

ReactDOM.render(<App />, document.querySelector("#main-wrapper"));
