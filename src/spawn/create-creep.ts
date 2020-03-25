import { generateName } from "utils/random";
import { drawNonUrgentNotification } from "visuals/draw-notification";

const repeat = (
  partsToAdd: BodyPartConstant[],
  times: number
): BodyPartConstant[] => {
  const body: BodyPartConstant[] = [];
    for (let i = 0; i< times; i++) {
      body.push(partsToAdd[i % partsToAdd.length]);
    }

  return body;
};

export const createCreep = (
  spawn: StructureSpawn,
  memory: CreepMemory,
  bodyTemplate: BodyPartConstant[],
  frontBaseBody: BodyPartConstant[] = [],
  backBaseBody: BodyPartConstant[] = []
) => {
  const innerBody = repeat(bodyTemplate, MAX_CREEP_SIZE - frontBaseBody.length - backBaseBody.length + 1);
  let spawnResult, body;
  const name = generateName(memory.role);
  do {
    innerBody.pop();
    body = [
      ...frontBaseBody,
      ...innerBody,
      ...backBaseBody
    ]
    spawnResult = spawn.spawnCreep(body, name, {memory});
  } while (spawnResult !== OK);
  drawNonUrgentNotification(spawn.room, `${memory.role}, [${body.length}]`);
};
