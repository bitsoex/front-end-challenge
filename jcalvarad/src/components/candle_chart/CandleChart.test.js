import React from "react";
import ReactDOM from "react-dom";
import CandleChart from "./CandleChart";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<CandleChart />, div);
  ReactDOM.unmountComponentAtNode(div);
});
