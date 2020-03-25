import { gotoTarget } from "goto";
import { clearTask } from "roles/clear-task";

export const transfer = (creep: Creep) => {
  const target = Game.getObjectById(creep.memory.task!.target!) as
    | StructureSpawn
    | StructureExtension
    | StructureTower
    | StructureStorage
    | StructureContainer;
  if (!target) {
    clearTask(creep);
    return;
  }
  const transferResult = creep.transfer(
    target,
    RESOURCE_ENERGY
  );
  if (transferResult === ERR_FULL) {
    clearTask(creep);
  }
  if (creep.store.getUsedCapacity(RESOURCE_ENERGY) === 0) {
    clearTask(creep);
  }
  if (target.store.getFreeCapacity(RESOURCE_ENERGY) === 0) {
    clearTask(creep);
  }
  gotoTarget(creep, target);
};
