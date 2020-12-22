import { Collection, Message } from "discord.js";
import { oneLineCommaListsAnd } from "common-tags";

import { ClientInstance, CommandPrefix } from "./lib/core";
import { i18n } from "./lib/i18n";
import { logger } from "./lib/logger";
import { parseArgs } from "./lib/arguments";

import * as CommandDefinitions from "./commands";

import { ArgumentList } from "./interfaces/argument";
import { Command } from "./interfaces/command";

const commands: Collection<string, Command> = new Collection();

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
  registerCommands();

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

const registerCommands = () => {
  Object.entries(CommandDefinitions).forEach(([, cmd]) => {
    commands.set(cmd.trigger.toLowerCase(), cmd);
  });

  logger.verbose(
    oneLineCommaListsAnd`
      ${i18n.__("Registered commands:")}
      ${Object.keys(CommandDefinitions)}
    `,
  );
};

const dispatchCommand = async (message: Message) => {
  if (!message.content.startsWith(CommandPrefix) || message.author.bot) return;

  const args: ArgumentList = parseArgs(message);

  if (!commands.has(args.trigger)) return;

  try {
    commands.get(args.trigger)?.execute(message, args);

    logger.verbose(
      i18n.__(`Command executed: {{ trigger }}`, { trigger: args.trigger }),
    );
  } catch (error) {
    logger.error(error);
    message.reply(i18n.__("there was an error when executing that command."));
  }
};
