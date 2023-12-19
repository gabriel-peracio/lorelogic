import { Prompt } from "./Prompt";
import { render } from "@testing-library/react";

describe("Prompt", () => {
  it("should render", () => {
    const { baseElement } = render(<Prompt />);
    expect(baseElement.querySelector(".Prompt")).toBeInTheDocument();
  });
});
