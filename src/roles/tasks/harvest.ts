import { gotoTarget } from "goto";
import { clearTask } from "roles/clear-task";
import { isIn } from "utils/return-codes";

export const harvest = (creep: Creep) => {
  const target = Game.getObjectById(creep.memory.task!.target!) as Source | Mineral<MineralConstant> | Deposit;
  if (!target) {
    clearTask(creep);
  }
  if (creep.store.getFreeCapacity() === 0) {
    clearTask(creep);
    return;
  }
  if (isIn(creep.harvest(target), [ERR_NOT_ENOUGH_RESOURCES])) {
    clearTask(creep);
  }
  if (isIn(gotoTarget(creep, target), [ERR_NO_PATH])) {
    clearTask(creep);
  }
};
