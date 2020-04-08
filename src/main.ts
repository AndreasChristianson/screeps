import { ErrorMapper } from "utils/ErrorMapper";
import { assignTask } from "roles/assign-task";
import { performTask } from "roles/perform-task";
import { conditionallySpawnCreep } from "spawn/spawn";
import { towerAction } from "structures/structure-action";
import { processFlags } from "clearFlags";
import { cleanUp } from 'utils/registries'
import { drawRoomDisplay } from "visuals/draw-room-display";
import { assignTasks } from "task-generation/assign-tasks";

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
const isTower = (structure: Structure<StructureConstant>): structure is StructureTower => structure.structureType === STRUCTURE_TOWER;

export const loop = ErrorMapper.wrapLoop(() => {
  console.log(Game.time);
  Object.values(Game.structures)
    .filter<StructureTower>(isTower)
    .forEach(towerAction);
  const creeps = Object.values(Game.creeps).filter(creep => !creep.spawning);
  //todo clear tasks as a separate step
  // creeps.forEach(assignTask);
  assignTasks();

  Object.values(Game.spawns).forEach(conditionallySpawnCreep);
  creeps.forEach(performTask);

  processFlags();

  Object.values(Game.rooms).forEach(drawRoomDisplay);
  cleanUp();

  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }
});
