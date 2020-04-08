import { getRepairTasks } from "./repair";
import { getProvideSpawnEnergyTasks } from "./provide-spawn-energy";
import { getBuildTasks } from "./build";
import { getTransferTasks } from "./transfer";
import { getUpgradeControllerTasks } from "./upgrade-controller";
import { depositNonEnergyTasks } from "./deposit-non-energy";
import { getLootTasks } from "./loot";
import { getHarvestTasks } from "./harvest";
import { getContainerWithdrawTasks } from "./withdraw-from-container";

export const getTasksForRoom = (room: Room): TaskBuilder[] => [
  ...depositNonEnergyTasks(room),

  ...getRepairTasks(room),
  ...getProvideSpawnEnergyTasks(room),
  ...getBuildTasks(room),
  ...getTransferTasks(room),
  ...getUpgradeControllerTasks(room),
  
  ...getHarvestTasks(room),
  ...getLootTasks(room),
  ...getContainerWithdrawTasks(room)
];
