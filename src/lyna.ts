import { Collection, Message } from "discord.js";
import { URL } from "url";
import { oneLineCommaListsAnd } from "common-tags";
import path from "path";
import { readdir } from "fs/promises";

import { ClientInstance, CommandPrefix } from "./lib/core";
import { debug, logger } from "./lib/logger";
import { i18n } from "./lib/i18n";
import { parseArgs } from "./lib/arguments";

import { ArgumentList } from "./interfaces/argument";
import { Command } from "./interfaces/command";

const commands: Collection<string, Command> = new Collection();

/**
 * The main entry point for Lyna.
 *
 * Here, we log into Discord and set up anything else the bot needs to run
 * globally, then start listening for commands.
 *
 * @module
 */
export default (): void => {
  login();
  registerCommands();

  ClientInstance.on("message", (message: Message) => {
    dispatchCommand(message);
  });
};

const login = () => {
  logger.info(i18n.__("Connecting to Discord..."));
  ClientInstance.login(process.env.DISCORD_BOT_TOKEN);

  ClientInstance.once("ready", () => {
    logger.info(i18n.__("Lyna is now standing guard."));
  });
};

const registerCommands = async () => {
  try {
    const lynaDir = path.dirname(new URL(import.meta.url).pathname);
    const files = await readdir(path.join(lynaDir, "./commands/"));
    const CommandRegex = /\.command\.(t|j)s$/;

    const commandsLoaded = files.map((file) => {
      if (CommandRegex.test(file)) {
        return import(path.join(lynaDir, "./commands/", file))
          .then((command) => {
            const cmd = command.default;

            commands.set(cmd.trigger.toLowerCase(), cmd);
          })
          .catch((error: string) => {
            logger.error(`Error loading module ${file}: ${error}`);
          });
      }
    });

    Promise.all(commandsLoaded).then(() => {
      logger.verbose(
        oneLineCommaListsAnd`
          ${i18n.__("Registered commands:")}
          ${commands.keyArray()}
        `,
      );
    });
  } catch (error) {
    logger.error(error);
  }
};

const dispatchCommand = async (message: Message) => {
  if (!message.content.startsWith(CommandPrefix) || message.author.bot) return;

  const args: ArgumentList = parseArgs(message);

  if (!commands.has(args.trigger)) return;

  try {
    commands.get(args.trigger)?.execute(message, args);

    logger.verbose(
      i18n.__(`Command executed: {{ trigger }}`, { trigger: args.trigger }),
    );
  } catch (error) {
    logger.error(error);
    message.reply(i18n.__("there was an error when executing that command."));
  }
};
