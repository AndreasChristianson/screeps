import { UPGRADE_CONTROLLER_TASK_WEIGHT } from "task-generation/task-weights";
import { hasEnergyToProvide } from "task-generation/creep-predicates";
import { UPGRADE_CONTROLLER } from "type-constants";

export const getUpgradeControllerTasks = (room: Room) => room
  .find<StructureController>(FIND_MY_STRUCTURES)
  .filter(structure => [STRUCTURE_CONTROLLER].includes(structure.structureType))
  .map<TaskBuilder>(controller => ({
    weight: UPGRADE_CONTROLLER_TASK_WEIGHT,
    creepPredicate: hasEnergyToProvide,
    position: controller.pos,
    task: {
      target: controller.id,
      type: UPGRADE_CONTROLLER
    },
    parallelism: 6,
    creepRange: 50
  }));