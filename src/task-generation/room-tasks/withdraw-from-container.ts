import { needsEnergy } from "task-generation/creep-predicates";
import { WITHDRAW } from "type-constants";
import { UNDER_ATTACK_CONTAINER_WITHDRAW_TASK_WEIGHT } from "task-generation/task-weights";
import { underAttack } from "utils/modes";

export const getContainerWithdrawTasks = (room: Room) => {
  if (underAttack(room)) {
    return room
      .find<StructureContainer>(FIND_STRUCTURES)
      .filter(structure => [STRUCTURE_CONTAINER].includes(structure.structureType))
      .map<TaskBuilder>(container => ({
        weight: UNDER_ATTACK_CONTAINER_WITHDRAW_TASK_WEIGHT,
        creepPredicate: needsEnergy,
        position: container.pos,
        task: {
          target: container.id,
          type: WITHDRAW
        },
        parallelism: Number.MAX_SAFE_INTEGER,
        available: container.store.getUsedCapacity(RESOURCE_ENERGY),
        creepRange: 50
      }));
  }
  return [];
};


