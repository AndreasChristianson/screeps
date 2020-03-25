import { createCreep } from "./create-creep";
import { HYBRID } from "type-constants";

export const needHybrid = (spawn: StructureSpawn) => {
  return !spawn.room.memory.lastWait || spawn.room.memory.lastWait < Game.time - 75;
};

export const spawnHybrid = (spawn: StructureSpawn) =>
  createCreep(
    spawn,
    {
      role: HYBRID
    },
    [MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, WORK],
    [MOVE, WORK]
  );
