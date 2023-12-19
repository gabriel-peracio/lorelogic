import { last, sum } from "lodash";

/**
 * Distributes a number of elements as evenly as possible into a number of chunks.
 * @param numElements The number of elements to distribute evenly
 * @param numChunks How many chunks to distribute the elements into
 * @returns An array of numbers, `numChunks` elements long, where each number represents the number
 * of elements in that chunk
 *
 * @example
 * ```typescript
 * distributeEvenly(10, 1) // [10]
 * distributeEvenly(10, 2) // [5, 5]
 * distributeEvenly(10, 3) // [4, 3, 3]
 * distributeEvenly(2, 3) // [1, 1, 0]
 * ```
 */
export const distributeEvenly = (numElements: number, numChunks: number): number[] => {
  const baseChunkSize = Math.floor(numElements / numChunks);
  const numLargeChunks = numElements % numChunks;
  return Array(numChunks)
    .fill(undefined)
    .map((_, idx) => {
      if (idx < numLargeChunks) {
        return baseChunkSize + 1;
      }
      return baseChunkSize;
    });
};

/**
 * Given an array of "sizes", finds the indexes at which the array should be split so that the resulting chunks would be
 * as close to equal in size (as defined by the sum of the numbers in each chunk) as possible.
 * @param source An array of numbers, where each number represents some arbitrary "size"
 * @param chunks The number of chunks to split the array into
 * @returns An array of indexes containing `chunks - 1` elements, where each element represents the index at which the
 * array should be split to create a chunk of roughly equal size
 * @example
 * findSplitPoints([1, 1, 1, 1, 4], 2) // [4] => [1, 1, 1, 1] and [4]
 * findSplitPoints([1, 1, 1, 1, 2, 2, 4], 3) // [4, 6] => [1, 1, 1, 1], [2, 2], and [4]
 * findSplitPoints([3, 1, 4, 1, 5, 9, 2, 6, 5, 3], 2) // [6] => [3, 1, 4, 1, 5, 9] and [2, 6, 5, 3]
 */
export const findSplitPoints = (source: number[], chunks: number): number[] => {
  const totalSize = sum(source);
  const idealChunkSize = totalSize / chunks;
  const result: number[] = [];

  let currentChunkSize = 0;
  let currentChunkIndex = 0;

  for (let i = 0; i < source.length - 1; i++) {
    currentChunkSize += source[i];
    const remainingChunks = chunks - 1 - currentChunkIndex;

    if (
      remainingChunks > 0 &&
      Math.abs(currentChunkSize - idealChunkSize) > Math.abs(currentChunkSize + source[i + 1] - idealChunkSize)
    ) {
      continue;
    }

    result.push(i + 1);
    currentChunkSize = 0;
    currentChunkIndex++;

    if (currentChunkIndex === chunks - 1) {
      break;
    }
  }

  return result;
};

/**
 * Removes all trailing zeroes from an array.
 * @param arr the source array
 * @returns a new array with all trailing zeroes removed
 * @example
 * ```typescript
 * stripTrailingZeroes([1, 2, 3, 0, 0, 0]) // [1, 2, 3]
 * stripTrailingZeroes([1, 2, 3, 0, 2, 0]) // [1, 2, 3, 0, 2]
 * ```
 */
export const stripTrailingZeroes = (arr: number[]): number[] => {
  let i = arr.length - 1;
  while (i >= 0 && arr[i] === 0) {
    i--;
  }
  return arr.slice(0, i + 1);
};

/**
 * Given an array of unique, sequential numbers - which may or may not contain gaps - converts that array into a list of
 * "ranges"
 *
 * @param indexList A list of indexes (numbers) in the form `[0,1,2,7,8,9]`
 * @returns An array containing ranges, in the form `[start: number, end: number]`
 * @example
 * ```
 * toRanges([0,1,2,3,4,5,9,10,11,15,16,17]) // returns `[[0,5], [9,11], [15,17]]`
 * ```
 */
export function toRanges(indexList: number[]): Array<[start: number, end: number]> {
  if (indexList.length === 0) {
    return [];
  }
  const firstNumber = indexList[0];
  const lastNumber = last(indexList)!;
  let index = 0;
  for (let currentNumber = firstNumber; currentNumber < lastNumber; currentNumber++) {
    if (indexList[index] !== currentNumber) {
      const processedArray = indexList.slice(0, index);
      const unprocessedArray = indexList.slice(index, indexList.length);

      return [[processedArray[0], last(processedArray)!], ...toRanges(unprocessedArray)];
    }
    index++;
  }
  return [[firstNumber, lastNumber]];
}
