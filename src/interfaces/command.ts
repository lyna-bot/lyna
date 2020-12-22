import { Message } from "discord.js";

export interface Command {
  name: string;
  description: string;
  execute: CommandFunc;
}

interface CommandFunc {
  (message: Message, args?: string[]): Promise<void> | boolean | void;
}
