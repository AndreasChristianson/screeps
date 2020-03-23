import { GET_ENERGY } from "type-constants";
import { adjacentLocationCount } from "utils/find";
import { underAttack } from "utils/modes";

interface WeightedWell {
  id: Id<RoomObject>;
  weight: number;
  energy: number;
  pos: RoomPosition;
  meta?: TaskMetadata;
}

const partCount = (creep: Creep, part: BodyPartConstant) =>
  creep.body.filter(p => p.type === part).length;

const getWaterers = (room: Room, id: Id<RoomObject>) =>
  room.find(FIND_MY_CREEPS, {
    filter: {
      memory: {
        task: {
          type: GET_ENERGY,
          target: id
        }
      }
    }
  });

export const getWeightedWells = (creep: Creep): WeightedWell[] => {
  const wells: WeightedWell[] = getWells(creep, creep.room)
    .filter(well => well.energy)
    .filter(well => well.weight)
    .filter(
      well =>
        adjacentLocationCount(creep.room, well.pos) >
        getWaterers(creep.room, well.id).length
    )
    .map(well => ({
      ...well,
      weight:
        well.weight /
        ((getWaterers(creep.room, well.id).length + 1) *
          creep.pos.getRangeTo(well.pos))
    }));

  return wells;
};

export const getWells = (creep: Creep, room: Room): WeightedWell[] => {
  const RUIN_RELATIVE_WEIGHT = 512;
  const SOURCE_RELATIVE_WEIGHT = 1024;
  const TOMBSTONE_RELATIVE_WEIGHT = 2048;
  const DISMANTLE_RELATIVE_WEIGHT = 4096;
  const FLOOR_RELATIVE_WEIGHT = 8192;
  const CONTAINER_RELATIVE_WEIGHT = underAttack(room) ? 4096 : 0;
  const STORAGE_RELATIVE_WEIGHT = 1024;

  const tombstoneWells = room.find(FIND_TOMBSTONES).map(w => ({
    id: w.id,
    weight: TOMBSTONE_RELATIVE_WEIGHT,
    energy: w.store.getUsedCapacity(),
    pos: w.pos
  }));

  const droppedWells = room.find(FIND_DROPPED_RESOURCES).map(w => ({
    id: w.id,
    weight: FLOOR_RELATIVE_WEIGHT,
    energy: w.amount,
    pos: w.pos
  }));

  const ruinWells = room.find(FIND_RUINS).map(w => ({
    id: w.id,
    weight: RUIN_RELATIVE_WEIGHT,
    energy: w.store.getUsedCapacity(),
    pos: w.pos
  }));

  const sourceWells = room.find(FIND_SOURCES).map(w => ({
    id: w.id,
    weight: SOURCE_RELATIVE_WEIGHT,
    energy: w.energy,
    pos: w.pos
  }));

  const workPartCount = partCount(creep, WORK);
  let dismantleWell: WeightedWell[] = [];
  if (workPartCount >= 4) {
    dismantleWell = room
      .find(FIND_FLAGS)
      .filter(flag => flag.color === COLOR_GREEN)
      .map(flag => room.lookForAt(LOOK_STRUCTURES, flag.pos)[0])
      .filter(structure => structure)
      .map<WeightedWell>(structure => ({
        id: structure.id,
        weight: DISMANTLE_RELATIVE_WEIGHT,
        energy: 1,
        pos: structure.pos,
        meta: "dismantle"
      }));
  }

  const containerWells = room
    .find<StructureContainer>(FIND_MY_STRUCTURES)
    .filter(structure =>
      [STRUCTURE_CONTAINER].includes(structure.structureType)
    )
    .map<WeightedWell>(w => ({
      id: w.id,
      weight: CONTAINER_RELATIVE_WEIGHT,
      energy: w.store.getUsedCapacity(RESOURCE_ENERGY),
      pos: w.pos,
      meta: "container"
    }));

  const storageWells = room
    .find<StructureStorage>(FIND_MY_STRUCTURES)
    .filter(structure => [STRUCTURE_STORAGE].includes(structure.structureType))
    .map<WeightedWell>(w => ({
      id: w.id,
      weight: STORAGE_RELATIVE_WEIGHT,
      energy: w.store.getUsedCapacity(RESOURCE_ENERGY),
      pos: w.pos,
      meta: "container"
    }));

  const wells: WeightedWell[] = [
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
