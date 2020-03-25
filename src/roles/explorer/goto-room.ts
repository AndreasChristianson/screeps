import { gotoTarget, gotoPos } from "goto";
import { clearTask } from "roles/clear-task";

export const gotoRoom = (creep: Creep) => {
  const roomName = creep.memory.task!.roomName!;
  if (!roomName) {
    clearTask(creep);
    console.log('no roomname: clearing')
    return;
  }
  gotoPos(creep, new RoomPosition(25, 25, roomName));
  if (roomName === creep.room.name) {
    clearTask(creep);
  }
};
