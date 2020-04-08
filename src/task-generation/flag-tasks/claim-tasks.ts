import { CLAIM_ROOM_TASK_WEIGHT, weightMultiplierOfRemoteTasks } from "task-generation/task-weights";
import { fresh, isRole, composite } from "task-generation/creep-predicates";
import { GOTO_ROOM, EXPLORER, CLAIM_CONTROLLER } from "type-constants";
import { getTasksForRoom } from "task-generation/room-tasks/tasks-for-room";

const creepPredicate = composite(isRole(EXPLORER), fresh)

export const getClaimTasks = (flag: Flag): TaskBuilder[] => {
  if (!flag.room) {
    return [{
      weight: CLAIM_ROOM_TASK_WEIGHT,
      creepPredicate,
      position: flag.pos,
      task: {
        roomName: flag.pos.roomName,
        type: GOTO_ROOM
      },
      parallelism: 1,
      creepRange: 250
    }];
  } 
  if(flag.room.controller && flag.room.controller.owner === undefined){
    return [{
      weight: CLAIM_ROOM_TASK_WEIGHT,
      creepPredicate,
      position: flag.pos,
      task: {
        target: flag.room.controller.id,
        type: CLAIM_CONTROLLER
      },
      parallelism: 1,
      creepRange: 250
    }];
  }
  return getTasksForRoom(flag.room).map(builder => ({
    ...builder,
    weight: weightMultiplierOfRemoteTasks(builder.weight),
  }));
};
