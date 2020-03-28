import { gotoPos } from "goto";
import { clearTask } from "roles/clear-task";
import { smallestFirst } from "utils/sort";

export const gotoRoom = (creep: Creep) => {
  const roomName = creep.memory.task!.roomName!;
  let wayPoint = creep.memory.task!.wayPoint;
  if (!roomName) {
    clearTask(creep);
    return;
  }
  if(creep.room.name === roomName) {
    const destination = new RoomPosition(25, 25, roomName);
    gotoPos(creep, destination);
    clearTask(creep);
    return;
  }

  if(!wayPoint){
    const exitDirection = creep.room.findExitTo(roomName) as
      FIND_EXIT_BOTTOM | FIND_EXIT_LEFT | FIND_EXIT_RIGHT | FIND_EXIT_TOP | ERR_NO_PATH;
    if (ERR_NO_PATH === exitDirection) {
      console.log("failed multi-room travel:");
      console.log(exitDirection);
      return exitDirection as ERR_NO_PATH;
    }
    const exitTarget = creep.room
      .find(exitDirection)
      .map(exit => {
        const path = creep.pos.findPathTo(exit);
        return {
          exit,
          path,
          distance: path.length
        };
      })
      .sort(smallestFirst('distance'))[0].exit;
    wayPoint = {
      x: exitTarget.x,
      y: exitTarget.y,
      roomName: exitTarget.roomName
    }
    creep.memory.task!.wayPoint = wayPoint;
  }  
  
  if(wayPoint && creep.pos.isNearTo(new RoomPosition(wayPoint.x, wayPoint.y, wayPoint.roomName))){
    delete creep.memory.task!.wayPoint;
  }

  gotoPos(creep, new RoomPosition(wayPoint.x, wayPoint.y, wayPoint.roomName));
  return;
};
