import React from "react";
import ReactDOM from "react-dom";
import { render, fireEvent } from "react-testing-library";
import App from "./App";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test("should display quotes when user clicks on stock", () => {
  const props = {
    // name: undefined,
    // symbol: undefined,
    // price: undefined,
    fetchQuotes: jest.fn()
  };
  const { container, getByText, debug } = render(<App {...props} />);
  props.fetchQuotes.mockReturnValueOnce({ price: "40", symbol: "AAPL" });
  debug();

  // const taskAction = container.querySelector("li");
  // const input = container.querySelector("input");
  // fireEvent.keypress(input)
  // fireEvent.click(taskAction);
  // expect(container.querySelectorAll("p")).toHaveLength(3);
});
