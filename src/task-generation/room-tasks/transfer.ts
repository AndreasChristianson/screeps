import { PROVIDE_TOWER_ENERGY_TASK_WEIGHT, PROVIDE_CONTAINER_ENERGY_TASK_WEIGHT, UNDER_ATTACK_PROVIDE_TOWER_ENERGY_TASK_WEIGHT } from "task-generation/task-weights";
import { hasEnergyToProvide } from "task-generation/creep-predicates";
import { TRANSFER } from "type-constants";
import { underAttack } from "utils/modes";

export const getTransferTasks = (room: Room) => {
  const towerTaskBuilders = room
    .find<StructureTower>(FIND_MY_STRUCTURES)
    .filter(structure => [STRUCTURE_TOWER].includes(structure.structureType))
    .map<TaskBuilder>(tower => ({
      weight: underAttack(room) ? UNDER_ATTACK_PROVIDE_TOWER_ENERGY_TASK_WEIGHT : PROVIDE_TOWER_ENERGY_TASK_WEIGHT,
      creepPredicate: hasEnergyToProvide,
      position: tower.pos,
      task: {
        target: tower.id,
        type: TRANSFER
      },
      parallelism: Number.MAX_SAFE_INTEGER,
      required: tower.energyCapacity - tower.energy,
      creepRange: 50
    }));

  const containerTaskBuilders = room
    .find<StructureContainer>(FIND_MY_STRUCTURES)
    .filter(structure => [STRUCTURE_CONTAINER].includes(structure.structureType))
    .map<TaskBuilder>(container => ({
      weight: PROVIDE_CONTAINER_ENERGY_TASK_WEIGHT,
      creepPredicate: hasEnergyToProvide,
      position: container.pos,
      task: {
        target: container.id,
        type: TRANSFER
      },
      parallelism: Number.MAX_SAFE_INTEGER,
      required: container.store.getFreeCapacity(RESOURCE_ENERGY),
      creepRange: 50
    }));

  return [
    ...containerTaskBuilders,
    ...towerTaskBuilders
  ];
};
