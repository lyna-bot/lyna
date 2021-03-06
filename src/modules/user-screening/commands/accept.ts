import { oneLine } from "common-tags";

import { i18n } from "../../../lib/i18n";

import { Command } from "../../../interfaces/command";

export const Accept: Command = {
  trigger: "accept",
  usage: "<user> [arguments] [chosen roles]",
  description: i18n.__(oneLine`
    Accepts a user into the community, giving them the roles they
    need to access the wider server.
  `),
  async execute(message) {
    await message.channel.send(
      i18n.__("This command has not yet been implemented."),
    );
  },
};
