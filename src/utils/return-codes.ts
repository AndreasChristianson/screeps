export const isIn = (code: ScreepsReturnCode, validCodes: ScreepsReturnCode[]):boolean =>
  validCodes.includes(code);
