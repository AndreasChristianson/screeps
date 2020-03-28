export const drawAtPosition = (pos: RoomPosition, label: string, style:TextStyle = {}) => {
  Game.rooms[pos.roomName].visual.text(
    label,
    pos,
    style
  );
};
