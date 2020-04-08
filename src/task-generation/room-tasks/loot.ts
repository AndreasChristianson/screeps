import { LOOT_TOMBSTONE_TASK_WEIGHT, LOOT_RUIN_TASK_WEIGHT, PICKUP_DROPPED_TASK_WEIGHT } from "task-generation/task-weights";
import { hasEnergyToProvide, needsEnergy } from "task-generation/creep-predicates";
import { WITHDRAW, PICKUP } from "type-constants";
import { getUsedCapacity } from "resources/utils";

export const getLootTasks = (room: Room) => {
  const lootTombstonesTaskBuilders = room
    .find(FIND_TOMBSTONES)
    .map<TaskBuilder>(tombstone => ({
      weight: LOOT_TOMBSTONE_TASK_WEIGHT,
      creepPredicate: needsEnergy,
      position: tombstone.pos,
      task: {
        target: tombstone.id,
        type: WITHDRAW
      },
      parallelism: Number.MAX_SAFE_INTEGER,
      available: getUsedCapacity(tombstone.store, RESOURCES_ALL),
      creepRange: 50
    }));

  const lootRuinsTaskBuilders = room
    .find(FIND_RUINS)
    .map<TaskBuilder>(ruin => ({
      weight: LOOT_RUIN_TASK_WEIGHT,
      creepPredicate: needsEnergy,
      position: ruin.pos,
      task: {
        target: ruin.id,
        type: WITHDRAW
      },
      parallelism: Number.MAX_SAFE_INTEGER,
      available: getUsedCapacity(ruin.store, RESOURCES_ALL),
      creepRange: 50
    }));

  const pickupDropped = room
    .find(FIND_DROPPED_RESOURCES)
    .map<TaskBuilder>(dropped => ({
      weight: PICKUP_DROPPED_TASK_WEIGHT,
      creepPredicate: needsEnergy,
      position: dropped.pos,
      task: {
        target: dropped.id,
        type: PICKUP
      },
      parallelism: Number.MAX_SAFE_INTEGER,
      available: dropped.amount,
      creepRange: 50
    }));


  return [
    ...lootTombstonesTaskBuilders,
    ...lootRuinsTaskBuilders,
    ...pickupDropped
  ];
};
