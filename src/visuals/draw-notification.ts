import { registerCallback } from "utils/registries";

const notificationColumnLeft = 49;

registerCallback(() => {
  Object.values(Game.rooms).forEach(room => {
    room.memory.notificationCount = 1;
  });
})

export const drawNonUrgentNotification = (room: Room, message: string) => {
  drawNotification(room, message, {
    backgroundColor: 'green',
    color: 'black'
  });
};

export const drawUrgentNotification = (room: Room, message: string) => {
  drawNotification(room, message, {
    backgroundColor: 'red',
    color: 'black',
    font: '24px'
  });
};

export const drawNotification = (room: Room, message: string, style:TextStyle = {}) => {
  room.visual.text(
    message,
    notificationColumnLeft,
    room.memory.notificationCount,
    {
      align: 'right',
      ...style
    }
  );
  room.memory.notificationCount++
};
