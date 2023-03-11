import { render, fireEvent, waitFor, cleanup } from "@testing-library/react";
import React from "react";
import { primary, white } from "../../colors";
import CourseMenu from "../CourseMenu";

describe("CourseMenu", () => {
  const buttons = [
    { index: 0, label: "Aktuální", bgColor: primary },
    { index: 1, label: "+ 1 den", bgColor: white },
    { index: 2, label: "+ 2 dny", bgColor: white },
    { index: 3, label: "+ 3 dny", bgColor: white },
  ];

  beforeEach(cleanup);

  it.each(buttons)(
    "buttons change state when clicked",
    async ({ index, label, bgColor }) => {
      const { findByText } = render(<CourseMenu />);
      const button = await findByText(label);

      expect(button).toHaveStyleRule("background-color", bgColor);
      fireEvent.click(button);

      await waitFor(() => {
        expect(location.search).toContain(`?days=${index}`);
        expect(button).toHaveStyleRule("background-color", primary);
      });
    }
  );

});
