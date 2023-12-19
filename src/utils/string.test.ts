import { fuzzyMatch } from "./string";

describe("string", () => {
  describe("fuzzyMatch", () => {
    it("should return false if the query is not found in the string", () => {
      expect(fuzzyMatch("abc", "abdefg")).toBe(false);
    });
    it("should return false if the query is not found in the string (caseSensitive=true)", () => {
      expect(fuzzyMatch("abc", "ABCDEF", { caseSensitive: true })).toBe(false);
    });
    it("should return false if the query is not found in the string (ignoreSpaces = false)", () => {
      expect(fuzzyMatch("hello world", "helloworld", { ignoreSpaces: false })).toBe(false);
    });
    it.each([
      ["abc", "abcdef", [0, 1, 2]],
      ["abc", "abdefc", [0, 1, 5]],
      ["heart n", "white_square_button", [1, 4, 9, 10, 15, 18]],
    ])('should return the indices of the query "%s" in the string "%s"', (query, str, expected) => {
      expect(fuzzyMatch(query, str)).toEqual(expected);
    });
  });
});
