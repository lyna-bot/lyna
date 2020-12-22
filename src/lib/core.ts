import { Client } from "discord.js";

export const ClientInstance = new Client();
export const CommandPrefix: string = process.env.COMMAND_PREFIX ?? "!!";
