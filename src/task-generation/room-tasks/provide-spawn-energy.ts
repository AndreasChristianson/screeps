import { PROVIDE_SPAWN_ENERGY_TASK_WEIGHT } from "task-generation/task-weights";
import { hasEnergyToProvide } from "task-generation/creep-predicates";
import { TRANSFER } from "type-constants";
import { drawAtPosition } from "visuals/draw-at-position";

export const getProvideSpawnEnergyTasks = (room: Room) => room
  .find<StructureSpawn | StructureExtension>(FIND_MY_STRUCTURES)
  .filter(structure =>
    [STRUCTURE_EXTENSION, STRUCTURE_SPAWN].includes(structure.structureType)
  )
  .map<TaskBuilder>(spawnLike => ({
    weight: PROVIDE_SPAWN_ENERGY_TASK_WEIGHT,
    creepPredicate: hasEnergyToProvide,
    position: spawnLike.pos,
    task: {
      target: spawnLike.id,
      type: TRANSFER
    },
    parallelism: Number.MAX_SAFE_INTEGER,
    required: spawnLike.energyCapacity - spawnLike.energy,
    creepRange: 50
  }));
