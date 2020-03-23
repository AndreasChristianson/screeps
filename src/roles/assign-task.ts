import { getWaitTask } from "./waiting";
import { assignHybridTask } from "./hybrid/assign-hybrid-task";
import { assignExplorerTask } from "./explorer/assign-explorer-task";

export const assignTask = (creep: Creep) => {
  const assigners: Record<Role, (creep: Creep) => Task> = {
    EXPLORER: assignExplorerTask,
    HYBRID: assignHybridTask,
    FIGHTER: getWaitTask
  };
  if (!creep.memory.task) {
    creep.memory.task = assigners[creep.memory.role](creep);
  }
};
