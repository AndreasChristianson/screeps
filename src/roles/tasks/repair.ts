import { gotoTarget } from "goto";
import { clearTask } from "roles/clear-task";
import { repairCost } from "utils/repairs";
import { isIn } from "utils/return-codes";

export const repair = (creep: Creep) => {
  const target = Game.getObjectById(creep.memory.task!.target!) as Structure;
  if (!target || creep.store.getUsedCapacity(RESOURCE_ENERGY) === 0) {
    clearTask(creep);
    return;
  }
  if (!repairCost(target)) {
    clearTask(creep);
  }
  const repairResult = creep.repair(target);
  if(!isIn(repairResult,[OK])){
    gotoTarget(creep, target);
  }
};
