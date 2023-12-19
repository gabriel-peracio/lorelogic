import { sum } from "lodash";
import { distributeEvenly, findSplitPoints, stripTrailingZeroes, toRanges } from "./array";

describe("distributeEvenly", () => {
  it.each([
    [10, 1, [10]],
    [10, 2, [5, 5]],
    [10, 3, [4, 3, 3]],
    [10, 4, [3, 3, 2, 2]],
    [10, 5, [2, 2, 2, 2, 2]],
    [10, 6, [2, 2, 2, 2, 1, 1]],
    [10, 7, [2, 2, 2, 1, 1, 1, 1]],
    [10, 8, [2, 2, 1, 1, 1, 1, 1, 1]],
    [10, 9, [2, 1, 1, 1, 1, 1, 1, 1, 1]],
    [10, 10, [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]],
    [10, 11, [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0]],
  ])("should distribute %s elements into %s chunks", (numElements, numChunks, expectedResult) => {
    const result = distributeEvenly(numElements, numChunks);
    expect(result).toHaveLength(numChunks);
    expect(sum(result)).toEqual(numElements);
    expect(result).toEqual(expectedResult);
  });
});

describe("findSplitPoints", () => {
  it("should find the split points (2 chunks - perfect balance)", () => {
    const source = [1, 1, 1, 1, 4]; // size: 8
    const result = findSplitPoints(source, 2);
    expect(result).toEqual([4]);
    expect(source.slice(0, result[0])).toEqual([1, 1, 1, 1]); // size: 4
    expect(source.slice(result[0])).toEqual([4]); // size: 4
  });
  it("should find the split points (2 chunks - imperfect balance)", () => {
    const source = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // size: 55
    const result = findSplitPoints(source, 2);
    expect(result).toEqual([7]);
    expect(source.slice(0, result[0])).toEqual([1, 2, 3, 4, 5, 6, 7]); // size: 28
    expect(source.slice(result[0])).toEqual([8, 9, 10]); // size: 27
  });
  it("should find the split points (3 chunks - perfect balance)", () => {
    const source = [1, 1, 1, 1, 2, 2, 4]; // size: 12
    const result = findSplitPoints(source, 3);
    expect(result).toEqual([4, 6]);
    // ideal size for each chunk would be 4
    expect(source.slice(0, result[0])).toEqual([1, 1, 1, 1]); // size: 4, ideal
    expect(source.slice(result[0], result[1])).toEqual([2, 2]); // size: 4, ideal
    expect(source.slice(result[1])).toEqual([4]); // size: 4, ideal
  });
  it("should find the split points (3 chunks - imperfect balance)", () => {
    const source = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // size: 55
    const result = findSplitPoints(source, 3);
    const chunk1 = source.slice(0, result[0]);
    const chunk2 = source.slice(result[0], result[1]);
    const chunk3 = source.slice(result[1]);

    expect(sum(chunk1)).toBe(21);
    expect(sum(chunk2)).toBe(15);
    expect(sum(chunk3)).toBe(19);
  });
  it("should return an array of indexes with length equal to chunks - 1", () => {
    const source = [1, 2, 3, 4, 5];
    const result = findSplitPoints(source, 3);
    expect(result).toHaveLength(2);
  });
  it("should find the split points (2 chunks) with random source array", () => {
    const source = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3]; // size: 39
    const result = findSplitPoints(source, 2);

    expect(result).toEqual([6]);
    expect(source.slice(0, result[0])).toEqual([3, 1, 4, 1, 5, 9]); // size: 23
    expect(source.slice(result[0])).toEqual([2, 6, 5, 3]); // size: 16
  });

  it("should find the split points (3 chunks) with random source array", () => {
    const source = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3]; // size: 39
    const result = findSplitPoints(source, 3);
    const chunk1 = source.slice(0, result[0]);
    const chunk2 = source.slice(result[0], result[1]);
    const chunk3 = source.slice(result[1]);

    expect(sum(chunk1)).toBe(14);
    expect(sum(chunk2)).toBe(11);
    expect(sum(chunk3)).toBe(14);
  });
});

describe("stripTrailingZeroes", () => {
  it("should strip trailing zeroes", () => {
    expect(stripTrailingZeroes([1, 2, 3, 0, 0, 0])).toEqual([1, 2, 3]);
    expect(stripTrailingZeroes([1, 2, 3, 0, 2, 0])).toEqual([1, 2, 3, 0, 2]);
  });
  it("should return the original array if there are no trailing zeroes", () => {
    expect(stripTrailingZeroes([1, 2, 3])).toEqual([1, 2, 3]);
  });
  it("should return an empty array if the input is empty", () => {
    expect(stripTrailingZeroes([])).toEqual([]);
  });
  it("should return an empty array if the input is all zeroes", () => {
    expect(stripTrailingZeroes([0, 0, 0])).toEqual([]);
  });
});

describe("toRanges", () => {
  it("should convert an array of sequential numbers into a list of ranges", () => {
    expect(toRanges([0, 1, 2, 3, 4, 5, 9, 10, 11, 15, 16, 17])).toEqual([
      [0, 5],
      [9, 11],
      [15, 17],
    ]);
  });
  it("should be able to return a single range", () => {
    expect(toRanges([0, 1, 2, 3, 4, 5])).toEqual([[0, 5]]);
  });
  it("should handle an entirely discontinuous input", () => {
    expect(toRanges([0, 2, 4, 6, 8])).toEqual([
      [0, 0],
      [2, 2],
      [4, 4],
      [6, 6],
      [8, 8],
    ]);
  });
  it("should handle an empty input", () => {
    expect(toRanges([])).toEqual([]);
  });
  it("should handle an input with a single element", () => {
    expect(toRanges([1])).toEqual([[1, 1]]);
  });
});
