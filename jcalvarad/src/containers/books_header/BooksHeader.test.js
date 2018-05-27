import React from "react";
import ReactDOM from "react-dom";
import BooksHeader from "./BooksHeader";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<BooksHeader />, div);
  ReactDOM.unmountComponentAtNode(div);
});
