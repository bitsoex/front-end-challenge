import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import { TradesStore } from "./stores/TradesStore";
import { OrdersStore } from "./stores/OrdersStore";
import App from "./containers/app/App";
import registerServiceWorker from "./registerServiceWorker";

const tradesStore = new TradesStore();
const ordersStore = new OrdersStore();

ReactDOM.render(
  <Provider TradesStore={tradesStore} OrdersStore={ordersStore}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
