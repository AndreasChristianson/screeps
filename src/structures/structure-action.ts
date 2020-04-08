import { repairCost } from "utils/repairs";
import { smallestFirst } from "utils/sort";
import { Z_FILTERED } from "zlib";

const shootClosest = (attacker: RoomObject & { attack: (creep: Creep) => ScreepsReturnCode }) => {
  const attackTarget = attacker.room && attacker.room
    .find(FIND_HOSTILE_CREEPS)
    .map(hostile => ({
      hostile,
      dist: hostile.pos.getRangeTo(attacker.pos)
    }))
    .sort(smallestFirst('dist'))[0];
  if (attackTarget) {
    return attacker.attack(attackTarget.hostile);
  }
  return undefined;
};

const repairLowest = (repairer: RoomObject & { repair: (structure: Structure) => ScreepsReturnCode }) => {
  const repairTarget = repairer.room && repairer.room
    .find(FIND_STRUCTURES)
    .filter(repairCost)
    .sort(smallestFirst('hits'))[0];
  if (repairTarget) {
    return repairer.repair(repairTarget);
  }
  return undefined;
};

const healLowest = (healer: RoomObject & { heal: (creep: Creep) => ScreepsReturnCode }) => {
  const healTarget = healer.room && healer.room
    .find(FIND_MY_CREEPS)
    .filter(creep => creep.hits<creep.hitsMax)
    .sort(smallestFirst('hits'))[0];
  if (healTarget) {
    return healer.heal(healTarget);
  }
  return undefined;
};

export const towerAction = (tower: StructureTower) => shootClosest(tower) || healLowest(tower) || repairLowest(tower);
