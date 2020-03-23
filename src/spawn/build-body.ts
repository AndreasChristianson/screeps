import { getTotalAvailableEnergy } from "./spawn-energy";
import { v4 } from "uuid";

const getPartCounts = (body: BodyPartConstant[]) =>
  body.reduce<Partial<Record<BodyPartConstant, number>>>(
    (accumulator, current) => ({
      ...accumulator,
      [current]: (accumulator[current] || 0) + 1
    }),
    {}
  );
const calculateBodyCost = (body: BodyPartConstant[]) =>
  body.reduce<number>(
    (accumulator, current) => accumulator + BODYPART_COST[current],
    0
  );

export const buildBody = (
  spawn: StructureSpawn,
  partsToAdd: BodyPartConstant[],
  baseBody: BodyPartConstant[] = []
) => {
  const body = baseBody;
  const go = () => body.length < MAX_CREEP_SIZE;
  if (partsToAdd.length) {
    for (let i = 0; go(); i++) {
      body.push(partsToAdd[i % partsToAdd.length]);
    }
    body.pop();
  }

  return body;
};
