import { oneLine } from "common-tags";

import { ClientInstance } from "../../../lib/core";
import { i18n } from "../../../lib/i18n";

import { Command } from "../../../interfaces/command";

/**
 * @module
 * @namespace Lyna
 * @name Ping
 *
 * Checks whether the bot is online and connected to Discord correctly.
 *
 * Usage: {p}ping
 */
export const Ping: Command = {
  trigger: "ping",
  description: i18n.__("Checks whether the bot is online and connected to Discord correctly."),
  usage: '',
  async execute(message) {
    await message.channel.send(`Pinging...`).then((sent) => {
      sent.edit(
        oneLine`
          ${i18n.__("Pong!")}
          (WebSocket: ${ClientInstance.ws.ping}ms; RTT: ${sent.createdTimestamp - message.createdTimestamp}ms)
        `,
      );
    });
  },
};
