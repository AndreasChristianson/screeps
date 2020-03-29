import { gotoTarget } from "goto";
import { clearTask } from "roles/clear-task";
import { isIn } from "utils/return-codes";

export const upgradeController = (creep: Creep) => {
  const target = Game.getObjectById(creep.memory.task!.target!) as StructureController;
  if (!target || creep.store.getUsedCapacity(RESOURCE_ENERGY) === 0) {
    clearTask(creep);
    return;
  }
  const upgradeControllerResult = creep.upgradeController(target);
  if(!isIn(upgradeControllerResult,[OK])){
    gotoTarget(creep, target);
  }
};
