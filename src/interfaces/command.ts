import { ApplicationCommandData, CommandInteraction } from "discord.js";

/**
 * A single command, including details to allow the command to be
 * self-documenting and define sensible defaults.
 */
export interface Command {
  command: ApplicationCommandData;
  execute: CommandFunc;
}

/**
 * The command that is executed when a command is triggered.
 */
interface CommandFunc {
  (interaction: CommandInteraction): Promise<void>;
}
