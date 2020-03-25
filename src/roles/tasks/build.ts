import { gotoTarget } from "goto";
import { clearTask } from "roles/clear-task";

export const build = (creep: Creep) => {
  const target = Game.getObjectById(creep.memory.task!.target!) as ConstructionSite;
  if (!target || creep.store.getUsedCapacity(RESOURCE_ENERGY) === 0) {
    clearTask(creep);
    return;
  }
  creep.build(target);
  gotoTarget(creep, target);
};
