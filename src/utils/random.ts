export const generateName = (prefix: string) =>
  `${prefix}-${(Game.time ** 2 * Math.random()).toString(32).slice(0, 5)}`;
