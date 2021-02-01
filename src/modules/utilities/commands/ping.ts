import { oneLine } from "common-tags";

import { ClientInstance } from "../../../lib/core";
import { i18n } from "../../../lib/i18n";

import { Command } from "../../../interfaces/command";

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
