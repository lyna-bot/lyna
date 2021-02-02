import { Message } from "discord.js";

import { ArgumentList } from "./argument";

export interface Command {
  trigger: string;
  description: string;
  usage: string;
  execute: CommandFunc;
}

interface CommandFunc {
  (message: Message, args?: ArgumentList): Promise<Message | void>;
}
