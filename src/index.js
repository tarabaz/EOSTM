import React from "react";
import ReactDOM from "react-dom";

import App from "./Components/App";
import "./styles.css";

import { Provider } from "mobx-react";
import { syncHistoryWithStore } from "mobx-react-router";

import { routingStore, browserHistory, Data, Core } from "./Components/Data";

const history = syncHistoryWithStore(browserHistory, routingStore);

const rootElement = document.getElementById("root");

const stores = {
  Data,
  Core,
  routing: routingStore
};

const app = document.getElementById("app");

ReactDOM.render(<App />, app);
