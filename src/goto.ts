import { smallestFirst, biggestFirst } from "utils/sort";

export const gotoTarget = (creep: Creep, obj: RoomObject) => {
  return gotoPos(creep, obj.pos);
};

export const gotoPos = (
  creep: Creep,
  pos: RoomPosition
) => {
  const result = creep.moveTo(pos, {
    visualizePathStyle: { stroke: "#aaaaaa" },
    // ignoreCreeps: true
  });
  return result;
};


