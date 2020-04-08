import { generateName } from "utils/random";
import { drawNonUrgentNotification } from "visuals/draw-notification";
import { getTotalAvailableEnergy } from "./spawn-energy";

const repeat = (
  partsToAdd: BodyPartConstant[],
  budget: number
): BodyPartConstant[] => {
  const body: BodyPartConstant[] = [];
  for (let i = 0; cost(body) < budget; i++) {
    body.push(partsToAdd[i % partsToAdd.length]);
  }
  body.pop();
  return body;
};

const stripExtraMoves = (body: BodyPartConstant[]): BodyPartConstant[] => {
  let result = body;
  while (result.filter(part => part === MOVE).length / result.length > 0.5) {
    const index = result.lastIndexOf(MOVE);
    result.splice(index, 1);
    console.log('in while')
  }
  return result;
}

const cost = (body: BodyPartConstant[]): number => body.reduce((sum, part) => sum + BODYPART_COST[part], 0);

export const createCreep = (
  spawn: StructureSpawn,
  memory: CreepMemory,
  bodyTemplate: BodyPartConstant[],
  frontBaseBody: BodyPartConstant[] = [],
  backBaseBody: BodyPartConstant[] = []
) => {
  const budget = getTotalAvailableEnergy(spawn);
  const frontCost = cost(frontBaseBody);
  const backCost = cost(backBaseBody);

  const innerBody = repeat(bodyTemplate, Math.max(budget - frontCost - backCost, 0));
  const name = generateName(memory.role);
  innerBody.pop();
  const body = stripExtraMoves([
    ...frontBaseBody,
    ...innerBody,
    ...backBaseBody
  ]);
  const spawnResult = spawn.createCreep(body, name, memory);
  drawNonUrgentNotification(spawn.room, `${memory.role}, [${body.length}]`);
};
