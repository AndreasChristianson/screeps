import { CLAIM_CONTROLLER, GOTO_ROOM } from "type-constants";
import { smallestFirst } from "../../utils/sort";
import { assignHybridTask } from "roles/hybrid/assign-hybrid-task";
import { getFlags } from "utils/flags";

const gotoRoomTask = (creep: Creep): Task | undefined => {
  const target = getFlags(COLOR_BLUE)
    .map(flag => ({
      pos: flag.pos,
      distance: creep.pos.getRangeTo(flag.pos)
    }))
    .sort(smallestFirst("distance"))[0];

  if (target && target.pos.roomName !== creep.room.name) {
    return {
      roomName: target.pos.roomName,
      type: GOTO_ROOM
    };
  }
  return undefined;
};

const claimTask = (creep: Creep): Task | undefined => {
  const controller = creep.room.controller;
  if (
    controller &&
    (controller.owner === undefined ||
      controller.owner.username !== creep.owner.username) &&
    (controller.reservation === undefined ||
      controller.reservation.username !== creep.owner.username)
  ) {
    return {
      target: controller.id,
      type: CLAIM_CONTROLLER
    };
  }
  return undefined;
};

export const assignExplorerTask = (creep: Creep): Task =>
  gotoRoomTask(creep) || claimTask(creep) || assignHybridTask(creep);
