import multiply from "@/components/multiply";
import add from "../add";

describe("adding", () => {
  test("should add", () => {
    expect(add(1, 2)).toBe(3);
  });
  test("should multiply", () => {
    expect(multiply(2, 2)).toBe(4);
  });
});
