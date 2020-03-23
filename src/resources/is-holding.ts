export const nonEnergyResources = RESOURCES_ALL.filter(
  resource => resource !== RESOURCE_ENERGY
);
const getUsedCapacity = (
  store: StoreDefinition,
  resourceConstants: ResourceConstant[]
) =>
  resourceConstants.reduce(
    (sum, resourceConstant) => sum + store.getUsedCapacity(resourceConstant),
    0
  );
export const isHoldingResources = (
  store: StoreDefinition,
  resourceConstants: ResourceConstant[]
) => getUsedCapacity(store, resourceConstants) > 0;
