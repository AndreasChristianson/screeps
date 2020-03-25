import { wait } from "./waiting";
import { useResources } from "./hybrid/use-resources";
import { claimController } from "./tasks/claim-controller";
import { gotoRoom } from "./tasks/goto-room";
import { pickup } from "./tasks/pickup";
import { withdraw } from "./tasks/withdraw";
import { harvest } from "./tasks/harvest";
import { dismantle } from "./tasks/dismantle";
import { transfer } from "./tasks/transfer";
import { repair } from "./tasks/repair";
import { build } from "./tasks/build";
import { upgradeController } from "./tasks/upgrade-controller";

export const performTask = (creep: Creep) => {
  const actions: Record<TaskType, (creep: Creep) => void> = {
    WAIT: wait,
    USE_RESOURCE: useResources,
    CLAIM_CONTROLLER: claimController,
    GOTO_ROOM: gotoRoom,
    PICKUP: pickup,
    WITHDRAW: withdraw,
    HARVEST: harvest,
    DISMANTLE: dismantle,
    TRANSFER: transfer,
    UPGRADE_CONTROLLER: upgradeController,
    REPAIR: repair,
    BUILD: build
  };
  actions[creep.memory.task!.type](creep);
};
