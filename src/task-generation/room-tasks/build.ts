import { BUILD_TASK_WEIGHT } from "task-generation/task-weights";
import { hasEnergyToProvide } from "task-generation/creep-predicates";
import { BUILD } from "type-constants";

export const getBuildTasks = (room: Room) => room
  .find(FIND_CONSTRUCTION_SITES)
  .map<TaskBuilder>(site => ({
    weight: BUILD_TASK_WEIGHT,
    creepPredicate: hasEnergyToProvide,
    position: site.pos,
    task: {
      target: site.id,
      type: BUILD
    },
    parallelism: 2,
    required: site.progressTotal - site.progress,
    creepRange: 50
  }));
