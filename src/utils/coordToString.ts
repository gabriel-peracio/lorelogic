import { coord } from "types/util";

export const coordToString = (coord: coord) => coord.map((c) => `${c}px`).join(",");
