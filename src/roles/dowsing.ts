import { PICKUP, WITHDRAW, HARVEST, DISMANTLE } from "type-constants";
import { adjacentLocationCount } from "utils/find";
import { underAttack } from "utils/modes";

interface PartialWell {
  id: Id<RoomObject>;
  baseWeight: number;
  energy: number;
  type: TaskType;
  pos: RoomPosition;
}

interface Well {
  id: Id<RoomObject>;
  weight: number;
  energy: number;
  type: TaskType;
  adjacencyCount: number;
}

const partCount = (creep: Creep, part: BodyPartConstant) =>
  creep.body.filter(p => p.type === part).length;

const getWaterers = (room: Room, id: Id<RoomObject>) =>
  room.find(FIND_MY_CREEPS)
  .filter(creep => creep.memory.task)
  .filter(creep => [DISMANTLE, HARVEST, WITHDRAW, PICKUP].includes(creep.memory.task!.type))
  .filter(creep => id === creep.memory.task!.target)

export const getWeightedWells = (creep: Creep): Well[] => {
  const wells: Well[] = getWells(creep, creep.room)
    .filter(well => well.energy)
    .filter(well => well.baseWeight)
    .filter(
      well =>
        adjacentLocationCount(creep.room, well.pos) >
        getWaterers(creep.room, well.id).length
    )
    .map<Well>(well => ({
      ...well,
      weight:
        well.baseWeight /
        ((getWaterers(creep.room, well.id).length + 1) *
          creep.pos.getRangeTo(well.pos)),
      adjacencyCount: adjacentLocationCount(creep.room, well.pos)
    }));

  return wells;
};

export const getWells = (creep: Creep, room: Room): PartialWell[] => {
  const RUIN_RELATIVE_WEIGHT = 512;
  const SOURCE_RELATIVE_WEIGHT = 1024;
  const TOMBSTONE_RELATIVE_WEIGHT = 2048;
  const DISMANTLE_RELATIVE_WEIGHT = 4096;
  const FLOOR_RELATIVE_WEIGHT = 8192;
  const CONTAINER_RELATIVE_WEIGHT = underAttack(room) ? 4096 : 0;
  const STORAGE_RELATIVE_WEIGHT = 1024;

  const tombstoneWells: PartialWell[] = room.find(FIND_TOMBSTONES)
  .map<PartialWell>(w => ({
    id: w.id,
    baseWeight: TOMBSTONE_RELATIVE_WEIGHT,
    energy: w.store.getUsedCapacity(),
    pos: w.pos,
    type: WITHDRAW,
  }));

  const droppedWells: PartialWell[] = room.find(FIND_DROPPED_RESOURCES)
  .map<PartialWell>(w => ({
    id: w.id,
    baseWeight: FLOOR_RELATIVE_WEIGHT,
    energy: w.amount,
    pos: w.pos,
    type: PICKUP,
  }));

  const ruinWells: PartialWell[] = room.find(FIND_RUINS)
  .map<PartialWell>(w => ({
    id: w.id,
    baseWeight: RUIN_RELATIVE_WEIGHT,
    energy: w.store.getUsedCapacity(),
    pos: w.pos,
    type: WITHDRAW,
  }));

  const sourceWells: PartialWell[] = room.find(FIND_SOURCES)
  .map<PartialWell>(w => ({
    id: w.id,
    baseWeight: SOURCE_RELATIVE_WEIGHT,
    energy: w.energy,
    pos: w.pos,
    type: HARVEST,
  }));

  const workPartCount = partCount(creep, WORK);
  let dismantleWell: PartialWell[] = [];
  if (workPartCount >= 4) {
    dismantleWell = room
      .find(FIND_FLAGS)
      .filter(flag => flag.color === COLOR_GREEN)
      .map(flag => room.lookForAt(LOOK_STRUCTURES, flag.pos)[0])
      .filter(structure => structure)
      .map<PartialWell>(structure => ({
        id: structure.id,
        baseWeight: DISMANTLE_RELATIVE_WEIGHT,
        energy: structure.hits / DISMANTLE_POWER,
        pos: structure.pos,
        type: DISMANTLE
      }));
  }

  const containerWells: PartialWell[] = room
    .find<StructureContainer>(FIND_MY_STRUCTURES)
    .filter(structure =>
      [STRUCTURE_CONTAINER].includes(structure.structureType)
    )
    .map<PartialWell>(w => ({
      id: w.id,
      baseWeight: CONTAINER_RELATIVE_WEIGHT,
      energy: w.store.getUsedCapacity(RESOURCE_ENERGY),
      pos: w.pos,
      type: WITHDRAW
    }));

  const storageWells: PartialWell[] = room
    .find<StructureStorage>(FIND_MY_STRUCTURES)
    .filter(structure => [STRUCTURE_STORAGE].includes(structure.structureType))
    .map<PartialWell>(w => ({
      id: w.id,
      baseWeight: STORAGE_RELATIVE_WEIGHT,
      energy: w.store.getUsedCapacity(RESOURCE_ENERGY),
      pos: w.pos,
      type: WITHDRAW
    }));

  const wells: PartialWell[] = [
    ...tombstoneWells,
    ...droppedWells,
    ...ruinWells,
    ...sourceWells,
    ...dismantleWell,
    ...containerWells,
    ...storageWells
  ];

  return wells;
};
