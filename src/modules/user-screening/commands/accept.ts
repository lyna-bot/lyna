import { oneLine } from "common-tags";

import { i18n } from "../../../lib/i18n";

import { Command } from "../../../interfaces/command";

export const Accept: Command = {
  command: {
    name: "accept",
    description: i18n.__(oneLine`
      Accepts a user into the community, giving them the roles they need to
      access the wider server.
    `),
    options: [
      {
        name: "user",
        type: "USER",
        description: "The user you would like to accept.",
        required: true,
      },
      {
        name: "role-1",
        type: "ROLE",
        description: "A role to apply to the user.",
        required: true,
      },
      {
        name: "role-2",
        type: "ROLE",
        description: "A role to apply to the user.",
        required: false,
      },
      {
        name: "role-3",
        type: "ROLE",
        description: "A role to apply to the user.",
        required: false,
      },
      {
        name: "role-4",
        type: "ROLE",
        description: "A role to apply to the user.",
        required: false,
      },
      {
        name: "role-5",
        type: "ROLE",
        description: "A role to apply to the user.",
        required: false,
      },
    ],
  },

  async execute(interaction) {
    await interaction.reply(
      i18n.__("This command has not yet been implemented."),
      { ephemeral: true },
    );
  },
};
