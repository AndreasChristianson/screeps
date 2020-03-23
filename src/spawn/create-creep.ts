import { generateName } from "utils/random";

const buildBody = (
  partsToAdd: BodyPartConstant[],
  baseBody: BodyPartConstant[] = []
) => {
  const body = baseBody;
  const go = () => body.length <= MAX_CREEP_SIZE + 1;
  if (partsToAdd.length) {
    for (let i = 0; go(); i++) {
      body.push(partsToAdd[i % partsToAdd.length]);
    }
  }

  return body;
};

export const createCreep = (
  spawn: StructureSpawn,
  memory: CreepMemory,
  bodyTemplate: BodyPartConstant[],
  baseBody: BodyPartConstant[] = []
) => {
  const body = buildBody(bodyTemplate, baseBody);
  let spawnResult;
  do {
    body.pop();
    spawnResult = spawn.spawnCreep(body, generateName(memory.role), {
      memory
    });
  } while (spawnResult !== OK);
  spawn.room.visual.text(`${memory.role}, [${body.join(", ")}]`, spawn.pos);
};
