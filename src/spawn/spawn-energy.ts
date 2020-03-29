export const getTotalAvailableEnergy = (spawn: StructureSpawn) =>
  spawn.room.energyAvailable;

export const getTotalEnergyCapacity = (spawn: StructureSpawn) =>
  spawn.room.energyCapacityAvailable;
