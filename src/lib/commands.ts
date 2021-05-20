import { Interaction } from "discord.js";

import { ClientInstance, Commands } from "./core";
import { i18n } from "./i18n";
import { debug, logger } from "./logger";
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
export const dispatchCommand = async (
  interaction: Interaction,
): Promise<void> => {
  try {
    if (!interaction.isCommand()) return;

    await Commands.get(interaction.commandName)?.execute(interaction);

    logger.verbose(
      i18n.__(`Command executed: {{ trigger }}`, {
        trigger: interaction.commandName,
      }),
    );
  } catch (error) {
    logger.error(`Error dispatching command: ${error}`);
    debug.error(error);
  }
};

/**
 * Iterates through the commands imported into the project and registers each of
 * them so that they can be executed by interacting with the bot.
 *
 * @param commands - A list of modules, each of which constitutes a command
 */
export const registerCommands = async (): Promise<void> => {
  const discordCommands = await ClientInstance.guilds.cache
    .get("660151141811617802")
    ?.commands.set(Commands.map((cmd) => cmd.command));

  logger.verbose(
    `Registered commands: ${discordCommands?.map((command) => command.name)}`,
  );
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
  } catch (error) {
    logger.error(error);
  }
};
