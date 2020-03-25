import { gotoTarget } from "goto";
import { clearTask } from "roles/clear-task";
import { isEmpty } from "resources/utils";
import { isIn } from "utils/return-codes";

export const withdraw = (creep: Creep) => {
  const target = Game.getObjectById(creep.memory.task!.target!) as Ruin | Tombstone | StructureStorage | StructureContainer;
  if (!target) {
    clearTask(creep);
    return;
  }
  if (creep.store.getFreeCapacity() === 0) {
    clearTask(creep);
  }
  if (isEmpty(target.store)) {
    clearTask(creep);
  }
  for (const resource of RESOURCES_ALL) {
    if (isIn(
      creep.withdraw(target,resource),
      [ERR_INVALID_TARGET, ERR_NOT_ENOUGH_ENERGY]) &&
      ((target as Ruin).destroyTime || (target as Tombstone).deathTime)
    ) {
      clearTask(creep);
    }
  }
  gotoTarget(creep, target);
};
