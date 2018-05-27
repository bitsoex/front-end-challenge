import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import { AppStore } from "./stores/AppStore";
import App from "./containers/app/App";
import registerServiceWorker from "./registerServiceWorker";

const appStore = new AppStore();
const { booksStore, tradesStore, ordersStore, candlesStore } = appStore;

ReactDOM.render(
  <Provider BooksStore={booksStore} TradesStore={tradesStore} OrdersStore={ordersStore} CandlesStore={candlesStore}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
