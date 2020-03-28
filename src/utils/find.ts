import { drawAtPosition } from "visuals/draw-at-position";

export const findCreepsByRole = (role: Role) =>
  Object.values(Game.creeps).filter(creep => creep.memory.role === role);

export const findCreepsByTask = (task: TaskType) =>
  Object.values(Game.creeps).filter(
    creep => creep.memory.task && creep.memory.task.type === task
  );

export const adjacentLocationCount = (room: Room, pos: RoomPosition, maxDistance: number = 1) =>
  navigableAdjacentLocations(room, pos, maxDistance).length;

const getMoveArray = (maxDistance: number): {x: number, y: number}[] =>{
  const result = [];

  for (let x = maxDistance * -1; x <= maxDistance; x++) {
    for (let y = maxDistance * -1; y <= maxDistance; y++) {
      result.push({
        y,
        x
      });
    }
  }

  return result;
}

const notNull = <TValue>(value: TValue | null): value is TValue =>
  value !== null;

export const navigableAdjacentLocations = (
  room: Room,
  pos: RoomPosition,
  maxDistance: number = 1
): RoomPosition[] => {
  const { x, y } = pos;

  const adjacentLocations = getMoveArray(maxDistance)
    .map(({x: xdelta, y: ydelta}) => room!.getPositionAt(x + xdelta, y + ydelta))
    .filter(notNull)
    .filter(isEnterable);
    drawAtPosition(pos, adjacentLocations.length.toString(), {color: 'gray'})
    return adjacentLocations;
};

const isEnterable = (pos: RoomPosition) => {
  var atPos = pos.look();
  var SWAMP = "swamp";
  var PLAIN = "plain";
  for ( var i = 0 ; i < atPos.length ; i++ )
  {
    const structure = atPos[i].structure;
      switch (atPos[i].type) {
          case LOOK_TERRAIN:
              if (atPos[i].terrain != PLAIN && atPos[i].terrain != SWAMP)
                  return false;
              break;
          case LOOK_STRUCTURES:
              if ((OBSTACLE_OBJECT_TYPES as StructureConstant[]).includes(structure!.structureType))
                  return false;
              break;
          case LOOK_CREEPS:
          case LOOK_SOURCES:
          case LOOK_MINERALS:
          case LOOK_NUKES:
          case LOOK_ENERGY:
          case LOOK_RESOURCES:
          case LOOK_FLAGS:
          case LOOK_CONSTRUCTION_SITES:
          default:
      }
  }
  return true;
};
