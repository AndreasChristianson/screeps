import { gotoTarget } from "goto";
import { clearTask } from "roles/clear-task";
import { needsRepair } from "utils/repairs";

export const repair = (creep: Creep) => {
  const target = Game.getObjectById(creep.memory.task!.target!) as Structure;
  if (!target || creep.store.getUsedCapacity(RESOURCE_ENERGY) === 0) {
    clearTask(creep);
    return;
  }
  creep.repair(target);
  if (!needsRepair(target)) {
    clearTask(creep);
  }
  gotoTarget(creep, target);
};
