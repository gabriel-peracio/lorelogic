/**
 * This function will convert a className passed to it into an object of key-value pairs,
 * ensuring that the keys exist (even if the value is undefined).
 *
 * If a string is passed, then the first key of the destructured object will be the string, and
 * the rest will be undefined.
 *
 * This is useful for components that accept a className prop, but also have sub-components
 * or sub-elements that need to be styled.
 * @param className Either a string or an object of key-value pairs
 * @example
 * export type MyComponentProps = {
 *  className?: string | AtLeast<{ main: string; content: string; footer: string }>
 * }
 * export const MyComponent = ({ className }: MyComponentProps) => {
 *   const {main, content, footer} = extractClassName(className);
 *  return (
 *   <div className={main}>
 *    <div className={content}>content</div>
 *    <div className={footer}>footer</div>
 *  </div>
 * }
 */
export function extractClassName<T extends Record<string, string> | string | undefined>(
  className: T,
): T extends string | undefined ? Record<string, undefined> : { [K in keyof T]: T[K] | undefined } {
  let mainClassKey: string;
  return new Proxy(
    {},
    {
      get: function (target, key: string) {
        if (typeof className === "object" && className !== null) {
          return className[key];
        } else if (typeof className === "string") {
          if (mainClassKey === undefined) {
            mainClassKey = key;
          }
          if (mainClassKey === key) {
            return className;
          }
        }
        return undefined;
      },
    },
  ) as any;
}
