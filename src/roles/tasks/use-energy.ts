import { gotoTarget } from "goto";
import { clearTask } from "roles/clear-task";
import { hasEnergyToProvide } from "../hybrid/has-energy";
import { needsRepair } from "utils/repairs";

// build ramparts
// provide fighters
// provide tower
// provide spawn
// repair
// build
// upgrade controller

export const useEnergy = (creep: Creep) => {
  const target = Game.getObjectById(creep.memory.task!.target!);
  if (!target || creep.store.getUsedCapacity(RESOURCE_ENERGY) === 0) {
    clearTask(creep);
    return;
  }
  creep.build(target as ConstructionSite);
  creep.upgradeController(target as StructureController);
  const repairResult = creep.repair(target as Structure);
  if (
    creep.memory.task!.meta === "repair" &&
    !needsRepair(target as Structure)
  ) {
    // console.log(repairResult)
    clearTask(creep);
  }
  const transferResult = creep.transfer(
    target as
      | StructureSpawn
      | StructureExtension
      | StructureTower
      | StructureStorage
      | StructureContainer,
    RESOURCE_ENERGY
  );
  if (transferResult === ERR_FULL) {
    clearTask(creep);
    return;
  }
  gotoTarget(creep, target);
};
