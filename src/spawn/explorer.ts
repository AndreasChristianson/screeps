import { createCreep } from "./create-creep";
import { EXPLORER } from "type-constants";
import { getFlags } from "utils/flags";

export const needExplorer = () => getFlags(COLOR_BLUE).length;

export const spawnExplorer = (spawn: StructureSpawn) =>
  createCreep(
    spawn,
    {
      role: EXPLORER
    },
    [MOVE, WORK, MOVE, CARRY, MOVE, CARRY],
    getFlags(COLOR_BLUE)[0].room ? [] : [MOVE, CLAIM]
  );
