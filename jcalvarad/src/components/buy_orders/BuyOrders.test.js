import React from "react";
import ReactDOM from "react-dom";
import BuyOrders from "./BuyOrders";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<BuyOrders />, div);
  ReactDOM.unmountComponentAtNode(div);
});
