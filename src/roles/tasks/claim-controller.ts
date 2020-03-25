import { gotoTarget } from "goto";
import { clearTask } from "roles/clear-task";

export const claimController = (creep: Creep) => {
  const controller = Game.getObjectById(
    creep.memory.task!.target!
  ) as StructureController;
  if (!controller) {
    clearTask(creep);
    return;
  }

  if (controller.owner && controller.owner.username === creep.owner.username) {
    clearTask(creep);
    return;
  }
  gotoTarget(creep, controller);
  const claimResult = creep.claimController(controller);
  if (claimResult === OK) {
    clearTask(creep);
    return;
  }
};
