import { render, screen } from "@/test-utils";
import Temp from "../Temp";

describe("Temp", () => {
  it("should pass", () => {
    render(<Temp />);

    const button = screen.getByRole("button");

    expect(button.textContent).toBe("Temp");
    expect(button.classList).toContain("MuiButton-root");

    expect([]).toBeArray();
  });
});
