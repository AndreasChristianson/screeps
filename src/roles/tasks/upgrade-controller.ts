import { gotoTarget } from "goto";
import { clearTask } from "roles/clear-task";

export const upgradeController = (creep: Creep) => {
  const target = Game.getObjectById(creep.memory.task!.target!) as StructureController;
  if (!target || creep.store.getUsedCapacity(RESOURCE_ENERGY) === 0) {
    clearTask(creep);
    return;
  }
  creep.upgradeController(target);
  gotoTarget(creep, target);
};
