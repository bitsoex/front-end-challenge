import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import { TradesStore } from "./stores/TradesStore";
import App from "./containers/app/App";
import registerServiceWorker from "./registerServiceWorker";

const tradesStore = new TradesStore();

ReactDOM.render(
  <Provider TradesStore={tradesStore}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
