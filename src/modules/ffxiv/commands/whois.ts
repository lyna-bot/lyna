import { MessageEmbed } from "discord.js";
import axios from "axios";
import { oneLine } from "common-tags";

import { i18n } from "../../../lib/i18n";

import { Command } from "../../../interfaces/command";
import { logger } from "../../../lib/logger";

export const Whois: Command = {
  command: {
    name: "whois",
    description: i18n.__(oneLine`
      Fetches basic info for a Final Fantasy XIV character.
    `),
    options: [
      {
        name: "server",
        type: "STRING",
        description:
          "The Final Fantasy XIV server on which the character is located",
        // choices: []
        required: true,
      },
      {
        name: "character",
        type: "STRING",
        description: "The character's full name",
        required: true,
      },
    ],
  },

  async execute(interaction) {
    const responseMessage = await message.channel.send(`Working...`);
    message.channel.startTyping();

    try {
      const searchServer = args?.arguments[0];
      const searchCharName = args?.arguments.slice(1).join("+");

      const characterSearch = await axios.get(
        "https://xivapi.com/character/search",
        {
          params: {
            private_key: process.env.XIVAPI_KEY,
            name: searchCharName,
            server: searchServer,
          },
        },
      );

      const characterFull = await axios.get(
        `https://xivapi.com/character/${characterSearch.data.Results[0].ID}`,
        {
          params: {
            private_key: process.env.XIVAPI_KEY,
            extended: 1,
          },
        },
      );

      const xivCharacter = characterFull.data.Character;

      const characterEmbed = new MessageEmbed()
        .setTitle(xivCharacter?.Name)
        .setDescription(
          `${xivCharacter?.Gender == 2 ? "Female" : "Male"}, Level ${
            xivCharacter?.ActiveClassJob?.Level
          } ${xivCharacter?.ActiveClassJob?.UnlockedState?.Name}`,
        )
        .setThumbnail(xivCharacter?.Avatar)
        .setImage(xivCharacter?.Portrait);

      if (xivCharacter?.FreeCompanyName) {
        characterEmbed.addField("Free Company", xivCharacter?.FreeCompanyName);
      }

      if (xivCharacter?.Nameday) {
        characterEmbed.addField("Nameday", xivCharacter?.Nameday);
      }

      if (xivCharacter?.Title?.Name) {
        characterEmbed.addField("Title", xivCharacter?.Title?.Name);
      }

      if (xivCharacter?.Race?.Name) {
        characterEmbed.addField(
          "Race",
          `${xivCharacter?.Race?.Name}, ${xivCharacter?.Tribe?.Name}`,
        );
      }

      if (xivCharacter?.GrandCompany?.Company?.Name) {
        characterEmbed.addField(
          "Grand Company",
          `${xivCharacter?.GrandCompany?.Company?.Name}, ${xivCharacter?.GrandCompany?.Rank?.Name}`,
        );
      }

      await responseMessage.edit("", characterEmbed);
    } catch (error) {
      await responseMessage.edit(
        `Couldn't fetch this FFXIV character due to the following error: \`\`\`${error}\`\`\``,
      );
      logger.error(error);
    } finally {
      message.channel.stopTyping();
    }
  },
};
