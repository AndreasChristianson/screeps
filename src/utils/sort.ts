export const biggestFirst = <T extends Record<K, number>, K extends keyof T>(
  key: K
) => biggestFirstByAccessor((item:T) => item[key])
export const smallestFirst = <T extends Record<K, number>, K extends keyof T>(
  key: K
) => smallestFirstByAccessor((item:T) => item[key]);

export const biggestFirstByAccessor = <T>(accessor:(t:T) => number) => (left: T, right: T) =>
  accessor(right) - accessor(left);

export const smallestFirstByAccessor = <T>(accessor:(t:T) => number) => (left: T, right: T) =>
   accessor(left) - accessor(right);