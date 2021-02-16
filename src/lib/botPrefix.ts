import { Message } from "discord.js";

import { ClientInstance } from "./core";

/**
 * The prefix the bot should respond to - when a user sends a message prefixed
 * with this, the bot will know to respond.
 *
 * @remarks
 *
 * Right now, this prefix is set globally through an environment variable -
 * however, it should ideally be configurable on a per-guild basis too, and
 * respond to that prefix instead of a global one.
 */
export const commandPrefix = process.env.COMMAND_PREFIX ?? "!!";

/**
 * Determines whether a bot should respond to a given message. This performs all
 * the sanity checks necessary to be reasonably certain a user intended to
 * address the bot and elicit a response.
 *
 * @param message - The Discord.js {@link discordjs.com | Message} object that
 * we want to parse.
 */
export const botShouldRespond = (message: Message): boolean =>
  prefixRegex().test(message.content) &&
  !message.partial &&
  !message.author.bot &&
  message.author !== ClientInstance.user;

/**
 * Determines whether the given message contains a bot mention or prefix. The
 * most common use for this is to break a message down into its constituent
 * arguments.
 *
 * @param message - The Discord.js {@link discordjs.com | Message} object that
 * we want to parse.
 */
export const mentionOrPrefix = (message: Message): string => {
  const matchedPrefix = message.content.match(prefixRegex());
  if (matchedPrefix) {
    return matchedPrefix[1];
  } else {
    return "";
  }
};

/**
 * Matches either a a Discord user identifier or the defined command prefix.
 */
const prefixRegex = (): RegExp => {
  return new RegExp(
    `^(<@!?${ClientInstance.user?.id}>|${escapeRegex(commandPrefix)})\\s*`,
    "ui",
  );
};

/**
 * Escapes characters in a string so that they match literally in a regex. This
 * allows the commond prefix to contain characters that would otherwise be
 * meaningful in a regular expression.
 *
 * @param str The string to escape
 */
const escapeRegex = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
