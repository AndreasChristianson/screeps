export const clearTask = (creep: Creep) => {
  delete creep.memory.task;
};
