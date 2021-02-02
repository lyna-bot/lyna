import { Message } from "discord.js";

import { Commands } from "./core";
import { i18n } from "./i18n";
import { logger } from "./logger";
import { parseArguments } from "./arguments";

import { ArgumentList } from "../interfaces/argument";
import { Command } from "../interfaces/command";
import { botShouldRespond } from "./botPrefix";

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
