export const DEPOSIT_NON_ENERGY_RESOURCES = 8192

export const UNDER_ATTACK_PROVIDE_TOWER_ENERGY_TASK_WEIGHT = 6144;
export const PROVIDE_SPAWN_ENERGY_TASK_WEIGHT = 4096;
export const PROVIDE_TOWER_ENERGY_TASK_WEIGHT = 3072;
export const REPAIR_TASK_WEIGHT = 2048;
export const PROVIDE_CONTAINER_ENERGY_TASK_WEIGHT = 2048;
export const BUILD_TASK_WEIGHT = 1024;
export const UPGRADE_CONTROLLER_TASK_WEIGHT = 768;

export const UNDER_ATTACK_CONTAINER_WITHDRAW_TASK_WEIGHT = 2048;
export const PICKUP_DROPPED_TASK_WEIGHT = 512;
export const LOOT_TOMBSTONE_TASK_WEIGHT = 256;
export const LOOT_RUIN_TASK_WEIGHT = 256;
export const HARVEST_TASK_WEIGHT = 128;
export const DISMANTLE_TASK_WEIGHT = 8;

export const GOTO_REMOTE_TASK_WEIGHT = 4;
export const CLAIM_ROOM_TASK_WEIGHT = 2;

export const weightMultiplierOfRemoteTasks = (baseWeight: number) => baseWeight / 16;