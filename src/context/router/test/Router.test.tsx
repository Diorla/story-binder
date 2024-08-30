import { render, screen } from "@/test-utils";
import ROUTES from "@/constants/ROUTES";
import Router from "../Router";
import Path from "@/types/Path";

describe("Router component", () => {
  it("should render the correct component based on the path", () => {
    // Render Router component with a valid path
    render(<Router path={ROUTES[1].path} />);

    // Check if the correct component is rendered
    expect(screen.getByText("Details")).toBeDefined();

    const invalidPath = "/invalid";
    // Render Router component with an invalid path
    render(<Router path={invalidPath as Path} />);

    // Check if the NotFound component is rendered
    expect(screen.getByText("Page not found")).toBeDefined();
  });
});
