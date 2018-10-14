import React from "react";
import {
  render,
  fireEvent,
  waitForElement,
  getByText
} from "react-testing-library";
import Search from "./Search";
import { fetchSymbol } from "../../data/data";

jest.mock("../../data/data");

test("should trigger changeInput function when user enters input in search bar", () => {
  const changeInput = jest.fn();
  const { container } = render(<input type="text" onChange={changeInput} />);
  const input = container.firstChild;
  fireEvent.change(input, {
    target: { value: "B" }
  });
  fireEvent.change(input, {
    target: { value: "BA" }
  });
  expect(changeInput).toHaveBeenCalledTimes(2);
});

test("should reset input when clicked", () => {
  const props = {
    displayQuote: jest.fn(),
    resetState: jest.fn()
  };

  const { container } = render(<Search {...props} />);
  const searchBar = container.querySelector("input");
  fireEvent.change(searchBar, {
    target: { value: "BA" }
  });
  const resetButton = container.querySelector(".fa-times");
  expect(searchBar.value).toBe("BA");
  fireEvent.click(resetButton);
  expect(searchBar.value).toBe("");
});

test.skip("should display search results", async () => {
  const props = {
    displayQuote: jest.fn(),
    resetState: jest.fn()
  };

  const mockSearchResults = [
    {
      "1. symbol": "BA",
      "2. name": "The Boeing Company",
      "3. type": "Equity",
      "4. region": "United States",
      "5. marketOpen": "09:30",
      "6. marketClose": "16:00",
      "7. timezone": "UTC-04",
      "8. currency": "USD",
      "9. matchScore": "1.0000"
    },
    {
      "1. symbol": "BABA",
      "2. name": "Alibaba Group Holding Limited",
      "3. type": "Equity",
      "4. region": "United States",
      "5. marketOpen": "09:30",
      "6. marketClose": "16:00",
      "7. timezone": "UTC-04",
      "8. currency": "USD",
      "9. matchScore": "0.8000"
    }
  ];
  const { container, getByText, debug } = render(<Search {...props} />);
  const searchBar = container.querySelector("input");
  fireEvent.change(searchBar, {
    target: { value: "BA" }
  });
  fetchSymbol.mockReturnValueOnce(Promise.resolve(mockSearchResults));

  await waitForElement(() => getByText(/BA/));

  debug();

  const stockList = container.querySelector("li");
  expect(stockList).toHaveLength(2);

  //   fireEvent.click(stockList);
  //   expect(this.getQuote).toHaveBeenCalledTimes(1);
});
