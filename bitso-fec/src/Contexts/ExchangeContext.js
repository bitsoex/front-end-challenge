import React from "react";

const ExchangeContext = React.createContext({
  book: "btc_mxn",
  ticker: {},
  books: null,
  orders: null,
  trades: null
});

export default ExchangeContext;
