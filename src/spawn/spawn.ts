import {
  getTotalAvailableEnergy,
  getTotalEnergyCapacity
} from "./spawn-energy";
import { needHybrid, spawnHybrid } from "./hybrid";
import { needExplorer, spawnExplorer } from "./explorer";

const safeModeShouldSpawn = (spawn: StructureSpawn) =>
  getTotalAvailableEnergy(spawn) >= 300 &&
  spawn.room.find(FIND_MY_CREEPS).length < 5;

const shouldSpawn = (spawn: StructureSpawn) => {
  const totalEnergy = getTotalAvailableEnergy(spawn);
  const totalCapacity = getTotalEnergyCapacity(spawn);

  return !spawn.spawning &&
    (safeModeShouldSpawn(spawn) ||
      totalEnergy === totalCapacity);
}

export const conditionallySpawnCreep = (spawn: StructureSpawn) => {
  if (!shouldSpawn(spawn)) {
    return;
  }
  // if(needFighter()){
  //   spawnFighter(spawn);
  // }
  if (needHybrid(spawn)) {
    spawnHybrid(spawn);
    return;
  }
  if (needExplorer()) {
    spawnExplorer(spawn);
    return;
  }
};
