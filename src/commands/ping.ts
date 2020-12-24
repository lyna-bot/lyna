import { i18n } from "../lib/i18n";

import { Command } from "../interfaces/command";

/**
 * @module
 * @namespace Lyna
 * @name Ping
 *
 * The simplest possible command. Simply responds to its command with "Ping!"
 *
 * Usage: {p}ping
 */
export const Ping: Command = {
  trigger: "ping",
  description: i18n.__("Ping!"),
  async execute(message) {
    await message.channel.send(i18n.__("Pong!"));
  },
};