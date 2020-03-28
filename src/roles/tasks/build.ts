import { gotoTarget } from "goto";
import { clearTask } from "roles/clear-task";
import { isIn } from "utils/return-codes";

export const build = (creep: Creep) => {
  const target = Game.getObjectById(creep.memory.task!.target!) as ConstructionSite;
  if (!target || creep.store.getUsedCapacity(RESOURCE_ENERGY) === 0) {
    clearTask(creep);
    return;
  }
  const buildReturn = creep.build(target);
  if(!isIn(buildReturn,[OK])){
    gotoTarget(creep, target);
  }
};
