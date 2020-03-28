import { createCreep } from "./create-creep";
import { HYBRID } from "type-constants";

export const needHybrid = (spawn: StructureSpawn) => {
  return !spawn.room.memory.lastWait || spawn.room.memory.lastWait < Game.time - 100;
  // should not spawn if no remote harvest and no source adjacent avail
};

export const spawnHybrid = (spawn: StructureSpawn) =>
  createCreep(
    spawn,
    {
      role: HYBRID
    },
    [MOVE, WORK, MOVE, CARRY, MOVE, CARRY]
  );
