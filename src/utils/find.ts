export const findCreepsByRole = (role: Role) =>
  Object.values(Game.creeps).filter(creep => creep.memory.role === role);

export const findCreepsByTask = (task: TaskType) =>
  Object.values(Game.creeps).filter(
    creep => creep.memory.task && creep.memory.task.type === task
  );

export const adjacentLocationCount = (room: Room, pos: RoomPosition) =>
  navigableAdjacentLocations(room, pos).length;

const moveArray = [
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1]
];

const notNull = <TValue>(value: TValue | null): value is TValue =>
  value !== null;

export const navigableAdjacentLocations = (
  room: Room,
  pos: RoomPosition
): RoomPosition[] => {
  const terrain = room.getTerrain();
  const { x, y } = pos;

  return moveArray
    .map(([xdelta, ydelta]) => room!.getPositionAt(x + xdelta, y + ydelta))
    .filter(notNull)
    .filter(
      pos =>
        terrain.get(pos.x, pos.y) === TERRAIN_MASK_SWAMP ||
        terrain.get(pos.x, pos.y) === 0
    );
};

export const equalRoomPositions = (
  left?: RoomPosition,
  right?: RoomPosition
): boolean =>
  left !== undefined &&
  right !== undefined &&
  left.roomName === right.roomName &&
  left.y === right.y &&
  left.x === right.x;
