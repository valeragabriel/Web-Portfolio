import { add, sub } from "../models/calculator";

describe("Calculator Functions", () => {
  test("addition", () => {
    expect(add(2, 8)).toBe(10);
  });

  test("add invable var should be return error", () => 
    expect(add(2,"4")).toBe("Error"));

  test("subtraction", () => {
    expect(sub(6, 2)).toBe(4);
  });
});
