import { Channel, Client, Role, User } from "discord.js";

export type Argument = User | Channel | Role | string;

export interface ArgumentList {
  trigger: string;
  arguments?: Argument[];
  client?: Client;
}
