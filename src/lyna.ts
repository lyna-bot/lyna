import { Message } from "discord.js";
import { oneLineCommaListsAnd } from "common-tags";

import { ClientInstance, Modules } from "./lib/core";
import { dispatchCommand } from "./lib/commands";
import { i18n } from "./lib/i18n";
import { logger } from "./lib/logger";

import * as ModuleDefinitions from "./modules";

/**
 * The main entry point for Lyna.
 *
 * Here, we log into Discord and set up anything else the bot needs to run
 * globally, then start listening for commands.
 *
 * @module
 */
export default (): void => {
  login();
  registerModules();

  ClientInstance.on("message", (message: Message) => {
    dispatchCommand(message);
  });
};

const login = () => {
  logger.info(i18n.__("Connecting to Discord..."));
  ClientInstance.login(process.env.DISCORD_BOT_TOKEN);

  ClientInstance.once("ready", () => {
    logger.info(i18n.__("Lyna is now standing guard."));
  });
};

const registerModules = () => {
  Object.entries(ModuleDefinitions).forEach(([, module]) => {
    Modules.set(module.title, module);
    module.init();
  });

  logger.verbose(
    oneLineCommaListsAnd`
      ${i18n.__("Registered modules:")}
      ${Modules.keyArray()}
    `,
  );
};
