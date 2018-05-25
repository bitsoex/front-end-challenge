import React from "react";
import ReactDOM from "react-dom";
import MarketsDrawer from "./MarketsDrawer";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<MarketsDrawer />, div);
  ReactDOM.unmountComponentAtNode(div);
});
