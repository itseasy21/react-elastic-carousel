import React from "react";
import Dot from "../Dot";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Dot", () => {
  it("renders", () => {
    render(<Dot />);
    // The dot should be in the document
    const dot = document.querySelector(".rec-dot");
    expect(dot).toBeInTheDocument();
  });

  it("applies active class when $active prop is true", () => {
    render(<Dot $active />);
    const dot = document.querySelector(".rec-dot_active");
    expect(dot).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const handleClick = jest.fn();
    render(<Dot onClick={handleClick} />);

    const dot = document.querySelector(".rec-dot");
    await userEvent.click(dot);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
