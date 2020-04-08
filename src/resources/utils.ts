export const nonEnergyResources = RESOURCES_ALL.filter(
  resource => resource !== RESOURCE_ENERGY
);

export const getUsedCapacity = (
  store: Store<ResourceConstant, true|false>,
  resourceConstants: ResourceConstant[]
) =>
  resourceConstants.reduce(
    (sum, resourceConstant) => sum + store.getUsedCapacity(resourceConstant),
    0
  );
  
export const isHoldingResources = (
  store: Store<ResourceConstant, true|false>,
  resourceConstants: ResourceConstant[]
) => getUsedCapacity(store, resourceConstants) > 0;

export const isEmpty = (store: Store<ResourceConstant, true|false>) =>
  getUsedCapacity(store, RESOURCES_ALL) === 0;
