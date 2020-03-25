export const generateHash = (maxLength:number = 5) => 
  (Game.time * Math.random())
    .toString(32)
    .replace('.', '')
    .slice(0, maxLength);

export const generateName = (prefix: string) =>
  `${prefix}-${generateHash()}`;


