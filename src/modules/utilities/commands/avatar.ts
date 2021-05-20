import { MessageEmbed, User } from "discord.js";
import { oneLine } from "common-tags";

import { i18n } from "../../../lib/i18n";

import { Command } from "../../../interfaces/command";

export const Avatar: Command = {
  command: {
    name: "avatar",
    description: i18n.__(oneLine`
    Displays a user's avatar.
  `),
    options: [
      {
        name: "user",
        type: "USER",
        description: "The user whose avatar should be shown",
        required: true,
      },
    ],
  },

  async execute(interaction) {
    const user: User = interaction.options[0].user!;

    if (user.username) {
      const avatarEmbed = new MessageEmbed()
        .setTitle(`${user.username}'s avatar`)
        .setImage(
          user.displayAvatarURL({
            dynamic: true,
            size: 4096,
          }),
        );

      return await interaction.reply(avatarEmbed);
    } else {
      return await interaction.reply(
        i18n.__(`Please give me a user whose avatar you'd like to see.`),
        {
          ephemeral: true,
        },
      );
    }
  },
};
