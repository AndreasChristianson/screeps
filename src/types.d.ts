// example declaration file - remove these and add your own custom typings

type HYBRID = "HYBRID";
type FIGHTER = "FIGHTER";
type EXPLORER = "EXPLORER";

type Role = HYBRID | EXPLORER | FIGHTER;

type USE_RESOURCE = "USE_RESOURCE";
type GOTO_ROOM = "GOTO_ROOM";
type CLAIM_CONTROLLER = "CLAIM_CONTROLLER";
type WAIT = "WAIT";
type PICKUP = "PICKUP";
type WITHDRAW = "WITHDRAW";
type HARVEST = "HARVEST";
type DISMANTLE = "DISMANTLE";
type BUILD = "BUILD";
type UPGRADE_CONTROLLER = "UPGRADE_CONTROLLER";
type REPAIR = "REPAIR";
type TRANSFER = "TRANSFER";

type TaskType =
  | WAIT
  | USE_RESOURCE
  | CLAIM_CONTROLLER
  | GOTO_ROOM
  | PICKUP
  | WITHDRAW
  | HARVEST
  | BUILD
  | UPGRADE_CONTROLLER
  | TRANSFER
  | REPAIR
  | DISMANTLE;

interface Task {
  target?: Id<RoomObject>;
  type: TaskType;
  roomName?: string;
  wayPoint?:{
    y: number;
    x: number;
    roomName: string;
  }
}

// memory extension samples
interface CreepMemory {
  task?: Task;
  role: Role;
}

interface RoomMemory {
  lastWait: number;
  labelCount: number;
  notificationCount: number;
}

interface FlagMemory {
  stepCount?: number;
}

interface Memory {
  uuid: number;
  log: any;
}

interface TargetBuilder{
  target: RoomObject & {
    id: Id<RoomObject>;
  };
  weight: number;
  energy: number;
  type: TaskType;
  parallelism: number;
}

interface Target {
  id: Id<RoomObject>;
  weight: number;
  energy: number;
  type: TaskType;
  parallelism: number;
}

interface TaskBuilder{
  weight: number;
  creepPredicate: (creep:Creep) => boolean;
  position: RoomPosition;
  task: Task;
  available?: number;
  required?: number;
  parallelism: number;
  creepRange: number;
}

// `global` extension samples
declare namespace NodeJS {
  interface Global {
    log: any;
  }
}
