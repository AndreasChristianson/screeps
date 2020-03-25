import { ErrorMapper } from "utils/ErrorMapper";
import { assignTask } from "roles/assign-task";
import { performTask } from "roles/perform-task";
import { conditionallySpawnCreep } from "spawn/spawn";
import { structureAction } from "structures/structure-action";
import { processFlags } from "clearFlags";
import { cleanUp } from 'utils/registries'
import { drawRoomDisplay } from "visuals/draw-room-display";

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  console.log(Game.time);
  Object.values(Game.structures).forEach(structureAction);
  const creeps = Object.values(Game.creeps).filter(creep => !creep.spawning);
  creeps.forEach(assignTask);
  Object.values(Game.spawns).forEach(conditionallySpawnCreep);
  creeps.forEach(performTask);

  // Object.values(Game.rooms).forEach(assignRoomTasks)



  processFlags();

  Object.values(Game.spawns).forEach(drawRoomDisplay);
  cleanUp();

  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }
});
