import { Message } from "discord.js";

import { Commands } from "./core";
import { i18n } from "./i18n";
import { logger } from "./logger";
import { parseArguments } from "./arguments";

import { ArgumentList } from "../interfaces/argument";
import { Command } from "../interfaces/command";
import { botShouldRespond } from "./botPrefix";

/**
 * Matches the message agsinst the registered list of commands, and then
 * executes that command if a match is found. For most interactions, this will
 * be the primary point of contact with the bot.
 *
 * @param message - The Discord.js {@link discordjs.com | Message} object that
 * we want to parse.
 * @returns The result of the command.
 */
export const dispatchCommand = async (message: Message): Promise<void> => {
  try {
    if (!botShouldRespond(message)) return;

    const args: ArgumentList = parseArguments(message);

    if (args.trigger && !Commands.has(args.trigger)) {
      logger.info(`Unrecognised command: ${args.trigger}`);
      return;
    }

    Commands.get(args.trigger)
      ?.execute(message, args)
      .then(() => {
        logger.verbose(
          i18n.__(`Command executed: {{ trigger }}`, { trigger: args.trigger }),
        );
      });
  } catch (error) {
    logger.error(error);
    message.reply(
      i18n.__(`there was an error when executing that command: ${error}`),
    );
  }
};

/**
 * Iterates through the commands imported into the project and registers each of
 * them so that they can be executed by interacting with the bot.
 *
 * @param commands - A list of modules, each of which constitutes a command
 */
export const registerCommands = (commands: Command[]): void => {
  Object.entries(commands).forEach(([, cmd]) => {
    registerCommand(cmd.trigger.toLowerCase(), cmd);
  });
};

/**
 * Registers a command, allowing the bot to recognise its trigger and respond
 * appropriately.
 *
 * @param trigger - A string that should be used to call this command from
 * Discord.
 * @param command - A module representing a single command.
 */
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
