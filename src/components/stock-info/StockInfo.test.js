import React from "react";
import { render, fireEvent } from "react-testing-library";
import StockInfo from "./StockInfo";

test("should display stock info", () => {
  const name = "Apple Inc";
  const symbol = "AAPL";
  const price = "200";

  const { container } = render(
    <StockInfo symbol={symbol} name={name} price={price} />
  );
  expect(container.querySelectorAll("p")).toHaveLength(3);
});

test.skip("should not display stock info when value is undefined", () => {
  const name = undefined;
  const symbol = undefined;
  const price = undefined;

  const { container, queryByText } = render(
    <StockInfo symbol={symbol} name={name} price={price} />
  );
});
