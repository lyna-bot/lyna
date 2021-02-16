import { Client, Collection, Intents } from "discord.js";

import { Command } from "../interfaces/command";
import { Module } from "../interfaces/module";

/**
 * An instance of the Discord.js Client class, which is used to access the bot's
 * details and fetch data from Discord.
 */
export const ClientInstance = new Client({
  ws: { intents: Intents.ALL },
  presence: { activity: { type: 'WATCHING', name: "over the Crystarium" } }
});

/**
 * A list of modules registered with the bot. This is populated when the bot
 * boots up.
 */
export const Modules: Collection<string, Module> = new Collection();

/**
 * A list of commands registered with the bot. This is populated when the bot
 * boots up.
 */
export const Commands: Collection<string, Command> = new Collection();
