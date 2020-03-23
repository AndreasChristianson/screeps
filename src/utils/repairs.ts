const REPAIR_THRESHOLD = 0.75;
export const needsRepair = (structure: Structure) => {
  const ratio = structure.hits / Math.min(structure.hitsMax, 250 * 1000);
  return ratio < REPAIR_THRESHOLD;
};
