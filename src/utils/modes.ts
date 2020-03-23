export const underAttack = (room: Room) =>
  room.find(FIND_HOSTILE_CREEPS).length > 0;
