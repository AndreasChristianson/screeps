import { needsRepair } from "utils/repairs";
import { underAttack } from "utils/modes";
import { REPAIR, UPGRADE_CONTROLLER, TRANSFER, BUILD } from "type-constants";
import { adjacentLocationCount } from "utils/find";

const getServicers = (room: Room, id: Id<RoomObject>) =>
  room.find(FIND_MY_CREEPS)
    .filter(creep => creep.memory.task)
    .filter(creep => [REPAIR, UPGRADE_CONTROLLER, TRANSFER, BUILD].includes(creep.memory.task!.type))
    .filter(creep => id === creep.memory.task!.target)

export const getWeightedFlowerpots = (creep: Creep): Target[] => {
  const { room } = creep;

  const flowerpots: Target[] = getFlowerpots(creep)
    .filter(flowerpot => flowerpot.energy)
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
        flowerpot.baseWeight /
        ((getServicers(room, flowerpot.id).length * 2 + 1) *
          creep.pos.getRangeTo(flowerpot.pos)),
      adjacencyCount: adjacentLocationCount(creep.room, flowerpot.pos)
    }));

  return flowerpots;
};

export const getFlowerpots = (creep: Creep): TargetBuilder[] => {
  const { room } = creep;

  const REPAIR_RELATIVE_WEIGHT = 16;
  const BUILD_RELATIVE_WEIGHT = 16;
  const SPAWN_RELATIVE_WEIGHT = 128;
  const TOWER_RELATIVE_WEIGHT = underAttack(room) ? 128 : 64;
  const CONTAINER_RELATIVE_WEIGHT = 2;
  const CONTROLLER_RELATIVE_WEIGHT = 2;

  const spawnFlowerpots: TargetBuilder[] = room
    .find<StructureSpawn | StructureExtension>(FIND_MY_STRUCTURES)
    .filter(structure =>
      [STRUCTURE_EXTENSION, STRUCTURE_SPAWN].includes(structure.structureType)
    )
    .map<TargetBuilder>(spawnLike => ({
      id: spawnLike.id,
      baseWeight: SPAWN_RELATIVE_WEIGHT,
      energy: spawnLike.energyCapacity - spawnLike.energy,
      pos: spawnLike.pos,
      type: TRANSFER
    }));

  const towerFlowerpots = room
    .find<StructureTower>(FIND_MY_STRUCTURES)
    .filter(structure => [STRUCTURE_TOWER].includes(structure.structureType))
    .map<TargetBuilder>(tower => ({
      id: tower.id,
      baseWeight: TOWER_RELATIVE_WEIGHT,
      energy: tower.energyCapacity - tower.energy,
      pos: tower.pos,
      type: TRANSFER
    }));

  const storageFlowerpots = room
    .find<StructureContainer>(FIND_STRUCTURES)
    .filter(structure =>
      [STRUCTURE_CONTAINER].includes(structure.structureType)
    )
    .map<TargetBuilder>(container => ({
      id: container.id,
      baseWeight: CONTAINER_RELATIVE_WEIGHT,
      energy: container.store.getFreeCapacity(RESOURCE_ENERGY),
      pos: container.pos,
      type: TRANSFER
    }));

  const constructionFlowerpots = room
    .find(FIND_CONSTRUCTION_SITES)
    .map<TargetBuilder>(site => ({
      id: site.id,
      baseWeight: BUILD_RELATIVE_WEIGHT,
      energy: site.progressTotal - site.progress,
      pos: site.pos,
      type: BUILD
    }));

  const repairFlowerpots = room
    .find(FIND_STRUCTURES)
    .filter(needsRepair)
    .map<TargetBuilder>(structure => ({
      id: structure.id,
      baseWeight: REPAIR_RELATIVE_WEIGHT,
      energy: structure.hitsMax - structure.hits,
      pos: structure.pos,
      type: REPAIR
    }));

  const controllerFlowerpot: TargetBuilder[] = room.controller
    ? [
        {
          id: room.controller.id,
          baseWeight: CONTROLLER_RELATIVE_WEIGHT,
          energy: room.controller.level === 8 ? 0 : 1,
          pos: room.controller.pos,
          type: UPGRADE_CONTROLLER
        }
      ]
    : [];

  const flowerpots: TargetBuilder[] = [
    ...storageFlowerpots,
    ...constructionFlowerpots,
    ...towerFlowerpots,
    ...spawnFlowerpots,
    ...controllerFlowerpot,
    ...repairFlowerpots
  ];

  return flowerpots;
};
