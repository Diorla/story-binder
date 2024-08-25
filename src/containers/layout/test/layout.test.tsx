import { render, screen, fireEvent } from "@/test-utils";
import Layout from "../.";

const editList = ["Undo", "Redo", "Duplicate", "Delete"];
const fileList = [
  "Open project",
  "New project",
  "Change workspace",
  "Export",
  "Import",
  "Print file",
  "Exit",
];
const helpList = [
  "Welcome",
  "Documentation",
  "Release Notes",
  "Keyboard shortcuts",
  "Video Tutorials",
  "Tips and Tricks",
  "Feature request",
  "Report issue",
  "Privacy statement",
  "Check for Updates",
  "About",
];
const viewList = ["Full Screen", "Theme", "Zoom in", "Zoom out"];
describe("Layout", () => {
  it("renders layout", () => {
    render(<Layout>test</Layout>);
    expect(screen.getByText("test")).toBeDefined();
  });

  it("renders top bar", () => {
    render(<Layout>test</Layout>);
    expect(screen.getByText("View Templates")).toBeDefined();
  });

  it("renders menu", () => {
    render(<Layout>test</Layout>);
    expect(screen.getByText("File")).toBeDefined();
    expect(screen.getByText("Edit")).toBeDefined();
    expect(screen.getByText("View")).toBeDefined();
    expect(screen.getByText("Help")).toBeDefined();
  });

  it("should not show menu items", () => {
    render(<Layout>test</Layout>);
    [...editList, ...viewList, ...fileList, ...helpList].map((item) => {
      expect(screen.queryByText(item)).toBeNull();
    });
  });
  it("should open menu", () => {
    render(<Layout>test</Layout>);
    fireEvent.click(screen.getByText("Edit"));
    editList.map((item) => {
      expect(screen.getByText(item)).toBeDefined();
    });
    fireEvent.click(screen.getByText("File"));
    fileList.map((item) => {
      expect(screen.getByText(item)).toBeDefined();
    });
    fireEvent.click(screen.getByText("Help"));
    helpList.map((item) => {
      expect(screen.getByText(item)).toBeDefined();
    });
    fireEvent.click(screen.getByText("View"));
    viewList.map((item) => {
      expect(screen.getByText(item)).toBeDefined();
    });
  });
});
