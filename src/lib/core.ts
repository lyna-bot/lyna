import { Client, Collection } from "discord.js";

import { Command } from "../interfaces/command";
import { Module } from "../interfaces/module";

export const ClientInstance = new Client({
  ws: { intents: ["GUILDS", "GUILD_MESSAGES"] },
});

export const Modules: Collection<string, Module> = new Collection();
export const Commands: Collection<string, Command> = new Collection();
