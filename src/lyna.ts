import { Client, Collection, Message } from "discord.js";
import { oneLineCommaListsAnd } from "common-tags";

import { logger } from "./utils/logger";
import { i18n } from "./utils/i18n";
import * as lynaCommands from "./commands";

import { Command } from "./interfaces/command";

const client = new Client();
const commands: Collection<string, Command> = new Collection();

const prefix = process.env.COMMAND_PREFIX ?? "!!";

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

  client.on("message", (message: Message) => {
    dispatchCommand(message);
  });
};

const login = () => {
  logger.info(i18n.__("Connecting to Discord..."));
  client.login(process.env.DISCORD_BOT_TOKEN);

  client.once("ready", () => {
    logger.info(i18n.__("Lyna is now standing guard."));
  });
};

const registerCommands = () => {
  Object.entries(lynaCommands).forEach(([, cmd]) => {
    commands.set(cmd.name.toLowerCase(), cmd);
  });

  logger.verbose(
    oneLineCommaListsAnd`${i18n.__("Registered commands:")} ${Object.keys(
      lynaCommands,
    )}`,
  );
};

const dispatchCommand = async (message: Message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args: string[] = getArgs(message);
  const command: string | undefined = getCommandName(args);

  if (!command || !commands.has(command)) return;

  try {
    commands.get(command)?.execute(message, args);

    logger.verbose(
      i18n.__(`Command executed: {{command}}`, { command: command }),
    );
  } catch (error) {
    logger.error(error);
    message.reply(i18n.__("there was an error when executing that command."));
  }
};

const getArgs = (message: Message): string[] => {
  return message.content.slice(prefix.length).trim().split(/ +/);
};

const getCommandName = (args: string[]): string | undefined => {
  return args.shift()?.toLowerCase();
};
