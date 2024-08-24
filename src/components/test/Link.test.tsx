import { render, screen, fireEvent } from "@/test-utils";
import Link, { STATUS } from "../Link";

describe("Link", () => {
  it("link exist", () => {
    render(<Link page="http://www.facebook.com">Facebook</Link>);

    const link = screen.getByRole("link");

    expect(link.textContent).toBe("Facebook");

    expect(link.tagName).toBe("A");

    expect(link.style.color).toBe("blue");
  });
  it("should listen mouse over", () => {
    render(<Link page="http://www.facebook.com">Facebook</Link>);

    const link = screen.getByRole("link");

    fireEvent.mouseOver(link);

    expect(link.style.color).toBe("red");
    expect(link.classList).toContain(STATUS.HOVERED);

    fireEvent.mouseLeave(link);

    expect(link.style.color).toBe("blue");
    expect(link.classList).toContain(STATUS.NORMAL);
  });
});
