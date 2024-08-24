import { render, screen } from "@/test-utils";
import MenuWrapper from "../MenuWrapper";

describe("MenuWrapper", () => {
  it("renders the children when open", () => {
    render(
      <MenuWrapper anchorEl={document.body} open={true} onClose={jest.fn}>
        <div>Menu Content</div>
      </MenuWrapper>
    );
    expect(screen.getByText("Menu Content")).toBeDefined();
  });

  it("does not render the children when closed", () => {
    render(
      <MenuWrapper anchorEl={null} open={false} onClose={jest.fn}>
        <div>Menu Content</div>
      </MenuWrapper>
    );
    expect(screen.queryByText("Menu Content")).toBe(null);
  });
});
