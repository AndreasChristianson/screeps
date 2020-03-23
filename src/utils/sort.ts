export const biggestFirst = <T extends Record<K, number>, K extends keyof T>(
  key: K
) => (left: T, right: T) => right[key] - left[key];
export const smallestFirst = <T extends Record<K, number>, K extends keyof T>(
  key: K
) => (left: T, right: T) => left[key] - right[key];
