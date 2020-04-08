import { getFlags } from "utils/flags";
import { getTasksForRoom } from "./room-tasks/tasks-for-room";
import { getRemoteTasks } from "./flag-tasks/remote-tasks";
import { getClaimTasks } from "./flag-tasks/claim-tasks";
import { getDismantleTasks } from "./flag-tasks/dismantle-tasks";
import { getWaitTask } from "roles/waiting";
import { findAssignedCreeps } from "utils/find";

const flatMap = <T>(items: T[][]) => items.reduce((list, items) => [
  ...list,
  ...items
], []);

const roomsWithSpawns = () => Object.values(Game.spawns).map(spawn => spawn.room);



export const getAllTasks = (): TaskBuilder[] => {
  const spawnTaskBuilders = flatMap(roomsWithSpawns().map(getTasksForRoom));
  const remoteTaskBuilders = flatMap(getFlags(COLOR_CYAN).map(getRemoteTasks));
  const claimTaskBuilders = flatMap(getFlags(COLOR_BLUE).map(getClaimTasks));
  const dismantleTaskBuilders = flatMap(getFlags(COLOR_GREEN).map(getDismantleTasks));

  return [
    ...spawnTaskBuilders,
    // ...remoteTaskBuilders,
    // ...claimTaskBuilders,
    ...dismantleTaskBuilders
  ].map((taskBuilder: TaskBuilder) => {
    const creeps = findAssignedCreeps(taskBuilder.task)
    return ({
      ...taskBuilder,
      parallelism: taskBuilder.parallelism - creeps.length,
      required: taskBuilder.required &&
        creeps.reduce((sum:number, creep:Creep) =>
          sum - creep.store.getUsedCapacity(RESOURCE_ENERGY), taskBuilder.required),
      available: taskBuilder.available &&
        creeps.reduce((sum:number, creep:Creep) =>
          sum - creep.store.getFreeCapacity(RESOURCE_ENERGY), taskBuilder.available)
    });
  })
  .filter(taskBuilder => taskBuilder.parallelism > 0)
  .filter(taskBuilder => taskBuilder.required === undefined || taskBuilder.required > 0)
  .filter(taskBuilder => taskBuilder.available === undefined || taskBuilder.available > 0);
};
