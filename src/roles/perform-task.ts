import { useEnergy } from "./tasks/use-energy";
import { wait } from "./waiting";
import { useResources } from "./hybrid/use-resources";
import { claimController } from "./tasks/claim-controller";
import { gotoRoom } from "./tasks/goto-room";
import { pickup } from "./tasks/pickup";
import { withdraw } from "./tasks/withdraw";
import { harvest } from "./tasks/harvest";
import { dismantle } from "./tasks/dismantle";

export const performTask = (creep: Creep) => {
  const actions: Record<TaskType, (creep: Creep) => void> = {
    WAIT: wait,
    USE_RESOURCE: useResources,
    USE_ENERGY: useEnergy,
    CLAIM_CONTROLLER: claimController,
    GOTO_ROOM: gotoRoom,
    PICKUP: pickup,
    WITHDRAW: withdraw,
    HARVEST: harvest,
    DISMANTLE: dismantle
  };
  actions[creep.memory.task!.type](creep);
};
