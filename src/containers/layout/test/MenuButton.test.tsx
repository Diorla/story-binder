import { render, screen, fireEvent } from "@/test-utils";
import MenuButton from "../MenuButton";
describe("MenuButton", () => {
  it("renders with the correct label", () => {
    render(<MenuButton onClick={jest.fn} label="Click Me" />);
    expect(screen.getByText("Click Me")).toBeDefined();
  });

  it("calls onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(<MenuButton onClick={handleClick} label="Click Me" />);
    fireEvent.click(screen.getByText("Click Me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("has correct styles", () => {
    render(<MenuButton onClick={jest.fn} label="Click Me" />);
    const button = screen.getByText("Click Me");
    expect(button.style.cssText).toContain("text-transform: inherit;");
    expect(button.classList).toContain("MuiButton-sizeSmall");
  });
});
