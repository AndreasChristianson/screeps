export const gotoTarget = (creep: Creep, obj: RoomObject) => {
  return gotoPos(creep, obj.pos);
};

export const gotoPos = (
  creep: Creep,
  pos: RoomPosition
) => {
  if (creep.room.name !== pos.roomName) {
    return gotoRoom(creep, pos.roomName);
  }
  const result = creep.moveTo(pos, {
    visualizePathStyle: { stroke: "#aaaaaa" }
  });
  return result;
};

export const gotoRoom = (
  creep: Creep,
  roomName: string
): CreepMoveReturnCode | ERR_NO_PATH | ERR_INVALID_TARGET | ERR_NOT_FOUND => {
  const exitDirection = creep.room.findExitTo(roomName);
  if (ERR_NO_PATH === exitDirection) {
    console.log("failed multi-room travel:");
    console.log(exitDirection);
    return exitDirection as ERR_NO_PATH;
  }
  const exitTarget = creep.room.find(
    exitDirection as
      | FIND_EXIT_BOTTOM
      | FIND_EXIT_LEFT
      | FIND_EXIT_RIGHT
      | FIND_EXIT_TOP
  );
  return gotoPos(creep, exitTarget[0]); //todo, go to the closest one, not the first
};
