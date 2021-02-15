import { registerCommands } from "../../lib/commands";

import { Module } from "../../interfaces/module";

export const UserScreening: Module = {
  title: "",
  description: "",

  async init() {
    if (this.commands) {
      registerCommands(this.commands);
    }
  }
};
