import { gotoTarget, gotoPos } from "roles/goto";
import { clearTask } from "roles/clear-task";

export const gotoRoom = (creep: Creep) => {
  const room = Game.rooms[creep.memory.task!.roomName!];
  if (!room) {
    clearTask(creep);
    return;
  }
  gotoPos(creep, new RoomPosition(25, 25, room.name));
  if (room.name === creep.room.name) {
    clearTask(creep);
  }
};
