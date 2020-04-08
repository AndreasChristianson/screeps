import { getAllTasks } from "./all-tasks";
import { biggestFirst, smallestFirst, biggestFirstByAccessor } from "utils/sort";
import { WAIT } from "type-constants";
import { getAllMyCreeps } from "utils/find";

const bucketByWeight = (tasks: TaskBuilder[]) =>
  tasks.reduce(
    (accumulator: Map<number, TaskBuilder[]>, task: TaskBuilder) =>
      accumulator.has(task.weight)
        ? accumulator.set(task.weight, [...accumulator.get(task.weight)!, task])
        : accumulator.set(task.weight, [task]),
    new Map<number, TaskBuilder[]>());

export const assignTasks = () => {
  const tasks = getAllTasks()
  const bucketedTasks = bucketByWeight(tasks);
  const weights = [...bucketedTasks.keys()]
    .sort(biggestFirstByAccessor((weight) => weight));

  for (const weight of weights) {
    getAllMyCreeps()
      .filter(creep => creep.memory.task === undefined)
      .forEach(creep => {
        const fittingTasks = bucketedTasks.get(weight)!.filter(taskBuilder => taskBuilder.creepPredicate(creep))
          .map(taskBuilder => ({
            taskBuilder,
            distance: creep.pos.getRangeTo(taskBuilder.position)
          }))
          .filter(taskWithDistance => taskWithDistance.distance < taskWithDistance.taskBuilder.creepRange)
          .sort(smallestFirst('distance'))
        if (fittingTasks.length > 0) {
          creep.memory.task = fittingTasks[0].taskBuilder.task;
        }
      });
  }
  Object.values(Game.creeps)
    .filter(creep => !creep.spawning)
    .filter(creep => creep.memory.task === undefined)
    .forEach(creep => creep.memory.task = {
      type: WAIT
    });
};
