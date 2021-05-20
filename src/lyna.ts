import { RateLimitData, TextChannel } from "discord.js";
import { oneLineCommaListsAnd } from "common-tags";

import { ClientInstance, Commands, Modules } from "./lib/core";
import {
  dispatchCommand,
  registerCommand,
  registerCommands,
} from "./lib/commands";
import { i18n } from "./lib/i18n";
import { debug, logger } from "./lib/logger";

import * as ModuleDefinitions from "./modules";

/**
 * Starts up Lyna, performing all tasks required to initialise an instance of
 * the bot, connect to Discord, and start listening for input.
 */
export const Lyna = (): void => {
  login();

  ClientInstance.on("ready", async () => {
    try {
      registerModules();

      if (process.env.SYSTEM_LOG_CHANNEL) {
        const sysLogChannel = ClientInstance.channels?.cache?.get(
          process.env.SYSTEM_LOG_CHANNEL,
        ) as TextChannel;
        sysLogChannel.send("Lyna is now online.");
      }
    } catch (error) {
      logger.error(`Error when making client ready: ${JSON.stringify(error)}`);
      debug.debug(error);
    }
  });

  ClientInstance.on("interaction", (interaction) => {
    // If the interaction isn't a slash command, return
    if (!interaction.isCommand()) return;

    try {
      dispatchCommand(interaction);
    } catch (error) {
      logger.error(
        `Interaction processing error for ${
          interaction.commandName
        }: ${JSON.stringify(error)}`,
      );
    }
  });

  ClientInstance.on("debug", (message: string) => debug.verbose(message));
  ClientInstance.on("warn", (warning: string) =>
    logger.warn(JSON.stringify(warning)),
  );
  ClientInstance.on("error", (error: Error) =>
    logger.error(JSON.stringify(error)),
  );
  ClientInstance.on("rateLimit", (rateLimitInfo: RateLimitData) =>
    logger.error(JSON.stringify(rateLimitInfo)),
  );
};

ClientInstance.on("applicationCommandCreate", async (command) => {
  logger.verbose(
    oneLineCommaListsAnd`
      ${i18n.__("Registered command:")}
      ${command.name}
    `,
  );
});

ClientInstance.on("applicationCommandUpdate", async (command) => {
  logger.verbose(
    oneLineCommaListsAnd`
      ${i18n.__("Updated command:")}
      ${command?.name}
    `,
  );
});

ClientInstance.on("applicationCommandDelete", async (command) => {
  logger.verbose(
    oneLineCommaListsAnd`
      ${i18n.__("Deleted command:")}
      ${command.name}
    `,
  );
});

/**
 * Log into Discord. This function wraps Discord.js's `login` function with some
 * logging for convenience.
 */
const login = () => {
  logger.info(i18n.__("Connecting to Discord..."));
  ClientInstance.login(process.env.DISCORD_BOT_TOKEN);

  ClientInstance.on("ready", () => {
    logger.info(i18n.__(`Connected successfully. Lyna is now standing guard.`));
  });
};

/**
 * Loads all the modules in the `modules/` folder and initialises them, allowing
 * them to be used with the bot.
 */
const registerModules = () => {
  Object.entries(ModuleDefinitions).forEach(([, module]) => {
    if (module.commands) {
      module!.commands.forEach((cmd) => {
        registerCommand(cmd.command.name, cmd);
      });
    }

    module.init();
  });

  registerCommands();
};
