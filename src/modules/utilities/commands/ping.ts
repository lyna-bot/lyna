import { Message } from "discord.js";
import { oneLine } from "common-tags";

import { ClientInstance } from "../../../lib/core";
import { i18n } from "../../../lib/i18n";
import { debug, logger } from "../../../lib/logger";

import { Command } from "../../../interfaces/command";

export const Ping: Command = {
  command: {
    name: "ping",
    description: i18n.__(
      "Checks whether the bot is online and connected to Discord correctly.",
    ),
    options: [],
  },

  async execute(interaction) {
    try {
      await interaction.defer(true);

      return interaction.followUp(
        oneLine`
        ${i18n.__("Pong!")}
        (WebSocket: ${ClientInstance.ws.ping}ms)
        `,
      );
    } catch (message) {
      debug.error(`Error executing ping: ${message}`);
    }
  },
};
