import { Message } from "discord.js";

import { CommandPrefix, Commands } from "./core";
import { i18n } from "./i18n";
import { logger } from "./logger";
import { parseArguments } from "./arguments";

import { ArgumentList } from "../interfaces/argument";
import { Command } from "../interfaces/command";

export const dispatchCommand = async (message: Message): Promise<void> => {
  if (!message.content.startsWith(CommandPrefix) || message.author.bot) return;

  const args: ArgumentList = parseArguments(message);

  if (!Commands.has(args.trigger)) return;

  try {
    Commands.get(args.trigger)?.execute(message, args);

    logger.verbose(
      i18n.__(`Command executed: {{ trigger }}`, { trigger: args.trigger }),
    );
  } catch (error) {
    logger.error(error);
    message.reply(i18n.__("there was an error when executing that command."));
  }
};

export const registerCommands = (commands: Command[]): void => {
  Object.entries(commands).forEach(([, cmd]) => {
    registerCommand(cmd.trigger.toLowerCase(), cmd);
  });
};

export const registerCommand = (trigger: string, command: Command): void => {
  try {
    if (Commands.has(trigger)) {
      throw new Error("This command has already been registered.");
    } else {
      Commands.set(trigger, command);
    }

    logger.debug(`Registered command: ${trigger}`);
  } catch (error) {
    logger.error(error);
  }
};
