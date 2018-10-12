import React from "react";
import { render, fireEvent } from "react-testing-library";
import Titles from "./Titles";

test("should display titles", () => {
  const { container } = render(<Titles />);
  expect(container.querySelectorAll("h1")).toHaveLength(1);
  expect(container.querySelectorAll("h3")).toHaveLength(1);
});
