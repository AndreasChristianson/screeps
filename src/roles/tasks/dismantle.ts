import { gotoTarget } from "goto";
import { clearTask } from "roles/clear-task";
import { isIn } from "utils/return-codes";

export const dismantle = (creep: Creep) => {
  const target = Game.getObjectById(creep.memory.task!.target!) as Structure;
  if (!target) {
    clearTask(creep);
  }
  if (creep.store.getFreeCapacity() === 0) {
    clearTask(creep);
  }
  creep.dismantle(target);
  if (isIn(gotoTarget(creep, target), [ERR_NO_PATH])) {
    clearTask(creep);
  }
};
