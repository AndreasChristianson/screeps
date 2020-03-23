import { WAIT } from "type-constants";
import { clearTask } from "./clear-task";

export const getWaitTask = (): Task => ({
  type: WAIT
});

export const wait = (creep: Creep) => {
  creep.room.memory.lastWait = Game.time;
  creep.room.visual.text("waiting..", creep.pos.x, creep.pos.y);
  clearTask(creep);
};
