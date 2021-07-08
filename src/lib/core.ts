import { Client, Collection, Intents } from "discord.js";
import Redis from "ioredis";

import { Command } from "../interfaces/command";
import { Module } from "../interfaces/module";
import { envGet } from "./env";

/**
 * An instance of the Discord.js Client class, which is used to access the bot's
 * details and fetch data from Discord.
 */
export const ClientInstance = new Client({
  ws: { intents: Intents.ALL },
  partials: ["CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION", "USER"],
  presence: { activity: { type: "WATCHING", name: "over the Crystarium" } },
});

/**
 * Our primary Redis instance, mostly used for analytics and similar
 * functionality.
 */
export const RedisInstance = new Redis(
  envGet("REDIS_URL").required().asString(),
  { enableAutoPipelining: true },
);

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
