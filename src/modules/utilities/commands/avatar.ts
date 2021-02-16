import { MessageEmbed, User } from "discord.js";
import { oneLine } from "common-tags";

import { i18n } from "../../../lib/i18n";

import { Command } from "../../../interfaces/command";

export const Avatar: Command = {
  trigger: "avatar",
  usage: "<user>",
  description: i18n.__(oneLine`
    Displays a user's avatar.
  `),

  async execute(message, args) {
    let user: User;

    if (args?.arguments && args.arguments.length > 0) {
      user = args.arguments[0] as User;
    } else {
      user = message.author;
    }

    if (user.username) {
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
      return await message.reply(
        i18n.__(`please give me a user whose avatar you'd like to see.`),
      );
    }

    throw Error(
      "No user provided for {p}avatar command, and none could be calculated.",
    );
  },
};
