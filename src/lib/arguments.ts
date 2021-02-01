import { Message, User } from "discord.js";

import { ClientInstance, CommandPrefix } from "./core";

import { Argument, ArgumentList } from "../interfaces/argument";

export const parseArguments = (message: Message): ArgumentList => {
  const rawArgs: string[] = getRawArguments(message);
  const args: Argument[] = rawArgs.slice(1).map((arg: Argument) => {
    if (typeof arg === "string") {
      const userMention = getUserFromMention(arg);
      if (userMention) return userMention;
    }

    return arg;
  });

  return {
    trigger: getCommandTrigger(rawArgs),
    arguments: args,
  };
};

export const getRawArguments = (message: Message): string[] => {
  return message.content.slice(CommandPrefix.length).trim().split(/ +/);
};

export const getUserFromMention = (mention: string): User | string | void => {
  if (!mention) return;

  if (mention.startsWith("<@") && mention.endsWith(">")) {
    mention = mention.slice(2, -1);

    if (mention.startsWith("!")) {
      mention = mention.slice(1);
    }

    return ClientInstance.users.cache.get(mention);
  }

  return mention;
};

export const getCommandTrigger = (args: string[]): string => {
  return args.shift()?.toLowerCase() ?? "";
};
