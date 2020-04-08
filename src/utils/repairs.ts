const MAX_HP = 100 * 1000;

export const repairCost = (structure: Structure) => {
  const hpDeficit = Math.min(structure.hitsMax, MAX_HP) - structure.hits
  return Math.max(hpDeficit * REPAIR_COST, 0);
};
