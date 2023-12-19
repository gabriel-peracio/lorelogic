import { coord } from "types/util";

/**
 * Given a source coordinate and a target coordinate, calculate a coordinate that will move source to target
 * @param source The coordinates of the object to be moved
 * @param target The coordinates that the object should be moved to
 * @returns A set of coordinates that, when added to the source coordinates, will move the object to the target coordinates
 */
export const getCoordTransform = (source: coord, target: coord): coord => {
  return [target[0] - source[0], target[1] - source[1]];
};
