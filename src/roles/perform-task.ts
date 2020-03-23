import { getEnergy } from "./hybrid/get-energy";
import { useEnergy } from "./hybrid/use-energy";
import { wait } from "./waiting";
import { useResources } from "./hybrid/use-resources";
import { claimController } from "./explorer/claim-controller";
import { gotoRoom } from "./explorer/goto-room";

export const performTask = (creep: Creep) => {
  const actions: Record<TaskType, (creep: Creep) => void> = {
    WAIT: wait,
    USE_RESOURCE: useResources,
    GET_ENERGY: getEnergy,
    USE_ENERGY: useEnergy,
    CLAIM_CONTROLLER: claimController,
    GOTO_ROOM: gotoRoom
  };
  actions[creep.memory.task!.type](creep);
};
