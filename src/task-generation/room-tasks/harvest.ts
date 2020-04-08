import { needsEnergy } from "task-generation/creep-predicates";
import { HARVEST } from "type-constants";
import { HARVEST_TASK_WEIGHT } from "task-generation/task-weights";
import { adjacentLocationCount } from "utils/find";

export const getHarvestTasks = (room: Room) => room
  .find(FIND_SOURCES)
  .map<TaskBuilder>(source => ({
    weight: HARVEST_TASK_WEIGHT,
    creepPredicate: needsEnergy,
    position: source.pos,
    task: {
      target: source.id,
      type: HARVEST
    },
    parallelism: adjacentLocationCount(room, source.pos),
    available: source.energy,
    creepRange: 50
  }));

