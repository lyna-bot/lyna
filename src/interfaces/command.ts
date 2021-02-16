import { Message } from "discord.js";

import { ArgumentList } from "./argument";

/**
 * A single command, including details to allow the command to be
 * self-documenting and define sensible defaults.
 */
export interface Command {
  trigger: string;
  description: string;
  usage: string;
  execute: CommandFunc;
}

/**
 * The command that is executed when a command is triggered.
 */
interface CommandFunc {
  (message: Message, args?: ArgumentList): Promise<Message | void>;
}
