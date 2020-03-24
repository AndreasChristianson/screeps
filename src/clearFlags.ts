import { clearTask } from "roles/clear-task";
import { getFlags } from "./utils/flags";

export const processFlags = () => {
  getFlags(COLOR_GREEN).forEach(flag => {
    if (flag.room!.lookForAt(LOOK_STRUCTURES, flag.pos).length === 0) {
      flag.remove();
    }
  });

  getFlags(COLOR_ORANGE).forEach(flag => {
    flag.room!.lookForAt(LOOK_CREEPS, flag.pos).forEach(creep => {
      clearTask(creep);
      creep.room.visual.text("Task Cleared!", creep.pos);
    });
    flag.remove();
  });

  getFlags(COLOR_BLUE).forEach(flag => {
    if (flag.room) {
      if (
        flag.room.controller &&
        flag.room.controller.owner &&
        flag.room.controller.owner.username ===
          Object.values(Game.spawns)[0].owner.username &&
        flag.room.find(FIND_MY_SPAWNS).length > 0
      ) {
        flag.remove();
      }
    }
  });
};
