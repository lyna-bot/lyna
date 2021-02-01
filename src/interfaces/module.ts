export interface Module {
  title: string;
  description: string;
  init: ModuleFunc;
}

interface ModuleFunc {
  (): void;
}
