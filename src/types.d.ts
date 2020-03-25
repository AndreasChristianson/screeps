// example declaration file - remove these and add your own custom typings

type HYBRID = "HYBRID";
type FIGHTER = "FIGHTER";
type EXPLORER = "EXPLORER";

type Role = HYBRID | EXPLORER | FIGHTER;

type USE_ENERGY = "USE_ENERGY";
type USE_RESOURCE = "USE_RESOURCE";
type GOTO_ROOM = "GOTO_ROOM";
type CLAIM_CONTROLLER = "CLAIM_CONTROLLER";
type WAIT = "WAIT";
type PICKUP = "PICKUP";
type WITHDRAW = "WITHDRAW";
type HARVEST = "HARVEST";
type DISMANTLE = "DISMANTLE";

type TaskType =
  | WAIT
  | USE_RESOURCE
  | CLAIM_CONTROLLER
  | GOTO_ROOM
  | USE_ENERGY
  | PICKUP
  | WITHDRAW
  | HARVEST
  | DISMANTLE;

type TaskMetadata = "repair";

interface Task {
  target?: Id<RoomObject>;
  meta?: TaskMetadata;
  type: TaskType;
  roomName?: string;
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

// `global` extension samples
declare namespace NodeJS {
  interface Global {
    log: any;
  }
}
