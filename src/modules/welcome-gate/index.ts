import { i18n } from "../../lib/i18n";
import { registerCommands } from "../../lib/commands";

import { Accept } from "./commands/accept";

import { Module } from "../../interfaces/module";

export const WelcomeGate: Module = {
  title: "Welcome Gating",
  description: i18n.__(
    "A collection of tools to gate a community against bots, trolls, and other external threats.",
  ),
  async init() {
    registerCommands([Accept]);
  },
};
