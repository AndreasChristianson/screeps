import { USE_ENERGY } from "type-constants";
import { needsRepair } from "utils/repairs";
import { underAttack } from "utils/modes";

interface WeightedFlowerpot {
  id: Id<RoomObject>;
  weight: number;
  freeCapacity: number;
  pos: RoomPosition;
  meta?: TaskMetadata;
}

export const getWeightedFlowerpots = (creep: Creep): WeightedFlowerpot[] => {
  const { room } = creep;
  const getWaterers = (id: Id<RoomObject>) =>
    room.find(FIND_MY_CREEPS, {
      filter: {
        memory: {
          task: {
            type: USE_ENERGY,
            flowerPot: id
          }
        }
      }
    });

  const flowerpots: WeightedFlowerpot[] = getFlowerpots(creep)
    .filter(flowerpot => flowerpot.freeCapacity)
    .filter(
      flowerpot =>
        room
          .find(FIND_FLAGS)
          .find(
            flag =>
              flag.color === COLOR_GREEN && flag.pos.isEqualTo(flowerpot.pos)
          ) === undefined
    )
    .map(flowerpot => ({
      ...flowerpot,
      weight:
        flowerpot.weight /
        ((getWaterers(flowerpot.id).length * 2 + 1) *
          creep.pos.getRangeTo(flowerpot.pos))
    }));

  return flowerpots;
};

export const getFlowerpots = (creep: Creep): WeightedFlowerpot[] => {
  const { room } = creep;

  const REPAIR_RELATIVE_WEIGHT = 16;
  const BUILD_RELATIVE_WEIGHT = 16;
  const SPAWN_RELATIVE_WEIGHT = 128;
  const TOWER_RELATIVE_WEIGHT = underAttack(room) ? 128 : 64;
  const CONTAINER_RELATIVE_WEIGHT = 2;
  const CONTROLLER_RELATIVE_WEIGHT = 2;

  const spawnFlowerpots = room
    .find<StructureSpawn | StructureExtension>(FIND_MY_STRUCTURES)
    .filter(structure =>
      [STRUCTURE_EXTENSION, STRUCTURE_SPAWN].includes(structure.structureType)
    )
    .map(spawnLike => ({
      id: spawnLike.id,
      weight: SPAWN_RELATIVE_WEIGHT,
      freeCapacity: spawnLike.energyCapacity - spawnLike.energy,
      pos: spawnLike.pos
    }));

  const towerFlowerpots = room
    .find<StructureTower>(FIND_MY_STRUCTURES)
    .filter(structure => [STRUCTURE_TOWER].includes(structure.structureType))
    .map(tower => ({
      id: tower.id,
      weight: TOWER_RELATIVE_WEIGHT,
      freeCapacity: tower.energyCapacity - tower.energy,
      pos: tower.pos
    }));

  const storageFlowerpots = room
    .find<StructureContainer>(FIND_STRUCTURES)
    .filter(structure =>
      [STRUCTURE_CONTAINER].includes(structure.structureType)
    )
    .map(container => ({
      id: container.id,
      weight: CONTAINER_RELATIVE_WEIGHT,
      freeCapacity: container.store.getFreeCapacity(RESOURCE_ENERGY),
      pos: container.pos
    }));

  const constructionFlowerpots = room
    .find(FIND_CONSTRUCTION_SITES)
    .map(site => ({
      id: site.id,
      weight: BUILD_RELATIVE_WEIGHT,
      freeCapacity: site.progressTotal - site.progress,
      pos: site.pos
    }));

  const repairFlowerpots: WeightedFlowerpot[] = room
    .find(FIND_STRUCTURES)
    .filter(needsRepair)
    .map<WeightedFlowerpot>(structure => ({
      id: structure.id,
      weight: REPAIR_RELATIVE_WEIGHT,
      freeCapacity: structure.hitsMax - structure.hits,
      pos: structure.pos,
      meta: "repair"
    }));

  const controllerFlowerpot = room.controller
    ? [
        {
          id: room.controller.id,
          weight: CONTROLLER_RELATIVE_WEIGHT,
          freeCapacity: room.controller.level === 8 ? 0 : 1,
          pos: room.controller.pos
        }
      ]
    : [];

  const flowerpots: WeightedFlowerpot[] = [
    ...storageFlowerpots,
    ...constructionFlowerpots,
    ...towerFlowerpots,
    ...spawnFlowerpots,
    ...controllerFlowerpot,
    ...repairFlowerpots
  ];

  return flowerpots;
};
