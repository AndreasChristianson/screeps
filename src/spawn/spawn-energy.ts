import { spawn } from "child_process";

const getExtensions = (spawn: StructureSpawn) =>
  spawn.room
    .find<StructureExtension>(FIND_STRUCTURES, {
      filter: {
        structureType: STRUCTURE_EXTENSION
      }
    })
    .filter(extension => extension.isActive());

const getExtensionEnergy = (spawn: StructureSpawn): number =>
  getExtensions(spawn).reduce((sum, extension) => sum + extension.energy, 0);

const getExtensionCapacity = (spawn: StructureSpawn): number =>
  getExtensions(spawn).reduce(
    (sum, extension) => sum + extension.energyCapacity,
    0
  );

export const getTotalAvailableEnergy = (spawn: StructureSpawn) =>
  getExtensionEnergy(spawn) + spawn.energy;

export const getTotalEnergyCapacity = (spawn: StructureSpawn) =>
  getExtensionCapacity(spawn) + spawn.energyCapacity;
