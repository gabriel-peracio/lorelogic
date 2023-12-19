export enum Navigation {
  NEXT,
  BACK,
}

export const handleListNavigation = (n: Navigation.NEXT | Navigation.BACK, current: number, length: number) => {
  if (current < 0) {
    current = 0;
  }
  if (current > length - 1) {
    current = length - 1;
  }
  if (n === Navigation.NEXT) {
    current++;
    if (current > length - 1) {
      current = 0;
    }
  } else {
    current--;
    if (current < 0) {
      current = length - 1;
    }
  }

  return current;
};
