import { getTotalAvailableEnergy, getTotalEnergyCapacity } from "spawn/spawn-energy";
import { drawPercentLabel, drawLabel } from "./draw-label";
import { drawNonUrgentNotification, drawUrgentNotification } from "./draw-notification";

export const drawRoomDisplay = (spawn: StructureSpawn) => {
  const totalEnergy = getTotalAvailableEnergy(spawn);
  const totalCapacity = getTotalEnergyCapacity(spawn);
  drawPercentLabel(spawn.room, 'spawn energy', totalEnergy, totalCapacity);
  drawLabel(spawn.room, 'spawn energy', totalEnergy.toString());


  drawLabel(spawn.room, 'last wait', `${Game.time - spawn.room.memory.lastWait} turns`);
}