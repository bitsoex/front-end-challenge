import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import { TradesStore } from "./stores/TradesStore";
import { OrdersStore } from "./stores/OrdersStore";
import { CandlesStore } from "./stores/CandlesStore";
import App from "./containers/app/App";
import registerServiceWorker from "./registerServiceWorker";

const tradesStore = new TradesStore();
const ordersStore = new OrdersStore();
const candlesStore = new CandlesStore();

ReactDOM.render(
  <Provider TradesStore={tradesStore} OrdersStore={ordersStore} CandlesStore={candlesStore}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
