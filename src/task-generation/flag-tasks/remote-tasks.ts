import { getTasksForRoom } from "task-generation/room-tasks/tasks-for-room";
import { GOTO_REMOTE_TASK_WEIGHT, weightMultiplierOfRemoteTasks } from "task-generation/task-weights";
import { fresh } from "task-generation/creep-predicates";
import { GOTO_ROOM } from "type-constants";

export const getRemoteTasks = (flag: Flag): TaskBuilder[] => {
  if (!flag.room) {
    return [{
      weight: GOTO_REMOTE_TASK_WEIGHT,
      creepPredicate: fresh,
      position: flag.pos,
      task: {
        roomName: flag.pos.roomName,
        type: GOTO_ROOM
      },
      parallelism: 1,
      creepRange: 250
    }];
  }
  return getTasksForRoom(flag.room).map(builder => ({
    ...builder,
    weight: weightMultiplierOfRemoteTasks(builder.weight)
  }));
};
