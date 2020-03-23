import {
  getTotalAvailableEnergy,
  getTotalEnergyCapacity
} from "./spawn-energy";
import { needHybrid, spawnHybrid } from "./hybrid";
import { needExplorer, spawnExplorer } from "./explorer";

const safeModeShouldSpawn = (spawn: StructureSpawn) =>
  getTotalAvailableEnergy(spawn) >= 300 &&
  spawn.room.find(FIND_MY_CREEPS).length < 5;

const shouldSpawn = (spawn: StructureSpawn) =>
  !spawn.spawning &&
  (safeModeShouldSpawn(spawn) ||
    getTotalAvailableEnergy(spawn) === getTotalEnergyCapacity(spawn));

export const conditionallySpawnCreep = (spawn: StructureSpawn) => {
  if (!shouldSpawn(spawn)) {
    return;
  }
  spawn.room.visual.text("should spawn", 1, 1);
  // if(needFighter()){
  //   spawnFighter(spawn);
  // }
  if (needHybrid(spawn)) {
    spawn.room.visual.text("need hybrid", 1, 2);

    spawnHybrid(spawn);
    return;
  }
  if (needExplorer()) {
    spawnExplorer(spawn);
    return;
  }
};
