import React from "react";
import ReactDOM from "react-dom";
import { render, fireEvent, waitForElement } from "react-testing-library";
import App from "./App";
import { fetchQuotes } from "./data/data";

jest.mock("./data/data");

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test.skip("should display quotes when user clicks on stock", async () => {
  const mockData = {
    price: "1000",
    symbol: "AAPL"
  };
  const { container, getByText, debug } = render(<App />);
  fetchQuotes.mockReturnValueOnce(Promise.resolve(mockData));
  await waitForElement(() => getByText(/name/));
  debug();
});
