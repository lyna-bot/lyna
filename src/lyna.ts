import { Message, RateLimitData, TextChannel } from "discord.js";
import { oneLineCommaListsAnd } from "common-tags";

import { ClientInstance, Modules } from "./lib/core";
import { dispatchCommand } from "./lib/commands";
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
      if (process.env.SYSTEM_LOG_CHANNEL) {
        const sysLogChannel = ClientInstance.channels?.cache?.get(
          process.env.SYSTEM_LOG_CHANNEL,
        ) as TextChannel;

        sysLogChannel.send("Lyna is now online.");
      }
    } catch (error) {
      logger.error(error);
    }
  });

  ClientInstance.on("warn", (warning: string) => logger.warn(warning));
  ClientInstance.on("error", (error: Error) => logger.error(error));
  ClientInstance.on("rateLimit", (rateLimitInfo: RateLimitData) => logger.error(rateLimitInfo));
};

const login = () => {
  logger.info(i18n.__("Connecting to Discord..."));
  ClientInstance.login(process.env.DISCORD_BOT_TOKEN);

  ClientInstance.once("ready", () => {
    logger.info(i18n.__(`Connected successfully. Lyna is now standing guard.`));
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
