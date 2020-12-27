import { MessageEmbed, User } from "discord.js";
import { oneLine } from "common-tags";

import { i18n } from "../lib/i18n";

import { Command } from "../interfaces/command";

/**
 * @module
 * @namespace Lyna
 * @name Avatar
 *
 * Displays a user's avatar.
 *
 * Usage: {p}avatar <user>
 */
export const Avatar: Command = {
  trigger: "avatar",
  description: i18n.__(oneLine`
    Displays a user's avatar.
  `),

  async execute(message, args) {
    if (args?.arguments && args.arguments.length > 0) {
      const user = args.arguments[0] as User;

      const avatarEmbed = new MessageEmbed()
        .setTitle(`${user.username}'s avatar`)
        .setImage(
          user.displayAvatarURL({
            dynamic: true,
            size: 4096,
          }),
        );

      return await message.channel.send(avatarEmbed);
    } else {
      return message.reply(
        i18n.__("Please mention the user whose avatar you wish to see."),
      );
    }
  },
};
