import { Client, Collection } from "discord.js";
import { oneLineCommaListsAnd } from "common-tags";

import { logger } from "./utils/logger.js";
import { i18n } from "./utils/i18n.js";
import * as lynaCommands from "./commands/index.js";

const client = new Client();
client.commands = new Collection();

const prefix = "!!";

/**
 * The main entry point for Lyna.
 *
 * Here, we log into Discord and set up anything else the bot needs to run
 * globally, then start listening for commands.
 *
 * @module
 */
export default () => {
  logger.info(i18n.__("Connecting to Discord..."));
  client.login(process.env.DISCORD_BOT_TOKEN);

  client.once("ready", () => {
    logger.info(i18n.__("Lyna is now standing guard."));
  });

  Object.entries(lynaCommands).forEach(([name, command]) => {
    client.commands.set(command.name.toLowerCase(), command);
  });
  logger.verbose(
    oneLineCommaListsAnd`${i18n.__("Registered commands:")} ${Object.keys(
      lynaCommands,
    )}`,
  );

  client.on("message", (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;

    try {
      logger.verbose(
        i18n.__(`Command executed: {{command}}`, { command: command }),
      );

      client.commands.get(command).execute(message, args);
    } catch (error) {
      logger.error(error);
      message.reply(i18n.__("there was an error when executing that command."));
    }
  });
};
