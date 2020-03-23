import { gotoTarget } from "roles/goto";
import { clearTask } from "roles/clear-task";

export const getEnergy = (creep: Creep) => {
  const target = Game.getObjectById(creep.memory.task!.target!);
  if (!target) {
    clearTask(creep);
    return;
  }
  if (creep.store.getFreeCapacity() === 0) {
    clearTask(creep);
    return;
  }
  if (creep.harvest(target as Source) === ERR_NOT_ENOUGH_RESOURCES) {
    clearTask(creep);
    return;
  }
  if (creep.pickup(target as Resource) === OK) {
    clearTask(creep);
    return;
  }
  for (const resource of RESOURCES_ALL) {
    const withdrawResult = creep.withdraw(
      target as Ruin | Tombstone | StructureContainer | StructureStorage,
      resource
    );

    if (withdrawResult === OK) {
      clearTask(creep);
      return;
    }

    if (
      (withdrawResult === ERR_INVALID_TARGET ||
        withdrawResult === ERR_NOT_ENOUGH_ENERGY) &&
      ((target as Ruin).destroyTime || (target as Tombstone).deathTime)
    ) {
      creep.room.visual.text("withdrawResult", creep.pos);
      clearTask(creep);
      return;
    }
  }

  if (creep.memory.task!.meta === "dismantle") {
    creep.dismantle(target as Structure);
  }
  if (gotoTarget(creep, target) === ERR_NO_PATH) {
    clearTask(creep);
  }
};
