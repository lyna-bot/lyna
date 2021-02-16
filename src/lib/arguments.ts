import { Message, User } from "discord.js";

import { ClientInstance } from "./core";

import { Argument, ArgumentList } from "../interfaces/argument";
import { mentionOrPrefix } from "./botPrefix";

/**
 * Allows us to identify Discord's user mentions, such as
 * `<@!618749306207469578>`, and match the user IDs from within them.
 */
const USER_MENTION = /^<@!?(\d+)>$/;

/**
 * Parses a Discord message and extracts the contents into a form that can be
 * easily consumed by other functions.
 *
 * @remarks
 * This command resolves any valid user provided in the form of a Discord ID
 * or {@link USER_MENTION | valid Discord identifier}. Support for resolving channels,
 * roles, and any other valid {@link Argument | Arguments} is scoped but not
 * yet implemented.
 *
 * At the moment, we split arguments by spaces, so commands like
 * `?command <arg1> <multi word arg2> <arg3>` aren't yet possible.
 *
 * @param message - The Discord.js {@link discordjs.com | Message} object whose
 * arguments we want to parse.
 * @returns An object containing the command's trigger and a list of processed
 * arguments.
 */
export const parseArguments = (message: Message): ArgumentList => {
  const rawArgs: string[] = getRawArguments(message);

  const args: Argument[] = rawArgs.slice(1).map((argument: Argument) => {
    if (typeof argument === "string" || typeof argument === "number") {
      const userMention = getUserFromArgument(argument);
      return userMention ?? argument;
    }

    return argument;
  });

  return {
    arguments: args,
    trigger: getCommandTrigger(rawArgs),
  };
};

/**
 * Checks a given string and resolves any valid user provided in the form of a
 * Discord ID or {@link USER_MENTION | valid Discord identifier}.
 *
 * @param mention - A string containing either a Discord identifier or valid
 * user ID
 * @returns A `User` object if one is found; `undefined` otherwise.
 *
 * @alpha
 */
export const getUserFromArgument = (mention: string): User | undefined => {
  // First, check if the mention is a standard Discord mention.
  const mentionMatches = mention.match(USER_MENTION);
  if (mentionMatches) {
    mention = mentionMatches[1];
  }

  // At this point, we probably have a user ID, either extracted from a mention,
  // or passed through directly. Look for a User in the cache with this ID and
  // return it if possible.
  return ClientInstance.users.cache.get(mention);
};

/**
 * Takes a Discord message and turns it into a set of raw arguments.
 *
 * @param message - The Discord.js {@link discordjs.com | Message} object whose
 * arguments we want to parse.
 * @returns An array of strings, with each representing one argument given.
 */
export const getRawArguments = (message: Message): string[] => {
  return message.content
    .slice(mentionOrPrefix(message).length)
    .trim()
    .split(/ +/);
};

/**
 * Retrieves the command trigger from a set of arguments for display purposes.
 *
 * @param args - A list of arguments in string form
 * @returns The command's trigger, including the prefix or bot mention.
 */
const getCommandTrigger = (args: string[]): string => {
  return args.shift()?.toLowerCase() ?? "";
};
