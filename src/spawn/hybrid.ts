import { createCreep } from "./create-creep";
import { HYBRID } from "type-constants";

export const needHybrid = (spawn: StructureSpawn) =>
  !spawn.room.memory.lastWait || spawn.room.memory.lastWait < Game.time - 75;

export const spawnHybrid = (spawn: StructureSpawn) =>
  createCreep(
    spawn,
    {
      role: HYBRID
    },
    [MOVE, WORK, MOVE, CARRY, MOVE, CARRY, MOVE, WORK, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY]
  );
