import { Message, RateLimitData, TextChannel } from "discord.js";
import { oneLineCommaListsAnd } from "common-tags";

import { ClientInstance, Modules } from "./lib/core";
import { dispatchCommand } from "./lib/commands";
import { envGet } from "./lib/env";
import { i18n } from "./lib/i18n";
import { logger } from "./lib/logger";

import * as ModuleDefinitions from "./modules";

/**
 * Starts up Lyna, performing all tasks required to initialise an instance of
 * the bot, connect to Discord, and start listening for input.
 */
export const Lyna = (): void => {
  login();
  registerModules();

  ClientInstance.on("message", (message: Message) => {
    try {
      dispatchCommand(message);
    } catch (error) {
      logger.error(error);
    }
  });

  ClientInstance.on("ready", async () => {
    try {
      const sysLogChannelId = envGet("SYSTEM_LOG_CHANNEL").asString();

      if (sysLogChannelId) {
        const sysLogChannel = ClientInstance.channels?.cache?.get(
          sysLogChannelId,
        ) as TextChannel;

        sysLogChannel.send("Lyna is now online.");
      }
    } catch (error) {
      logger.error(error);
    }
  });

  ClientInstance.on("warn", (warning: string) => logger.warn(warning));
  ClientInstance.on("error", (error: Error) => logger.error(error));
  ClientInstance.on("rateLimit", (rateLimitInfo: RateLimitData) =>
    logger.error(rateLimitInfo),
  );
};

/**
 * Log into Discord. This function wraps Discord.js's `login` function with some
 * logging for convenience.
 */
const login = () => {
  logger.info(i18n.__("Connecting to Discord..."));
  ClientInstance.login(envGet("DISCORD_BOT_TOKEN").required().asString());

  ClientInstance.once("ready", () => {
    logger.info(i18n.__(`Connected successfully. Lyna is now standing guard.`));
  });
};

/**
 * Loads all the modules in the `modules/` folder and initialises them, allowing
 * them to be used with the bot.
 */
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
