export const getFlags = (color: ColorConstant) =>
  Object.values(Game.flags).filter(flag => flag.color === color);
