// import { oneLineCommaListsAnd } from "common-tags";

import { i18n } from "../../lib/i18n";
// import { logger } from "../../lib/logger";
import { registerCommands } from "../../lib/commands";

import { Avatar } from "./commands/avatar";
import { Ping } from "./commands/ping";
import { Prefix } from "./commands/prefix";

import { Module } from "../../interfaces/module";

export const Utilities: Module = {
  title: "Utilities",
  description: i18n.__(
    "Miscellaneous tools and functionality useful in the day-to-day operation of the bot.",
  ),
  async init() {
    registerCommands([Avatar, Ping, Prefix]);
  },
};
