export type SVGIconComponent = React.FunctionComponent<
  React.SVGProps<SVGSVGElement> & {
    title?: string | undefined;
  }
>;

export type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
export type XOR<T, U> = T | U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;
export type AllXOR<T extends any[]> = T extends [infer Only]
  ? Only
  : T extends [infer A, infer B, ...infer Rest]
    ? AllXOR<[XOR<A, B>, ...Rest]>
    : never;

export type coord = [x: number, y: number];
export type dimension = [w: number, h: number];

export type direction = "bottom" | "bottom-left" | "bottom-right" | "top" | "top-left" | "top-right" | "left" | "right";

export type OmitFirst<T extends any[]> = T extends [any, ...infer R] ? R : never;
