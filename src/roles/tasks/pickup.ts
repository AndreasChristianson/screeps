import { gotoTarget } from "goto";
import { clearTask } from "roles/clear-task";
import { isIn } from "utils/return-codes";

export const pickup = (creep: Creep) => {
  const target = Game.getObjectById(creep.memory.task!.target!) as Resource;
  if (!target) {
    clearTask(creep);
    return;
  }
  if (creep.store.getFreeCapacity() === 0) {
    clearTask(creep);
  }
  if (isIn(creep.pickup(target as Resource),[OK, ERR_FULL])) {
    clearTask(creep);
  }
  gotoTarget(creep, target);
};
