import { REPAIR_TASK_WEIGHT } from "task-generation/task-weights";
import { hasEnergyToProvide } from "task-generation/creep-predicates";
import { REPAIR } from "type-constants";
import { getFlags } from "utils/flags";
import { repairCost } from "utils/repairs";


export const getRepairTasks = (room: Room) => {
  const greenFlags = getFlags(COLOR_GREEN);

  return room
    .find(FIND_STRUCTURES)
    .filter(
      structure =>
        !greenFlags.some(
          flag => flag.pos.isEqualTo(structure.pos)
        )
    )
    .map<TaskBuilder>(structure => ({
      weight: REPAIR_TASK_WEIGHT,
      creepPredicate: hasEnergyToProvide,
      position: structure.pos,
      task: {
        target: structure.id,
        type: REPAIR
      },
      parallelism: 6,
      required: repairCost(structure),
      creepRange: 50
    }));
};
