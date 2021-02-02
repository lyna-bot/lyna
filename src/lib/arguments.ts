import { Message, User } from "discord.js";

import { ClientInstance } from "./core";

import { Argument, ArgumentList } from "../interfaces/argument";
import { mentionOrPrefix } from "./botPrefix";

const USER_MENTION = /^<@!?(\d+)>$/;
const USER_DISCRIMINATOR = /^@?(.*)#(\d{4})$/;

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
    trigger: getCommandTrigger(rawArgs),
    arguments: args,
  };
};

export const getUserFromArgument = (mention: string): User | undefined => {
  // First, check if the mention is a standard Discord mention.
  const mentionMatches = mention.match(USER_MENTION);
  if (mentionMatches) {
    mention = mentionMatches[1];
  }

  // At this point, we probably have a user ID, either from the steps above, or
  // passed through. Check the cache to see if we have a match.
  return ClientInstance.users.cache.get(mention);
};

export const getRawArguments = (message: Message): string[] => {
  return message.content
    .slice(mentionOrPrefix(message).length)
    .trim()
    .split(/ +/);
};

const getCommandTrigger = (args: string[]): string => {
  return args.shift()?.toLowerCase() ?? "";
};
