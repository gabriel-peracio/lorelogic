import { escapeRegExp, last } from "lodash";

type fuzzyMatchOptions = {
  /**
   * Whether the search should be case-sensitive
   * @default false
   */
  caseSensitive?: boolean;
  /**
   * Whether the search should ignore spaces
   * @default true
   */
  ignoreSpaces?: boolean;
};

/**
 * Given a query and a string, check whether the string contains the query, even if the query has to be broken up.
 * case-insensitive
 * @param query What you want to search
 * @param str The string you want to search in
 * @returns `false` if the query is not found in the string, and an array of the indices of the query in the string (in
 * the form `number[]`) if it is found
 * @example
 * fuzzyMatch('abc', 'abcdefg') // [0, 1, 2]
 * fuzzyMatch('abc', 'abdefg') // false
 * fuzzyMatch('abc', 'abdefc') // [0, 1, 5]
 */
export function fuzzyMatch(query: string, str: string, options?: fuzzyMatchOptions) {
  const { caseSensitive = false, ignoreSpaces = true } = options ?? {};
  if (ignoreSpaces) {
    query = query.replace(/\s/g, "");
    str = str.replace(/\s/g, "");
  }
  const queryRegExp = new RegExp(
    query
      .split("")
      .map((char) => escapeRegExp(char))
      .join(".*"),
    caseSensitive ? "" : "i",
  );
  if (!queryRegExp.test(str)) return false;
  const indices: number[] = [];

  let currentQueryCharIndex = 0;
  let l = 100;
  while (currentQueryCharIndex < query.length && l > 0) {
    const lastFoundIdx = last(indices) ?? 0;
    const remainingStr = str.slice(lastFoundIdx + 1);
    const queryChar = query[currentQueryCharIndex];
    const queryCharPositionInStr = remainingStr.indexOf(queryChar);
    indices.push(queryCharPositionInStr + lastFoundIdx + 1);
    currentQueryCharIndex++;
    l--;
  }
  return indices;
}
