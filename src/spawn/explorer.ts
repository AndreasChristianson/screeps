import { buildBody } from "./build-body";
import { createCreep } from "./create-creep";
import { EXPLORER } from "type-constants";
import { getFlags } from "utils/flags";
import { findCreepsByRole } from "utils/find";

export const needExplorer = () => getFlags(COLOR_BLUE).length;

export const spawnExplorer = (spawn: StructureSpawn) =>
  createCreep(
    spawn,
    {
      role: EXPLORER
    },
    [MOVE, WORK, MOVE, CARRY, MOVE, CARRY],
    [MOVE, CLAIM]
  );
