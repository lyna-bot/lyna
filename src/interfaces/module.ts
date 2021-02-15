import { Command } from "./command";

export interface Module {
  title: string;
  description: string;
  commands?: Command[];
  init: ModuleFunc;
}

interface ModuleFunc {
  (): void;
}
