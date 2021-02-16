import { Command } from "./command";

/**
 * A module, which acts as a container for commands. These allow entire pieces
 * of functionality to be separated and then controlled as individual pieces,
 * rather than having to work with potentially dozens of disparate commands
 * directly.
 */
export interface Module {
  title: string;
  description: string;
  commands?: Command[];
  init: ModuleFunc;
}

/**
 * The command used to initialise a module. By default, this just registers the
 * module's commands, but this should also be used to hook into events or do any
 * other setup work that the module requires to function.
 */
interface ModuleFunc {
  (): void;
}
