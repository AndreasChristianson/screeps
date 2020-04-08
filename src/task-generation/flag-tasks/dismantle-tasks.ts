import { DISMANTLE } from "type-constants";
import { DISMANTLE_TASK_WEIGHT } from "task-generation/task-weights";
import { composite, needsEnergy } from "task-generation/creep-predicates";

const hasFourOrMoreWorkParts = (creep: Creep) => creep.body.filter(part => part.type === WORK).length >= 4

export const getDismantleTasks = (flag: Flag): TaskBuilder[] => {
  if (flag.room) {
    return flag.room.lookForAt(LOOK_STRUCTURES, flag.pos)
      .map<TaskBuilder>(structure => ({
        weight: DISMANTLE_TASK_WEIGHT,
        creepPredicate: composite(hasFourOrMoreWorkParts, needsEnergy),
        position: flag.pos,
        task: {
          target: structure.id,
          type: DISMANTLE
        },
        parallelism: 1,
        creepRange: 50
      }))
  }
  return [];
};
