import { getTotalAvailableEnergy, getTotalEnergyCapacity } from "spawn/spawn-energy";
import { drawPercentLabel, drawLabel } from "./draw-label";
import { drawAtPosition } from "./draw-at-position";

export const drawRoomDisplay = (room: Room) => {
  room.find(FIND_MY_SPAWNS).forEach(spawn => {
    const totalEnergy = getTotalAvailableEnergy(spawn);
    const totalCapacity = getTotalEnergyCapacity(spawn);
    drawPercentLabel(spawn.room, spawn.name, totalEnergy, totalCapacity);
    drawLabel(spawn.room, spawn.name, totalEnergy.toString());
  })

  room.find(FIND_SOURCES)
    .filter(source => source.ticksToRegeneration)
    .forEach(source => drawAtPosition(
      source.pos,
      source.ticksToRegeneration.toString(),
      { color: source.energy ? 'gray' : 'red' })
    );
  drawLabel(room, 'last wait', `${Game.time - room.memory.lastWait} turns`);
}