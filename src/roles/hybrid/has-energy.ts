const REFILL_CARRIER_RATIO = 0.1;
const NEEDS_CARRIER_RATIO = 0.5;

export const hasEnergyToProvide = (creep: Creep) =>
  creep.store.getUsedCapacity(RESOURCE_ENERGY) /
    creep.store.getCapacity(RESOURCE_ENERGY) >
  REFILL_CARRIER_RATIO;

export const needsEnergy = (creep: Creep) =>
  creep.store.getUsedCapacity(RESOURCE_ENERGY) /
    creep.store.getCapacity(RESOURCE_ENERGY) <
  NEEDS_CARRIER_RATIO;
