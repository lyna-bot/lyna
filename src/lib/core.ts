import { Client, Collection, Intents } from "discord.js";

import { Command } from "../interfaces/command";
import { Module } from "../interfaces/module";

export const ClientInstance = new Client({
  ws: { intents: Intents.ALL },
  presence: { activity: { type: 'WATCHING', name: "over the Crystarium" } }
});

export const Modules: Collection<string, Module> = new Collection();
export const Commands: Collection<string, Command> = new Collection();
