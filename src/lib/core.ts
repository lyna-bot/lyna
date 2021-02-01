import { Client, Collection } from "discord.js";

import { Command } from "../interfaces/command";
import { Module } from "../interfaces/module";

export const ClientInstance = new Client();
export const CommandPrefix: string = process.env.COMMAND_PREFIX ?? "!!";

export const Modules: Collection<string, Module> = new Collection();
export const Commands: Collection<string, Command> = new Collection();