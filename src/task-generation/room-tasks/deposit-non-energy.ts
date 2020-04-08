import { DEPOSIT_NON_ENERGY_RESOURCES } from "task-generation/task-weights";
import { USE_RESOURCE } from "type-constants";
import { isHoldingResources, nonEnergyResources } from "resources/utils";

export const depositNonEnergyTasks = (room: Room) => room
  .find<StructureStorage>(FIND_STRUCTURES)
  .filter(structure => [STRUCTURE_STORAGE].includes(structure.structureType))
  .map<TaskBuilder>(storage => ({
    weight: DEPOSIT_NON_ENERGY_RESOURCES,
    creepPredicate: (creep: Creep) => isHoldingResources(creep.store, nonEnergyResources),
    position: storage.pos,
    task: {
      target: storage.id,
      type: USE_RESOURCE
    },
    parallelism: Number.MAX_SAFE_INTEGER,
    creepRange: 50
  }));
