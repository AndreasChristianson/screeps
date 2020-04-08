export const fresh = (creep: Creep): boolean =>
  creep.ticksToLive ?
    creep.body.some(part => part.type === CLAIM) ?
      creep.ticksToLive > 490 :
      creep.ticksToLive > 1200 :
    false;

export const isRole = (role: Role) => (creep: Creep): boolean => creep.memory.role === role;


export const composite = <T>(...predicates: ((item: T) => boolean)[]): (item: T) => boolean =>
  (item: T) => predicates.every(predicate => predicate(item));
  
const REFILL_CARRIER_RATIO = 0;
const NEEDS_CARRIER_RATIO = 0.5;

export const hasEnergyToProvide = (creep: Creep) =>
  creep.store.getUsedCapacity(RESOURCE_ENERGY) /
    creep.store.getCapacity(RESOURCE_ENERGY) >
  REFILL_CARRIER_RATIO;

export const needsEnergy = (creep: Creep) =>
  creep.store.getUsedCapacity(RESOURCE_ENERGY) /
    creep.store.getCapacity(RESOURCE_ENERGY) <
  NEEDS_CARRIER_RATIO;