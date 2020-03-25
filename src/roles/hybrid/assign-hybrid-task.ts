import { getWaitTask } from "roles/waiting";
import { USE_ENERGY, USE_RESOURCE } from "type-constants";
import { hasEnergyToProvide, needsEnergy } from "./has-energy";
import { getWeightedFlowerpots } from "../flowerpots";
import { getWeightedWells } from "../dowsing";
import { isHoldingResources, nonEnergyResources } from "resources/utils";
import { biggestFirst } from "../../utils/sort";

const useResourceTask = (creep: Creep): Task | undefined => {
  const nonEnergyHeld = isHoldingResources(creep.store, nonEnergyResources);
  const storage = creep.room
    .find(FIND_STRUCTURES)
    .filter(structure => structure.structureType === STRUCTURE_STORAGE)[0];

  if (nonEnergyHeld && storage) {
    return {
      target: storage.id,
      type: USE_RESOURCE
    };
  }
  return undefined;
};

const useEnergyTask = (creep: Creep): Task | undefined => {
  const flowerpots = getWeightedFlowerpots(creep).sort(biggestFirst("weight"));

  if (hasEnergyToProvide(creep) && flowerpots.length) {
    // console.log(`assigning ${flowerpots[0].id}: ${flowerpots[0].meta}`)
    return {
      target: flowerpots[0].id,
      type: USE_ENERGY,
      meta: flowerpots[0].meta
    };
  }
  return undefined;
};

const getEnergy = (creep: Creep): Task | undefined => {
  const wells = getWeightedWells(creep).sort(biggestFirst("weight"));

  if (needsEnergy(creep) && wells.length) {
    return {
      target: wells[0].id,
      type: wells[0].type
    };
  }
  return undefined;
};

export const assignHybridTask = (creep: Creep): Task =>
  useResourceTask(creep) ||
  useEnergyTask(creep) ||
  getEnergy(creep) ||
  getWaitTask();
