import { gotoTarget } from "roles/goto";
import { clearTask } from "roles/clear-task";
import { isHoldingResources, nonEnergyResources } from "resources/is-holding";

export const useResources = (creep: Creep) => {
  const target = Game.getObjectById(creep.memory.task!.target!);
  if (!target || !isHoldingResources(creep.store, nonEnergyResources)) {
    clearTask(creep);
    return;
  }
  for (const resource of nonEnergyResources) {
    const transferResult = creep.transfer(target as StructureStorage, resource);
  }
  gotoTarget(creep, target);
};
