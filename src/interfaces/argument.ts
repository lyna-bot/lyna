import { Channel, Client, Role, User } from "discord.js";

/**
 * A single piece of user input, which can be a string or any Discord object
 * that the user could reference when controlling the bot.
 */
export type Argument = User | Channel | Role | string;

/**
 * A set of arguments representing user input, including relevant context when
 * executing a command..
 */
export interface ArgumentList {
  arguments: Argument[];
  trigger: string;
  client?: Client;
}
