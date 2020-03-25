import { registerCallback } from "utils/registries";

const labelColumnLeft = 0;
const labelColumnWidth = 6;

registerCallback(() => {
  Object.values(Game.rooms).forEach(room => {
    room.memory.labelCount = 1;
  });
})

export const drawPercentLabel = (room: Room, label: string, current: number, max: number) => {
  const percent = (100 * current / max).toFixed(0);
  drawLabel(room, label, `${percent}%`);
};

export const drawLabel = (room: Room, label: string, value: string, style:TextStyle = {}) => {
  room.visual.text(
    `${label}:`,
    labelColumnLeft,
    room.memory.labelCount,
    {
      align: 'left',
      ...style
    }
  );
  room.visual.text(
    value,
    labelColumnLeft + labelColumnWidth,
    room.memory.labelCount, 
    {
      align: 'left',
      ...style
    }
  );
  room.memory.labelCount++
};
