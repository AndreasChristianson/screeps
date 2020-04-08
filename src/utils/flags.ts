export const getFlags = (color: ColorConstant) =>
  getAllFlags().filter(flag => flag.color === color);

export const getAllFlags = () => Object.values(Game.flags);