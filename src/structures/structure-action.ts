import { needsRepair } from "utils/repairs";

const shootAndRepair = (structure: Structure<StructureConstant>) => {
  const tower = structure as StructureTower;
  //todo: prioritize targets
  const needsKilling = tower.room
    .find(FIND_HOSTILE_CREEPS)
    .map(hostile => ({ hostile, dist: hostile.pos.getRangeTo(tower.pos) }))
    .sort((left, right) => left.dist - right.dist)[0];
  if (needsKilling) {
    tower.attack(needsKilling.hostile);
    return;
  }

  const needsHealing = tower.room
    .find(FIND_MY_CREEPS)
    .filter(creep => creep.hitsMax > creep.hits)[0];
  if (needsHealing) {
    tower.heal(needsHealing);
    return;
  }

  // const structureNeedsRepair = tower.room.find(FIND_STRUCTURES)
  //   .filter(needsRepair)
  // [0];
  // if (structureNeedsRepair) {
  //   tower.repair(structureNeedsRepair);
  //   return;
  // }
};

const structureActions: Partial<Record<
  StructureConstant,
  (structure: Structure<StructureConstant>) => void
>> = {
  [STRUCTURE_TOWER]: shootAndRepair
};

export const structureAction = (structure: Structure<StructureConstant>) => {
  const action = structureActions[structure.structureType];
  action && action(structure);
};
