import { needsRepair } from "utils/repairs";
import { underAttack } from "utils/modes";
import { REPAIR, UPGRADE_CONTROLLER, TRANSFER, BUILD } from "type-constants";
import { adjacentLocationCount } from "utils/find";
import { getFlags } from "utils/flags";

const getServicers = (room: Room, id: Id<RoomObject>) =>
  room.find(FIND_MY_CREEPS)
    .filter(creep => creep.memory.task)
    .filter(creep => [REPAIR, UPGRADE_CONTROLLER, TRANSFER, BUILD].includes(creep.memory.task!.type))
    .filter(creep => id === creep.memory.task!.target)

const nearControllerDegrade = (controller?: StructureController) =>
  controller && controller.ticksToDowngrade < 5000;

export const getWeightedFlowerpots = (creep: Creep): Target[] => {
  const { room } = creep;

  const greenFlags = getFlags(COLOR_GREEN);

  const flowerpots: Target[] = getFlowerpots(creep)
    .filter(flowerpot => flowerpot.energy)
    .filter(flowerpot => flowerpot.weight)
    .filter(
      flowerpot =>
        !greenFlags.some(
          flag => flag.pos.isEqualTo(flowerpot.target.pos)
        )
    )
    .filter(
      well =>
        well.parallelism >
        getServicers(creep.room, well.target.id).length
    )
    .map(({
      target,
      weight,
      parallelism,
      energy,
      type
    }) => ({
      type,
      energy,
      parallelism,
      weight:
        weight /
        ((getServicers(room, target.id).length + 1) *
          creep.pos.getRangeTo(target.pos)),
      id: target.id
    }));

  return flowerpots;
};

export const getFlowerpots = (creep: Creep): TargetBuilder[] => {
  const { room } = creep;

  const REPAIR_RELATIVE_WEIGHT = 8;
  const BUILD_RELATIVE_WEIGHT = 16;
  const SPAWN_RELATIVE_WEIGHT = 128;
  const TOWER_RELATIVE_WEIGHT = underAttack(room) ? 128 : 64;
  const CONTAINER_RELATIVE_WEIGHT = 2;
  const CONTROLLER_RELATIVE_WEIGHT = nearControllerDegrade(creep.room.controller) ? 64 : 2;

  const spawnFlowerpots: TargetBuilder[] = room
    .find<StructureSpawn | StructureExtension>(FIND_MY_STRUCTURES)
    .filter(structure =>
      [STRUCTURE_EXTENSION, STRUCTURE_SPAWN].includes(structure.structureType)
    )
    .map<TargetBuilder>(spawnLike => ({
      target: spawnLike,
      weight: SPAWN_RELATIVE_WEIGHT,
      energy: spawnLike.energyCapacity - spawnLike.energy,
      type: TRANSFER,
      parallelism: 10
    }));

  const towerFlowerpots = room
    .find<StructureTower>(FIND_MY_STRUCTURES)
    .filter(structure => [STRUCTURE_TOWER].includes(structure.structureType))
    .map<TargetBuilder>(tower => ({
      target: tower,
      weight: TOWER_RELATIVE_WEIGHT,
      energy: tower.energyCapacity - tower.energy,
      type: TRANSFER,
      parallelism: 10
    }));

  const storageFlowerpots = room
    .find<StructureContainer>(FIND_STRUCTURES)
    .filter(structure =>
      [STRUCTURE_CONTAINER].includes(structure.structureType)
    )
    .map<TargetBuilder>(container => ({
      target: container,
      weight: CONTAINER_RELATIVE_WEIGHT,
      energy: container.store.getFreeCapacity(RESOURCE_ENERGY),
      type: TRANSFER,
      parallelism: 10
    }));

  const constructionFlowerpots = room
    .find(FIND_CONSTRUCTION_SITES)
    .map<TargetBuilder>(site => ({
      target: site,
      weight: BUILD_RELATIVE_WEIGHT,
      energy: site.progressTotal - site.progress,
      parallelism: 2,
      type: BUILD,
    }));

  const repairFlowerpots = room
    .find(FIND_STRUCTURES)
    .filter(needsRepair)
    .map<TargetBuilder>(structure => ({
      target: structure,
      weight: REPAIR_RELATIVE_WEIGHT,
      energy: structure.hitsMax - structure.hits,
      parallelism: 6,
      type: REPAIR
    }));

  const controllerFlowerpot: TargetBuilder[] = room.controller
    ? [
      {
        target: room.controller,
        weight: CONTROLLER_RELATIVE_WEIGHT,
        energy: room.controller.level === 8 ? 0 : 1,
        parallelism: 6,
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
